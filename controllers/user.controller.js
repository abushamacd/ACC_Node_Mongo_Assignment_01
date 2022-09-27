const fs = require("fs");
const url = require("url");
const allUsers = fs.readFileSync("user.json", "utf8");
let parsedUsers = JSON.parse(allUsers);

module.exports.getAllUsers = (req, res) => {
  res.status(200).json({
    success: true,
    message: "success",
    data: JSON.parse(allUsers),
  });
};

module.exports.getRandomUser = (req, res) => {
  const length = parsedUsers.length - 1;
  const randomNumber = () => {
    const number = Math.round(Math.random() * 100);
    if (number > length) {
      randomNumber();
    } else {
      const randomId = number;
      let randomUser = [];
      const randomData = parsedUsers[randomId];
      randomUser.push(randomData);
      res.status(200).json({
        success: true,
        message: "success",
        // data: JSON.parse(data),
        data: randomUser,
      });
    }
  };
  randomNumber();
};

module.exports.saveUser = (req, res) => {
  let userData = req.body[0];

  let idArray = [];
  let newUser = [];
  for (const user of parsedUsers) {
    newUser.push(user);
    idArray.push(user.id);
  }
  const newid = idArray.pop() + 1;
  userData.id = newid;
  newUser.push(userData);
  const stringfiedUser = JSON.stringify(newUser);
  console.log(stringfiedUser);
  fs.writeFileSync("user.json", stringfiedUser);
  res.status(200).json({
    success: true,
    message: "success",
  });
};

module.exports.deleteUser = (req, res) => {
  const { id } = req.query;
  // console.log(Number(id));
  console.log(parsedUsers);
  parsedUsers = parsedUsers.filter(
    (parsedUser) => parsedUser.id !== Number(id)
  );
  console.log(parsedUsers);

  const stringfiedUser = JSON.stringify(parsedUsers);

  fs.writeFileSync("user.json", stringfiedUser);
  res.status(200).json({
    success: true,
    message: "success",
    data: "User delete",
  });
};
