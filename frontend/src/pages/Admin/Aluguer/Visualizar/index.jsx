import React from "react";
import { IoMdClose } from 'react-icons/io';
const VisualizarAluguer = ({ onClose = () => { }, aluguer }) => {
  return (
    <div className="modal" >
      <div>
        <h3 className="gradient-text text-center mb-2">Dados do Aluguer</h3>
        <div className="close">
          <button onClick={onClose}><IoMdClose size={32} color="red" /></button>
        </div>
        <div className="details-card flex-col gap-2">
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Cliente:</span>
            <strong>{aluguer?.cliente.nome}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Viatura:</span>
            <strong>{`${aluguer?.viatura.marca} - ${aluguer?.viatura.modelo}`}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Com motorista?:</span>
            <strong>{aluguer?.motorista ? "Sim" : "Não"}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Com Combustível:</span>
            <strong>{aluguer?.combustivel ? "Sim" : "Não"}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Valor Pago:</span>
            <strong>{aluguer?.valorTotal}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Data de Entrega:</span>
            <strong>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }).format(new Date(aluguer?.dataEntrega))}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Data Prevista de Devolução:</span>
            <strong>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }).format(new Date(aluguer?.dataPrevistaDevolucao))}</strong>
          </div>
          {aluguer?.dataDevolucao ? <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Data Devolução:</span>
            <strong>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }).format(new Date(aluguer?.dataDevolucao))}</strong>
          </div> : null}

          {aluguer?.nota ? <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Nota de Devolução:</span>
            <strong>{aluguer?.nota}</strong>
          </div> : null}

          {aluguer?.multa ? <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Multa:</span>
            <strong>{aluguer?.multa}</strong>
          </div> : null}

        </div>
      </div>
    </div>
  );
};
export default VisualizarAluguer;
