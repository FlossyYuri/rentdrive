import React, { useState } from "react";
import UploadFile from "../../assets/images/upload.png";
import "../style/fileinput.css";

const FileInput = ({ name, label, placeholder, initial, inputEvent, value, isImage, ...rest }) => {
  const [file, setFile] = useState(null)
  const changeDocument = (event) => {
    const ficheiro = event.target.files[0]
    inputEvent(ficheiro)
    setFile(window.URL.createObjectURL(ficheiro))
  }
  const filename = initial?.substring(initial?.lastIndexOf('/') + 1);
  return (
    <label className="file-input flex-col items-center">
      {isImage && <img src={file || initial || UploadFile} alt="Logo" />}
      <input name={name} type="file" onChange={changeDocument} placeholder="Digite a Resposta" {...rest} />
      <p className="mt-1">{!file ? 'Selecione a imagem' : filename}</p>
    </label>
  );
};
export default FileInput;
