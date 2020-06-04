const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      console.log('Called back');
      res.redirect('/gauth/');
    }
  );

  app.get('/api/logout', (req, res) => {
    console.log("glogging out...");
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    console.log("haiiaiaiiaia");
    console.log(req.user);
    console.log("Thisisis user");
    res.send(req.user);
  });
};
