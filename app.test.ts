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
            "files": [
                {
                    "fileName": "husky.png",
                    "size": 1234,
                    "url": "https://abc.com/image.png",
                    "contentType": "application/jpg"
                }
            ],
            "title": "my note",
            "course": {name: "cpsc 1230", label: "cpsc 1230", className: "CPSC1230", _id: 5},
            "visibility": true,
            "rating": 3,
            date: new Date().toDateString()
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
                "files": [
                    {
                        "fileName": "husky.png",
                        "size": 1234,
                        "url": "https://abc.com/image.png",
                        "contentType": "application/jpg"
                    }
                ],
                title: 'my UPDATED note',
                "course": {name: "cpsc 410", label: "cpsc 410", className: "CPSC410", _id: 6},
                visibility: true,
                rating: 3,
                _id: "62bfb46e2228e4a7e89d7ff0",
                date: new Date().toDateString()

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
