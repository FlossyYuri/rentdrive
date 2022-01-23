import { useFormik } from "formik";
import React from "react";
import { IoMdClose } from 'react-icons/io';
import * as Yup from 'yup';
import TextInput from "../../../../components/input/TextInput";
import { useAuth } from "../../../../context";
import { APIKit } from "../../../../services/api";
import "./modal.css";
const Devolucao = ({ onClose = () => { }, fetchData, aluguer }) => {
  const { toast } = useAuth(useAuth)
  const formik = useFormik({
    initialValues: {
      dataDevolucao: new Date(),
      nota: "",
      multa: 0,
    },
    validationSchema: Yup.object({
      dataDevolucao: Yup.date().required('Required'),
      nota: Yup.string().required('Required'),
      multa: Yup.number().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      toast.promise(APIKit.put('/alugueres/' + aluguer?.id, values), {
        loading: 'Enviando!',
        success: 'Devolução realizada com sucesso!',
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
        <h3 className="gradient-text text-center mb-2">Cadastrar Devolução</h3>
        <div className="modal-content">
          <TextInput
            className="card mb-3 w-full"
            label="ID do Aluguer"
            placeholder="X"
            value={aluguer?.id}
            disabled
          />
          <TextInput
            className="card mb-3 w-full"
            name="dataDevolucao"
            label="Data de Devolução"
            placeholder="Data de Devolução"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dataDevolucao}
            defaultValue={formik.values.dataDevolucao}
            error={formik.touched.dataDevolucao && formik.errors.dataDevolucao}
          />
          <TextInput
            className="card mb-3 w-full"
            name="nota"
            label="Nota de Devolução (Opcional)"
            placeholder="Escreva aqui..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nota}
          />
          <TextInput
            className="card mb-3 w-full"
            name="multa"
            type="number"
            label="Valor de Multa (Opcional)"
            placeholder="0"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.multa}
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
export default Devolucao;
