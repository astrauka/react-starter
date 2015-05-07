import React from "react";

export default class NewTodoItemEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			memo: ""
		};
	}
	render() {
		var { onAdd } = this.props;
		var { text, memo } = this.state;
		return <div>
			<input type="text" value={text} onChange={(event) => {
				this.setState({
					text: event.target.value
				});
			}} />
			<textarea type="text" value={memo} onChange={(event) => {
				this.setState({
					memo: event.target.value
				});
			}} />
			<button onClick={() => {
				if(onAdd({
					done: false,
					text: text,
					memo: memo
				}))
					this.setState({text: "", memo: ""});
			}}>Add</button>
		</div>;
	}
}
NewTodoItemEditor.propTypes = {
	onAdd: React.PropTypes.func.isRequired
};
