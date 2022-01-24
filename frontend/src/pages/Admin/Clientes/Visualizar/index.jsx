import React from "react";
import { IoMdClose } from 'react-icons/io';
const VisualizarCliente = ({ onClose = () => { }, cliente }) => {
  return (
    <div className="modal" >
      <div>
        <h3 className="gradient-text text-center mb-2">Dados do Cliente</h3>
        <div className="close">
          <button onClick={onClose}><IoMdClose size={32} color="red" /></button>
        </div>
        <div className="details-card flex-col gap-2">
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Nome:</span>
            <strong>{cliente?.nome}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Nuit:</span>
            <strong>{cliente?.nuit}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">BI:</span>
            <strong>{cliente?.bi}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Email:</span>
            <strong>{cliente?.email}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Telefone:</span>
            <strong>{cliente?.telefone}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Endereço:</span>
            <strong>{cliente?.endereco}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">tipo:</span>
            <strong>{cliente?.tipo}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VisualizarCliente;
