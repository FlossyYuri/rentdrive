import React from "react";
import { IoMdClose } from 'react-icons/io';
const VisualizarFuncionario = ({ onClose = () => { }, funcionario }) => {
  return (
    <div className="modal" >
      <div>
        <h3 className="gradient-text text-center mb-2">Dados do Funcionário</h3>
        <div className="close">
          <button onClick={onClose}><IoMdClose size={32} color="red" /></button>
        </div>
        <div className="details-card flex-col gap-2">
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Nome:</span>
            <strong>{funcionario.nome}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">BI:</span>
            <strong>{funcionario.bi}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Data de Nascimento:</span>
            <strong>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }).format(new Date(funcionario.dataNascimento))}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Sexo:</span>
            <strong>{funcionario.sexo}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Telefone:</span>
            <strong>{funcionario.telefone}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Endereço:</span>
            <strong>{funcionario.endereco}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Função:</span>
            <strong>{funcionario.funcao}</strong>
          </div>
          <div className="flex flex-wrap items-center">
            <span className="extended-w-1">Salário:</span>
            <strong>{funcionario.salario}</strong>
          </div>
          <div href={`tel:$-`} className="flex flex-wrap items-center">
            <span className="extended-w-1">Nome do Banco:</span>
            <strong>{funcionario.nomeBanco}</strong>
          </div>
          <div href={`mailto:`} className="flex flex-wrap items-center">
            <span className="extended-w-1">Numero de conta:</span>
            <strong>{funcionario.numeroConta}</strong>
          </div>
          <div target="_blank" href="phone" className="flex flex-wrap items-center" rel="noreferrer">
            <span className="extended-w-1">NIB:</span>
            <strong>{funcionario.nib}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VisualizarFuncionario;
