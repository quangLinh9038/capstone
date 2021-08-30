const db = require("../src/models");
const UserService = require("../service/user.service");
const InterestService = require("../service/interest.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = db;

const UserController = {
  /* 
    Create new user account
  */
  register: async (req, res) => {
    try {
      const { lastName, firstName, email, password, role } = req.body;

      const user = await UserService.getOneUserByEmail(email);

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

      const user = await UserService.getOneUserByEmail(email);
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

  /*  
    Logout 
    * Clearing token to logout 
  */
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", { path: "/users/refresh_token" });
      return res.json({ msg: "Logged Out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /*
   * Get new token after access token expired
   */
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(400).json({ msg: "Please Login or Register" });
        }

        const accessToken = createAccessToken({ id: user.id });
        return res
          .status(200)
          .json({ status: "success", accessToken: accessToken });
      });

      return res.json({ rf_token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /* 
    Get User's information
  */
  getUserInfo: async (req, res) => {
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

  /* 
    Add interests that user choose 
  */
  addInterest: async (req, res) => {
    try {
      const interests = req.body.interests;
      const uId = req.user.id;
      const user = await UserService.getUserInfo(uId);

      if (user) {
        /* 
          Add list of Interests 
        */
        for (const interest of interests) {
          const _interest = await InterestService.getInterestInfo(interest);
          await user.addInterest(_interest);
        }
        const UserInterest = await UserService.getUserInfo(req.user.id);

        return res.status(200).json({ status: "success", data: UserInterest });
      }
      return res.status(404).json({
        status: "failure",
        message: `User with ID: 
      ${uId} not found!`,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // delete interests that user choose before
  deleteInterest: async (req, res) => {
    try {
      const user = await UserService.getUserInfo(req.user.id);
      const interests = req.body.interests;

      /* 
        Remove list of Interests 
      */
      for (const interest of interests) {
        const _interest = await InterestService.getInterestInfo(interest);
        await user.removeInterest(_interest);
      }

      return res.status(200).json({
        message: `UserInterest has been deleted successfully`,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
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
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7h" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = UserController;
