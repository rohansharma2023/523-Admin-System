const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();

const proposalModel = require("./models/Proposal");

app.use(express.json());

// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cors());

const dbname = "proposal"
const mongoURI = "mongodb+srv://rohansh:oajYzKJvFkbqCLOE@cluster0.jcroklm.mongodb.net/" + dbname + "?retryWrites=true&w=majority"
const conn = mongoose.createConnection(mongoURI)
mongoose.connect("mongodb+srv://rohansh:oajYzKJvFkbqCLOE@cluster0.jcroklm.mongodb.net/" + dbname + "?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads')

})
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });



// endpoint for updating client proposal including its attachments to mongoDB

app.post("/insert", upload.any('file'), async(req, res) => {


    res.json({ file: req.files })
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;
    // res.json({ file: req.file })
    const title = req.body.title;
    const description = req.body.description;
    const email = req.body.email;
    const status = req.body.status;
    const institution = req.body.institution;
    const name = req.body.name;
    const phone_number = req.body.phone_number;
    var fileString = ''
    for (let i = 0; i < req.files.length; i++) {
        fileString += `${req.files[i].id},`
    }
    // const file = req.file.path;
    const proposal = new proposalModel({ title: title ? title : "Not Provided", description: description ? description : "Not Provided", email: email ? email : "Not Provided", date: date, status: "open", institution: institution ? institution : "Not Provided", name: name ? name : "Not Provided", phone_number: phone_number ? phone_number : "Not Provided", file: fileString });
    proposal.save().then(res => {
            res.send({
                message: "Proposal Added Successfully!"
            })
        })
        .catch(err => {
            console.log(err)
        })
        // try {
        //     await proposal.save();
        //     res.send("inserted data");
        // } catch (err) {
        //     console.log(err);
        // }
});

// grab all data from database
app.get("/read", async(req, res) => {
    try {
        proposalModel.find({}, (err, result) => {
            if (err) {
                res.send(err);
            }

            res.send(result);
        })
    } catch (err) {
        console.log(err);
    }
});

// grab one proposal data by id
app.get("/fetchById/:id", async(req, res) => {
    try {
        const id = req.params.id;
        proposalModel.find({ _id: mongoose.Types.ObjectId(id) }, (err, result) => {
            if (err) {
                res.send(err);
            }


            res.send(result);
        })
    } catch (err) {
        res.send("Proposal Does not Exist.");
    }
});

// update status of proposal
app.put("/update", async(req, res) => {
    try {
        const newStatus = req.body.newStatus;
        const id = req.body.id;
        await proposalModel.findById(id, (err, updatedStatus) => {
            updatedStatus.status = newStatus;
            updatedStatus.save();
            res.send("update");
        });
    } catch (err) {
        console.log(err);
    }
});

// app.delete("/delete/:id", async(req, res)=>{
//     try {
//         const id = req.params.id;
//         await foodModel.findByIdAndRemove(id).exec();
//         res.send("deleted");
//     } catch(err) {
//         console.log(err);
//     }
// });





app.listen(3001, () => {
    console.log("server running on port 3001...");
});