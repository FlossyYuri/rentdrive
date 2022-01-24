import { useFormik } from "formik";
import React from "react";
import { IoMdClose } from 'react-icons/io';
import * as Yup from 'yup';
import Checkbox from "../../../components/input/Checkbox";
import TextInput from "../../../components/input/TextInput";
import { useAuth } from "../../../context";
import { APIKit } from "../../../services/api";
const EditarViatura = ({ onClose = () => { }, fetchData, item }) => {
  const { toast } = useAuth(useAuth)
  const formik = useFormik({
    initialValues: {
      precoDia: item.precoDia,
      disponivel: item.disponivel,
    },
    validationSchema: Yup.object({
      precoDia: Yup.number().required('Required'),
      disponivel: Yup.string().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      toast.promise(APIKit.put('/viaturas/' + item.id, values), {
        loading: 'Enviando!',
        success: 'Viatura atualizada com sucesso!',
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
        <h3 className="gradient-text text-center mb-2">Atualizar {item?.marca} - {item?.modelo}</h3>
        <div className="modal-content">
          <TextInput
            className="card mb-3 w-full"
            name="precoDia"
            label="Preço Diário"
            placeholder="Preço Diário"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.precoDia}
          />
          <div className="card mb-3 w-full">
            <p className="mb-2">Disponibilidade</p>
            <div className="flex flex-wrap gap-2">
              <Checkbox label="Está Disponível?" value={formik.values.disponivel} name="disponivel" onChange={formik.handleChange} />
            </div>
          </div>
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
export default EditarViatura;
