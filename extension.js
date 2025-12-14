import St from 'gi://St';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import Clutter from 'gi://Clutter';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

const ICON_SIZE = 64;
const MARGIN = 20;

export default class GhostIconExtension extends Extension {
    enable() {
        log('GhostIcon: enable');

        // Settings load
        this._settings = this.getSettings();

        const iconFile = Gio.File.new_for_path(`${this.path}/icon.png`);
        const gicon = new Gio.FileIcon({ file: iconFile });

        this._icon = new St.Icon({
            gicon: gicon,
            icon_size: ICON_SIZE,
            reactive: false,
            opacity: 0,
        });

        // Display even in Fullscreen mode
        Main.layoutManager.addChrome(this._icon, { trackFullscreen: true });
        
        this._updatePosition();
        this._icon.hide();

        this._monitorsChangedId = Main.layoutManager.connect(
            'monitors-changed', 
            () => this._updatePosition()
        );

        // Restart the timer when the interval setting changes

        this._settingsChangedId = this._settings.connect('changed::interval', () => {
            log('GhostIcon: Intervalo alterado pelo usuário, reiniciando timer...');
            this._startTimer();
        });

        // Start the loop
        this._startTimer();
    }

    disable() {
        log('GhostIcon: disable');

        this._stopTimer();

        if (this._settingsChangedId) {
            this._settings.disconnect(this._settingsChangedId);
            this._settingsChangedId = null;
        }
        
        this._settings = null;

        if (this._monitorsChangedId) {
            Main.layoutManager.disconnect(this._monitorsChangedId);
            this._monitorsChangedId = null;
        }

        if (this._icon) {
            Main.layoutManager.removeChrome(this._icon);
            this._icon.destroy();
            this._icon = null;
        }
    }

    _startTimer() {
        // Ensure no previous timer is running
        this._stopTimer();

        // Read the current interval from settings
        const interval = this._settings.get_int('interval');

        this._intervalId = GLib.timeout_add_seconds(
            GLib.PRIORITY_DEFAULT,
            interval,
            () => {
                this._showIcon();
                return GLib.SOURCE_CONTINUE;
            }
        );
    }

    _stopTimer() {
        if (this._intervalId) {
            GLib.Source.remove(this._intervalId);
            this._intervalId = null;
        }
        if (this._hideTimeoutId) {
            GLib.Source.remove(this._hideTimeoutId);
            this._hideTimeoutId = null;
        }
    }

    _showIcon() {
        if (!this._icon) return;

        this._icon.remove_all_transitions();
        this._updatePosition();
        this._icon.show();
        this._icon.opacity = 255;

        // Read the actual duration
        const showDuration = this._settings.get_int('show-duration');

        this._icon.ease({
            opacity: 0,
            duration: showDuration * 1000,
            mode: Clutter.AnimationMode.EASE_IN_QUAD,
            onComplete: () => {
                if (this._icon) this._icon.hide();
            }
        });
    }

    _updatePosition() {
        if (!this._icon) return;

        // Position the icon on the bottom-right corner
        // of the primary monitor, respecting margins.
        const monitorIdx = global.display.get_primary_monitor();
        const monitor = global.display.get_monitor_geometry(monitorIdx);

        this._icon.set_position(
            monitor.x + monitor.width - ICON_SIZE - MARGIN,
            monitor.y + monitor.height - ICON_SIZE - MARGIN
        );
    }
}