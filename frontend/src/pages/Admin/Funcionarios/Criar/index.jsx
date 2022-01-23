import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup'; import { IoMdClose } from 'react-icons/io';
import RadioButton from "../../../../components/input/RadioButton";
import TextInput from "../../../../components/input/TextInput";
import { APIKit } from "../../../../services/api";
import { useAuth } from "../../../../context";
import "./modal.css";
import { funcoesUsuario, sexos } from "../../../../constants/dictionary";
const CriarFuncionario = ({ onClose = () => { }, fetchData }) => {
  const { toast } = useAuth(useAuth)
  const formik = useFormik({
    initialValues: {
      nome: '',
      bi: '',
      dataNascimento: '',
      sexo: '',
      telefone: '',
      endereco: '',
      funcao: '',
      salario: 0,
      nomeBanco: '',
      numeroConta: 0,
      nib: '',
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Required'),
      bi: Yup.string().min(13, "Tamanho Errado").max(13, "Tamanho Errado").required('Required'),
      dataNascimento: Yup.date().required('Required'),
      sexo: Yup.string().required('Required'),
      telefone: Yup.string().required('Required'),
      endereco: Yup.string().required('Required'),
      funcao: Yup.string().required('Required'),
      salario: Yup.string().required('Required'),
      nomeBanco: Yup.string().required('Required'),
      numeroConta: Yup.string().required('Required'),
      nib: Yup.string().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      values.ativo = true
      toast.promise(APIKit.post('/funcionarios', values), {
        loading: 'Enviando!',
        success: 'Funcionário criado com sucesso!',
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
        <h3 className="gradient-text text-center mb-2">Adicione Funcionário</h3>
        <div className="modal-content">
          <TextInput
            className="card mb-3 w-full"
            name="nome"
            label="Nome Completo"
            placeholder="Nome Completo"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nome}
            error={formik.touched.nome && formik.errors.nome}
          />
          <TextInput
            className="card mb-3 w-full"
            name="bi"
            label="BI"
            placeholder="BI"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bi}
            error={formik.touched.bi && formik.errors.bi}
          />
          <TextInput
            className="card mb-3 w-full"
            name="dataNascimento"
            label="Data de Nascimento"
            placeholder="Data de Nascimento"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dataNascimento}
            error={formik.touched.dataNascimento && formik.errors.dataNascimento}
          />
          <div className="card mb-3 w-full">
            <p className="mb-2">Sexo</p>
            <div className="flex flex-wrap gap-2">
              {sexos.map((item) => (<RadioButton key={item.value} selected={formik.values?.sexo} name="sexo" label={item.label} value={item.value}
                onChange={formik.handleChange} />))}
            </div>
          </div>
          <TextInput
            className="card mb-3 w-full"
            name="telefone"
            label="Telefone"
            placeholder="Telefone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.telefone}
            error={formik.touched.telefone && formik.errors.telefone}
          />
          <TextInput
            className="card mb-3 w-full"
            name="endereco"
            label="Endereço"
            placeholder="Endereço"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.endereco}
            error={formik.touched.endereco && formik.errors.endereco}
          />
          <div className="card mb-3 w-full">
            <p className="mb-2">Função</p>
            <div className="flex flex-wrap gap-2">
              {funcoesUsuario.map((item) => (<RadioButton key={item.value} selected={formik.values?.funcao} name="funcao" label={item.label} value={item.value}
                onChange={formik.handleChange} />))}
            </div>
          </div>
          <TextInput
            className="card mb-3 w-full"
            name="salario"
            type="number"
            label="Salário"
            placeholder="Salário"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.salario}
          />
          <TextInput
            className="card mb-3 w-full"
            name="nomeBanco"
            label="Nome do Banco"
            placeholder="Nome do Banco"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nomeBanco}
          />
          <TextInput
            className="card mb-3 w-full"
            name="numeroConta"
            label="Numero de Conta"
            placeholder="Numero de Conta"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.numeroConta}
          />
          <TextInput
            className="card mb-3 w-full"
            name="nib"
            label="NIB"
            placeholder="NIB"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nib}
          />
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
export default CriarFuncionario;
