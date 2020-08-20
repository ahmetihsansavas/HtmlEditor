import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../styles.css';

 class MentionEkleme extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        editorState: PropTypes.object,
      };
    mentionekle = () =>{
        const { editorState, onChange } = this.props;
        const contentState = Modifier.replaceText(
          editorState.getCurrentContent(),
          editorState.getSelection(),
          '@',
          editorState.getCurrentInlineStyle(),
        );
        onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    }

    render() {
        return (
            <div className="MentionEkle" onClick={this.mentionekle}>@</div>
        )
    }
}
export default MentionEkleme;