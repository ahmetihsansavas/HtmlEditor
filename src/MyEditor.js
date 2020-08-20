import React , {useRef}from 'react';
import ReactDOM from 'react-dom';
import {EditorState,convertToRaw,ContentState} from 'draft-js';
//import 'draft-js/dist/Draft.css';
import './styles.css'
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CanvasDraw from "react-canvas-draw";
import CustomOption from "./toolbarComp/CustomOption";
import KareEkleme from './toolbarComp/KareEkleme';
import MentionEkleme from "./toolbarComp/MentionEkleme";
import createBlockDndPlugin , {imagePlugin,IMAGE_BLOCK_TYPE_SEPARATOR,IMAGE_BLOCK_TYPE_PURE} from 'draft-js-drag-n-drop-plugin';
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
import draftToMarkdown from 'draftjs-to-markdown';
import embed from 'embed-video';
import RenkDegistirme from './toolbarComp/RenkDegistirme';

const blockDndPlugin = createBlockDndPlugin();
const droppableBlockDndPlugin = {
  ...blockDndPlugin,
  handleDrop: (
    selection,
    dataTransfer,
    isInternal,
    {getEditorState, setEditorState}
  ) => {
    const editorState = getEditorState();
    const raw = dataTransfer.data.getData('text');
    const data = raw ? raw.split(IMAGE_BLOCK_TYPE_SEPARATOR) : [];
    if (data.length > 1 && data[0] === IMAGE_BLOCK_TYPE_PURE) {
      const url = data[1];
      if (url) {
        const newState = imagePlugin.addImage(EditorState.forceSelection(editorState, selection), url);
        setEditorState(newState);
      }
    }

    return blockDndPlugin.handleDrop(selection, dataTransfer, isInternal, {
      getEditorState,
      setEditorState
    });
  }
};

function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    }
  );
}


class MyEditor extends React.Component {
  constructor(props){
    super(props);

  }
  state = {
    editorState: EditorState.createEmpty(),
  }
  
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
   onClear = ()=> {
  const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
  this.setState({ editorState });
  }
   refreshPage(){ 
    alert("Editörü sıfırlamak istediğinize emin misiniz?");
    window.location.reload(); 
}
  saveFile(){
    //draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
    const { editorState } = this.state;
    const element = document.createElement("a");
    const file = new Blob([draftToMarkdown(convertToRaw(editorState.getCurrentContent()))], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); 
    element.click();
  }
 colorchange(){
   let color = ReactDOM.findDOMNode().getElementsByClassName("rdw-editor-wrapper")
   console.log(color)
 }

  render() {
  
    const { editorState } = this.state;
      //console.log("Editor state",this.state.editorState);
      //console.log(()=>draftToHtml(convertToRaw(editorState.getCurrentContent())) );
    
    return (
      <div>  
      <Editor placeholder="Başlamak için..."
              editorState={editorState}
              onEditorStateChange={this.onEditorStateChange}
              plugins = {[droppableBlockDndPlugin]}
              mention={{
                separator: ' ',
                trigger: '@',
                suggestions: [
                  { text: 'FSMVU', value: 'fsmvu', url: 'fsmvu' },
                  { text: 'BLM', value: 'blm', url: 'blm' },
                  { text: 'BME', value: 'bme', url: 'bme' },
                  { text: 'Java', value: 'java', url: 'java' },
                  { text: 'React', value: 'react', url: 'react' },
                  { text: 'ReactEditor', value: 'reacteditor', url: 'reacteditor' },
                  { text: 'JavaScript', value: 'js', url: 'js' },
                  
                ],
              }}
              toolbar = {{image: { uploadCallback: uploadImageCallBack, 
                alt: { present: true, mandatory: false } },
                link: {
                  linkCallback: params => ({ ...params })
                },
                embedded: {
                  embedCallback: link => {
                    const detectedSrc = /<iframe.*? src="(.*?)"/.exec(embed(link));
                    return (detectedSrc && detectedSrc[1]) || link;
                  }
                },
                
              }}
              hashtag={{
                separator: ' ',
                trigger: '#',
              }}
              toolbarCustomButtons = {[<CustomOption/>,<KareEkleme/>,<MentionEkleme/>,<RenkDegistirme/>]}
              
      />
              
      <button id="clear" type="button" style={{top: "560px",
        position: "absolute",
        left: "890px"}} onClick={this.refreshPage }> <span>Temizle</span> </button>
        <button id="save" type="button" style={{top: "560px",
        position: "absolute",
        left: "950px"}} onClick={()=>{const element = document.createElement("a");
        const file = new Blob([draftToMarkdown(convertToRaw(editorState.getCurrentContent()))], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element); 
        element.click(); }}> <span>Kaydet</span> </button>
      <h2>JSON Formatı</h2>
      <textarea
      readOnly
      className="rdw-storybook-textarea"
      value={JSON.stringify(editorState, null, 4)}
      //value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
    />
    <h2>Html Formatı</h2>
    <textarea
    readOnly
    className="rdw-storybook-textarea"
    //value={JSON.stringify(editorState, null, 4)}
    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
  />
  <h2>Markdown</h2>
  <textarea
  readOnly
  className="rdw-storybook-textarea"
  value={draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}
/>
              {console.log("consol",document.getElementsByClassName("rdw-editor-toolbar"))}
             
    </div>
   
    );
  }
}

export default MyEditor;