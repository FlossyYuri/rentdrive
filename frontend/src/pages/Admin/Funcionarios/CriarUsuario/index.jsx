import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup'; import { IoMdClose } from 'react-icons/io';
import RadioButton from "../../../../components/input/RadioButton";
import TextInput from "../../../../components/input/TextInput";
import { APIKit } from "../../../../services/api";
import { useAuth } from "../../../../context";
import "./modal.css";
import { funcoesUsuario } from "../../../../constants/dictionary";
const CriarUsuario = ({ onClose = () => { }, fetchData, funcionario }) => {
  const { toast } = useAuth(useAuth)
  const formik = useFormik({
    initialValues: {
      funcionarioId: funcionario?.id,
      nome: '',
      tipo: '',
      senha: ''
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Required'),
      tipo: Yup.string().required('Required'),
      senha: Yup.string().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      values.ativo = true
      toast.promise(APIKit.post('/usuarios', values), {
        loading: 'Enviando!',
        success: 'Usuário criado com sucesso!',
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
        <h3 className="gradient-text text-center mb-2">Criar Usuário</h3>
        <div className="modal-content">
          <TextInput
            className="card mb-3 w-full"
            label="Funcionario"
            placeholder="Funcionario"
            value={funcionario?.nome}
            disabled
          />
          <TextInput
            className="card mb-3 w-full"
            name="nome"
            label="Nome de Usuário"
            placeholder="Nome de Usuário"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nome}
          />
          <TextInput
            className="card mb-3 w-full"
            type="password"
            name="senha"
            label="Senha"
            placeholder="Senha"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.senha}
          />
          <div className="card mb-3 w-full">
            <p className="mb-2">Função</p>
            <div className="flex flex-wrap gap-2">
              {funcoesUsuario.map((item) => (<RadioButton key={item.value} selected={formik.values?.tipo} name="tipo" label={item.label} value={item.value}
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
export default CriarUsuario;
