"use strict";

var express = require("express");

var router = express.Router();

var User = require("../../models/users");

var _require = require("express-validator"),
    check = _require.check,
    validationResult = _require.validationResult; // @route POST /api/users
// @desc add/update user
// @access public


router.post("/", [[check("userName", "User name is required").not().isEmpty()], [check("firstName", "First name is required").not().isEmpty()]], function _callee(req, res) {
  var errors, _req$body, id, userName, firstName, lastName, isActive, userData, user, userExists;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body = req.body, id = _req$body.id, userName = _req$body.userName, firstName = _req$body.firstName, lastName = _req$body.lastName, isActive = _req$body.isActive;
          userData = {};
          userData.userName = userName;
          userData.firstName = firstName;
          userData.isActive = isActive || true;
          if (lastName) userData.lastName = lastName;
          _context.prev = 9;
          user = {};

          if (!id) {
            _context.next = 16;
            break;
          }

          _context.next = 14;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            _id: id
          }, {
            $set: userData
          }, {
            "new": true
          }));

        case 14:
          user = _context.sent;
          return _context.abrupt("return", res.json(user));

        case 16:
          _context.next = 18;
          return regeneratorRuntime.awrap(User.find({
            userName: userName
          }, {
            _id: 1
          }).limit(1));

        case 18:
          userExists = _context.sent;

          if (!Boolean(userExists)) {
            _context.next = 21;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: 'userName exists!'
          }));

        case 21:
          user = new User(userData);
          user.save();
          res.json(user);
          _context.next = 29;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](9);
          res.status(500).send(_context.t0, "Server error");

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[9, 26]]);
}); // @route 						GET /api/users
// @description       get all users
// @access 						public

router.get("/", function _callee2(req, res) {
  var _req$query, p, r, users, total;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$query = req.query, p = _req$query.p, r = _req$query.r;
          page = parseInt(p) + 1;
          pageCount = parseInt(r);
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.find().skip((page - 1) * pageCount).limit(pageCount).sort({
            createdAt: -1
          }));

        case 6:
          users = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(User.find().countDocuments(true));

        case 9:
          total = _context2.sent;
          res.json({
            users: users,
            totalCount: total
          });
          _context2.next = 17;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0.message);
          res.status(500).send("Server error");

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); // @route 						GET /api/users/:id
// @description       get user by ID
// @access 						public

router.get("/:id", function _callee3(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 3:
          user = _context3.sent;

          if (!user) {
            res.status(404).json({
              msg: "User not found"
            });
          }

          res.json(user);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.status(500).send("Server error");

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // @route 						DELETE /api/users/:id
// @description       delete a user
// @access 						public

router["delete"]("/:id", function _callee4(req, res) {
  var user, removeUser;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 3:
          user = _context4.sent;

          if (user) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            msg: "user not found"
          }));

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            _id: req.params.id
          }, {
            $set: {
              isActive: false
            }
          }));

        case 8:
          removeUser = _context4.sent;
          res.json({
            msg: "User removed"
          });
          _context4.next = 18;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0.message);

          if (!(_context4.t0.kind === "ObjectId")) {
            _context4.next = 17;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            msg: _context4.t0.message
          }));

        case 17:
          res.status(500).json({
            msg: "Server error",
            error: _context4.t0
          });

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
module.exports = router;