const Applet = imports.ui.applet;

// TODO(dsullivan): Refactor the WorkspaceEventHandler interface out.
function TimeularWorkspaceEventHandler() {
    this._init();
}

TimeularWorkspaceEventHandler.prototype = {
    _init: function() {},
    onSwitchWorkspace: function() {
        global.log("[TimeularWorkspaceEventHandler]: Switching workspace");
    },

    onOverrideWorkspaceName: function() {
        global.log("[TimeularWorkspaceEventHandler]: Overriding workspace name");
    }
}
