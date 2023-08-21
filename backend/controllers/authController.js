import AuthService from '../services/authService';
import AuthMiddleware from '../middleware/auth'
import validateAuthData from "../middleware/validateAuthData";
import SendMail from '../utils/mail/sendMail';
import JWTAction from '../middleware/JWTAction';
let userLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log('controller check files : ', req.body);

    const errors = validateAuthData.userLoginValidate(req.body).error;
    console.log(errors);
    if (errors) {
        return res.status(500).json({
            errCode: 1,
            message: 'Parameters input are not met requirements',
        });
    }


    let userData = await AuthService.userLogin({
        email: email,
        password: password,
    });

    let jwt = null;
    if (userData.errCode == 0) {
        jwt = JWTAction.createToken({ id: userData.user.id, email: userData.user.email });
    }

    res.setHeader('Authorization', `Bearer ${jwt}`);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        userData,
        jwt,
    });

}

module.exports = {
    userLogin: userLogin,
}