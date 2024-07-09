const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

require("dotenv").config();

const rotaAcesso = require("./routes/access");
const rotaLogin = require("./routes/login");
const rotaNivel = require("./routes/nivel");
const rotaPlano = require("./routes/plano");
const rotaRecovery = require("./routes/recovery");
const rotaStatus = require("./routes/status");
const rotaUsuarios = require("./routes/usuario");
const rotaEnvios = require("./routes/envio");
const rotaCaracteristica = require("./routes/caracteristica");
const rotaProximidades = require("./routes/proximidades");
const rotaNovoCondominio = require("./routes/novoConcominio");
const rotaNovoImovel = require("./routes/novoImovel");
const rotaProprietario = require("./routes/proprietario");
const rotaProgressao = require("./routes/progress");
const rotaTicket = require("./routes/ticket");
const rotaTermos = require("./routes/termos");
const rotaPrivacidade = require("./routes/privacidade");
const rotaAnotacao = require("./routes/anotacao");

const Code = require("./models/tb_code");
const Token = require("./models/tb_token");
const Perfil = require("./models/tb_perfil");
const Progress = require("./models/tb_progressao");
const Qrcode = require("./models/tb_qrcode");
const User = require("./models/tb_usuarios");
const Ticket = require("./models/tb_ticket");

const ImagemImovel = require("./models/tb_imagem_imovel");
const CaracteristicaImovel = require("./models/tb_imovel_caracteristica");
const Caracteristica = require("./models/tb_caracteristica");
const ProximidadesImovel = require("./models/tb_imovel_proximidades");
const Proximidades = require("./models/tb_proximidades");
const QrcodeImovel = require("./models/tb_qrcode");
const NovoImovel = require("./models/tb_imovel");

User.hasOne(Code, {
  foreignKey: "id_user",
  as: "code",
});

User.hasOne(Token, {
  foreignKey: "id_user",
  as: "token",
});

User.hasOne(Perfil, {
  foreignKey: "id_user",
  as: "perfil",
});

User.hasOne(Progress, {
  foreignKey: "id_user",
  as: "progress",
});

User.hasOne(Qrcode, {
  foreignKey: "id_user",
  as: "qrcode",
});

User.hasOne(Ticket, {
  foreignKey: "id_user",
  as: "usuario",
});

NovoImovel.hasMany(ImagemImovel, {
  foreignKey: "id_imovel",
  as: "fotos",
});

NovoImovel.hasMany(CaracteristicaImovel, {
  foreignKey: "id_imovel",
  as: "caracteristicas",
});

CaracteristicaImovel.belongsTo(Caracteristica, {
  foreignKey: "id_caracteristica",
  as: "detalhesCaracteristica",
});

NovoImovel.hasMany(ProximidadesImovel, {
  foreignKey: "id_imovel",
  as: "proximidades",
});

ProximidadesImovel.belongsTo(Proximidades, {
  foreignKey: 'id_proximidades',
  as: 'detalhesProximidade'
});

NovoImovel.hasMany(QrcodeImovel, {
  foreignKey: "id_imovel",
  as: "qrcode",
});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET, OPTIONS"
    );
    return res.status(200).send({});
  }
  next();
});

app.use("/acesso", rotaAcesso);
app.use("/login", rotaLogin);
app.use("/nivel", rotaNivel);
app.use("/plano", rotaPlano);
app.use("/recovery", rotaRecovery);
app.use("/status", rotaStatus);
app.use("/usuarios", rotaUsuarios);
app.use("/email", rotaEnvios);
app.use("/caracteristica", rotaCaracteristica);
app.use("/proximidades", rotaProximidades);
app.use("/condominio", rotaNovoCondominio);
app.use("/imovel", rotaNovoImovel);
app.use("/proprietario", rotaProprietario);
app.use("/progressao", rotaProgressao);
app.use("/ticket", rotaTicket);
app.use("/termos", rotaTermos);
app.use("/privacidade", rotaPrivacidade);
app.use("/anotacao", rotaAnotacao);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.use(express.static("public"));

app.use((req, res, next) => {
  const erro = new Error("Rota não encontrada");
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.mensagem,
    },
  });
});

module.exports = app;
