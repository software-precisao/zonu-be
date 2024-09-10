const Cliente = require("../models/tb_clientes");
const TipoCliente = require("../models/tb_tipo_cliente");
const Captacao = require("../models/tb_captacao");
const CategoriaCliente = require("../models/tb_categoria_cliente");
const PessoasLigadas = require("../models/tb_pessoas_ligadas");
const Usuario = require("../models/tb_usuarios");

const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      include: [
        {
          model: TipoCliente,
          as: "TipoCliente",
        },
        {
          model: Captacao,
          as: "Captacao",
        },
        {
          model: CategoriaCliente,
          as: "CategoriaCliente",
        },
        {
          model: Usuario,
          as: "Usuario",
          attributes: ["nome"],
        }
      ],
    });

    const clientesResponse = [];
    for(let i = 0; i < clientes.length; i++){
      const cliente = {...clientes[i].dataValues}
      const pessoasLigadas = await PessoasLigadas.findAll({ 
        where: {
          id_cliente: cliente.id_cliente
        }
      })

      clientesResponse.push({
        ...cliente,
        pessoasLigadas: pessoasLigadas.map(v => v.dataValues)
      })
    }

    return res.status(200).json(
      clientesResponse
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getClienteById = async (req, res) => {
  try {
    const { id_cliente } = req.params;

    if (!id_cliente) {
      return res.status(400).json({ message: "ID do cliente é obrigatório" });
    }

    const cliente = await Cliente.findByPk(id_cliente, {
      include: [
        {
          model: TipoCliente,
          as: "TipoCliente",
          attributes: ["tipo_cliente"],
        },
        {
          model: Captacao,
          as: "Captacao",
          attributes: ["origem_captacao"],
        },
        {
          model: CategoriaCliente,
          as: "CategoriaCliente",
          attributes: ["categoria_cliente"],
        },
        {
          model: Usuario,
          as: "Usuario",
          attributes: ["nome"],
        },
        {
          model: Cliente,
          as: "PessoaLigada",
          attributes: ["id_cliente", "nome", "email"],
        },
      ],
    });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createCliente = async (req, res) => {
  try {
    const {
      id_tipo_cliente,
      id_captacao,
      id_categoria_cliente,
      id_user,
      nome,
      rg,
      cpf,
      email,
      data_de_nascimento,
      profissao,
      cep,
      pais,
      uf,
      cidade,
      bairro,
      logradouro,
      numero,
      complemento,
      telefone_1,
      telefone_2,
      anotacao,
      pessoas_ligadas,
    } = req.body;

    const novoCliente = await Cliente.create({
      id_tipo_cliente,
      id_captacao,
      id_categoria_cliente,
      id_user,
      nome,
      rg,
      cpf,
      email,
      data_de_nascimento,
      profissao,
      cep,
      pais,
      uf,
      cidade,
      bairro,
      logradouro,
      numero,
      complemento,
      telefone_1,
      telefone_2,
      anotacao,
    });

    const cliente = {...novoCliente.dataValues, pessoas_ligadas: []}

    if (pessoas_ligadas) {
      for (let i = 0; i < pessoas_ligadas.length; i++) {
        const { id_pessoa_ligada, breve_descricao } = pessoas_ligadas[i];

        const pessoa = await PessoasLigadas.create({
          id_cliente: cliente.id_cliente,
          id_pessoa_ligada,
          breve_descricao: breve_descricao,
        });

        cliente.pessoas_ligadas.push(pessoa);
      }
    }

    return res.status(201).json(cliente);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
};

const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_tipo_cliente,
      id_captacao,
      id_categoria_cliente,
      id_user,
      nome,
      rg,
      cpf,
      email,
      data_de_nascimento,
      profissao,
      cep,
      pais,
      uf,
      cidade,
      bairro,
      logradouro,
      numero,
      complemento,
      telefone_1,
      telefone_2,
      anotacao,
      
    } = req.body;

    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    await cliente.update({
      id_tipo_cliente,
      id_captacao,
      id_categoria_cliente,
      id_user,
      nome,
      rg,
      cpf,
      email,
      data_de_nascimento,
      profissao,
      cep,
      pais,
      uf,
      cidade,
      bairro,
      logradouro,
      numero,
      complemento,
      telefone_1,
      telefone_2,
      anotacao,
      
    });

    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    await cliente.destroy();
    return res.status(200).json({ message: "Cliente excluído com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
  getClienteById,
};
