var React = require("react");

var PlaylistListItem = React.createClass({
    render: function() {
        let { i, item } = this.props;
        return(
            <tr>
                <td>{i}</td>
                <td>{item.id}</td>
                <td>{item.text}</td>
                <td>{item.type}</td>
                <td>{item.durationsec}</td>
            </tr>
        );
    }
});

module.exports = PlaylistListItem;
