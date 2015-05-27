var React = require('react');
var FluxCartActions = require('../dibkiss-actions');
var PlaylistListItem = require('./PlaylistListItem');

// Flux product view
var DibkissPlaylistItems = React.createClass({
    render: function() {
        var { playlistid, playlistitems } = this.props;

        // Create JSX rows
        var rows = [];
        playlistitems.map(function(item, i) {
            rows.push(<PlaylistListItem i={i+1} playlist={playlistid} item={item} key={item.id} onEditItem={this.onEditItem} onRemoveItem={this.onRemoveItem} />);
        }.bind(this));
        if (rows.length===0) {
            rows.push(<tr key={-1}><td>Nothing to display.</td></tr>);
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