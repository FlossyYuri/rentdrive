import { useFormik } from "formik";
import React from "react";
import { IoMdClose } from 'react-icons/io';
import * as Yup from 'yup';
import Checkbox from "../../../../components/input/Checkbox";
import RadioButton from "../../../../components/input/RadioButton";
import TextInput from "../../../../components/input/TextInput";
import { tiposCambio, tiposCliente } from "../../../../constants/dictionary";
import { useAuth } from "../../../../context";
import { APIKit } from "../../../../services/api";
import "./modal.css";
const CriarVendedor = ({ onClose = () => { }, fetchData }) => {
  const { toast } = useAuth(useAuth)
  const formik = useFormik({
    initialValues: {
      matricula: '',
      marca: '',
      modelo: '',
      ano: '',
      precoDia: '',
      cambio: '',
      disponivel: '',
    },
    validationSchema: Yup.object({
      validadeSeguro: Yup.date().required('Required'),
      validadeInspencao: Yup.date().required('Required'),
      matricula: Yup.string().required('Required'),
      marca: Yup.string().required('Required'),
      modelo: Yup.string().required('Required'),
      ano: Yup.number().required('Required'),
      precoDia: Yup.number().required('Required'),
      cambio: Yup.string().required('Required'),
      disponivel: Yup.string().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      toast.promise(APIKit.post('/viaturas', values), {
        loading: 'Enviando!',
        success: 'Viatura criado com sucesso!',
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
        <h3 className="gradient-text text-center mb-2">Adicione Viatura</h3>
        <div className="modal-content">
          <TextInput
            className="card mb-3 w-full"
            name="marca"
            label="Marca"
            placeholder="Marca"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.marca}
          />
          <TextInput
            className="card mb-3 w-full"
            name="modelo"
            label="Modelo"
            placeholder="Modelo"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.modelo}
          />
          <TextInput
            className="card mb-3 w-full"
            name="ano"
            label="Ano"
            placeholder="Ano"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ano}
          />
          <TextInput
            className="card mb-3 w-full"
            name="matricula"
            label="Matricula"
            placeholder="Matricula"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.matricula}
          />
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
            <p className="mb-2">Cambio</p>
            <div className="flex flex-wrap gap-2">
              {tiposCambio.map((item) => (<RadioButton key={item.value} selected={formik.values?.cambio} name="cambio" label={item.label} value={item.value}
                onChange={formik.handleChange} />))}
            </div>
          </div>

          <TextInput
            className="card mb-3 w-full"
            name="validadeSeguro"
            label="Validade do Seguro"
            placeholder="Validade do Seguro"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.validadeSeguro}
            error={formik.touched.validadeSeguro && formik.errors.validadeSeguro}
          />

          <TextInput
            className="card mb-3 w-full"
            name="validadeInspencao"
            label="Validade da Inspeção"
            placeholder="Validade da Inspeção"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.validadeInspencao}
            error={formik.touched.validadeInspencao && formik.errors.validadeInspencao}
          />
          <div className="card mb-3 w-full">
            <p className="mb-2">Disponibilidade</p>
            <div className="flex flex-wrap gap-2">
              <Checkbox label="Está Disponível?" name="disponivel" onChange={formik.handleChange} />
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
