const User = require("../models/User");
const BoardController = require("./board");

exports.createUser = (req, res) => {
  const { userName, gender, boardId, isAdmin } = req.body;

  const user = new User({
    userName,
    gender,
    boardId,
    isAdmin,
  });

  user.save((error, _user) => {
    if (error) return res.status(400).json({ error: error });
    if (_user) {
      return res.status(201).json({ id: _user._id });
    }
  });
};

exports.getAllUsers = (req, res) => {
  User.find((err, users) => {
    if (err) return res.status(400).send(err);
    else return res.status(200).send(users);
  });
};

exports.getUsersByBoardId = (req, res) => {
  User.find({ boardId: req.params.boardId }, (err, users) => {
    if (err) return res.status(400).send(err);
    else return res.status(200).send(users);
  });
};

exports.getUserById = (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) return res.status(400).send(err);
    else {
      return res.status(200).send(user);
    }
  });
};

exports.getUserByIdAndBoardId = (req, res) => {
  User.findOne(
    { _id: req.params.id, boardId: req.params.boardId },
    (err, user) => {
      if (err) return res.status(400).send(err);
      else {
        return res.status(200).send(user);
      }
    }
  );
};

exports.setBoardPoint = (req, res) => {
  //console.log("req.body =>", req.body.boardPoint);
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { boardPoint: req.body.boardPoint },
    (err, _res) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(true);
    }
  );
};

exports.clearAllUsersPoint = (req, res) => {
  User.updateMany(
    { boardId: req.params.boardId },
    { boardPoint: 0 },
    (err, _res) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(true);
    }
  );
};

exports.deleteUserById = (req, res) => {
  User.deleteOne({ _id: req.params.userId }, (err, _res) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(true);
  });
};
// exports.updateUser = (req, res) => {
//   const { firstName, lastName, dob, phone, address, email, uid } = req.body;
//   User.updateOne(
//     { uid: req.body.uid },
//     { firstName, lastName, dob, phone, address, email, uid },
//     (err, user) => {
//       if (err) return res.status(400).send(err);
//       else return res.status(200).send(user);
//     }
//   );
// };
