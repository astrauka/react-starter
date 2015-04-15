"use strict"

var React = require('react');
var UserItem = require('./UserItem.jsx');

var UserList = React.createClass({
    render: function() {
        var users = this.props.users;
        var userCount = users.length;

        // Create JSX rows
        var rows = [];
        users.forEach(function(user) {
            rows.push(<UserItem user={user} key={user.username} />);
        });
        if (rows.length===0) {
            rows.push(<tr key={-1}><td colSpan='3'>Nothing to display.</td></tr>);
        }

        // Content JSX > HTML
        return(
            <div>
                <p>Showing {userCount} users:</p>
                <table>
                    <thead><tr><th>Username</th><th>Full name</th><th>e-Mail address</th></tr></thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
});

module.exports = UserList;