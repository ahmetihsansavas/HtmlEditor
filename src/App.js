import React , {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import MyEditor from './MyEditor'
import {useDropzone} from 'react-dropzone'
var red = '#F4614C';
function App() {
  const [files,setFiles] = useState([]);
  const {getRootProps,getInputProps} = useDropzone({
    accept:"image/*",
    onDrop: (acceptedFiles) =>{
          setFiles(
            acceptedFiles.map((file)=> Object.assign(file,{
              preview : URL.createObjectURL(file)
            }))
          )
    }
  })
const images = files.map((file)=>(
  <div key={file.name}>
  <div>
    <img src={file.preview} style={{width:"300px"}} alt="preview" />
  </div> 
  </div>
))
  return (
    
    <div className="App">
    <h1>React Editor</h1>
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Buraya dosyaları sürükleyin...</p>
      <div>{images}</div>
     
    </div>
    
     <MyEditor />
     
    </div>
  );
}

export default App;
