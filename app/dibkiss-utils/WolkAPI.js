var FluxCartActions = require('../dibkiss-actions');
var ApiUtils_PlaylistItems = require('./ApiUtils-DemoPlaylist');

module.exports = {

    // Load mock product data from localStorage into ProductStore via Action
    loadPlaylist: function(projectID, playlistID) {

        // Load Playlist items:
        ApiUtils_PlaylistItems.demoLoadItems(projectID, playlistID, function (ok, data) {
            if (ok) {
                FluxCartActions.loadPlaylistItems_success(data);
            } else {
                FluxCartActions.loadPlaylistItems_fail(data);
                console.log("demoLoadItems() fail:");
                console.log(data);
                //alert('demoLoadItems() error see console log');
            }
        });

        // Load Playlist schedules:
        //ApiUtils_PlaylistSchedules.loadItems(


    }


};