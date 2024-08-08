const CategoriaCliente = require("../models/tb_categoria_cliente");

const getCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaCliente.findAll();
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createCategoria = async (req, res) => {
  try {
    const { categoria_cliente } = req.body;

    if (!categoria_cliente) {
      return res
        .status(400)
        .json({ message: "O campo categoria de cliente é obrigatório" });
    }

    const novaCategoria = await CategoriaCliente.create({ categoria_cliente });
    return res.status(201).json(novaCategoria);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateCategoria = async (req, res) => {
  try {
    const { id_categoria_cliente } = req.params;
    const { categoria_cliente } = req.body;

    const categoria = await CategoriaCliente.findByPk(id_categoria_cliente);
    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    categoria.categoria_cliente = categoria_cliente;
    await categoria.save();

    return res.status(200).json(categoria);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const { id_categoria_cliente } = req.params;
    const categoria = await CategoriaCliente.findByPk(id_categoria_cliente);
    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    await categoria.destroy();
    return res.status(200).json({ message: "Categoria excluída com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
