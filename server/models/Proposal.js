const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    institution: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    phone_number: {
        type: String,
        required: false,
    },
    fileId: {
        type: String,
        required: false,
    },
    fileName: {
        type: String,
        required: false,
    },
});

const Proposal = mongoose.model("Proposal", ProposalSchema);
module.exports = Proposal;