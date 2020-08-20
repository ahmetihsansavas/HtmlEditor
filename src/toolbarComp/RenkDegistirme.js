import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import reactCSS from 'reactcss'
import { Editor } from 'react-draft-wysiwyg';
import '../styles.css';
import { SketchPicker } from 'react-color';

 class RenkDegistirme extends Component {
    state = {
        displayColorPicker: false,
        color: {
          r: '241',
          g: '112',
          b: '19',
          a: '1',
        },
      };
    
      handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
      };
    
      handleClose = () => {
        this.setState({ displayColorPicker: false })
      };
    
      handleChange = (color) => {
        this.setState({ color: color.rgb })
      };
    

    render() {
        var item = document.getElementsByClassName("rdw-editor-toolbar")[0] ;
        //console.log(ReactDOM.findDOMNode("rdw-editor-toolbar").style)
        const styles = reactCSS({
            'default': {
              color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, 
                  ${ this.state.color.b }, ${ this.state.color.a })`,
              },
              swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
              },
              popover: {
                position: 'absolute',
                zIndex: '2',
              },
              cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              },
            },
          });
        return (
            <div id="renkdegistirme">
            <div id ="renkdegistirme" style={ styles.swatch } onClick={ this.handleClick }>
              <div style={ styles.color } />
            </div>
            { this.state.displayColorPicker ? <div style={ styles.popover }>
              <div  style={ styles.cover } onClick={ this.handleClose }/>
              <SketchPicker  id="renkdegistirme" style = {{background :this.state.color }} 
              color={ this.state.color } onChange={ this.handleChange } />
            </div> : null }
    
          </div>
        )
    }
}
export default RenkDegistirme;