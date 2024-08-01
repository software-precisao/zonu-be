const express = require("express");
const router = express.Router();
const videosController = require("../controllers/videosController")

router.get('/allVideos', videosController.listarTodosVideos);
router.get('/:id_video', videosController.obterVideoPorId);
router.post('/cadastrarVideo', videosController.cadastrarVideo);

module.exports = router;
