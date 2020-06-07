const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  done(null, user);
});



passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENTKEY,
        callbackURL: '/auth/google/callback',
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ gid: profile.id });

        console.log("passport worked");
  
        if (existingUser) {
          console.log("sasjwsdsadsadsadadsadsadsadasorked");
          return done(null, existingUser);
        }

        console.log("strategy worked");
        hashedPassword=await bcrypt.hash(profile.id, 12);
        console.log(profile.displayName);
        console.log(profile.emails[0].value);
        console.log(profile.photos[0].value);
        console.log(hashedPassword);
        console.log(profile.id);
        console.log(profile);

  
        const user = await new User({ 
            name:profile.displayName,
            email:profile.emails[0].value,
            image:profile.photos[0].value,
            password: hashedPassword,
            gid:profile.id,
            places: []

        }).save().then(user=>done(null,user));
        

        

        
      }
    )
  );





