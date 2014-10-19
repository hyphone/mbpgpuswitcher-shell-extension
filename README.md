__mbp5linux Shell Extension__

This shell extension for GNOME 3 only works with my skripts to switch between the integrated and dedicated GPU on a MacBook Pro with dual NVIDIA GPUs (this applies for the model numbers from 5 to 6 with an integrated 9400M and a dedicated 9600M GT).

The shell extension removes the requirement to open the terminal so it's possible to switch to the desired GPU from the GUI.
A reboot is still required because of the limitations to the not-available-NVIDIA-support for the Apple GMUX.

__requirements__
* my gpu select scripts from here: https://github.com/hyphone/mbp5linux

__installation__

* # git clone https://github.com/hyphone/mbpgpuswitcher-shell-extension.git
* # cd mbpgpuswitcher-shell-extension
* # cp -r ./mbpgpuswitcher@marco-laux.info ~/.local/share/gnome-shell/extensions/
* enable the extension

__usage__
* you should notice a little icon in the top bar (no GPU defined / i / d)
* click on it to change the GPU (or initialize the script for the first time)
* it should change like this: _current state > changed state_
* click it again to revert the changes

__please note__
since the extension can't run with root previliges it's possible to log in as another user and the other user can also change the state of the GPU.
On boot the scripts will look in every user directory and pick the newest one.