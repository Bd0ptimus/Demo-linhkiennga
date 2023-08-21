const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',


    //lang
    APP_LANGUAGE_UPDATE: 'APP_LANGUAGE_UPDATE',
    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    ADMIN_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    USER_LOGOUT: 'USER_LOGOUT',
    CHAT_SOCKET_UPDATE: 'CHAT_SOCKET_UPDATE',
})

export default actionTypes;