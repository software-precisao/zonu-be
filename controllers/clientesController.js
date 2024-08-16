const Cliente = require("../models/tb_clientes");
const TipoCliente = require("../models/tb_tipo_cliente");
const Captacao = require("../models/tb_captacao");
const CategoriaCliente = require("../models/tb_categoria_cliente");
const Usuario = require("../models/tb_usuarios");

const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
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
      ],
    });
    return res.status(200).json(clientes);
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
    return res.status(201).json(novoCliente);
  } catch (error) {
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
};
