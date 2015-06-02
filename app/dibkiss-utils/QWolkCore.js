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
        var msg = 'Please give api pasw:';
        if (_AppCore.apiauth.pasw!='') { msg = 'Seems it expired.. ' + msg; }
        _AppCore.apiauth.pasw = window.prompt(msg, _AppCore.apiauth.pasw);
        // TODO: retry API request after auth would be great..
    }
    if (data.status==403) {
        console.debug("bugnominate api 403", data.response);
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
                FluxCartActions.loadPlaylistItems_fail(data);
                _catchApiError(data);
            }
        });

        // Load Playlist schedules:
        //ApiUtils_PlaylistSchedules.loadItems(


    }




};