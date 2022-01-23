'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('funcionarios', [
      {
        "id": 1,
        "nome": "Emerson Yuri",
        "bi": "1231231233123",
        "dataNascimento": new Date(),
        "sexo": "masculino",
        "telefone": "840000000",
        "endereco": "Malhazine",
        "funcao": "admin",
        "salario": 1000,
        "nomeBanco": "Moza",
        "numeroConta": "190982123",
        "nib": "1242341341234",
        "updatedAt": new Date(),
        "createdAt": new Date()
      },
      {
        "id": 2,
        "nome": "Chelsia Chiure",
        "bi": "1231231233124",
        "dataNascimento": new Date(),
        "sexo": "feminino",
        "telefone": "840000011",
        "endereco": "Alto Mae",
        "funcao": "admin",
        "salario": 2000,
        "nomeBanco": "Bim",
        "numeroConta": "190982123",
        "nib": "1242341341234",
        "updatedAt": new Date(),
        "createdAt": new Date()
      },
    ], {});
    await queryInterface.bulkInsert('usuarios', [
      {
        "id": 1,
        "funcionarioId": 1,
        "nome": "flossy",
        "tipo": "admin",
        "senha": "$2b$12$20rTj95/5S8oTFYrR5C5RurAt6jKlWd2QyakyJM6Xx910oIvtV2QC",
        "updatedAt": "2022-01-22T19:57:34.056Z",
        "createdAt": "2022-01-22T19:57:34.056Z"
      },
      {
        "id": 2,
        "funcionarioId": 2,
        "nome": "chelsy",
        "tipo": "admin",
        "senha": "$2b$12$20rTj95/5S8oTFYrR5C5RurAt6jKlWd2QyakyJM6Xx910oIvtV2QC",
        "updatedAt": "2022-01-22T19:57:34.056Z",
        "createdAt": "2022-01-22T19:57:34.056Z"
      },
    ], {});
    await queryInterface.bulkInsert('viaturas', [
      {
        "id": 1,
        "matricula": "100-MZ",
        "marca": "Mazda",
        "modelo": "Demio",
        "ano": "2013",
        "precoDia": "2000",
        "cambio": "auto",
        "disponivel": true,
        "validadeSeguro": new Date(),
        "validadeInspencao": new Date(),
        "updatedAt": new Date(),
        "createdAt": new Date()
      },
      {
        "id": 2,
        "matricula": "200-MZ",
        "marca": "Toyota",
        "modelo": "Passo",
        "ano": "2006",
        "precoDia": "1000",
        "cambio": "manual",
        "disponivel": true,
        "validadeSeguro": new Date(),
        "validadeInspencao": new Date(),
        "updatedAt": new Date(),
        "createdAt": new Date()
      },
    ], {});
    await queryInterface.bulkInsert('clientes', [
      {
        "id": 1,
        "nome": "Dalton Services",
        "bi": "1234145421234",
        "nuit": "4351452",
        "email": "dalton@gmail.com",
        "telefone": "840128374",
        "endereco": "Malhangalene",
        "tipo": "Empresa",
        "updatedAt": "2022-01-22T20:27:05.878Z",
        "createdAt": "2022-01-22T20:27:05.878Z"
      },
      {
        "id": 2,
        "nome": "Bernardo Engraving",
        "bi": "1234145421234",
        "nuit": "5134153",
        "email": "benor@gmail.com",
        "telefone": "840128123",
        "endereco": "Mahotas",
        "tipo": "Empresa",
        "updatedAt": "2022-01-22T20:27:05.878Z",
        "createdAt": "2022-01-22T20:27:05.878Z"
      },
    ], {});
    await queryInterface.bulkInsert('aluguers', [
      {
        "id": 1,
        "dataEntrega": new Date("2022-01-23T00:00:00.000Z"),
        "dataPrevistaDevolucao": new Date("2022-01-25T00:00:00.000Z"),
        "valorTotal": 5000,
        "combustivel": true,
        "motorista": false,
        "viaturaId": 1,
        "clienteId": 1,
        "usuarioId": 1,
        "updatedAt": new Date(),
        "createdAt": new Date()
      },
      {
        "id": 2,
        "dataEntrega": new Date("2022-01-23T00:00:00.000Z"),
        "dataPrevistaDevolucao": new Date("2022-01-25T00:00:00.000Z"),
        "valorTotal": 4000,
        "combustivel": false,
        "motorista": false,
        "viaturaId": 1,
        "clienteId": 1,
        "usuarioId": 1,
        "updatedAt": new Date(),
        "createdAt": new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
