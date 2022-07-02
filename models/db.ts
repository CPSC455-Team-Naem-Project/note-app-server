import {connect, connection} from 'mongoose';

const dbURI = 'mongodb+srv://admin:admin@cluster0.vlhjf.mongodb.net/NotesApp?retryWrites=true&w=majority';

connect(dbURI).then(() => console.log('Connected'));


connection.on('error', (err: any) => {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
