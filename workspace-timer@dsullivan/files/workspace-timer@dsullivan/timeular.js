const SPEC_URL = "https://developers.timeular.com/public-api/swagger/public-api.v2.yaml";
const UUID = "workspace-timer@dsullivan";
class TimeularWorkspaceEventHandler {
    constructor() { }
    onSwitchWorkspace() {
        global.log("[TimeularWorkspaceEventHandler]: Switching workspace");
    }
    ;
    onOverrideWorkspaceName() {
        global.log("[TimeularWorkspaceEventHandler]: Overriding workspace name");
    }
    ;
}
