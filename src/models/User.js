const { Schema, model, MongooseError, Types } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, "Invalid email"],
        minLength: [10, 'Email should be at least 10 characters'],
    },
    password: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9]+$/, 'Password should be alphanumeric'],
        minLength: [6, 'Password should be at least 6 characters']
    },
});

userSchema.pre("save", async function () {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
});

userSchema.virtual("rePassword").set(function (value) {
    // Validate
    if (value !== this.password) {
        throw new MongooseError("Password missmatch!");
    }
});

const User = model("User", userSchema);

module.exports = User;
