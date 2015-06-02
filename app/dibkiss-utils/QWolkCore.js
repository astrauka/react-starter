var FluxCartActions = require('../dibkiss-actions');
var ApiUtils_PlaylistItems = require('./ApiUtils-DemoPlaylist');


var _AppCore = {
    apiauth : {
        //user: "barry",
        pasw: ""
    }
};


/* When an API fails, call this to check for deauth situations. */
function _catchApiError(data) {
    if (data.status==401) {
        let msg = 'Please give api pasw:';
        if (_AppCore.apiauth.pasw=='') {
            msg = 'Seems it expired.. ' + msg;
        }
        _AppCore.apiauth.pasw = window.prompt("Please provide api pasw", _AppCore.apiauth.pasw);
    }
}

module.exports = {

    // Load mock product data from localStorage into ProductStore via Action
    loadPlaylist: function(projectID, playlistID) {

        // Load Playlist items:
        ApiUtils_PlaylistItems.demoLoadItems(_AppCore.apiauth.pasw, projectID, playlistID, function (ok, data) {
            if (ok) {
                FluxCartActions.loadPlaylistItems_success(data);
            } else {
                _catchApiError(data);
                FluxCartActions.loadPlaylistItems_fail(data);
            }
        });

        // Load Playlist schedules:
        //ApiUtils_PlaylistSchedules.loadItems(


    }




};