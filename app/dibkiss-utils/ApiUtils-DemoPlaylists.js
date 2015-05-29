var request = require("superagent");

// Test code for PlaylistsPage
module.exports = {
    // Test settings
    demoapi: "http://test2.qwolk.q-lite.org/v0/projects/1/playlists/",
    demouser: "auser",
    demopass: "apass",

    demoLoadPlaylists: function (myProjectId, myCallback) {
        request.get(this.demoapi)
            .auth(this.demouser, this.demopass)
            .accept('application/json')
            .end(function (err, resp) {
                if (resp.ok) {
                    myCallback(true, resp.body);
                } else {
                    myCallback(false, err);
                }
            });
    },
};