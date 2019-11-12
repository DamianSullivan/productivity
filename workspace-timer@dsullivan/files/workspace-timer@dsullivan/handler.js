const Lang = imports.lang;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;

const timeular = require('./timeular');

function TimeularWorkspaceEventHandler() {
    this._init();
}

TimeularWorkspaceEventHandler.prototype = {
    _init: function() {
        // TODO(dsullivan): Replace this with configuration.
        this.api = new timeular.TimeularApi({
            apiKey: "NjQ0NDVfMTFmYTNjMTFkYTNjNGZiNzgyZjZkZGJiMWQ3MTNmZjE=",
            apiSecret: "MzJjMThkZWZiNGIwNGUwMTg5NmEzYWNmYTIyYTljOTk=",
        });
        // TODO(dsullivan): Error handling.
        this.api.developerSignIn();
    },

    onSwitchWorkspace: function() {
        let activeWorkspace = global.screen.get_active_workspace();
        let activeWorkspaceName = Main.getWorkspaceName(activeWorkspace.index());
        global.log("Switching to workspace: " + activeWorkspaceName);
        // TODO(dsullivan): Seconds should come from a config.
        Mainloop.timeout_add_seconds(
            5, Lang.bind(this, function() {
                this.startActivity(activeWorkspaceName);
            }));
    },

    onOverrideWorkspaceName: function() {
        global.log("Overriding workspace: " + name);
    },

    startActivity: function(workspace) {
        let activeWorkspace = global.screen.get_active_workspace();
        let activeWorkspaceName = Main.getWorkspaceName(activeWorkspace.index());

        // Many workspace switches might have fired off, only start recording
        // if the current workspace has been on screen for at least n seconds.
        if (workspace != activeWorkspaceName) {
            global.log("Workspace: " + workspace + " != Active: " + activeWorkspaceName);
            return;
        }

        global.log("Starting to record: " + workspace);
    }
}
