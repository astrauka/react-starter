var AppDispatcher = require('dibkiss-dispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('dibkiss-constants');
var WolkAPI = require('dibkiss-utils/WolkAPI');

// polyfill
var Objectassign = require('react/lib/Object.assign');

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
    // Internal data storage as global variable:
    _dataStore : {
        pending : false,
        error : null,
        playlistitems: [],
        playlistid: null
    },

    // Return Product data
    getStoredata: function() {
        return this._dataStore;
    },

    getPlaylistItemsCount: function() {
        return Object.keys(this._dataStore.playlistitems).length;
        // ^ not using .length directly, because it wont work with the keyed indexes: object not array.
    },

    // ---

    // Internal methods
    LoadItemsSuccess: function(data) {
        this._dataStore.pending = false;
        this._dataStore.error = null;
        this._dataStore.playlistid = data.playlistid;
        this._dataStore.playlistitems = data.items;
    },

    LoadItemsFail: function(error) {
        this._dataStore.pending = false;
        this._dataStore.error = makeErrorInfoFromSuperagentError(error);
        this._dataStore.playlistitems = [];
    },

    LoadItemsPending: function(playlistid) {
        this._dataStore.pending = true;
        this._dataStore.error = null;
        this._dataStore.playlistid = playlistid;     // Optimistic update.
        this._dataStore.playlistitems = [];
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