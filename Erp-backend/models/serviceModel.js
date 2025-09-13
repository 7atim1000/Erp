const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    
    category :{ type: String, required: [true, 'category field is required']},
    serviceName :{ type: String, required: [true, 'name field is required']},
    price :{ type: Number, required: true},
    buyingPrice :{ type: Number, required: true},
    qty :{ type: Number, required: true},
    unit :{ type: String, required: true},

    serviceNo :{ type: String },
    status: { type: String, default: 'Available'},
    image: {type: String},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default : null}

}, { timestamps :true})

module.exports = mongoose.model('Service', serviceSchema);
