import {model, Schema, Types} from 'mongoose';
import {IUploadedFile} from "./UploadedFile";

interface IUserFile {
    _id: Types.ObjectId;
    userDisplayName: string;
    userId: string;
    userEmail: string;
    files: IUploadedFile[];
}

const UploadedFileSchema = new Schema<IUploadedFile>({
    fileName: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    contentType: { type: String, required: true },
})


const UserFileSchema = new Schema<IUserFile>({
    userDisplayName: { type: String, required: true },
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    files: [UploadedFileSchema]
});

const UserFile  = model<IUserFile>('UserFile', UserFileSchema);

export {UserFile, UserFileSchema, UploadedFileSchema, IUserFile}
