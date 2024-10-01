const Facebook = require("../models/tb_facebook");
const Usuario = require("../models/tb_usuarios");

require("dotenv").config();

async function getLongLivedToken(shortLifeToken) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v12.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&fb_exchange_token=${shortLifeToken}`
    );

    const data = await response.json();
    console.log("req feace", response);
    if (response.ok) {
      console.log("token", data.access_token);
      return data.access_token;
    } else {
      throw new Error(data.error.message);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = class FacebookController {
  static async callback(req, res) {
    try {
      const { accessToken: shortLivedToken, id_user } = req.body;

      if (!shortLivedToken) {
        throw new Error("Token de acesso não foi fornecido");
      }

      const longLivedToken = await getLongLivedToken(shortLivedToken);
      const userInfoResponse = await fetch(
        `https://graph.facebook.com/me?access_token=${shortLivedToken}`
      );
      const userInfo = await userInfoResponse.json();

      if (!userInfoResponse.ok) {
        throw new Error(userInfo.error.message);
      }

      const userExists = await Usuario.findOne({
        where: {
          id_user,
        },
      });

      if (!userExists) {
        throw new Error("Usuário não encontrado");
      }

      console.log("userInfo", userInfo);

      const body = {
        id_user,
        shortLifeToken: shortLivedToken,
        longLifeToken: longLivedToken,
        facebookId: userInfo.id,
      };

      const user = await Facebook.create(body);

      console.log(user);

      res.send(
        "Autorização concluída e token de longa duração salvo com sucesso!"
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("Erro ao autenticar com o Facebook");
    }
  }

  static async getLeads(req, res) {
    try {
      const { pageId } = req.query;
      const leads = await fetch(
        `https://graph.facebook.com/v12.0/${pageId}/leadgen_forms?access_token=${accessToken}`
      );
      
    } catch (err) {
      console.log(err);
      res.status(500).send("Erro ao buscar leads");
    }
  }

  static async logout(req, res) {
    try {
      const { id_user } = req.body;

      const facebookAccount = await Facebook.findOne({
        where: {
          id_user,
        },
      });

      if (!facebookAccount) {
        return res.status(404).send("Conta do Facebook não encontrada.");
      }

      const revokeResponse = await fetch(
        `https://graph.facebook.com/${facebookAccount.facebookId}/permissions?access_token=${facebookAccount.longLifeToken}`,
        { method: "DELETE" }
      );

      if (!revokeResponse.ok) {
        throw new Error("Erro ao revogar o token de acesso do Facebook.");
      }

      await Facebook.destroy({
        where: {
          id_user,
        },
      });

      res.send("Logout realizado com sucesso e token revogado.");
    } catch (err) {
      console.log(err);
      res.status(500).send("Erro ao realizar logout.");
    }
  }
};
