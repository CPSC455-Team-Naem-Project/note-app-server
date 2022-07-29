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
var UserNote_1 = require("./models/UserNote");
var db = require('./models/db');
describe('Array', function () {
    it('should return -1 when the value is not present', function () {
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserNote_1.UserNote.findById('62b7a9f6fa8adbd0adf3d509', { "notes": true }).exec()];
                    case 1:
                        r = _a.sent();
                        console.log(r);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('should create a new user note', function () {
        return __awaiter(this, void 0, void 0, function () {
            var s;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserNote_1.UserNote.saveNote({
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
                            "course": { name: "cpsc 1230", label: "cpsc 1230", className: "CPSC1230", _id: 5 },
                            "visibility": true,
                            "rating": 3,
                            date: new Date().toDateString()
                        })];
                    case 1:
                        s = _a.sent();
                        console.log(s.notes.length);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('should get a user note', function () {
        return __awaiter(this, void 0, void 0, function () {
            var userId, noteId, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = '62b7a9f6fa8adbd0adf3d509';
                        noteId = '62bfbc0f6b1507589ca09c6b';
                        return [4 /*yield*/, UserNote_1.UserNote.getNote(userId, noteId)];
                    case 1:
                        r = _a.sent();
                        console.log(r);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('should update a user note', function () {
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserNote_1.UserNote.editNote({
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
                            "course": { name: "cpsc 410", label: "cpsc 410", className: "CPSC410", _id: 6 },
                            visibility: true,
                            rating: 3,
                            _id: "62bfb46e2228e4a7e89d7ff0",
                            date: new Date().toDateString()
                        })];
                    case 1:
                        r = _a.sent();
                        console.log(r);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('should remove a user note', function () {
        return __awaiter(this, void 0, void 0, function () {
            var userId, noteId, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = '62b7a9f6fa8adbd0adf3d509';
                        noteId = '62bfd2f84d12cc365fd9ad7e';
                        return [4 /*yield*/, UserNote_1.UserNote.removeNote(userId, noteId)];
                    case 1:
                        r = _a.sent();
                        console.log(r);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=app.test.js.map