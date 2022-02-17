import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { IoMdClose } from 'react-icons/io';
import * as Yup from 'yup';
import Checkbox from "../../../../components/input/Checkbox";
import SelectInput from "../../../../components/input/SelectInput";
import TextInput from "../../../../components/input/TextInput";
import { PRICES } from "../../../../constants";
import { useAuth } from "../../../../context";
import { APIKit } from "../../../../services/api";
import "./modal.css";
const CriarAlguer = ({ onClose = () => { }, fetchData }) => {
  const { toast } = useAuth(useAuth)
  const [viatura, setViatura] = useState(null)
  const formik = useFormik({
    initialValues: {
      dataEntrega: new Date(),
      dataPrevistaDevolucao: (new Date()).setDate(new Date().getDate() + 1),
      valorTotal: 0,
      combustivel: false,
      motorista: false,
    },
    validationSchema: Yup.object({
      viaturaId: Yup.number().required('Required'),
      clienteId: Yup.number().required('Required'),
      dataEntrega: Yup.date().required('Required'),
      dataPrevistaDevolucao: Yup.date().required('Required'),
      combustivel: Yup.boolean().required('Required'),
      motorista: Yup.boolean().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      values.usuarioId = 1
      toast.promise(APIKit.post('/alugueres', values), {
        loading: 'Enviando!',
        success: 'Aluguer cadastrado com sucesso!',
        error: 'Ups, ocorreu um erro!',
      });
      fetchData();
      resetForm();
      onClose();
    },
  });

  const calcularAluguer = () => {
    let precoTotal = viatura?.precoDia;
    const diffTime = Math.abs(new Date(formik.values.dataPrevistaDevolucao) - new Date(formik.values.dataEntrega));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (formik.values.motorista) precoTotal += PRICES.MOTORISTA;
    if (formik.values.combustivel) precoTotal += PRICES.COMBUSTIVEL;
    formik.setFieldValue('valorTotal', precoTotal * diffDays)
  }

  useEffect(() => {
    calcularAluguer()
  }, [formik.values.dataEntrega, formik.values.dataPrevistaDevolucao, formik.values.viaturaId, formik.values.combustivel, formik.values.motorista,])

  return (
    <div className="modal" >
      <form className="modal-container" onSubmit={formik.handleSubmit}>
        <div className="close">
          <button onClick={onClose}><IoMdClose size={32} color="red" /></button>
        </div>
        <h3 className="gradient-text text-center mb-2">Cadastrar Aluguer</h3>
        <div className="modal-content">
          <SelectInput
            className="mb-3 w-full"
            label="Selecione o Cliente"
            placeholder="Cliente"
            error={true}
            helperText=""
            setFieldValue={formik.setFieldValue}
            name="clienteId"
            fetchData={{ url: '/clientes', labelField: 'nome', valueField: 'id' }}
          />
          <SelectInput
            className="mb-3 w-full"
            label="Selecione a Viatura"
            placeholder="Viatura"
            error={true}
            helperText=""
            setFieldValue={formik.setFieldValue}
            name="viaturaId"
            fetchData={{ url: '/viaturas', labelField: 'marca', valueField: 'id' }}
            inputEvent={(item) => setViatura(item)}
          />
          <TextInput
            className="card mb-3 w-full"
            name="dataEntrega"
            label="Data de Entrega"
            placeholder="Data de Entrega"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dataEntrega}
            defaultValue={formik.values.dataEntrega}
            error={formik.touched.dataEntrega && formik.errors.dataEntrega}
          />
          <TextInput
            className="card mb-3 w-full"
            name="dataPrevistaDevolucao"
            label="Data Prevista de Devolução"
            placeholder="Data Prevista de Devolução"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dataPrevistaDevolucao}
            defaultValue={formik.values.dataPrevistaDevolucao}
            error={formik.touched.dataPrevistaDevolucao && formik.errors.dataPrevistaDevolucao}
          />
          <div className="card mb-3 w-full">
            <p className="mb-2">Opções Adicionais (Marque para confirmar)</p>
            <div className="flex flex-wrap gap-2">
              <Checkbox label="Com Combustível?" name="combustivel" onChange={formik.handleChange} />
            </div>
            <div className="flex flex-wrap gap-2">
              <Checkbox label="Com Motorista?" name="motorista" onChange={formik.handleChange} />
            </div>
          </div>
          <TextInput
            className="card mb-3 w-full"
            name="valorTotal"
            type="number"
            label="Valor a Pagar"
            placeholder="Valor a Pagar"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.valorTotal}
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
export default CriarAlguer;
