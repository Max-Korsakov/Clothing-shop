const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const Users =  require('../models/User')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const users = await Users.findById(payload.userId).select('email id')
                if (users) {
                    return done(null, users);
                } else {
                    return done(null, false);
                }
            } catch (e) {
                console.log(e);
            }

        })
    )
}