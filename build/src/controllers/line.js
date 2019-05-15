'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _line = require('../models/line');

var _line2 = _interopRequireDefault(_line);

var _client = require('../models/client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lines = function () {
  function Lines() {
    _classCallCheck(this, Lines);
  }

  _createClass(Lines, null, [{
    key: 'create',
    value: function create(req, res) {
      var name = req.body.name;

      return _line2.default.create({ name: name, companyId: req.params.id }).then(function (line) {
        return res.status(201).send(line);
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: 'list',
    value: function list(req, res) {
      _line2.default.find({}).then(function (line) {
        res.json(line);
      });
    }
  }, {
    key: 'update',
    value: function update(req, res) {
      var name = req.body.name;

      return _line2.default.findByIdAndUpdate(req.params.id, { $set: { name: name } }).then(function (line) {
        return res.status(201).send(line);
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: 'destroy',
    value: function destroy(req, res) {
      return _line2.default.findByIdAndRemove(req.params.id).then(function (line) {
        return res.status(201).send(line);
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: 'list_per_company',
    value: function list_per_company(req, res) {
      _line2.default.find({ companyId: req.params.id }).then(function (lines) {
        res.json(lines);
      });
    }
  }, {
    key: 'join',
    value: function join(req, res) {
      var _this = this;

      _line2.default.findById(req.params.lineId).then(function (line) {
        _client2.default.create({ position: line.clients.length, number: line.currentNumber, lineId: req.params.lineId }).then(function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(client) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    line.clients.push(client._id);
                    line.currentNumber += 1;
                    _context.next = 4;
                    return line.save();

                  case 4:
                    res.status(201).send({ line: line, client: client });

                  case 5:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }()).catch(function (error) {
          return res.status(400).send(error);
        });
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: 'next',
    value: function next(req, res) {
      var clientId = req.body.clientId;

      _line2.default.findById(req.params.lineId).then(function (line) {
        if (line.clients.length === 0) {
          res.status(204).send();
        } else {
          if (line.attending.indexOf(clientId) > -1) {
            line.attending.splice(line.clients.indexOf(clientId), 1);
          }
          var client = line.clients.shift();
          line.attending.push(client._id);
          line.save();
          res.status(201).send(client);
        }
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: 'out',
    value: function out(req, res) {
      _line2.default.findById(req.params.lineId).then(function (line) {
        if (line.clients.indexOf(req.params.userId) === -1) {
          res.status(404).send();
        } else {
          line.clients.splice(line.clients.indexOf(req.params.userId), 1);
          line.save();
          res.status(200).send();
        }
      });
    }
  }, {
    key: 'joinAttendant',
    value: function joinAttendant(req, res) {
      var _this2 = this;

      var attendantId = req.body.attendantId;

      _line2.default.findById(req.params.lineId).then(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(line) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  line.attendants.push(attendantId);
                  _context2.next = 3;
                  return line.save();

                case 3:
                  res.status(201).send(line);

                case 4:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }()).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }]);

  return Lines;
}();

exports.default = Lines;