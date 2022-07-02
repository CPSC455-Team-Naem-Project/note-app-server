import {model, Schema, Types} from 'mongoose';

interface IUploadedNote {
    _id?: string;
    userId: string;
    userEmail: string;
    userDisplayName: string;
    fileName: string;
    contentType: string;
    size: number;
    url: string;
    title: string;
    course: string;
    visibility: boolean;
    rating: number;
}

const UploadedNoteSchema = new Schema<IUploadedNote>({
    userEmail: { type: String, required: true },
    userDisplayName: { type: String, required: true },
    userId: { type: String, required: true },
    fileName: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    contentType: { type: String, required: true },
    title: {type: String, required: true},
    course: {type: String, required: true},
    visibility: {type: Boolean, required: true},
    rating: {type: Number, required: true},
})

export {UploadedNoteSchema, IUploadedNote}
