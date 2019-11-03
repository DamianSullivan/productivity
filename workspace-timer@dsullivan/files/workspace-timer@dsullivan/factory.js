const Applet = imports.ui.applet;

// TODO(dsullivan): This needs to come from a central place.
const UUID = "workspace-timer@dsullivan"

let TimeularWorkspaceEventHandler; 
if (typeof require !== 'undefined') {
    TimeularWorkspaceEventHandler =
        require('./timeular/TimeularWorkspaceEventHandler');
} else {
    const AppletDir = imports.ui.appletManager.applets[UUID]; 
    TimeularWorkspaceEventHandler =
        AppletDir.timeular.TimeularWorkspaceEventHandler;
}

// Interface for workspace event handlers.
var WorkspaceEventHandler = {
    onSwitchWorkspace: function() {
        global.log("onSwitchWorkspace Unimplemented") },
    onOverrideWorkspaceName: function() {
        global.log("onOverrideWorkspaceName Unimplemented") },
}

function WorkspaceEventHandlerFactory() {
    this._init();
}

WorkspaceEventHandlerFactory.prototype = {
    _init: function() {},

	getWorkspaceEventHandler: function() {
        return new TimeularWorkspaceEventHandler
            .TimeularWorkspaceEventHandler();
	}
};
