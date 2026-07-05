const prisma = require("../config/prisma");

const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        const project = await prisma.project.create({
            data: {
                name,
                description,
                userId: req.user.id
            }
        });

        res.status(201).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            where: {
                userId: req.user.id
            }
        });

        res.json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const project = await prisma.project.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                description
            }
        });

        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.project.delete({
            where: {
                id: Number(id)
            }
        });

        res.json({
            message: "Project deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    createProject,
    getProjects,
    updateProject,
    deleteProject
};