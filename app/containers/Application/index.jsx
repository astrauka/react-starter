import React from "react";
import { RouteHandler } from "react-router";
import MainMenu from "components/MainMenu";
import { Todo as TodoActions } from "actions";

import styles from "./style.css";

export default class Application extends React.Component {
	static getProps(stores, params) {
		var transition = stores.Router.getItem("transition");
		return {
			loading: !!transition
		};
	}
	componentDidMount: function() {
		var flux = this.props.flux;
		console.log('found flux in app?:');
		console.log(flux);
	}
	render() {
		var flux = this.props.flux;
		
		var { loading } = this.props;
		return <div className={styles.this + (loading ? " " + styles.loading : "")}>
			<div className={styles.loadingElement}>loading...</div>
			<h1>react-starter</h1>
			<MainMenu />
			<button onClick={this.update}>Update todolist data</button>
			<FluxComponent flux={flux}>
				<RouteHandler />
			</FluxComponent>
		</div>;
	}
	update() {
		TodoActions.update();
	}
}

Application.contextTypes = {
	stores: React.PropTypes.object
};
