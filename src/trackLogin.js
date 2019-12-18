//this logs in a user, saving their username as a cookie
//takes in the name of the user to be logged in as an argument
const setActiveUser = (req, res, newUser) => {

    res.cookie('user', { userName: newUser });
}

//this clears the user cookie in order to log them out
const clearUser = (req, res) => {
    res.clearCookie('user');
}

module.exports.setActiveUser = setActiveUser;
module.exports.clearUser = clearUser;