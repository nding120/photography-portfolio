const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const adminUserSchema = mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
    },
    schemaOptions
);

adminUserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('AdminUser', adminUserSchema);
