import React from 'react';
import Draft  from "draft-js";


const blockRenderMap = NestedUtils.DefaultBlockRenderMap
.merge(TableUtils.DefaultBlockRenderMap); 

class AddTable extends React.Component {

getInitialState() {
    return {
        editorState: Draft.EditorState.createEmpty()
    };
}

onChange(editorState) {
    this.setState({
        editorState: editorState
    });
}

handleKeyCommand(command) {
    var newState = (TableUtils.hanldeKeyCommand(editorState, command)
        || Draft.RichUtils.handleKeyCommand(editorState, command));

    if (newState) {
        this.onChange(newState);
        return true;
    }
    return false;
}

render() {
    return  <Draft.Editor
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        blockRenderMap={blockRenderMap}
        onChange={this.onChange}
    />;
}
};
export default AddTable;