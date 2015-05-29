var React = require('react');
var FluxCartActions = require('../dibkiss-actions');
var PlaylistListItem = require('./PlaylistListItem');

// Flux product view
var DibkissPlaylistItems = React.createClass({
    render: function() {
        var { pending, error, playlistid, playlistitems } = this.props.storedata;

        // Create JSX rows
        var rows = [];
        playlistitems.map(function(item, i) {
            rows.push(<PlaylistListItem i={i+1} playlist={playlistid} item={item} key={item.id} onEditItem={this.onEditItem} onRemoveItem={this.onRemoveItem} />);
        }.bind(this));
        if (pending) {
            rows.push(<tr key={-2}><td colSpan="5">Pending..</td></tr>);
        }
        if (error) {
            rows.push(<tr key={-3}><td colSpan="5">Error: {error.message}</td></tr>);
        }
        if (rows.length===0) {
            rows.push(<tr key={-1}><td colSpan="5">Nothing to display.</td></tr>);
        }

        return (
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Item</th>
                    <th>Type</th>
                    <th>Duration in seconds</th>
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    },

});

module.exports = DibkissPlaylistItems;