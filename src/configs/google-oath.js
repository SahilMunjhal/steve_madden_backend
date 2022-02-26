var GoogleStrategy = require('passport-google-oauth2' ).Strategy;
const passport=require("passport");
const { v4: uuidv4 } = require('uuid');
const User=require("../models/user.model");
 
passport.use(new GoogleStrategy({
    clientID:"120463592307-58lgn9srh5qi9vkvds1g9pbor00ai8mp.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:2345/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
      console.log(profile);
      let user;
      user=await User.findOne({email:profile?.email}).lean().exec();

      if(!user){
        user=await User.create({
            email:profile?.email,
            password:uuidv4(),
        });
      }
      let name=profile._json.name;
    return done(null,{name});
  }
));

module.exports=passport;
