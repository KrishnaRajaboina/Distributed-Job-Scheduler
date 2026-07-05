const request = require("supertest");
const app = require("../src/app");

describe("Worker API", () => {

    test("GET /api/workers without token should return 401", async () => {

        const res = await request(app)
            .get("/api/workers");

        expect(res.statusCode).toBe(401);
    });

    test("POST /api/workers without token should return 401", async () => {

        const res = await request(app)
            .post("/api/workers")
            .send({
                name: "Worker-Test"
            });

        expect(res.statusCode).toBe(401);
    });

});