const { connect,  saveUser,  disconnect } = require('./db');
const User = require("../api/model/user");
const mongoose = require("mongoose");

describe("DB Functions", () => {
    test("As a user I want to post a user to MongodDB", () => {
        const newUser = newUser({
            _id: mongoose.Types.ObjectId(),
            firstName: 'Tatiana',
            email: "tmmillsap@student.fullsail.edu",
            password: 'Apollo',
        });

        await connect();
        const user = await saveUser(newUser);
        expect(user.firstName).toEqual('Tatiana');
        expect(user.email).toEqual('tmmillsap@student.fullsail.edu');
        expect(user.password).toEqual('Apollo');
        await disconnect();
    });
});