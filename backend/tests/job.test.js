const request = require("supertest");
const app = require("../src/app");

describe("Job API", () => {

    test("GET /api/jobs without token should return 401", async () => {

        const res = await request(app)
            .get("/api/jobs");

        expect(res.statusCode).toBe(401);
    });

    test("POST /api/jobs without token should return 401", async () => {

        const res = await request(app)
            .post("/api/jobs")
            .send({
                title: "Test Job",
                description: "Testing"
            });

        expect(res.statusCode).toBe(401);
    });

});