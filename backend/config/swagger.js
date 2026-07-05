const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Distributed Job Scheduler API",
            version: "1.0.0",
            description: "API Documentation"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },

    apis: ["./routes/*.js"]
};

module.exports = swaggerJsdoc(options);