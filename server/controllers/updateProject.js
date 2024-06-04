const multer = require('multer');
const Project = require('../models/projectModel');
const ProjectFile = require('../models/projectFile');
const User = require('../models/User');

exports.deleteProject = async (req, res) => {
    const userId = req.user.id;
    const projectId = req.params.projectId;

    try {
        // Find the project by ID
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project Not found",
            });
        }

        // Retrieve the IDs of project files associated with the project
        const projectFileIds = project.files.map(file => file._id);

        // Delete each project file from the database
        await ProjectFile.deleteMany({ _id: { $in: projectFileIds } });


        const updateProject = await User.findByIdAndUpdate(
            project.user,
            { $pull: { projects: projectId } },
            { new: true }
        );

        // Delete the project itself
        await Project.findByIdAndDelete(projectId);

        return res.status(200).json({
            success: true,
            message: "Project and associated files deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to delete project",
        });
    }
};


exports.deleteProjectFile = async (req, res) => {
    const projectId = req.params.projectId;
    const fileId = req.params.fileId;

    try {
        // Find the project by ID
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        // Find the project file by ID
        const projectFile = await ProjectFile.findById(fileId);

        if (!projectFile) {
            return res.status(404).json({
                message: "Project file not found",
            });
        }

        // Ensure the project file is associated with the project
        if (projectFile.project.toString() !== projectId) {
            return res.status(400).json({
                message: "Project file is not associated with the project",
            });
        }

        // Remove the project file from the project's files array
        project.files = project.files.filter(file => file.toString() !== fileId);

        // Save the updated project
        await project.save();

        // Delete the project file
        await ProjectFile.findByIdAndDelete(fileId);

        return res.status(200).json({
            success: true,
            message: "Project file deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to delete project file",
        });
    }
};
