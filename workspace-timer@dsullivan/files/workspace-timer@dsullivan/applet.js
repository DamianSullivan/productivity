const Applet = imports.ui.applet;
const Lang = imports.lang;
const Main = imports.ui.main;

const UUID = "workspace-timer@dsullivan"

let WorkspaceEventHandlerFactory; 
if (typeof require !== 'undefined') {
    WorkspaceEventHandlerFactory = require('./factory');
} else {
    const AppletDir = imports.ui.appletManager.applets[UUID]; 
    WorkspaceEventHandlerFactory =
        AppletDir.factory.WorkspaceEventHandlerFactory;
}

function main(metadata, orientation, panel_height, instanceId) {
    factory = new WorkspaceEventHandlerFactory();
    handler = factory.getWorkspaceEventHandler(); 
    return new WorkspaceTimerApplet(
        metadata, orientation, panel_height, instanceId, handler);
}

function WorkspaceTimerApplet(
        metadata, orientation, panel_height, instanceId, handler) {
    this._init(metadata, orientation, panel_height, instanceId, handler);
}

WorkspaceTimerApplet.prototype = {
  __proto__: Applet.TextApplet.prototype,

  _init: function(metadata, orientation, panel_height, instanceId, handler) {
    Applet.TextApplet.prototype._init.call(
        this, orientation, panel_height, instanceId);
    this.metadata = metadata;
    this.handler = handler;

    try {
        global.window_manager.connect('switch-workspace',
            Lang.bind(this, this.handler.onSwitchWorkspace));
        global.settings.connect('changed::workspace-name-overrides',
            Lang.bind(this, this.handler.onOverrideWorkspaceName));
    } catch(e) {
        global.logError(e.toString());
    }
  },
}
