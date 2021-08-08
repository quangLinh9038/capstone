const db = require('../src/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = db;
const { Interest } = db;
const { Trip } = db;


// const { Op } = db.Sequelize.Op;

const UserController = {
  // create new user account
  register: async (req, res) => {
    try {
      const { lastName, firstName, email, password, role } = req.body;

      const user = await User.findOne({ where: { email: email } });
      if (user) return res.status(400).json({ msg: "The email already exists." })

      if (password.length < 6)
        return res.status(400).json({ msg: "Password is at least 6 characters." })

      //Password Encryption
      const passwordHash = await bcrypt.hash(password, 10)
      const newUser = new User({
        firstName, lastName, email, password: passwordHash, role
      })

      //Save Postgres
      await newUser.save()

      //Then create jsonwebtoken to authentication
      const accesstoken = createAccessToken({ id: newUser.id })
      const refreshtoken = createRefreshToken({ id: newUser.id })

      //auto refresh token after the access token expired
      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/users/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000 //7d
      })

      res.json({ accesstoken })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  // login to existed user account
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email: email } })
      if (!user) return res.status(400).json({ msg: "User does not exist." })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ msg: "Wrong password." })

      //If login success, create access token and refresh token
      const accesstoken = createAccessToken({ id: user.id })
      const refreshtoken = createRefreshToken({ id: user.id })

      //auto refresh token after the access token expired
      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/users/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000 //7d
      })

      res.json({ accesstoken })

    } catch (err) {
      res.status(500).json({ msg: err.message })
    }
  },

  // clear token to logout
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', { path: '/users/refresh_token' })
      return res.json({ msg: "Logged Out" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please Login or Register" })

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please Login or Register" })

        const accesstoken = createAccessToken({ id: user.id })

        res.json({ accesstoken })
      })

      res.json({ rf_token })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }

  },
  getUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [
          {
            model: Interest,
            as: 'interests',
          },
          {
            model: Trip,
            as: 'trips',
          }
        ],
      });
      console.log(user);
      if (!user) return res.status(400).json({ msg: "User does not exist." })
      // response list of users
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addInterest: async (req, res) => {
    try {
      const user = await User.findByPk(req.body.user_id)
      if (!user) 
      {
        console.log("User not found!");
        return null;
      }
      const interest = await Interest.findByPk(req.body.interest_id)
      if (!interest) 
      {
        console.log("Interest not found!");
        return null;
      }
      //populate UserInterest join table
      await user.addInterest(interest);

      let UserInterest = await User.findByPk(req.body.user_id, {
        include: [{
          model: Interest,
          as: 'interests',
          attributes: ['id', 'name']
        }]
      })
      res.status(201).send(UserInterest);
    }
    catch (err) {
      console.error("Interest creation server error: ", error);
      res.status(500).send(error)
    }
  }
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m' })
}

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = UserController;
