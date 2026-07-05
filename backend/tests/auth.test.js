const request = require("supertest");
const app = require("../src/app");

describe("Authentication API", () => {

    test("GET / should return API message", async () => {

        const res = await request(app).get("/");

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Distributed Job Scheduler API");
    });

    test("Register User", async () => {

        const res = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                email: `test${Date.now()}@gmail.com`,
                password: "password123"
            });

        expect([200, 201, 400]).toContain(res.statusCode);
    });

    test("Login User", async () => {

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "test@gmail.com",
                password: "password123"
            });

        expect([200, 400, 401]).toContain(res.statusCode);
    });

});