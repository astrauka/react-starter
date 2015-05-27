var React = require('react');
var PlaylistItemsStore = require('../dibkiss-playlistitemsstore');
var PlaylistItems = require('../components/DibkissPlaylistItems');

// Method to retrieve state from Stores
function getPlaylistState() {
    return {
        playlistid: PlaylistItemsStore.getPlaylistID(),
        playlistitems: PlaylistItemsStore.getPlaylistItems()
    };
}

// Define main Controller View
var DibkissPlaylistPage = React.createClass({

    // Get initial state from stores
    getInitialState: function() {
        return getPlaylistState();
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
                <h1>Playlist items:</h1>
                <PlaylistItems playlistid={this.state.playlistid} playlistitems={this.state.playlistitems} />
                {/*
                <h1>Playlist schedules:</h1>
                */}
            </div>
        );
    },

    // Method to setState based upon Store changes
    _onChange: function() {
        this.setState(getPlaylistState());
    }

});

module.exports = DibkissPlaylistPage;