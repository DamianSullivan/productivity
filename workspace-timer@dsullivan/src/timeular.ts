const SPEC_URL =  "https://developers.timeular.com/public-api/swagger/public-api.v2.yaml"
const UUID = "workspace-timer@dsullivan"

class TimeularWorkspaceEventHandler {
    constructor() {}

    onSwitchWorkspace(): void {
        global.log("[TimeularWorkspaceEventHandler]: Switching workspace");
    };

    onOverrideWorkspaceName(): void {
        global.log("[TimeularWorkspaceEventHandler]: Overriding workspace name");
    };
}
