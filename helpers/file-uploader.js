const multer = require("multer");
const path = require("path");

// Configuração padrão de armazenamento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "";
        if (file.fieldname === "logo") {
            folder = "logo";
        } else if (file.fieldname === "capa") {
            folder = "capa";
        } else if (file.fieldname === "foto") {
            folder = "foto";
        } else {
            folder = "avatar"; 
        }
        cb(null, `public/${folder}/`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Configuração de filtragem de arquivos
const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg|webp)$/)) {
        return cb(new Error("Por favor, envie apenas png, jpg ou jpeg!"));
    }
    cb(undefined, true);
};

// Instância do Multer para campos específicos
const uploadFields = multer({
    storage: storage,
    fileFilter: fileFilter,
}).fields([
    { name: "avatar", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "capa", maxCount: 1 },
    { name: "foto", maxCount: 10 },
]);

// Instância do Multer para array de fotos
const uploadArray = multer({
    storage: storage,
    fileFilter: fileFilter,
}).array("foto", 10);


module.exports = { uploadFields, uploadArray };
