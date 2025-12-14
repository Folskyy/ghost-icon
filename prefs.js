import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class GhostIconPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        // Carrega as configurações automaticamente baseadas no Schema compilado
        const settings = this.getSettings();

        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup({
            title: 'Comportamento do Fantasma',
            description: 'Configure quando e como ele aparece.'
        });

        // 1. Configuração de Intervalo
        const intervalRow = new Adw.SpinRow({
            title: 'Intervalo (segundos)',
            subtitle: 'Tempo de espera entre as aparições',
            adjustment: new Gtk.Adjustment({
                lower: 5,        // Mínimo 5 segundos
                upper: 3600,     // Máximo 1 hora
                step_increment: 10,
            }),
        });
        // Vincula o valor visual à configuração gravada
        settings.bind('interval', intervalRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        group.add(intervalRow);

        // 2. Configuração de Duração
        const durationRow = new Adw.SpinRow({
            title: 'Duração (segundos)',
            subtitle: 'Quanto tempo ele fica visível na tela',
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