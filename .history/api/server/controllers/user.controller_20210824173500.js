const db = require("../src/models");
const UserService = require("../service/user.service");
const InterestService = require("../service/interest.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = db;

const UserController = {
  // create new user account
  register: async (req, res) => {
    try {
      const { lastName, firstName, email, password, role } = req.body;

      const user = await UserService.getOneUser(email);
      // console.log(
      // "🚀 ~ file: user.controller.js ~ line 16 ~ register: ~ user",
      // user
      // );

      if (user)
        return res.status(400).json({ msg: "The email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters." });

      //Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        role,
      });

      //Save Postgres
      await newUser.save();

      //Then create jsonwebtoken to authentication
      const accessToken = createAccessToken({ id: newUser.id });
      const refreshToken = createRefreshToken({ id: newUser.id });

      //auto refresh token after the access token expired
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/users/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7d
      });

      res.json({ accessToken: accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // login to existed user account
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await UserService.getOneUser(email);
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Wrong password." });

      //If login success, create access token and refresh token
      const accessToken = createAccessToken({ id: user.id });
      const refreshToken = createRefreshToken({ id: user.id });

      //auto refresh token after the access token expired
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/users/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7d
      });

      res.json({ accessToken: accessToken });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // clear token to logout
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", { path: "/users/refresh_token" });
      return res.json({ msg: "Logged Out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // get new token after access token expired
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });

        const accessToken = createAccessToken({ id: user.id });

        res.json({ accessToken });
      });

      // res.json({ rf_token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // get user information
  getUser: async (req, res) => {
    try {
      const user = await UserService.getUserInfo(req.user.id);

      return user
        ? res.status(200).json(user)
        : res.status(400).json({ msg: "User does not exist." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getTripsByUser: async (req, res) => {
    try {
      const trips = await UserService.getTripsByUser(req.user.id);
      console.log(
        "🚀 ~ file: user.controller.js ~ line 135 ~ getTripsByUser: ~ trips",
        trips
      );

      return trips
        ? res.status(200).json({ status: "success", data: trips })
        : res.status(404).json({
            status: "failure",
            msg: `Trips not found with User ${id}`,
          });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // add interest that user choose
  addInterest: async (req, res) => {
    try {
      const user = await UserService.getUserInfo(req.user.id);
      // console.log(
      // "🚀 ~ file: user.controller.js ~ line 131 ~ addInterest: ~ user",
      // user
      // );
      const interests = req.body.interests;
      /* 
      Add list of Interests 
    */
      for (const interest of interests) {
        const _interest = await InterestService.getInterestInfo(interest);
        await user.addInterest(_interest);
      }
<<<<<<< HEAD
      const interest = await InterestService.getInterestInfo(
        req.body.interest_id
      );
      // console.log(
      // "🚀 ~ file: user.controller.js ~ line 138 ~ addInterest: ~ interest",
      // interest
      // );
      if (!interest) {
        return res.status(404).send({ message: `Association not found` });
      }

      //populate UserInterest join table
      await user.addInterest(interest);
=======
>>>>>>> b82dc5dfa6e1da20f66a216e85ce6aa770ddf70f

      let UserInterest = await UserService.getUserInfo(req.user.id);
      return res.status(201).json(UserInterest);
    } catch (err) {
      return res.status(500).send(error);
    }
  },

  // delete interests that user choosed before
  deleteInterest: async (req, res) => {
    try {
      const user = await UserService.getUserInfo(req.user.id);
<<<<<<< HEAD

      const interest = await InterestService.getInterestInfo(
        req.body.interest_id
      );
      if (!interest) {
        return res.status(404).send({ message: `Association not found` });
      }
      await user.removeInterest(interest);
      await interest.removeUser(user);
=======
>>>>>>> b82dc5dfa6e1da20f66a216e85ce6aa770ddf70f

      const interests = req.body.interests;
      /* 
      Remove list of Interests 
    */
      for (const interest of interests) {
        const _interest = await InterestService.getInterestInfo(interest);
        await user.removeInterest(_interest);
      }

      return res.status(200).send({
        message: `UserInterest has been deleted successfully`,
      });
    } catch (err) {
      return res.status(500).send(error);
    }
  },

  deleteAllUsers: async (req, res) => {
    try {
      const allUsers = await UserService.getAllUser();

      if (allUsers.length) {
        await UserService.deleteAllUser();
        return res.status(200).json({ status: "success" });
      }
      return res
        .status(404)
        .json({ status: "error", message: "Users are empty" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = UserController;
