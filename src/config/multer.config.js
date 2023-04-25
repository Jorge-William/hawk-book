const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log(req)
        callback(null, path.resolve(`imagens/${req.body.nome}`));
    },

    // filename: function (req, file, callback) {
    //     const ext = path.extname(file.originalname);
    //     const baseName = req.body.nome + '-';
    //     const names = ['frente', 'perfil']; // lista de nomes desejados
    //     for (let i = 0; i < names.length; i++) {
    //         const newName = baseName + names[i] + ext;
    //         return newName
    //     }
    //     callback(null, newName);
    // }

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