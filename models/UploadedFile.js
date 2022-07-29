"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadedNoteSchema = void 0;
var mongoose_1 = require("mongoose");
var UploadedNoteCourse = new mongoose_1.Schema({
    name: { type: String, required: true },
    className: { type: String, required: true },
    label: { type: String, required: true },
    _id: { type: Object, required: true }
});
var UploadedNoteFile = new mongoose_1.Schema({
    fileName: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    contentType: { type: String, required: true }
});
var UploadedNoteSchema = new mongoose_1.Schema({
    userEmail: { type: String, required: true },
    userDisplayName: { type: String, required: true },
    userId: { type: String, required: true },
    files: { type: [UploadedNoteFile], required: true },
    title: { type: String, required: true },
    course: { type: UploadedNoteCourse, required: true },
    visibility: { type: Boolean, required: true },
});
exports.UploadedNoteSchema = UploadedNoteSchema;
//# sourceMappingURL=UploadedFile.js.map