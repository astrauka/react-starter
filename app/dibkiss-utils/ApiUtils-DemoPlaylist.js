var request = require("superagent");
var ApiUtils = require("./ApiUtils");

const demoapi_root = "http://test2.qwolk.q-lite.org/";

// Test code for PlaylistPage
module.exports = {
    // Test settings
    demoapi: "http://test2.qwolk.q-lite.org/v0/projects/1/playlists/",
    demouser: "auser",
    demopass: "apass",

    //wolkapiv0_playlists:     demoapi_root + "v0/projects/:projectid/playlists/",
    //wolkapiv0_playlist:      demoapi_root + "v0/projects/:projectid/playlists/:playlistid/",
    wolkapiv0_playlistitems: demoapi_root + "v0/projects/:projectid/playlists/:playlistid/items",
    //wolkapiv0_playlistitem:  demoapi_root + "v0/projects/:projectid/playlists/:playlistid/items/:itemid",
    //wolkapiv0_schedules:     demoapi_root + "v0/projects/:projectid/playlists/:playlistid/schedules",
    //wolkapiv0_schedule:      demoapi_root + "v0/projects/:projectid/playlists/:playlistid/schedules/:scheduleid",

    demoLoadItems: function (projectid, playlistid, myCallback) {
        let url = ApiUtils.injectUrlValues(this.wolkapiv0_playlistitems, {
            projectid: projectid,
            playlistid: playlistid
        });
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