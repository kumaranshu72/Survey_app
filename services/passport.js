const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then(user=>{
    done(null,user);
  })
})

passport.use(new googleStrategy({
  clientID : keys.googleClientID,
  clientSecret : keys.googleClientSecret,
  callbackURL : "/auth/google/callBack"
},(acessToken,refreshToken,profile,done)=>{
  User.findOne({googleId : profile.id}).then(existingUser=>{
    if(existingUser){
      done(null,existingUser);
    }else {
      new User({ googleId : profile.id }).save().then(user=>done(null,user));
    }
  });
}));