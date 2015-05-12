import React from "react";

export default class SomePage extends React.Component {
	constructor(props) {
		super(props);
		console.log("SomePage.constructor() called");
		this.state = { foo: "bar" };
	}

	static getProps() {
		return {};
	}

	componentDidMount() {
		console.log("SomePage.componentDidMount() called");
		this.setState({dam: "bambam"});
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
