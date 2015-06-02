var AppDispatcher = require('dibkiss-dispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('dibkiss-constants');
var QWolkCore = require('dibkiss-utils/QWolkCore');

// polyfill
var Objectassign = require('react/lib/Object.assign');

/********************* common methods: *********************/

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

/********************* PlaylistItemsStore private variables: *********************/

// Internal data storage as global variable:
var _dataStore = {
    pending : false,
    error : null,
    playlistitems: [],
    playlistid: null
};

/********************* PlaylistItemsStore private methods: *********************/

// Internal methods
function _LoadItemsSuccess(data) {
    _dataStore.pending = false;
    _dataStore.error = null;
    _dataStore.playlistid = data.playlistid;
    _dataStore.playlistitems = data.items;
};

function _LoadItemsFail(error) {
    _dataStore.pending = false;
    _dataStore.error = makeErrorInfoFromSuperagentError(error);
    _dataStore.playlistitems = [];
};

function _LoadItemsPending(playlistid) {
    _dataStore.pending = true;
    _dataStore.error = null;
    _dataStore.playlistid = playlistid;     // Optimistic update.
    _dataStore.playlistitems = [];
};

/********************* PlaylistItemsStore public methods: *********************/

// Extend ProductStore with EventEmitter to add eventing capabilities
var PlaylistItemsStore = Objectassign({}, EventEmitter.prototype, {

    // Return Product data
    getStoredata: function() {
        return _dataStore;
    },
    getPlaylistItem: function(id) {
        let found = _dataStore.playlistitems.filter((item)=>{ return item.id == id; });
        if (found.length===1) { return found[0]; }
        console.warn('testGetPlaylistItem() couldnt find item '+id);
        return null;
    },
    getPlaylistItemsCount: function() {
        return _dataStore.playlistitems.length;
        // But when its a keyed array use this instead:
        //return Object.keys(this._dataStore.playlistitems).length;
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

    switch(action.actionType) {
        case FluxCartConstants.LOAD_PLAYLISTITEMS:
            _LoadItemsPending(action.playlistid);
            QWolkCore.loadPlaylist(action.projectid, action.playlistid);
            break;
        case FluxCartConstants.LOAD_PLAYLISTITEMS_SUCCESS:
            _LoadItemsSuccess(action.data);
            break;
        case FluxCartConstants.LOAD_PLAYLISTITEMS_FAIL:
            _LoadItemsFail(action.error);
            break;
        case FluxCartConstants.TEST_GETPLAYLISTITEM:
            // test just to output PlaylistItemsStore.getPlaylistItem() to console
            console.log(PlaylistItemsStore.getPlaylistItem(action.id));
            break;
        default:
            return true;
    }

    // If action was responded to, emit change event
    PlaylistItemsStore.emitChange();

    return true;
});

module.exports = PlaylistItemsStore;