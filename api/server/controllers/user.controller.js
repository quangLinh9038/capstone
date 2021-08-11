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
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });

        const accessToken = createAccessToken({ id: user.id });

        res.json({ accessToken: accessToken });
      });

      res.json({ rf_token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // get user information
  getUser: async (req, res) => {
    try {
      const user = await UserService.getUserInfo(req.user.id);

      if (!user) return res.status(400).json({ msg: "User does not exist." });
      // response list of users
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // add interest that user choose
  addInterest: async (req, res) => {
    try {
      const user = await UserService.getUserInfo(req.user.id);
      if (!user) {
        res.status(404).send({ message: `Association not found` });
        return null;
      }
      const interest = await InterestService.getInterestInfo(
        req.body.interest_id
      );
      if (!interest) {
        res.status(404).send({ message: `Association not found` });
        return null;
      }
      //populate UserInterest join table
      await user.addInterest(interest);

      let UserInterest = await UserService.getUserInfo(req.user.id);
      res.status(201).send(UserInterest);
    } catch (err) {
      console.error("Interest creation server error: ", error);
      res.status(500).send(error);
    }
  },

  // delete interest that user choosed before
  deleteUserInterest: async (req, res) => {
    try {
      const user = await UserService.getUserInfo(req.user.id);
      if (!user) {
        res.status(404).send({ message: `Association not found` });
        return null;
      }
      const interest = await InterestService.getInterestInfo(
        req.body.interest_id
      );
      if (!interest) {
        res.status(404).send({ message: `Association not found` });
        return null;
      }
      await user.removeInterest(interest);
      await interest.removeUser(user);

      await UserService.removeUserInterest(
        req.body.user_id,
        req.body.interest_id
      );

      return res.status(200).send({
        message: `UserInterest has been deleted successfully`,
      });
    } catch (err) {
      console.error("Interest creation server error: ", error);
      res.status(500).send(error);
    }
  },

  deleteAllUsers: async (req, res) => {
    try {
      const allUsers = await UserService.getAllUser();

      if (allUsers) {
        await UserService.deleteAllUser();
        return res.status(200).json({ status: "success" });
      }
      return res
        .status(404)
        .json({ status: "error", message: "Users are empty" });
    } catch (error) {}
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = UserController;
