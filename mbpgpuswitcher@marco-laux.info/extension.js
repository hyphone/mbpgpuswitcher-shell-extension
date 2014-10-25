const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Shell = imports.gi.Shell;
const GLib = imports.gi.GLib;

let text, button, gpuold, gpunew, serror, bok, home, oldexists, icon;

function panel_set_txt(){
  if (gpunew.length>0){
      icon.set_text(gpuold+' > '+gpunew);
  }
  else if (gpuold.length>0){
    icon.set_text(gpuold);
  }
  else {
    icon.set_text('GPU not defined');
  }
}

function checkstatus(){
    if (GLib.file_test('/etc/gpu', GLib.FileTest.EXISTS)){
      oldexists=true;
      gpuold = Shell.get_file_contents_utf8_sync('/etc/gpu').trim();
      if (GLib.file_test(home+'/.gpunew', GLib.FileTest.EXISTS)) {
          gpunew = Shell.get_file_contents_utf8_sync(home+'/.gpunew').trim();
          panel_set_txt();
      }
      else {
        gpunew='';
        panel_set_txt();
      }
    }
    else{
      oldexists=false;
      gpuold='not set';
      if (GLib.file_test(home+'/.gpunew', GLib.FileTest.EXISTS)) {
          gpunew = Shell.get_file_contents_utf8_sync(home+'/.gpunew').trim();
          panel_set_txt();
      }
      else {
        gpunew='';
        panel_set_txt();
      }
    }
}

function _hidePopup() {
    Main.uiGroup.remove_actor(text);
    text = null;
}

function _showPopup() {
    if (GLib.spawn_command_line_sync( '/sbin/gpuchange', null, null, bok, serror)) {
      checkstatus();
      if (gpunew.length>0) {
          text = new St.Label({ style_class: 'gpu-label', text: 'GPU changed. reboot is required.' });
      }
      else {
          text = new St.Label({ style_class: 'gpu-label', text: 'staying on GPU. no reboot required.' });
      }
    }
    else{
      text = new St.Label({ style_class: 'gpu-label', text: serror });
    }

    Main.uiGroup.add_actor(text);

    text.opacity = 255;

    let monitor = Main.layoutManager.primaryMonitor;

    text.set_position(Math.floor(monitor.width / 2 - text.width / 2),
                      Math.floor(monitor.height / 2 - text.height / 2));

    Tweener.addTween(text,
                     { opacity: 0,
                       time: 2,
                       transition: 'easeOutQuad',
                       onComplete: _hidePopup });
}

function init() {
    home = GLib.get_home_dir();

    button = new St.Bin({ style_class: 'gpu-panel',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: true,
                          track_hover: true });
    icon = new St.Label();
    button.set_child(icon);
    button.connect('button-press-event', _showPopup);

    checkstatus();
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
