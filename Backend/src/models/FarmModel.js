const mongoose = require('mongoose')

const farmSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        address: {type: String, required:true},
        image: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;