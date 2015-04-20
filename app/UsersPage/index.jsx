"use strict"

var React = require("react");
var UserList = require("./UserList.jsx");
import FluxComponent from 'flummox/component';

var UsersPage = React.createClass({

	componentDidMount: function() {
		var flux = this.props.flux;
		console.log('found flux in userspage?:');
		console.log(flux);
	},

	render: function() {
		return(
			<div>
				<h2>UsersPage</h2>
				<FluxComponent connectToStores={{
				    // Get store 'users' and pass on array of users.
				    // (as array just as an intermediate test, there are other ways to expose store data!)
					'users': store => ({ usersArray: store.state.users })
				}}>
					<UserList />
				</FluxComponent>
			</div>
		);
	}
});

module.exports = UsersPage;
