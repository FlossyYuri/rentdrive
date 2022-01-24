import { useFormik } from "formik";
import React from "react";
import { IoMdClose } from 'react-icons/io';
import * as Yup from 'yup';
import TextInput from "../../../components/input/TextInput";
import { useAuth } from "../../../context";
import { APIKit } from "../../../services/api";
const EditarFuncionario = ({ onClose = () => { }, fetchData, item }) => {
  const { toast } = useAuth(useAuth)
  const formik = useFormik({
    initialValues: {
      salario: item?.salario,
      telefone: item?.telefone,
      endereco: item?.endereco
    },
    validationSchema: Yup.object({
      telefone: Yup.string().required('Required'),
      endereco: Yup.string().required('Required'),
      salario: Yup.string().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      toast.promise(APIKit.put('/funcionarios/' + item.id, values), {
        loading: 'Enviando!',
        success: 'Funcionário atualizado com sucesso!',
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
        <h3 className="gradient-text text-center mb-2">Atualizar {item?.nome}</h3>
        <div className="modal-content">
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
          <div className="flex w-full">
            <button type="submit" className="action-button w-full pv-4" to="/admin">
              <span>Atualizar</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditarFuncionario;
