const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

const Proposal = mongoose.model("Proposal", ProposalSchema);
module.exports = Proposal;