const Applet = imports.ui.applet;
const Lang = imports.lang;
const Main = imports.ui.main;
const factory = require('./factory');
function main(metadata, orientation, panelHeight, instanceId) {
    var handler = factory.getWorkspaceEventHandler();
    return new WorkspaceTimerApplet(metadata, orientation, panelHeight, instanceId, handler);
}
class WorkspaceTimerApplet extends Applet.TextIconApplet {
    constructor(metadata, orientation, panelHeight, instanceId, handler) {
        super(orientation, panelHeight, instanceId);
        this.handler = handler;
        try {
            global.window_manager.connect('switch-workspace', Lang.bind(this, this.handler.onSwitchWorkspace));
            global.settings.connect('changed::workspace-name-overrides', Lang.bind(this, this.handler.onOverrideWorkspaceName));
        }
        catch (e) {
            global.logError(e.toString());
        }
    }
}
