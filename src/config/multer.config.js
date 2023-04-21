const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log(req)
        callback(null, path.resolve(`imagens/${req.body.nome}`));
    },

    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const newName = req.body.nome + '-' + Date.now() + ext;
        cb(null, newName);
    }

    // filename: (req, file, callback) => {
    //     callback(null, `${req.body.nome}-frente.jpg`);
    // },
});

module.exports = storage;