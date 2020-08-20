import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../styles.css'

class CustomOption extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  addStar = ()=> {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '⭐',
      editorState.getCurrentInlineStyle(),
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
  };

  render() {
    return (
      <div className="AddStar" onClick={this.addStar}>⭐</div>
    );
  }
}

export default CustomOption;