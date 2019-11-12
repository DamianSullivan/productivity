const Main = imports.ui.main;

const timeular = require('./timeular');

function TimeularWorkspaceEventHandler() {
    this._init();
}

TimeularWorkspaceEventHandler.prototype = {
    _init: function() {
        // TODO(dsullivan): Replace this with configuration.
        this.api = new timeular.TimeularApi({
            apiKey: "",
            apiSecret: ""
        });
        // TODO(dsullivan): Error handling.
        this.api.developerSignIn();
    },

    onSwitchWorkspace() {
        let activeWorkspace = global.screen.get_active_workspace();
        let name = Main.getWorkspaceName(activeWorkspace.index());
        global.log("Switching to workspace: " + name);
    },

    onOverrideWorkspaceName() {
        global.log("Overriding workspace: " + name);
    },
}
