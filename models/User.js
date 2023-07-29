const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    address : {type: String, default: ''},
    pincode : {type: String, default: ''},
    phone : {type: String, default: ''},
    password : {type: String, required: true}
}, {timestamps: true})

// mongoose.models = {}

export default mongoose.models.User || mongoose.model("User", userSchema);
// export default mongoose.model("User", userSchema);