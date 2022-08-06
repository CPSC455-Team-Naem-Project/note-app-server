"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNote = exports.UserNoteSchema = void 0;
var mongoose_1 = require("mongoose");
var UploadedFile_1 = require("./UploadedFile");
var UserNoteSchema = new mongoose_1.Schema({
    _id: { type: String, required: false },
    userDisplayName: { type: String, required: true },
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    notes: [UploadedFile_1.UploadedNoteSchema],
    savedNotes: [UploadedFile_1.UploadedNoteSchema],
    followers: { type: [String], required: true },
    following: { type: [String], required: true },
    pro: { type: Boolean, required: false, default: false },
});
exports.UserNoteSchema = UserNoteSchema;
UserNoteSchema.static('saveNote', function saveNote(note) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("SAVING NOTE", note);
                    return [4 /*yield*/, this.findByIdAndUpdate(note.userId, { $push: { notes: note } }, {
                            upsert: true,
                            returnDocument: 'after'
                        })];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data.notes[data.notes.length - 1]];
            }
        });
    });
});
UserNoteSchema.static('saveNotes', function saveNotes(userId, notes) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.findByIdAndUpdate(userId, { $push: { notes: { $each: notes } } }, {
                        upsert: true,
                        returnDocument: 'after'
                    })];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data.notes];
            }
        });
    });
});
UserNoteSchema.static('removeNote', function removeNote(userId, noteId) {
    return this.findByIdAndUpdate(userId, { $pull: { notes: { _id: noteId } } }, { returnDocument: 'after' });
});
UserNoteSchema.static('getNote', function getNote(userId, noteId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.findOne({ _id: userId, "notes._id": noteId }, {
                        _id: false,
                        "notes.$": 1
                    }).exec()];
                case 1:
                    data = _a.sent();
                    res = data.notes[0];
                    res.userId = data.userId;
                    res.userEmail = data.userEmail;
                    res.userDisplayName = data.userDisplayName;
                    return [2 /*return*/, res];
            }
        });
    });
});
UserNoteSchema.static('saveNoteToSavedNotes', function saveNoteToSavedNotes(note) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.findByIdAndUpdate(note.userId, { $push: { savedNotes: note } }, {
                        upsert: true,
                        returnDocument: 'after'
                    })];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data.savedNotes[data.savedNotes.length - 1]];
            }
        });
    });
});
UserNoteSchema.static('editNote', function editNote(note) {
    return this.findOneAndUpdate({ _id: note.userId, "notes._id": note._id }, { $set: { "notes.$": note } })
        .exec();
});
UserNoteSchema.static('findPublicNotes', function findPublicNotes() {
    return __awaiter(this, void 0, void 0, function () {
        var data, allNotes, allNotesArray, publicNotes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.find({ "notes.visibility": true }).exec()];
                case 1:
                    data = _a.sent();
                    console.log("DATA IS", data);
                    allNotes = data.map(function (note) { return note.notes; });
                    allNotesArray = allNotes.flat();
                    console.log("ALL NOTES", allNotesArray);
                    publicNotes = allNotesArray.filter(function (note) { return note.visibility === true; });
                    return [2 /*return*/, publicNotes];
            }
        });
    });
});
UserNoteSchema.static('getMostRecentNotes', function getMostRecentNotes() {
    return __awaiter(this, void 0, void 0, function () {
        var allPublicNotes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.findPublicNotes()];
                case 1:
                    allPublicNotes = _a.sent();
                    return [2 /*return*/, allPublicNotes];
            }
        });
    });
});
UserNoteSchema.static('addFollower', function addFollower(userId, followerId) {
    var _this = this;
    var displayName = "User " + followerId + " something else";
    this.findById(followerId)
        .then(function (data) {
        if (data.notes.length > 0) {
            displayName = data.notes[0].userDisplayName;
        }
        return _this.findOneAndUpdate({ _id: userId }, { $push: { "following": displayName } })
            .exec();
    });
});
UserNoteSchema.static('addToFollowersList', function addToFollowersList(userId, followerId) {
    var _this = this;
    var displayName = "User " + followerId;
    this.findById(userId)
        .then(function (data) {
        if (data.notes.length > 0) {
            displayName = data.notes[0].userDisplayName;
        }
        return _this.findOneAndUpdate({ _id: followerId }, { $push: { "followers": displayName } })
            .exec();
    });
});
UserNoteSchema.static('removeFollower', function removeFollower(userId, followerName) {
    return this.findOneAndUpdate({ _id: userId }, { $pull: { "followers": followerName } })
        .exec();
});
UserNoteSchema.static('removeFollowing', function removeFollowing(userId, followingName) {
    return this.findOneAndUpdate({ _id: userId }, { $pull: { "following": followingName } })
        .exec();
});
UserNoteSchema.static('addPro', function addPro(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("ID IS", userId);
                    return [4 /*yield*/, this.findByIdAndUpdate(userId, { $set: { "pro": true } }, {
                            upsert: true,
                            returnDocument: 'after'
                        })];
                case 1:
                    temp = _a.sent();
                    console.log("TEMP IS");
                    return [2 /*return*/, temp];
            }
        });
    });
});
UserNoteSchema.static('getPro', function getPro(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("ID IS", userId);
                    return [4 /*yield*/, this.findOne({ _id: userId }).exec()];
                case 1:
                    temp = _a.sent();
                    return [2 /*return*/, temp.pro];
            }
        });
    });
});
var UserNote = (0, mongoose_1.model)('UserNote', UserNoteSchema);
exports.UserNote = UserNote;
//# sourceMappingURL=UserNote.js.map