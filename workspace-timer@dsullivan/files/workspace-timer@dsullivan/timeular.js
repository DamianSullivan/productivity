const Soup = imports.gi.Soup;
const Lang = imports.lang;

const API_ROOT = "https://api.timeular.com/api/v2";
const MIME_TYPE = "application/json";
const ACCEPT = "application/json;charset=UTF-8";
const DEVELOPER_SIGN_IN_URL = API_ROOT + "/developer/sign-in";

function TimeularApi(options){
    this._init(options);
}

TimeularApi.prototype = {
    _init: function(options) {
        this.apiKey = options.apiKey;
        this.apiSecret = options.apiSecret;

        this.httpSession = new Soup.SessionAsync();
        Soup.Session.prototype.add_feature.call(
            this.httpSession, new Soup.ProxyResolverDefault());
    },

    developerSignIn: function () {
        let params = {
            apiKey: this.apiKey,
            apiSecret: this.apiSecret,
        };
        this.sendPost(
            DEVELOPER_SIGN_IN_URL, params, this.developerSignInResponse);
    },

    developerSignInResponse: function (session, message) {
        global.log("Developer sign in response: " + message.toString());
        let response = this.parseJsonResponse(message);

        if (message.status_code == Soup.Status.OK) {
            global.log("Developer sign in successful: " + response.toString());
            this.apiToken = response.token;
        } else {
            global.log("Developer sign in failed: " + response.toString());
            // null will cause another attempt later.
            this.apiToken = null;
        }
    },

    sendPost: function(url, data, callback) {
        let json = JSON.stringify(data);
        let message = Soup.Message.new("POST", url);
        message.set_request(MIME_TYPE, Soup.MemoryUse.COPY, json, json.length);
        message.request_headers.append("accept", ACCEPT);
        this.httpSession.queue_message(message, Lang.bind(this, callback));
    },

    parseJsonResponse: function(request) {
        var rawResponseJSON = request.response_body.data;
        global.log("rawResponseJSON: " + rawResponseJSON);
        return JSON.parse(rawResponseJSON);
    }
}
