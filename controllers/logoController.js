// controllers/logoController.js
const Logo = require("../models/tb_logos");

const createLogo = async (req, res) => {
  try {
    const { logo } = req.body;
    const newLogo = await Logo.create({ logo });
    res.status(201).json({ message: "Logo criado com sucesso", logo: newLogo });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar o logo", error });
  }
};

const updateLogo = async (req, res) => {
  try {
    const { logo } = req.body;
    const [updated] = await Logo.update(
      { logo },
      {
        where: { id_logo },
      }
    );
    if (updated) {
      const updatedLogo = await Logo.findByPk(id_logo);
      res
        .status(200)
        .json({ message: "Logo atualizado com sucesso", logo: updatedLogo });
    } else {
      res.status(404).json({ message: "Logo não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar o logo", error });
  }
};

const deleteLogo = async (req, res) => {
  try {
    const { id_logo } = req.params;
    const deleted = await Logo.destroy({
      where: { id_logo },
    });
    if (deleted) {
      res.status(200).json({ message: "Logo excluído com sucesso" });
    } else {
      res.status(404).json({ message: "Logo não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir o logo", error });
  }
};

module.exports = {
  createLogo,
  updateLogo,
  deleteLogo
};
