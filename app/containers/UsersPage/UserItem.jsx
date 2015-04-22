"use strict"

var React = require('react');

var UserItem = React.createClass({
    render: function() {
        var user = this.props.user;

        // Content JSX > HTML
        return(
            <tr>
                <td>{user.username}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
            </tr>
        );
    }
});

module.exports = UserItem;