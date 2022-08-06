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
var UserNote_1 = require("../models/UserNote");
require('dotenv').config();
var express = require('express');
var router = express.Router();
var stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
//Auto deploy test
router.post('/upload', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var note;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.body);
                    return [4 /*yield*/, UserNote_1.UserNote.saveNote(req.body)];
                case 1:
                    note = _a.sent();
                    res.send(note);
                    return [2 /*return*/];
            }
        });
    });
});
router.post('/uploadMany', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, notes, userId, note;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(req.body);
                    _a = req.body, notes = _a.notes, userId = _a.userId;
                    return [4 /*yield*/, UserNote_1.UserNote.saveNotes(userId, notes)];
                case 1:
                    note = _b.sent();
                    res.send(note);
                    return [2 /*return*/];
            }
        });
    });
});
router.post('/uploadOne', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var note;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.body);
                    return [4 /*yield*/, UserNote_1.UserNote.saveNote(req.body)];
                case 1:
                    note = _a.sent();
                    res.send(note);
                    return [2 /*return*/];
            }
        });
    });
});
router.get('/getByUserIdAndNoteId/:userId/:noteId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, noteId, userId, note, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, noteId = _a.noteId, userId = _a.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, UserNote_1.UserNote.getNote(userId, noteId)];
            case 2:
                note = _b.sent();
                return [2 /*return*/, res.send(note)];
            case 3:
                e_1 = _b.sent();
                res.status(204).send();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/getAllNotesById/:userId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, data, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, UserNote_1.UserNote.findById(userId)];
            case 2:
                data = _a.sent();
                return [2 /*return*/, res.send(data.notes)];
            case 3:
                e_2 = _a.sent();
                res.status(204).send();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/getMostRecentNotes', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, UserNote_1.UserNote.getMostRecentNotes()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, res.send(data)];
            case 2:
                e_3 = _a.sent();
                res.status(204).send();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/getFollowersById/:userId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, data, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, UserNote_1.UserNote.findById(userId)];
            case 2:
                data = _a.sent();
                return [2 /*return*/, res.send(data.followers)];
            case 3:
                e_4 = _a.sent();
                res.status(204).send();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/getFollowingById/:userId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, data, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, UserNote_1.UserNote.findById(userId)];
            case 2:
                data = _a.sent();
                return [2 /*return*/, res.send(data.following)];
            case 3:
                e_5 = _a.sent();
                res.status(204).send();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/addFollowerById/:userId/:followerId', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userId, followerId, follower;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(req.body);
                    _a = req.params, userId = _a.userId, followerId = _a.followerId;
                    return [4 /*yield*/, UserNote_1.UserNote.addFollower(userId, followerId)];
                case 1:
                    follower = _b.sent();
                    res.send(follower);
                    return [2 /*return*/];
            }
        });
    });
});
router.post('/addToFollowersList/:userId/:followerId', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userId, followerId, follower;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(req.body);
                    _a = req.params, userId = _a.userId, followerId = _a.followerId;
                    return [4 /*yield*/, UserNote_1.UserNote.addToFollowersList(userId, followerId)];
                case 1:
                    follower = _b.sent();
                    res.send(follower);
                    return [2 /*return*/];
            }
        });
    });
});
router.post('/saveNote', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var note;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.body);
                    return [4 /*yield*/, UserNote_1.UserNote.saveNoteToSavedNotes(req.body)];
                case 1:
                    note = _a.sent();
                    res.send(note);
                    return [2 /*return*/];
            }
        });
    });
});
router.delete('/removeFollower/:userId/:followerName', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userId, followerName, follower;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(req.body);
                    _a = req.params, userId = _a.userId, followerName = _a.followerName;
                    return [4 /*yield*/, UserNote_1.UserNote.removeFollower(userId, followerName)];
                case 1:
                    follower = _b.sent();
                    res.send(follower);
                    return [2 /*return*/];
            }
        });
    });
});
router.delete('/removeFollowing/:userId/:followingName', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userId, followingName, follower;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(req.body);
                    _a = req.params, userId = _a.userId, followingName = _a.followingName;
                    return [4 /*yield*/, UserNote_1.UserNote.removeFollowing(userId, followingName)];
                case 1:
                    follower = _b.sent();
                    res.send(follower);
                    return [2 /*return*/];
            }
        });
    });
});
router.post('/editById', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).send;
                return [4 /*yield*/, UserNote_1.UserNote.editNote(req.body)];
            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); });
router.delete('/deleteByUserIdAndNoteId/:userId/:noteId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, noteId, userId, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.params, noteId = _a.noteId, userId = _a.userId;
                _c = (_b = res).send;
                return [4 /*yield*/, UserNote_1.UserNote.removeNote(userId, noteId)];
            case 1: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
        }
    });
}); });
router.get('/search', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var publicNotes, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, UserNote_1.UserNote.findPublicNotes()];
                case 1:
                    publicNotes = _a.sent();
                    return [2 /*return*/, res.send(publicNotes)];
                case 2:
                    e_6 = _a.sent();
                    res.status(204).send();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
router.post('/stripe-checkout', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var stripeSession, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("ID IS", req.body.id);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, stripe.checkout.sessions.create({
                            payment_method_types: ['card'],
                            mode: 'payment',
                            client_reference_id: req.body.id,
                            line_items: [{ price_data: {
                                        currency: 'cad',
                                        product_data: {
                                            name: "Professional mode"
                                        },
                                        unit_amount: 500
                                    },
                                    quantity: 1 }],
                            success_url: "".concat(process.env.SERVER_URL, "/stripe-checkout/success?session_id={CHECKOUT_SESSION_ID}"),
                            cancel_url: "".concat(process.env.SERVER_URL, "/stripe-checkout/failure?session_id={CHECKOUT_SESSION_ID}"),
                        })];
                case 2:
                    stripeSession = _a.sent();
                    return [2 /*return*/, res.send({ url: stripeSession.url })];
                case 3:
                    e_7 = _a.sent();
                    res.status(500).send(e_7.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
router.get('/stripe-checkout/success', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var session, added;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, stripe.checkout.sessions.retrieve(req.query.session_id)];
            case 1:
                session = _a.sent();
                return [4 /*yield*/, UserNote_1.UserNote.addPro(session.client_reference_id)];
            case 2:
                added = _a.sent();
                res.status(200).redirect("".concat(process.env.CLIENT_URL, "?success"));
                return [2 /*return*/];
        }
    });
}); });
///notes/stripe-checkout/success?session_id=cs_test_a1lqPJJ6d1SLSxCliLwIg6CLPn5wFYzWGq6H6OZEIAWkKmWoMj1Jx1F
///notes/stripe-checkout/failure?session_id=cs_test_a16TqWJ83NdsK82HzG1PMaw9fa2JkllZauYdCJbbDdQfuHX4tzwWaAK
router.get('/stripe-checkout/failure', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("HERE I AM");
        res.status(200).redirect("".concat(process.env.CLIENT_URL, "?failure"));
        return [2 /*return*/];
    });
}); });
router.get('/getpro/:userId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, hasPro;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("ROUTE PRO");
                userId = req.params.userId;
                return [4 /*yield*/, UserNote_1.UserNote.getPro(userId)];
            case 1:
                hasPro = _a.sent();
                console.log("FINISHED ROUTE", hasPro);
                return [2 /*return*/, res.send({ proStatus: hasPro })];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=notes.js.map