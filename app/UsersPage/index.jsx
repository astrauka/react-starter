"use strict"

var React = require("react");
var UserList = require("./UserList.jsx");

var UsersPage = React.createClass({
	render: function() {
		var users = [{
			username: "testkees",
			fullname: "Test Kees",
			email: "testkees@example.com"
		}, {
			username: "anban1984",
			fullname: "Anna Banana",
			email: "annabanana@example.com"
		}, {
			username: "xavlee",
			fullname: "Xavier Lee",
			email: "xavierlee@example.com"
		}];

		return(
			<div>
				<h2>UsersPage</h2>
				<UserList users={users} />
			</div>
		);
	}
});

module.exports = UsersPage;
