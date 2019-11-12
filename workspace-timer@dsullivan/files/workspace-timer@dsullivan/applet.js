const Applet = imports.ui.applet;
const Lang = imports.lang;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;

const UUID = "workspace-timer@dsullivan";

function main(metadata, orientation, panel_height, instanceId) {
    let WorkspaceEventHandlerFactory;
    if (typeof require !== 'undefined') {
        WorkspaceEventHandlerFactory = require('./factory');
    } else {
        let manager = imports.ui.appletManager.applets[metadata.uuid];
        TimerModule = manager.factory;
    }

    let handler =
        new WorkspaceEventHandlerFactory.getWorkspaceEventHandler();

    return new WorkspaceNameApplet(
        metadata, orientation, panel_height, instanceId, handler);
}

function WorkspaceNameApplet(
        metadata, orientation, panel_height, instanceId, handler) {
    this._init(metadata, orientation, panel_height, instanceId, handler);
}

WorkspaceNameApplet.prototype = {
    __proto__: Applet.TextApplet.prototype,

    _init: function(metadata, orientation, panel_height, instanceId, handler) {
        Applet.TextApplet.prototype._init.call(
            this, orientation, panel_height, instanceId);
        this.handler = handler;

        try {
            global.window_manager.connect('switch-workspace',
                Lang.bind(this, this.onSwitchWorkspace));
            global.settings.connect('changed::workspace-name-overrides',
                Lang.bind(this, this.onSwitchWorkspace));
            this.updateLabel();

            // Set up the menu.
            this.menu = new Applet.AppletPopupMenu(this, orientation);
            this.menuManager = new PopupMenu.PopupMenuManager(this);
            this.menuManager.addMenu(this.menu);
        } catch(e) {
            global.logError(e.toString());
        }
    },

    onSwitchWorkspace: function() {
        let activeWorkspace = global.screen.get_active_workspace();
        let name = Main.getWorkspaceName(activeWorkspace.index());
        this.set_applet_label(name);
        this.handler.onSwitchWorkspace();
    },

    activateWorkspace: function(workspace) {
        workspace.activate(global.get_current_time());
    }
}

