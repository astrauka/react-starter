import React from "react";

export default class SomePage extends React.Component {
	static getProps() {
		return {};
	}

	static getInitialState() {
		console.log("SomePage.getInitialState() called");
		return {demo: "Hello #77"}
	}

	componentDidMount() {
		console.log("SomePage.componentDidMount() called");
	}

	render() {
		console.log("SomePage.render() called, and this.state is");
		console.log(this.state);

		return <div>
			<h2>SomePage</h2>
			<p>This is just some page... (loaded on demand)</p>
		</div>;
	}
}
