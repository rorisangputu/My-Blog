const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
}

module.exports.registerUser = async(req, res, next) =>{
    try {
        const { email, username, password } = req.body;
        const user = new User ({email, username});
        console.log( user);
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err =>{
            if(err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/blogs');
        });
        
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register')
    }   
}

module.exports.renderLoginForm =  (req, res) => {
    res.render('users/login');
}

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = res.locals.returnTo || '/blogs';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/blogs');
    });
}