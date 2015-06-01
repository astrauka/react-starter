var AppDispatcher = require('dibkiss-dispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('dibkiss-constants');
var WolkAPI = require('dibkiss-utils/WolkAPI');

// polyfill
var Objectassign = require('react/lib/Object.assign');


// Internal data storage as global variable:
var _dataPlaylistItemsStore = {
    pending : false,
    error : null,
    playlistitems: [],
    playlistid: null
};


function makeErrorInfoFromSuperagentError(error) {
    return makeErrorInfo(
        error.status,
        error.response.body!==null ? error.response.body.error.message : error.message
    );
}
function makeErrorInfo(status,message) {
    return {
        status:  status,
        message: message
    };
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var PlaylistItemsStore = Objectassign({}, EventEmitter.prototype, {

    // Return Product data
    getStoredata: function() {
        return _dataPlaylistItemsStore;
    },

    getPlaylistItemsCount: function() {
        return Object.keys(_dataPlaylistItemsStore.playlistitems).length;
        // ^ not using .length directly, because it wont work with the keyed indexes: object not array.
    },

    // ---

    // Internal methods
    LoadItemsSuccess: function(data) {
        _dataPlaylistItemsStore.pending = false;
        _dataPlaylistItemsStore.error = null;
        _dataPlaylistItemsStore.playlistid = data.playlistid;
        _dataPlaylistItemsStore.playlistitems = data.items;
    },

    LoadItemsFail: function(error) {
        _dataPlaylistItemsStore.pending = false;
        _dataPlaylistItemsStore.error = makeErrorInfoFromSuperagentError(error);
        _dataPlaylistItemsStore.playlistitems = [];
    },

    LoadItemsPending: function(playlistid) {
        _dataPlaylistItemsStore.pending = true;
        _dataPlaylistItemsStore.error = null;
        _dataPlaylistItemsStore.playlistid = playlistid;     // Optimistic update.
        _dataPlaylistItemsStore.playlistitems = [];
    },

    // ---

    // Emit Change event
    emitChange: function() {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case FluxCartConstants.LOAD_PLAYLISTITEMS:
            PlaylistItemsStore.LoadItemsPending(action.playlistid);
            WolkAPI.loadPlaylist(action.projectid, action.playlistid);
            break;
        case FluxCartConstants.LOAD_PLAYLISTITEMS_SUCCESS:
            PlaylistItemsStore.LoadItemsSuccess(action.data);
            break;
        case FluxCartConstants.LOAD_PLAYLISTITEMS_FAIL:
            PlaylistItemsStore.LoadItemsFail(action.error);
            break;
        default:
            return true;
    }

    // If action was responded to, emit change event
    PlaylistItemsStore.emitChange();

    return true;

});

module.exports = PlaylistItemsStore;