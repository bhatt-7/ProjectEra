const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectFileSchema = new Schema({
    filename: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
    },
    // fileType: {
    //     type: String,
    //     required: true,
    // },
    // uploadedBy: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        maxlength: 500,
    },
    tags: [String],
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    }
}, { timestamps: true });

const ProjectFile = mongoose.model('ProjectFile', projectFileSchema);

module.exports = ProjectFile;
