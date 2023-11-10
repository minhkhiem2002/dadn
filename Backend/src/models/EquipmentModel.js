const mongoose = require('mongoose')

const equipSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        status: {type: Number, required: true, defaultValue: 0},
        date_add: {type: Date, required: true},
        image: {type: String, required: true},
        farmId: {type: mongoose.Schema.Types.ObjectId, required: true},
        description: {type: String, required: true},
        min: {type: Number, required: true, default: 0},
        min_action: {type: String},
        max: {type: Number, required: true, default: 0},
        max_action: {type: String},
        auto: {type: Number, required: true, default: 0},
    },
    {
        timestamps: true,
    }
);
const Equipment = mongoose.model('Equipment',equipSchema);

module.exports = Equipment;