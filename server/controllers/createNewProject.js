const multer = require('multer');
const Project = require('../models/projectModel');
const ProjectFile = require('../models/projectFile');
const User = require('../models/User');
const archiver = require('archiver');
const fs = require('fs');
// Multer configuration

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename for the uploaded file
    }
});

const upload = multer({ storage: storage });
const updateProjectFiles = async (projectId, deletedFileId) => {
    try {
        const project = await Project.findById(projectId);

        if (!project) {
            throw new Error('Project not found');
        }

        project.files = project.files.filter(file => file.toString() !== deletedFileId.toString());

        await project.save();

        return project;
    } catch (error) {
        throw new Error(`Error updating project files: ${error.message}`);
    }
};
// Controller function to create a new project
exports.createNewProject = async (req, res) => {
    try {
        const userId = req.user.id; // Corrected access to user ID
        const { name, description } = req.body;
        const files = req.files; // Array of files uploaded using multer

        // Create a new project
        const userDetail = await User.findById(userId);
        const project = new Project({
            name,
            description,
            user: userId
        });
        console.log(`project id is -> ${project._id}`)
        // Save each uploaded file to the database
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const projectFile = new ProjectFile({
                filename: file.originalname,
                path: file.path, // Path where the file is stored on the server
                project: project._id, // Reference to the newly created project
            });

            await projectFile.save();
            project.files.push(projectFile); // Add the file to the project  
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { projects: project._id } },
            { new: true }
        );
        console.log(`user details are-> ${userDetail}`);
        // Save the project to the database
        await project.save();

        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.downloadAllProjectFiles = async (req, res) => {
    try {
        const projectId = req.params.projectId;

        // Fetch all project files associated with the project ID
        const projectFiles = await ProjectFile.find({ project: projectId });

        if (!projectFiles || projectFiles.length === 0) {
            return res.status(404).json({ message: 'No files found for the project' });
        }

        // Create a new zip archive
        const zip = archiver('zip', { zlib: { level: 9 } });

        // Set response headers for zip file download
        res.set({
            'Content-Type': 'application/zip',
            'Content-Disposition': `attachment; filename="project_${projectId}_files.zip"`
        });

        // Pipe the zip archive to the response stream
        zip.pipe(res);

        // Add each project file to the zip archive
        for (const projectFile of projectFiles) {
            zip.append(fs.createReadStream(projectFile.path), { name: projectFile.filename });
        }

        // Finalize the zip archive
        zip.finalize();
    } catch (error) {
        console.error('Error downloading all project files:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.getAllProjects = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have user ID available in req.user

        // Find the user by ID to verify existence and retrieve their projects with populated files
        const user = await User.findById(userId).populate({
            path: 'projects',
            populate: {
                path: 'files',
                model: 'ProjectFile'
            }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ projects: user.projects });
    } catch (error) {
        console.error('Error retrieving projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};