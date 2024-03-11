const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

require("dotenv").config();

// Import your User model
const User = require("../models/User");

const SECRET_KEY = process.env.JWT_SECRET;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

// JWT strategy for handling JWT
const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    // Use the findByUserID method or equivalent based on your User model
    const user = await User.findByUserID(jwt_payload.UserID);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});

passport.use(strategy);

// Function to generate a JWT
const generateToken = (user) => {
  return jwt.sign(
    { Username: user.Username, UserID: user.UserID },
    SECRET_KEY,
    { expiresIn: "1h" },
  );
};

// Middleware to require login/auth
const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = {
  passport,
  generateToken,
  requireAuth,
};
