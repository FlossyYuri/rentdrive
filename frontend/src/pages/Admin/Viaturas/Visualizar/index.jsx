import React from "react";
import { IoMdClose } from 'react-icons/io';
const VisualizarViatura = ({ onClose = () => { }, viatura }) => {
  return (
    <div className="modal" >
      <div>
        <h3 className="gradient-text text-center mb-2">Dados da Viatura</h3>
        <div className="close">
          <button onClick={onClose}><IoMdClose size={32} color="red" /></button>
        </div>
        <div className="details-card flex-col gap-2">
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Marca:</span>
            <strong>{viatura?.marca}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Modelo:</span>
            <strong>{viatura?.modelo}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Ano:</span>
            <strong>{viatura?.ano}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Matricula:</span>
            <strong>{viatura?.matricula}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Preço Diário:</span>
            <strong>{viatura?.precoDia}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Cambio:</span>
            <strong>{viatura?.cambio}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Disponibilidade:</span>
            <strong>{viatura?.disponivel ? 'Disponível' : 'Indisponível'}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Validade de Seguros:</span>
            <strong>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }).format(new Date(viatura?.validadeSeguro))}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Validade da Inspeção:</span>
            <strong>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }).format(new Date(viatura?.validadeInspencao))}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VisualizarViatura;
