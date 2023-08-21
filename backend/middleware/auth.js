import JWTAction from './JWTAction'
const checkJWTToken = (token) => {
    if (token === undefined) {
        return {
            errCode: 1,
            message: 'Not found token',
        }

    }
    let userId = JWTAction.verifyToken(token) ? JWTAction.verifyToken(token).id : null;
    if (!userId) {
        return {
            errCode: 2,
            message: 'Token is invalid',
        }
    }
    return {
        errCode: 0,
        message: 'JWT oke',
    }

}

module.exports = {
    checkJWTToken: checkJWTToken
}