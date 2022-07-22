const User = require("../models/User");
// const slugify = require("slugify");
// const shortId = require("shortid");

exports.createUser = (req, res) => {
  const { userName, gender } = req.body;

  const user = new User({
    userName,
    gender,
  });

  user.save((error, user) => {
    if (error) return res.status(400).json({ error: error });
    if (user) {
      return res.status(201).json({ user });
    }
  });
};

exports.getAllUsers = (req, res) => {
  User.find((err, users) => {
    if (err) return res.status(400).send(err);
    else return res.status(200).send(users);
  });
};

exports.getUserById = (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) return res.status(400).send(err);
    else {
      // console.log("getUSerByUid=>  uid=", req.params);
      return res.status(200).send(user);
    }
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
