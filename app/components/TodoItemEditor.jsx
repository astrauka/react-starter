import React from "react";

export default class TodoItemEditor extends React.Component {
	render() {
		var { text, done, memo, onUpdate } = this.props;
		return <span>
			<input type="checkbox" checked={done} onChange={(event) => {
				onUpdate({
					done: event.target.checked
				});
			}} />
			<input type="text" value={text} onChange={(event) => {
				onUpdate({
					text: event.target.value
				});
			}} />
			<br />
			<textarea type="text" value={memo} onChange={(event) => {
				onUpdate({
					memo: event.target.value
				});
			}} />
		</span>;
	}
}
TodoItemEditor.propTypes = {
	text: React.PropTypes.string.isRequired,
	memo: React.PropTypes.string.isRequired,
	done: React.PropTypes.bool.isRequired,
	onUpdate: React.PropTypes.func.isRequired
};
