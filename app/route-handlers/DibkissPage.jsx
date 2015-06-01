var React = require('react');
import DibkissPlaylistPage from "containers/DibkissPlaylistPage";

var MultipleControllerViewTest = React.createClass({
    render: function () {
        return <div>
            <hr />
            <h1>Controller View One</h1>
            <DibkissPlaylistPage />

            {/* this demonstrates multiple (completely seperate) controller views using the same store instance, and data */}

            <hr />
            <h1>Controller View Two</h1>
            <DibkissPlaylistPage />
        </div>;
    }
});

export default MultipleControllerViewTest;
