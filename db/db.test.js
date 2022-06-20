const { connect,  postUser,  disconnect } = require('./db');
const User = require('../api/model/user.js');
const mongoose = require("mongoose");

jest.mock('./db.js');

describe("DB Functions", () => {
    test("As a user I want to post a user to MongodDB", async () => {
        const newUser = User({
            _id: mongoose.Types.ObjectId(),
            firstName: 'Tatiana',
            email: 'tmmillsap@student.fullsail.edu',
            password: 'Apollo',
        });

        await connect();
        const user = await postUser(newUser);
        expect(user.firstName).toEqual('Tatiana');
        expect(user.email).toEqual('tmmillsap@student.fullsail.edu');
        expect(user.password).toEqual('Apollo');
        await disconnect();
    });
});