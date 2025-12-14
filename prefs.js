import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class GhostIconPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        // Automatically load the settings based on the compiled schemas
        const settings = this.getSettings();

        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup({
            title: 'Ghost Icon settings',
            description: 'Set when and how the icon appears.'
        });

        // 1. Interval settings
        const intervalRow = new Adw.SpinRow({
            title: 'Interval (seconds)',
            subtitle: 'Time between the appearances',
            adjustment: new Gtk.Adjustment({
                lower: 5,             // Minimum allowed interval (5 seconds)
                upper: 3600*12,      // Maximum allowed interval (12 hours)
                step_increment: 10, // Increment step when using arrows or scroll
            }),
        });
        // Bind the SpinRow value directly to the GSettings key.
        // Changes are persisted automatically.
        settings.bind('interval', intervalRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        group.add(intervalRow);

        // 2. Duration setting
        const durationRow = new Adw.SpinRow({
            title: 'Duration (seconds)',
            subtitle: 'How much time the icon stay visible on the screen',
            adjustment: new Gtk.Adjustment({
                lower: 1,
                upper: 60,
                step_increment: 1,
            }),
        });
        
        settings.bind('show-duration', durationRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        group.add(durationRow);

        page.add(group);
        window.add(page);
    }
}