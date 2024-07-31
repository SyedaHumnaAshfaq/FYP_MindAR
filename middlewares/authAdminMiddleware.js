const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
      return next();
    } else {
        res.redirect('/loginpage?error=unauthorised');
      
    }
  };
  
const isAdmin = (req, res, next) => {
    if (req.session.user.role === 'admin') {
        next();
    } else {

        res.redirect('/loginpage?error=forbidden');
    }
}
module.exports= { isAdmin ,isAuthenticated};