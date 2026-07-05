const prisma = require("../config/prisma");

// Create Organization
const createOrganization = async (req, res) => {
    try {
        const { name, description } = req.body;

        const organization = await prisma.organization.create({
            data: {
                name,
                description,
                userId: req.user.id
            }
        });

        res.status(201).json(organization);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Get Organizations
const getOrganizations = async (req, res) => {
    try {
        const organizations = await prisma.organization.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                projects: true
            }
        });

        res.json(organizations);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Update Organization
const updateOrganization = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const organization = await prisma.organization.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                description
            }
        });

        res.json(organization);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Delete Organization
const deleteOrganization = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.organization.delete({
            where: {
                id: Number(id)
            }
        });

        res.json({
            message: "Organization deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    createOrganization,
    getOrganizations,
    updateOrganization,
    deleteOrganization
};