const User = require('../models/user')

module.exports.renderRegistrationForm = async (req, res) => {
    res.render('users/register')
}

module.exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) { return next(err); }
            req.flash('success', 'WELCOME TO YELPCAMP NEW USER. PLEASE ENJOY YOUR STAY...HEHEHE')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}

module.exports.renderLogin = async (req, res) => {
    res.render('users/login')
}

module.exports.loginUser = async (req, res) => {
    req.flash('success', 'WELCOME BACK IDIOT');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

module.exports.logoutUser = async (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodb👋ye! ');
        res.redirect('/campgrounds');
    });
}
