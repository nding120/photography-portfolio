const mongoose = require('mongoose');

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const portraitSchema = mongoose.Schema(
    {
        title: { type: String },
        desc: { type: String },
        path: { type: String, required: true },
    },
    schemaOptions
);

module.exports = mongoose.model('Portrait', portraitSchema);
