import {model, Schema, Types} from 'mongoose';

interface IUploadedFile {
    fileName: string;
    contentType: string;
    size: number;
    url: string;
}

const UploadedFileSchema = new Schema<IUploadedFile>({
    fileName: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    contentType: { type: String, required: true },
})

export {UploadedFileSchema, IUploadedFile}
