var request = require("superagent");

// Test code for PlaylistPage
module.exports = {
    // Test settings
    demoapi: "http://test2.qwolk.q-lite.org/v0/projects/1/playlists/",
    demouser: "auser",
    demopass: "apass",

    demoLoadItems: function (myProjectId, myPlaylistId, myCallback) {
        let url = "http://test2.qwolk.q-lite.org/v0/projects/"+ myProjectId +"/playlists/"+ myPlaylistId +"/items/";
        request.get(url)
            //.query({filtertags: ['tag-a','tag-b'], range: '1..5', order: 'desc' })
            //.timeout
            .auth(this.demouser, this.demopass)
            .accept('application/json')
            .end(function (err, res) {
                if (res.ok) {
                    myCallback(true, res.body);
                } else {
                    myCallback(false, err);
                }
            });
    },

    demoAddItem: function (myPlaylistId, myText, myDuration, myCallback) {
        request.post(this.demoapi + myPlaylistId + '/items/')
            .send({demotext: myText, duration: myDuration})
            .auth(this.demouser, this.demopass)
            .accept('application/json')
            .end(function (err, res) {
                if (res.ok) {
                    myCallback(true, res.body);
                    console.log("demoAddItem ok: " + res.text);
                } else {
                    myCallback(false, err);
                    console.log("demoAddItem fail: " + res.text);
                }
            });
    },

    demoRemoveItem: function (myPlaylistId, myID, myCallback) {
        request.del(this.demoapi + myPlaylistId + '/items/' + myID)
            .auth(this.demouser, this.demopass)
            .accept('application/json')
            .end(function (err, res) {
                if (res.ok) {
                    myCallback(true, res.body);
                    console.log("demoRemoveItem ok: " + res.text);
                } else {
                    myCallback(false, err);
                    console.log("demoRemoveItem fail: " + res.text);
                }
            });
    },

    demoEditItem: function (myPlaylistId, myID, myText, myDuration, myCallback) {
        request.put(this.demoapi + myPlaylistId + '/items/' + myID)
            .send({demotext: myText, duration: myDuration})
            .auth(this.demouser, this.demopass)
            .accept('application/json')
            .end(function (err, res) {
                if (res.ok) {
                    myCallback(true, resp.body);
                    console.log("demoEditItem ok: " + res.text);
                } else {
                    myCallback(false, err);
                    console.log("demoEditItem fail: " + res.text);
                }
            });
    }
};