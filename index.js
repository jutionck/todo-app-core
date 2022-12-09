const express = require('express');
const multer = require('multer');
const path = require("path");
// const upload = multer({dest: './public/data/uploads/'})
const app = express();
const port = 8888;
app.use(express.json());
app.use(express.urlencoded());

app.get('/hello', (req, res) => {
    const {name, address} = req.query;
    res.json({message: `Hello express here with name ${name} and address ${address}`});
});

app.get('/hello/:id', (req, res) => {
    const {id} = req.params;
    res.json({message: `Hello express here with number ${id}`});
});

app.post('/hello', (req, res) => {
    const {name, address} = req.body;
    res.json({message: `Hello express here from body with name ${name} and address ${address}`});
});

// app.post('/upload', (req, res) => {
//     console.log('req.body:', JSON.stringify(req.body))
//     // res.json({message: `Hello express here from body with name ${name} and address ${address}`});
// });

// text-only multipart/data
// app.post('/upload', multer().none(), (req, res) => {
//     const payload = req.body;
//     const payloadParse = JSON.parse(payload['employee']);
//     const { name, address } = payloadParse;
//     res.json({message: `Hello express here from body with name ${name} and address ${address}`});
// });

// with file -> name: photo
// app.post('/upload', upload.single('photo'), (req, res) => {
//     const payload = req.body;
//     const payloadParse = JSON.parse(payload['employee']);
//     const {name, address} = payloadParse;
//     const {originalname, mimetype, destination, filename, path, size} = req.file;
//     const newFileName = filename + '.'+ originalname.split('.')[1];
//     const photoLocation = path + '.'+originalname.split('.')[1];
//     res.json({message: `Hello express here from body with name ${name} and address ${address} and photo: ${newFileName} and locationPath ${photoLocation}`});
// });

// destination
// create folder destination -> public/uploads
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "public/uploads"));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

app.post(
    "/hello/upload",
    multer({ storage: diskStorage }).single("photo"),
    (req, res) => {
        const file = req.file.path;
        if (!file) {
            res.status(400).send({
                status: false,
                data: "No File is selected.",
            });
        }
        // req.file.path -> for save to model
        res.send(file);
    }
);

app.listen(port, () => {
    console.log(`App is running on ${port}`)
});