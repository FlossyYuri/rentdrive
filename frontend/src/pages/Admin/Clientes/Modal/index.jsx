import { useFormik } from "formik";
import React from "react";
import { IoMdClose } from 'react-icons/io';
import * as Yup from 'yup';
import RadioButton from "../../../../components/input/RadioButton";
import TextInput from "../../../../components/input/TextInput";
import { tiposCliente } from "../../../../constants/dictionary";
import { useAuth } from "../../../../context";
import { APIKit } from "../../../../services/api";
import "./modal.css";
const CriarVendedor = ({ onClose = () => { }, fetchData }) => {
  const { toast } = useAuth(useAuth)
  const formik = useFormik({
    initialValues: {
      nome: '',
      bi: '',
      nuit: '',
      email: '',
      telefone: '',
      endereco: '',
      tipo: '',
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Required'),
      bi: Yup.string().required('Required'),
      nuit: Yup.string().required('Required'),
      email: Yup.string().required('Required'),
      telefone: Yup.string().required('Required'),
      endereco: Yup.string().required('Required'),
      tipo: Yup.string().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      values.ativo = true
      toast.promise(APIKit.post('/clientes', values), {
        loading: 'Enviando!',
        success: 'Cliente criado com sucesso!',
        error: 'Ups, ocorreu um erro!',
      });
      fetchData();
      resetForm();
      onClose();
    },
  });
  return (
    <div className="modal" >
      <form className="modal-container" onSubmit={formik.handleSubmit}>
        <div className="close">
          <button onClick={onClose}><IoMdClose size={32} color="red" /></button>
        </div>
        <h3 className="gradient-text text-center mb-2">Adicione Cliente</h3>
        <div className="modal-content">
          <TextInput
            className="card mb-3 w-full"
            name="nome"
            label="Nome Completo"
            placeholder="Nome Completo"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nome}
          />
          <TextInput
            className="card mb-3 w-full"
            name="bi"
            label="BI"
            placeholder="BI"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bi}
          />
          <TextInput
            className="card mb-3 w-full"
            name="nuit"
            label="NUIT"
            placeholder="NUIT"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nuit}
          />
          <TextInput
            className="card mb-3 w-full"
            name="email"
            label="Email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <TextInput
            className="card mb-3 w-full"
            name="telefone"
            label="Telefone"
            placeholder="Telefone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.telefone}
          />
          <TextInput
            className="card mb-3 w-full"
            name="endereco"
            label="Endereço"
            placeholder="Endereço"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.endereco}
          />
          <div className="card mb-3 w-full">
            <p className="mb-2">Tipo</p>
            <div className="flex flex-wrap gap-2">
              {tiposCliente.map((item) => (<RadioButton key={item.value} selected={formik.values?.tipo} name="tipo" label={item.label} value={item.value}
                onChange={formik.handleChange} />))}
            </div>
          </div>
          <div className="flex w-full">
            <button type="submit" className="action-button w-full pv-4" to="/admin">
              <span>Cadastrar</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CriarVendedor;
