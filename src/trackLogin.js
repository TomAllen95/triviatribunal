//this logs in a user, saving their username as a cookie
//takes in the name of the user to be logged in as an argument
const setActiveUser = (req, res, newUser) => {

    res.cookie('user', { userName: newUser });
}

//this clears the user cookie in order to log them out
const clearUser = (req, res) => {
    res.clearCookie('user');
}

//this returns the name of the user based on the cookie
const findUser = (req, res) => {

    //I don't really know how this code works but it puts the values neatly into an object -Davey
    let list = {};
    let rc = req.headers.cookie
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    //this processes the cookies object so we grab only the user name
    //more could be added here if we wanted to grab more from the cookie in future
    let userCookie = list.user;
    
    let userName = userCookie.split('"%3A"')[1]
    if(typeof userCookie == 'undefined'){
        return null;
    } else{
    let userName = userCookie.split('"%3A"')[1]
    userName = userName.split('"}')[0]
    return userName;
    }

}

module.exports.setActiveUser = setActiveUser;
module.exports.clearUser = clearUser;
module.exports.findUser = findUser;