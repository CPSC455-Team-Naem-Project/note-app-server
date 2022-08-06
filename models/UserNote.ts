import {Model, model, Schema, Types} from 'mongoose';
import {IUploadedNote, UploadedNoteSchema} from "./UploadedFile";

interface IUserNote {
    _id: string;
    userDisplayName: string;
    userId: string;
    userEmail: string;
    notes: IUploadedNote[];
    savedNotes: IUploadedNote[];
    followers: string[];
    following: string[];
    pro: Boolean
}

interface UserNoteModel extends Model<IUserNote> {
    saveNote(note: IUploadedNote): Promise<Document>;
    saveNotes(userId: string, notes: IUploadedNote[]): Promise<Document>;
    removeNote(userId: string, noteId: string): Promise<Document>;
    getNote(userId: string, noteId: string): Promise<Document>;
    saveNoteToSavedNotes(note: IUploadedNote): Promise<Document>;
    editNote(note: IUploadedNote): Promise<Document>;
    findPublicNotes(): Promise<Document>;
    getSavedNotes(): Promise<Document>;
    addFollower(note: IUploadedNote, id: string): Promise<Document>;
    addToFollowersList(note: IUploadedNote, id: string): Promise<Document>;
    removeFollower(note: IUploadedNote, followerName: string): Promise<Document>;
    removeFollowing(note: IUploadedNote, followingName: string): Promise<Document>;
    getMostRecentNotes(): Promise<Document>;
    addPro(userId: string) :Promise<Document>;
    getPro(userId: string) :Promise<Document>;
}

const UserNoteSchema = new Schema<IUserNote, UserNoteModel>({
    _id: { type: String, required: false },
    userDisplayName: { type: String, required: true },
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    notes: [UploadedNoteSchema],
    savedNotes: [UploadedNoteSchema],
    followers: { type: [String], required: true },
    following: { type: [String], required: true },
    pro: { type: Boolean, required: false, default: false },
});

UserNoteSchema.static('saveNote', async function saveNote(note: IUploadedNote) {
    console.log("SAVING NOTE", note )
    const data = await this.findByIdAndUpdate(note.userId, {$push: {notes: note}}, {
        upsert: true,
        returnDocument: 'after'
    })
    return data.notes[data.notes.length - 1]
});

UserNoteSchema.static('saveNotes', async function saveNotes(userId: string, notes: IUploadedNote[]) {
    const data = await this.findByIdAndUpdate(userId, {$push: {notes: {$each: notes}}}, {
        upsert: true,
        returnDocument: 'after'
    })
    return data.notes
});

UserNoteSchema.static('removeNote', function removeNote(userId: string, noteId: string) {
    return this.findByIdAndUpdate(userId, {$pull: {notes: {_id: noteId}}}, {returnDocument: 'after'})
});

UserNoteSchema.static('getNote', async function getNote(userId: string, noteId: string) {
    const data = await this.findOne(
        {_id: userId, "notes._id": noteId},
        {
            _id: false,
            "notes.$": 1
        }
    ).exec()
    const res = data.notes[0];
    res.userId = data.userId;
    res.userEmail = data.userEmail;
    res.userDisplayName = data.userDisplayName;
    return res;

});

UserNoteSchema.static('saveNoteToSavedNotes', async function saveNoteToSavedNotes(note: IUploadedNote) {
    const data = await this.findByIdAndUpdate(note.userId, {$push: {savedNotes: note}}, {
        upsert: true,
        returnDocument: 'after'
    })
    return data.savedNotes[data.savedNotes.length - 1]
});

UserNoteSchema.static('editNote', function editNote(note: IUploadedNote) {
    return this.findOneAndUpdate(
        {_id: note.userId, "notes._id": note._id},
        {$set: {"notes.$": note}})
        .exec()
});

UserNoteSchema.static('findPublicNotes', async function findPublicNotes() {
    let data = await this.find({"notes.visibility":  true}).exec()
    console.log("DATA IS", data)
    let allNotes = data.map(note =>note.notes)
    let allNotesArray = allNotes.flat()
    console.log("ALL NOTES", allNotesArray)
    let publicNotes = allNotesArray.filter(note => note.visibility === true)
    return publicNotes
});

UserNoteSchema.static('getSavedNotes', async function getSavedNotes(userId: string) {
    console.log("Getting Saved Notes")
    let data = await this.findById(userId).exec();
    return data.savedNotes;
});

UserNoteSchema.static('getMostRecentNotes', async function getMostRecentNotes() {
    let allPublicNotes = await this.findPublicNotes();
    return allPublicNotes;
});

UserNoteSchema.static('addFollower', function addFollower(userId: string, followerId: string) {
    let displayName = "User " + followerId + " something else";
    this.findById(followerId)   
    .then((data) => {
        if (data.notes.length > 0) {
            displayName = data.notes[0].userDisplayName;
        }
        return this.findOneAndUpdate(
            {_id: userId},
            {$push: {"following": displayName}})
            .exec()
    });
});

UserNoteSchema.static('addToFollowersList', function addToFollowersList(userId: string, followerId: string) {
    let displayName = "User " + followerId;
    this.findById(userId)
    .then((data) => {
        if (data.notes.length > 0) {
            displayName = data.notes[0].userDisplayName;
        }
        return this.findOneAndUpdate(
            {_id: followerId},
            {$push: {"followers": displayName}})
            .exec()
    });
});

UserNoteSchema.static('removeFollower', function removeFollower(userId: string, followerName: string) {
    return this.findOneAndUpdate(
        {_id: userId},
        {$pull: {"followers": followerName}})
        .exec()
});

UserNoteSchema.static('removeFollowing', function removeFollowing(userId: string, followingName: string) {
    return this.findOneAndUpdate(
        {_id: userId},
        {$pull: {"following": followingName}})
        .exec()
});

UserNoteSchema.static('addPro', async function addPro(userId: string) {
    console.log("ID IS", userId)

    let temp = await this.findByIdAndUpdate(userId, {$set: {"pro": true}}, {
        upsert: true,
        returnDocument: 'after'
    })
    console.log("TEMP IS")
    return temp
});

UserNoteSchema.static('getPro', async function getPro(userId: string) {
    console.log("ID IS", userId)

    let temp = await this.findOne({_id: userId}).exec()
         
return temp.pro
})

const UserNote = model<IUserNote, UserNoteModel>('UserNote', UserNoteSchema);

export {UserNoteSchema, UserNote}
