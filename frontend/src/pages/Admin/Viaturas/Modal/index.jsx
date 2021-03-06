import { useFormik } from "formik";
import React, { useState } from "react";
import { IoMdClose } from 'react-icons/io';
import * as Yup from 'yup';
import Checkbox from "../../../../components/input/Checkbox";
import RadioButton from "../../../../components/input/RadioButton";
import FileInput from "../../../../components/input/FileInput";
import TextInput from "../../../../components/input/TextInput";
import { tiposCambio } from "../../../../constants/dictionary";
import { useAuth } from "../../../../context";
import { APIKit, uploadFile } from "../../../../services/api";
import "./modal.css";
const CriarVendedor = ({ onClose = () => { }, fetchData }) => {
  const { toast } = useAuth(useAuth)
  const [image, setImage] = useState()
  const changeImage = (file) => {
    setImage(file)
  }
  const formik = useFormik({
    initialValues: {
      matricula: '',
      marca: '',
      modelo: '',
      ano: '',
      precoDia: '',
      cambio: '',
      disponivel: false
    },
    validationSchema: Yup.object({
      validadeSeguro: Yup.date().required('Required'),
      validadeInspencao: Yup.date().required('Required'),
      matricula: Yup.string().required('Required'),
      marca: Yup.string().required('Required'),
      modelo: Yup.string().required('Required'),
      ano: Yup.number().required('Required'),
      cambio: Yup.string().required('Required'),
      precoDia: Yup.number().required('Required'),
      disponivel: Yup.boolean().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (image) {
          const toastID = toast.loading('Carregando Imagem.');
          const imagem = await uploadFile(image)
          values.imagem = imagem
          toast.dismiss(toastID)
        }
        toast.promise(APIKit.post('/viaturas', values), {
          loading: 'Enviando!',
          success: () => {
            fetchData();
            resetForm();
            onClose();
            return 'Viatura criado com sucesso!'
          },
          error: 'Ups, ocorreu um erro!',
        });
      } catch (err) {
        toast.error('Ups, ocorreu um erro ao submeter a empresa!');
      }


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
          <div className="mb-3">
            <FileInput name="image" isImage placeholder="Escolha uma imagem" inputEvent={changeImage}
              value={image?.name || ''} />
          </div>
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
            label="Ano de Fabrico"
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
            label="Pre??o Di??rio"
            placeholder="Pre??o Di??rio"
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
            label="Validade da Inspe????o"
            placeholder="Validade da Inspe????o"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.validadeInspencao}
            error={formik.touched.validadeInspencao && formik.errors.validadeInspencao}
          />
          <div className="card mb-3 w-full">
            <p className="mb-2">Disponibilidade</p>
            <div className="flex flex-wrap gap-2">
              <Checkbox label="Est?? Dispon??vel?" name="disponivel" onChange={formik.handleChange} />
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
