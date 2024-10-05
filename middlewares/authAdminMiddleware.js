const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
      return next();
    } else {
        res.redirect('/login?error=unauthorised');
      
    }
  };
  
const isAdmin = (req, res, next) => {
    if (req.session.user.role === 'admin') {
        next();
    } else {

        res.redirect('/login?error=forbidden');
    }
}
module.exports= { isAdmin ,isAuthenticated};