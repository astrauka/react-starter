var AppDispatcher = require('dibkiss-dispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('dibkiss-constants');
var WolkAPI = require('dibkiss-utils/WolkAPI');

// polyfill
var Objectassign = require('react/lib/Object.assign');


// Internal data storage as global variable:
var _dataPlaylistItemsStore = {
    playlistitems: []
};

// Internal method to load product data from mock API
function _PlaylistItemsStoreLoadSuccess(data) {
    _dataPlaylistItemsStore.playlistitems = data.items;
    _dataPlaylistItemsStore.playlistid = data.playlistid;
}

function _PlaylistItemsStoreLoadPending(playlistid) {
    _dataPlaylistItemsStore.playlistitems = [];
    _dataPlaylistItemsStore.playlistid = playlistid;     // Optimistic update.
}


// Extend ProductStore with EventEmitter to add eventing capabilities
var PlaylistItemsStore = Objectassign({}, EventEmitter.prototype, {

    // Return Product data
    getPlaylistItems: function() {
        return _dataPlaylistItemsStore.playlistitems;
    },

    getPlaylistID: function() {
        return _dataPlaylistItemsStore.playlistid;
    },

    // Return Product data
    getPlaylistItemsCount: function() {
        return Object.keys(_dataPlaylistItemsStore.playlistitems).length;
    },

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
    var text;

    switch(action.actionType) {
        case FluxCartConstants.LOAD_PLAYLISTITEMS:
            _PlaylistItemsStoreLoadPending(action.playlistid);
            setTimeout(function() {
            	WolkAPI.loadPlaylist(action.projectid, action.playlistid);
            }, 2000);
            break;
        case FluxCartConstants.LOAD_PLAYLISTITEMS_SUCCESS:
            _PlaylistItemsStoreLoadSuccess(action.data);
            break;
        case FluxCartConstants.LOAD_PLAYLISTITEMS_FAIL:
            // ??
            break;
        default:
            return true;
    }

    // If action was responded to, emit change event
    PlaylistItemsStore.emitChange();

    return true;

});

module.exports = PlaylistItemsStore;