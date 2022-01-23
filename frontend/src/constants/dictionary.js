import { dropdownToValueObject, isMonthPaid } from "../utils";



export const headersNotificacao = [
  {
    key: "descricao",
    label: "Descrição",
  },
  {
    key: "createdAt",
    label: "Data de criação",
    component: ({ createdAt }) => <span>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(createdAt))}</span>
  },
];

export const headersTransacoes = [
  {
    key: "descricao",
    label: "Descrição",
  },
  {
    key: "createdAt",
    label: "Data de criação",
    component: ({ createdAt }) => <span>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(createdAt))}</span>
  },
  {
    key: "respondida",
    label: "Status",
    component: (item) => <div className="flex items-center">
      {item.respondida ?
        <><div className="small-circle enabled" /> Respondido</> :
        <><div className="small-circle disabled" /> Pendente</>
      }
    </div>
  },
];

export const tipoTransacao = [
  { label: "Cadastrar Empresa", value: "cadastrar-empresa" },
  { label: "Aprovar Contrato", value: "aprovar-empresa" },
  { label: "Reprovar Contrato", value: "reprovar-empresa" },
  { label: "Oferecer Trial", value: "teste" },
  { label: "Pagar Mensalidade", value: "pagamento" },
];

export const tipoTransacaoObject = dropdownToValueObject(tipoTransacao)

export const tiposEmpresa = [
  { label: "Clínica", value: "CLINICA" },
  { label: "Restaurante", value: "RESTAURANTE" },
  { label: "Salão", value: "SALAO" },
];

export const tiposEmpresaObject = dropdownToValueObject(tiposEmpresa)

export const estadosEmpresa = [
  { label: "Aprovada", value: 1 },
  { label: "Não Aprovada", value: 0 },
];

export const estadosEmpresaObject = dropdownToValueObject(estadosEmpresa)

export const estadosUsuario = [
  { label: "Ativo", value: 1 },
  { label: "Não Ativo", value: 0 },
];

export const estadosUsuarioObject = dropdownToValueObject(estadosUsuario)

export const sexos = [
  { label: 'Masculino', value: "masculino" },
  { label: 'Feminino', value: "feminino" },
];

export const funcoesUsuario = [
  { label: 'Administrador', value: "admin" },
  { label: 'Funcionario', value: "funcionario" },
];

export const tiposCambio = [
  { label: 'Automático', value: "auto" },
  { label: 'Hibrido', value: "hibrid" },
  { label: 'Manual', value: "manual" },
];

export const tiposCliente = [
  { label: 'Individual', value: "individual" },
  { label: 'Empresa', value: "Empresa" },
];

export const funcoesUsuarioObject = dropdownToValueObject(funcoesUsuario)
export const tiposClienteObject = dropdownToValueObject(tiposCliente)

export const pacotesEmpresa = [
  { label: "Básico", value: "BASICO" },
  // { label: "Essencial", value: "ESSENCIAL" },
  { label: "Premium", value: "PREMIUM" },
];
export const pacotesEmpresaObject = dropdownToValueObject(pacotesEmpresa)

export const tempoMinimoEmpresa = [
  { label: '1 Hora', value: "1 Hora" },
  { label: '2 Horas', value: "2 Horas" },
  { label: '1 Dia', value: "1 Dia" },
  { label: '1 Semana', value: "1 Semana" },
  { label: '1 Mês', value: "1 Mês" },
]

export const todos = {
  label: 'Todos', value: ''
}

export const headersUsuario = [
  {
    key: "nome",
    label: "Nome e Usuário",
  },
  {
    key: "funcionario.nome",
    label: "Nome de Funcionário",
  },
  {
    key: "tipo",
    label: "Tipo",
    component: (item) => funcoesUsuarioObject[item.tipo].label
  }
];
export const headersFuncionario = [
  {
    key: "nome",
    label: "Nome",
  },
  {
    key: "bi",
    label: "BI",
  },
  {
    key: "sexo",
    label: "Sexo",
  },
  {
    key: "funcao",
    label: "Função",
    component: (item) => funcoesUsuarioObject[item.funcao].label
  }
];
export const headersClientes = [
  {
    key: "nome",
    label: "Nome",
  },
  {
    key: "bi",
    label: "BI",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "tipo",
    label: "Tipo",
    component: (item) => tiposClienteObject[item.tipo].label
  }
];
export const headersAluguer = [
  {
    key: "cliente.nome",
    label: "Cliente",
  },
  {
    key: "viatura.marca",
    label: "Viatura",
    component: (item) => `${item.viatura.marca} ${item.viatura.modelo}`
  },
  {
    key: "dataEntrega",
    label: "D/ Entrega",
    component: ({ dataEntrega }) => <span>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }).format(new Date(dataEntrega))}</span>

  },
  {
    key: "dataPrevistaDevolucao",
    label: "D/ Prev. Devolução",
    component: ({ dataPrevistaDevolucao }) => <span>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }).format(new Date(dataPrevistaDevolucao))}</span>
  },
  {
    key: "valorTotal",
    label: "Valor Total Pago",
  },
  {
    key: "motorista",
    label: "Motorista",
    component: (item) => <div className="flex items-center">
      {item.motorista ?
        <><div className="small-circle enabled" /> Sim</> :
        <><div className="small-circle disabled" /> Não</>
      }
    </div>
  },
  {
    key: "combustivel",
    label: "Combustível",
    component: (item) => <div className="flex items-center">
      {item.combustivel ?
        <><div className="small-circle enabled" /> Sim</> :
        <><div className="small-circle disabled" /> Não</>
      }
    </div>
  },
];
export const headersViaturas = [
  {
    key: "marca",
    label: "Marca",
  },
  {
    key: "modelo",
    label: "Modelo",
  },
  {
    key: "ano",
    label: "Ano",
  },
  {
    key: "precoDia",
    label: "Preço Diário",
  },
  {
    key: "disponivel",
    label: "Disponibilidade",
    component: (item) => <div className="flex items-center">
      {item.disponivel ?
        <><div className="small-circle enabled" /> Sim</> :
        <><div className="small-circle disabled" /> Não</>
      }
    </div>
  },
];

export const headersEmpresa = [
  {
    key: "nome",
    label: "Nome",
    component: (item) => <div className="flex items-center"><img className="table-icon" src={item.logotipo} alt={`${item.nome} Logo`} /><span>{item.nome}</span></div>
  },
  {
    key: "tipo",
    label: "Tipo",
    component: (item) => tiposEmpresaObject[item.tipo].label
  },
  {
    key: "pacote",
    label: "Pacote",
    component: (item) => pacotesEmpresaObject[item.pacote].label
  },
  {
    key: "endereco",
    label: "Endereço",
  },
  {
    key: "expiracaoPagamento",
    label: "Mensalidade",
    component: (item) => {
      if (isMonthPaid(item.expiracaoTrial, item.expiracaoPagamento))
        return <div className="flex items-center"><div className="small-circle enabled" /> Pago</div>
      return <div className="flex items-center"><div className="small-circle disabled" /> Pendente</div>
    }
  },
  {
    key: "aprovado",
    label: "Avaliação",
    component: (item) => <div className="flex items-center">
      {item.aprovado ?
        <><div className="small-circle enabled" /> {estadosEmpresaObject[item.aprovado ? 1 : 0].label}</> :
        <><div className="small-circle disabled" /> {estadosEmpresaObject[item.aprovado ? 1 : 0].label}</>
      }
    </div>
  },
  {
    key: "usuario.nome",
    label: "Nome do vendedor",
  },
  {
    key: "createdAt",
    label: "Data de criação",
    component: ({ createdAt }) => <span>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(createdAt))}</span>
  },
];