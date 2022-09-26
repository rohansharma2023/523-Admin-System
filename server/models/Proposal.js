const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: Number,
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

const Proposal = mongoose.model("proposal", ProposalSchema);
module.exports = Proposal;