"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var dbURI = 'mongodb+srv://admin:admin@cluster0.vlhjf.mongodb.net/NotesApp?retryWrites=true&w=majority';
(0, mongoose_1.connect)(dbURI).then(function () { return console.log('Connected'); });
mongoose_1.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});
// When the connection is disconnected
mongoose_1.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
process.on('SIGINT', function () {
    mongoose_1.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
//# sourceMappingURL=db.js.map