__mbp5linux Shell Extension__

This shell extension for GNOME 3 only works with my skripts to switch between the integrated and dedicated GPU on a MacBook Pro with dual NVIDIA GPUs (this applies for the model numbers from 5 to 6 with an integrated 9400M and a dedicated 9600M GT).

The shell extension removes the requirement to open the terminal so it's possible to switch to the desired GPU from the GUI.
A reboot is still required because of the limitations to the not-available-NVIDIA-support for the Apple GMUX.

__installation__

* # git clone https://github.com/hyphone/mbpgpuswitcher-shell-extension.git
* cd mbpgpuswitcher-shell-extension
* cp -r ./mbpgpuswitcher@marco-laux.info ~/.local/share/gnome-shell/extensions/
* enable the extension