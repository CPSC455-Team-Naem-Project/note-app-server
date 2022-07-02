// import UserNoteModel from "./models/UserNoteModel";

import {UserNote} from "./models/UserNote";

const db = require('./models/db')


describe('Array', function () {
    it('should return -1 when the value is not present', async function () {
        const r = await UserNote.findById('62b7a9f6fa8adbd0adf3d509', {"notes": true}).exec()
        console.log(r)
    });

    it('should create a new user note', async function () {
        const s = await UserNote.saveNote({
            "userId": "62b7a9f6fa8adbd0adf3d509",
            "userDisplayName": "Jimmy Palelil",
            "userEmail": "jimmypalelil@gmail.com",
            "fileName": "husky.png",
            "size": 1234,
            "url": "https://abc.com/image.png",
            "title": "my note",
            "course": "cpsc 1230",
            "visibility": true,
            "rating": 3,
            "contentType": "application/jpg"
        });
        console.log((s as any).notes.length)
    });

    it('should get a user note', async function () {
        const userId = '62b7a9f6fa8adbd0adf3d509';
        const noteId = '62bfbc0f6b1507589ca09c6b'
        const r = await UserNote.getNote(userId, noteId);
        console.log(r)
    });

    it('should update a user note', async function () {
        const r = await UserNote.editNote(
            {
                userEmail: 'jimmypalelil@gmail.com',
                userDisplayName: 'Jimmy Palelil',
                userId: '62b7a9f6fa8adbd0adf3d509',
                fileName: 'husky.png',
                url: 'https://abc.com/image.png',
                size: 1234,
                contentType: 'application/jpg',
                title: 'my UPDATED note',
                course: 'cpsc 410',
                visibility: true,
                rating: 3,
                _id: "62bfb46e2228e4a7e89d7ff0",
            });
        console.log(r)
    });

    it('should remove a user note', async function () {
        const userId = '62b7a9f6fa8adbd0adf3d509';
        const noteId = '62bfd2f84d12cc365fd9ad7e'
        const r = await UserNote.removeNote(userId, noteId);
        console.log(r)
    });
});
