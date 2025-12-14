# Ghost Icon GNOME Extension

Ghost Icon is a GNOME Shell extension that periodically displays a ghost icon on your screen. It's a fun and lightweight extension designed to work as an reminder to something (ex: blink your eyes).

## Features

- **Customizable Interval**: Set how often the ghost icon appears.
- **Customizable Duration**: Control how long the ghost icon stays visible.
- **Dynamic Positioning**: The ghost icon adjusts its position based on your monitor's layout.

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/Folskyy/ghost-icon
    cd ghost-icon
    ```

2. Install the extension:
    ```bash
    chmod +x activate.sh
    ./activate.sh
    ```

3. Restart GNOME Shell:
   - Press `Alt` + `F2`, type `r`, and press `Enter` on X11.
   - Or `LogOut` + `LogIn` on Wayland

4. Enable the extension:
   - `gnome-extensions enable ghost-icon@Folskyy`
   
    *The script `activate.sh` already does it.*


## Preferences

You can customize the extension's behavior via the preferences window:

- **Interval (seconds)**: Set the time between ghost appearances.
- **Duration (seconds)**: Set how long the ghost stays visible.

### Prerequisites

- GNOME Shell 45 or later (maybe 40 or later still working)
- [GJS](https://gjs.guide/) (GNOME JavaScript bindings)
- [GNOME Extensions Tool](https://wiki.gnome.org/Projects/GnomeShell/Extensions)

## File Structure

- `extension.js`: Main logic for the extension.
- `prefs.js`: Preferences window for customizing the extension.
- `schemas/org.gnome.shell.extensions.ghost-icon.gschema.xml`: Schema definitions for settings.
- `update.sh`: Script to update the extension.
- `activate.sh`: Script to activate the extension.
- `icon.png`: Image to be displayed
- `metadata.json`: Essencial extension's metadata

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Acknowledgments

- Built with [GNOME Shell Extensions](https://wiki.gnome.org/Projects/GnomeShell/Extensions).
- Inspired by the fun of adding a little surprise to the desktop.

---