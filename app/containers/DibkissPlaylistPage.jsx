var React = require('react');
var PlaylistItemsStore = require('../dibkiss-playlistitemsstore');
var PlaylistItems = require('../components/DibkissPlaylistItems');
var DibkissActions = require('../dibkiss-actions');

// Method to retrieve state from Stores
function getPlaylistState() {
    return PlaylistItemsStore.getStoredata();
}

// Define main Controller View
var DibkissPlaylistPage = React.createClass({

    // Get initial state from stores
    getInitialState: function() {
        return {
            playlistid: getPlaylistState().playlistid, // temporary
            dataItems: getPlaylistState()
        }
    },

    // Add change listeners to stores
    componentDidMount: function() {
        PlaylistItemsStore.addChangeListener(this._onChange);
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
        PlaylistItemsStore.removeChangeListener(this._onChange);
    },

    // Render our child components, passing state via props
    render: function() {
        return (
            <div>
                <h1>Playlist {this.state.playlistid} items:</h1>
                <PlaylistItems storedata={this.state.dataItems} />
                {/*
                <h1>Playlist schedules:</h1>
                */}
                <button type="button" onClick={this._loadPlaylist2} disabled={this.state.playlistid==2}>load playlist 2</button>
                <button type="button" onClick={this._loadPlaylist3} disabled={this.state.playlistid==3}>load playlist 3</button>
                <button type="button" onClick={this._loadPlaylist6} disabled={this.state.playlistid==6}>load playlist 6</button>
                <button type="button" onClick={this._loadPlaylist9} disabled={this.state.playlistid==9}>load playlist 9</button>
            </div>
        );
    },

    // Method to setState based upon Store changes
    _onChange: function() {
        this.setState(getPlaylistState());
    },

    _loadPlaylist2: function() {
        DibkissActions.loadPlaylistItems(1,2);
    },
    _loadPlaylist3: function() {
        DibkissActions.loadPlaylistItems(1,3);
    },
    _loadPlaylist6: function() {
        DibkissActions.loadPlaylistItems(1,6);
    },
    _loadPlaylist9: function() {
        DibkissActions.loadPlaylistItems(1,9);
    }

});

module.exports = DibkissPlaylistPage;