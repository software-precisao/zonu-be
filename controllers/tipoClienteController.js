const TipoCliente = require("../models/tb_tipo_cliente");

const getTipoClientes = async (req, res) => {
  try {
    const tipoClientes = await TipoCliente.findAll();
    return res.status(200).json(tipoClientes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createTipoCliente = async (req, res) => {
  try {
    const { tipo_cliente } = req.body;

    if (!tipo_cliente) {
      return res
        .status(400)
        .json({ message: "O campo tipo de cliente é obrigatório" });
    }

    const novoTipoCliente = await TipoCliente.create({ tipo_cliente });
    return res.status(201).json(novoTipoCliente);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateTipoCliente = async (req, res) => {
  try {
    const { id_tipo_cliente } = req.params;
    const { tipo_cliente } = req.body;

    const tipoCliente = await TipoCliente.findByPk(id_tipo_cliente);
    if (!tipoCliente) {
      return res.status(404).json({ message: "Tipo de cliente não encontrado" });
    }

    tipoCliente.tipo_cliente = tipo_cliente;
    await tipoCliente.save();

    return res.status(200).json(tipoCliente);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteTipoCliente = async (req, res) => {
  try {
    const { id_tipo_cliente } = req.params;
    const tipoCliente = await TipoCliente.findByPk(id_tipo_cliente);
    if (!tipoCliente) {
      return res.status(404).json({ message: "Tipo de cliente não encontrado" });
    }

    await tipoCliente.destroy();
    return res.status(200).json({ message: "Tipo de cliente excluído com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTipoClientes,
  createTipoCliente,
  updateTipoCliente,
  deleteTipoCliente,
};
