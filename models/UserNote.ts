import {Model, model, Schema, Types} from 'mongoose';
import {IUploadedNote, UploadedNoteSchema} from "./UploadedFile";
import Doc = Mocha.reporters.Doc;

interface IUserNote {
    _id: Types.ObjectId;
    userDisplayName: string;
    userId: string;
    userEmail: string;
    notes: IUploadedNote[];
}

interface UserNoteModel extends Model<IUserNote> {
    saveNote(note: IUploadedNote): Promise<Document>;
    removeNote(userId: string, noteId: string): Promise<Document>;
    getNote(userId: string, noteId: string): Promise<Document>;
    editNote(note: IUploadedNote): Promise<Document>;
}

const UserNoteSchema = new Schema<IUserNote, UserNoteModel>({
    userDisplayName: { type: String, required: true },
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    notes: [UploadedNoteSchema]
});

UserNoteSchema.static('saveNote', function saveNote(note: IUploadedNote) {
    return this.findByIdAndUpdate(note.userId, {$push: {notes: note}}, {upsert: true, returnDocument: 'after'})
});

UserNoteSchema.static('removeNote', function removeNote(userId: string, noteId: string) {
    // return this.findByIdAndUpdate(note.userId, {$pull: {notes: {$elemMatch: {"_id": note._id}}}}, {returnDocument: 'after'})
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
    return data.notes[0];
});

UserNoteSchema.static('editNote', function editNote(note: IUploadedNote, cb: any) {
    return  this.findOneAndUpdate(
        {_id: note.userId, "notes._id": note._id},
        {$set: {"notes.$": note}})
        .exec()
});

const UserNote = model<IUserNote, UserNoteModel>('UserNote', UserNoteSchema);

export {UserNoteSchema, UserNote}
