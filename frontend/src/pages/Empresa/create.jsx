import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from 'yup';
import BusinessDay from "../../components/input/BusinessDay";
import FileInput from "../../components/input/FileInput";
import RadioButton from "../../components/input/RadioButton";
import TextInput from "../../components/input/TextInput";
import { DEFAULT_BUSINESS_HOURS } from "../../constants";
import { pacotesEmpresa, tempoMinimoEmpresa, tiposEmpresa } from "../../constants/dictionary";
import { useAuth } from "../../context";
import { APIKit, uploadFile } from "../../services/api";
import "./create.css";

const CreateEmpresa = () => {
  const { toast } = useAuth(useAuth);
  const [businessDays, setBusinessDays] = useState(DEFAULT_BUSINESS_HOURS)
  const [document, setDocument] = useState(null)
  const [image, setImage] = useState()
  const setBusinessDay = (name, values) => setBusinessDays({ ...businessDays, [name]: values })
  const changeDocument = (file) => {
    setDocument(file)
  }
  const changeImage = (file) => {
    setImage(file)
  }
  const formik = useFormik({
    initialValues: {
      nome: "",
      tipo: "",
      pacote: "",
      descricao: "",
      endereco: "",
      email: "",
      contacto: "",
      website: "",
      tempo_minimo: "",
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Campo Nome é obrigatório'),
      tipo: Yup.string().required('Campo Tipo de Empresa é obrigatório'),
      pacote: Yup.string().required('Campo Pacote é obrigatório'),
      descricao: Yup.string().required('Campo Descrição é obrigatório'),
      endereco: Yup.string().required('Campo Endereço é obrigatório'),
      contacto: Yup.string().required('Campo Contacto é obrigatório'),
      website: Yup.string(),
      tempo_minimo: Yup.string().required('Campo obrigatório'),
      email: Yup.string().email('Email inválido'),
    }),
    onSubmit: async (values, { resetForm }) => {
      values.horario_comercial = businessDays
      try {
        if (document) {
          const toastID = toast.loading('Carregando Documento.');
          const documento = await uploadFile(document)
          values.documento = documento
          toast.dismiss(toastID)
        }
        if (image) {
          const toastID = toast.loading('Carregando Imagem.');
          const logotipo = await uploadFile(image)
          values.logotipo = logotipo
          toast.dismiss(toastID)
        }
        const toastID = toast.loading('Enviando Dados!');
        APIKit.post('/clientes', values)
          .then(() => { toast.success('Empresa cadastrada com sucesso!'); resetForm() })
          .catch(() => { toast.error('Ocorreu um erro ao cadastrar a empresa!') })
          .finally(() => toast.dismiss(toastID))
      } catch (err) {
        toast.error('Ups, ocorreu um erro ao submeter a empresa!');
      }

    },
  });
  return (
    <div className="container">
      <div className="form-header">
        <h2 className="gradient-text"> Cadastro do Empresa</h2>
      </div>
      <form onSubmit={formik.handleSubmit} className="mb-4">
        <h3 className="mb-1 gradient-text font-bold">DETALHES DA EMPRESA</h3>
        <p className="mb-4">
          Nesta secção irá preencher informação referentes aos detalhes da
          empresa
        </p>
        <TextInput
          className="card mb-3"
          name="nome"
          label="Nome da Empresa"
          placeholder="Digite a Resposta"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nome}
          error={formik.touched.nome && formik.errors.nome}
        />
        <div className="card mb-3">
          <p className="mb-2">Tipo de Empresa</p>
          <div className="flex flex-wrap gap-2">
            {tiposEmpresa.map((item) => (<RadioButton key={item.value} name="tipo" selected={formik.values?.tipo} label={item.label} value={item.value}
              onChange={formik.handleChange} />))}
          </div>
        </div>
        <div className="card mb-3">
          <p className="mb-2">Pacote</p>
          <div className="flex flex-wrap gap-2">
            {pacotesEmpresa.map((item) => (<RadioButton key={item.value} name="pacote" selected={formik.values?.pacote} label={item.label} value={item.value}
              onChange={formik.handleChange} />))}
          </div>
        </div>
        <TextInput
          className="card mb-3"
          name="descricao"
          label="Descrição da Empresa"
          placeholder="Digite a Resposta"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.descricao}
          error={formik.touched.descricao && formik.errors.descricao}
        />
        <TextInput
          className="card mb-3"
          name="endereco"
          label="Endereço da Empresa"
          placeholder="Digit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.endereco}
          error={formik.touched.endereco && formik.errors.endereco}
        />
        <TextInput
          className="card mb-3"
          name="contacto"
          label="Contacto da Empresa"
          placeholder="Digit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.contacto}
          error={formik.touched.contacto && formik.errors.contacto}
        />
        <TextInput
          className="card mb-3"
          name="email"
          label="E-mail da Empresa"
          placeholder="Digit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
        />
        <TextInput
          className="card mb-3"
          name="website"
          label="Website da Empresa (se existir)"
          placeholder="Digit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.website}
          error={formik.touched.website && formik.errors.website}
        />

        <div className="card p-3 mb-3 flex-col gap-1">
          <p>Horário comercial</p>
          <div className="grid-col-3">
            <div className="gradient-text font-bold">
              <span>Dia da Semana</span>
            </div>
            <div className="gradient-text font-bold">
              <span>Início</span>
            </div>
            <div className="gradient-text font-bold">
              <span>Fim</span>
            </div>
          </div>
          <BusinessDay name="segundo" setBusinessDay={setBusinessDay} label="Segunda-feira" />
          <BusinessDay name="terca" setBusinessDay={setBusinessDay} label="Terça-feira" />
          <BusinessDay name="quarta" setBusinessDay={setBusinessDay} label="Quarta-feira" />
          <BusinessDay name="quinta" setBusinessDay={setBusinessDay} label="Quinta-feira" />
          <BusinessDay name="sexta" setBusinessDay={setBusinessDay} label="Sexta-feira" />
          <BusinessDay name="sabado" setBusinessDay={setBusinessDay} label="Sábado" />
          <BusinessDay name="domingo" setBusinessDay={setBusinessDay} label="Domingo" />
        </div>

        <div className="card mb-3">
          <p className="mb-2">Tempo mínimo para reserva</p>
          <div className="flex flex-wrap gap-2">
            {tempoMinimoEmpresa.map((item) => (<RadioButton key={item.value} name="tempo_minimo" selected={formik.values?.tempo_minimo} label={item.label} value={item.value}
              onChange={formik.handleChange} />))}
          </div>
        </div>

        <div className="card mb-3">
          <p className="mb-3">Serviços e Funcionários</p>
          <FileInput name="documento" placeholder="Escolha um ficheiro" inputEvent={changeDocument}
            value={document?.name || ''} />
        </div>
        <div className="card mb-3">
          <p className="mb-3">Logo da Empresa</p>
          <FileInput name="image" isImage placeholder="Escolha uma imagem" inputEvent={changeImage}
            value={image?.name || ''} />
        </div>
        <div className="flex">
          <button type="submit" className="action-button" to="/admin">
            <span>Entrar</span>
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateEmpresa;
