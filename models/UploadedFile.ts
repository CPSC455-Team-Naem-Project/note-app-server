import {model, Schema, Types} from 'mongoose';

interface IUploadedNoteFile {
    fileName: string;
    contentType: string;
    size: number;
    url: string;
}

interface IUploadedNoteCourse {
    name: string;
    className: string;
    label: string;
    _id: any;
}

interface IUploadedNote {
    _id?: string;
    userId: string;
    userEmail: string;
    userDisplayName: string;
    files: IUploadedNoteFile[];
    title: string;
    course: IUploadedNoteCourse;
    visibility: boolean;
    rating: number;
}

const UploadedNoteCourse = new Schema<IUploadedNoteCourse>({
    name: { type: String, required: true},
    className: { type: String, required: true},
    label: { type: String, required: true},
    _id: { type: Object, required: true }
})

const UploadedNoteFile = new Schema<IUploadedNoteFile>({
    fileName: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    contentType: { type: String, required: true }
});


const UploadedNoteSchema = new Schema<IUploadedNote>({
    userEmail: { type: String, required: true },
    userDisplayName: { type: String, required: true },
    userId: { type: String, required: true },
    files: { type: [UploadedNoteFile], required: true },
    title: {type: String, required: true},
    course: {type: UploadedNoteCourse, required: true},
    visibility: {type: Boolean, required: true},
    rating: {type: Number, required: true},
})

export {UploadedNoteSchema, IUploadedNote}
