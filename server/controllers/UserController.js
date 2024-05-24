const { comparePassword } = require("../helpers/bcrypt");
const { createWebToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class UserController {
  static async registerUser(req, res, next) {
    try {
      const userInput = await User.create(req.body);
      res.status(201).json({
        message: "register success",
        email: userInput.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async loginUser(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        throw { name: "InvalidInput" };
      }
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw { name: "UserNotFound" };
      }

      let compare = comparePassword(password, user.password);

      if (!compare) {
        throw { name: "UserNotFound" };
      }
      let token = createWebToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({
        id: user.id,
        access_token: token,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      // async function verify() { /** jadi gapake function verify karena udah pake googleLogin */
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.JWT_GOOGLE,
      });
      const payload = ticket.getPayload();

      // jadi nanti findOrCreate itu fungsi nya :
      /** Create sebuah user Baru kalau belum ada */
      /** user yang mempunyai kriteria sesuai yang di Find nya,  */
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        /** findOrCreate adalah sebuah sequelize yang akan mencari sesuai dengan email
         * nah kalo ga ada nanti akan dibuat baru sesuai dengan body yang dibuat
         * dari default
         */
        defaults: {
          username: payload.name,
          email: payload.email,
          password: String(Math.random() * 2000),
        } /** findOrCreate adalah sebuah sequelize yang akan mencari sesuai dengan email
      nah kalo ga ada nanti akan dibuat baru sesuai dengan body yang dibuat
      dari default */,
      });

      let token = createWebToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({
        id: user.id,
        access_token: token,
        role: user.role,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = UserController;
