import { useFormik } from "formik";
import React from "react";
import { IoMdClose } from 'react-icons/io';
import * as Yup from 'yup';
import TextInput from "../../../components/input/TextInput";
import { useAuth } from "../../../context";
import { APIKit } from "../../../services/api";
const EditarUsuario = ({ onClose = () => { }, fetchData, item }) => {
  const { toast } = useAuth(useAuth)
  const formik = useFormik({
    initialValues: {
      senha: item?.senha,
    },
    validationSchema: Yup.object({
      senha: Yup.string().min(4).required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      toast.promise(APIKit.put('/usuarios/' + item.id, values), {
        loading: 'Enviando!',
        success: 'Senha atualizada com sucesso!',
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
        <h3 className="gradient-text text-center mb-2">Atualizar Senha de {item?.nome}</h3>
        <div className="modal-content">
          <TextInput
            name="senha"
            label="Senha"
            className="w-full mb-2"
            type="password"
            placeholder="Digite a sua senha"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.senha}
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
export default EditarUsuario;
