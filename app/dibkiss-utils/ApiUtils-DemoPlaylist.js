var request = require("superagent");

// Test code for PlaylistPage
module.exports = {
    // Test settings
    demoapi: "http://test2.qwolk.q-lite.org/v0/projects/1/playlists/",
    demouser: "auser",
    demopass: "apass",

    demoLoadItems: function (myPlaylistId, myCallback) {
        request.get(this.demoapi + myPlaylistId + '/')
            //.query({filtertags: ['tag-a','tag-b'], range: '1..5', order: 'desc' })
            //.timeout
            .auth(this.demouser, this.demopass)
            .accept('application/json')
            .end(function (resp) {
                if (resp.ok) {
                    myCallback(true, resp.body);
                } else {
                    myCallback(false, resp); // resp for debug
                }
            });
    },

    demoAddItem: function (myPlaylistId, myText, myDuration, myCallback) {
        request.post(this.demoapi + myPlaylistId + '/items/')
            .send({demotext: myText, duration: myDuration})
            .auth(this.demouser, this.demopass)
            .accept('application/json')
            .end(function (resp) {
                if (resp.ok) {
                    myCallback(true, resp.body);
                    console.log("demoAddItem ok: " + resp.text);
                } else {
                    myCallback(false, null);
                    console.log("demoAddItem fail: " + resp.text);
                }
            });
    },

    demoRemoveItem: function (myPlaylistId, myID, myCallback) {
        request.del(this.demoapi + myPlaylistId + '/items/' + myID)
            .auth(this.demouser, this.demopass)
            .accept('application/json')
            .end(function (resp) {
                if (resp.ok) {
                    myCallback(true, resp.body);
                    console.log("demoRemoveItem ok: " + resp.text);
                } else {
                    myCallback(false, null);
                    console.log("demoRemoveItem fail: " + resp.text);
                }
            });
    },

    demoEditItem: function (myPlaylistId, myID, myText, myDuration, myCallback) {
        request.put(this.demoapi + myPlaylistId + '/items/' + myID)
            .send({demotext: myText, duration: myDuration})
            .auth(this.demouser, this.demopass)
            .accept('application/json')
            .end(function (resp) {
                if (resp.ok) {
                    myCallback(true, resp.body);
                    console.log("demoEditItem ok: " + resp.text);
                } else {
                    myCallback(false, null);
                    console.log("demoEditItem fail: " + resp.text);
                }
            });
    }
};