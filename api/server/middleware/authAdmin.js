const db = require("../src/models")

const {User} = db

const authAdmin = async (req, res, next) => {
    try {
        //Get user information
        const user = await User.findByPk(req.user.id)
        if (user.role === 0)
            return res.status(400).json({ msg: "Admin resources access denied." })

        return next()

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
module.exports = authAdmin