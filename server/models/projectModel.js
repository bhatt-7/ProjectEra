const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxlength: 1000,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed', 'On Hold'],
        default: 'Not Started',
    },
    teamMembers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    files: [{ type: Schema.Types.ObjectId, ref: 'ProjectFile' }],
    tags: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
