const request = require("supertest");
const app = require("../src/app");

describe("Queue API", () => {

    test("GET /api/queues without token should return 401", async () => {

        const res = await request(app)
            .get("/api/queues");

        expect(res.statusCode).toBe(401);
    });

    test("POST /api/queues without token should return 401", async () => {

        const res = await request(app)
            .post("/api/queues")
            .send({
                name: "Test Queue",
                priority: 1,
                concurrency: 2,
                projectId: 1
            });

        expect(res.statusCode).toBe(401);
    });

});