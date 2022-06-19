const express = require('express');
const request = require('supertest');
const userRoute = require("./userRoute");

const app = express();
app.use(express.json());
app.use(userRoute);

describe("Test User Routes", () => {
    test("Get Profile", async () => {
        await request(app)
            .get('./profile')
            .expect(200)
            .then(response =>{
                expect(response.body.message).toEqual('User Profile - GET');
                expect(response.body.hostname).toEqual('127.0.0.1');
            });
    });
});