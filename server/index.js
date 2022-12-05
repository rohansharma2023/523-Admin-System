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
const ObjectId = mongoose.Types.ObjectId;
const proposalModel = require("./models/Proposal");
const adminModel = require("./models/Admin")
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    })
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


    date = today.toString()
        // res.json({ file: req.file })
    const title = req.body.title;
    const description = req.body.description;
    const email = req.body.email;
    const status = req.body.status;
    const institution = req.body.institution;
    const name = req.body.name;
    const phone_number = req.body.phone_number;
    var fileString = ''
    var fileNames = ''

    for (let i = 0; i < req.files.length; i++) {
        fileString += `${req.files[i].id},`
        fileNames += `${req.files[i].originalname},`
    }
    // const file = req.file.path;
    const proposal = new proposalModel({ title: title ? title : "Not Provided", description: description ? description : "Not Provided", email: email ? email : "Not Provided", date: date, status: "open", institution: institution ? institution : "Not Provided", name: name ? name : "Not Provided", phone_number: phone_number ? phone_number : "Not Provided", fileId: fileString, fileName: fileNames });
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
// endpoint for downloading a specified attachment
app.post("/login", async(req, res) => {
    try {
        let result = await adminModel.exists({ username: req.body.username, password: req.body.password });
        res.send(result)

    } catch (err) {
        res.status(404).send(err)
    }
})

// endpoint for requesting download of an attachment
app.post("/download", async(req, res) => {
    gfs.files.findOne({ _id: ObjectId(req.body.fileId) }, function(err, file) {
        if (err) {
            return res.status(400).send(err);
        } else if (!file) {
            return res.status(404).send('Error on the database looking for the file.');
        }
        
        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
        
        const readStream = gridfsBucket.openDownloadStream(ObjectId(req.body.fileId));
        readStream.pipe(res);

        console.log("logging the res of download");
        console.log(res);
    });
})

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

// delete a specified proposal and its attachments
app.post("/delete", async(req, res) => {
    try {
        fileId = JSON.parse(req.body.fileId)
        await proposalModel.deleteOne({ _id: mongoose.Types.ObjectId(req.body.id) });
        if (fileId) {
            for (let i = 0; i < fileId.length; i++) {
                await gridfsBucket.delete(ObjectId(fileId[i]));
            }
        }

        res.send("deleted");
    } catch (err) {
        console.log(err);
    }
});





app.listen(3001, () => {
    console.log("server running on port 3001...");
});