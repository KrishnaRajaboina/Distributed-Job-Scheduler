const request = require("supertest");
const app = require("../src/app");

describe("Metrics API", () => {

    test("GET /api/metrics without token should return 401", async () => {

        const res = await request(app)
            .get("/api/metrics");

        expect(res.statusCode).toBe(401);
    });

});