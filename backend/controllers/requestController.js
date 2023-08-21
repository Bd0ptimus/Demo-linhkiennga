import RequestService from '../services/requestService';
import AuthMiddleware from '../middleware/auth'
import validateRequestData from "../middleware/validateRequestData";
import SendMail from '../utils/mail/sendMail'
let createNewRequest = async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let des = req.body.des;
    let listFiles = req.files;
    console.log('controller check files : ', req.body);

    const errors = validateRequestData.createRequestValidate(req.body).error;
    console.log(errors);
    if (errors) {
        return res.status(500).json({
            errCode: 1,
            message: 'Parameters input are not met requirements',
        });
    }


    let data = await RequestService.createRequest({
        name: name,
        email: email,
        des: des,
        listFiles: listFiles,
    })

    console.log('request check : ', data.request.name);
    SendMail.requestConfirm({
        email: data.request.email,
        name: data.request.name,
        requestCode: data.request.requestCode,
        attachments: data.filesSaving,
        accountString: data.emailString,
    })
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });

}

let getAllRequests = async (req, res) => {
    let data = await RequestService.getAllRequest();
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });
}

let updateRequestStatus = async (req, res) => {
    let requestId = req.body.requestId;
    let status = req.body.status;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let errors = validateRequestData.updateRequestStatusValidate(req.body).error;
    console.log(errors);
    if (errors) {
        return res.status(500).json({
            errCode: 1,
            message: 'Parameters input are not met requirements',
        });
    }
    let jwtCheck = AuthMiddleware.checkJWTToken(token);
    if (jwtCheck.errCode != 0) {
        return res.status(500).json(jwtCheck);
    }
    let data = await RequestService.updateRequestStatus({
        requestId: requestId,
        status: status,
    })

    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });
}


let findRequest = async (req, res) => {
    let requestCode = req.params.requestCode;
    let data = await RequestService.findRequest({ requestCode: requestCode });
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        data,
    });
}

module.exports = {
    createNewRequest: createNewRequest,
    getAllRequests: getAllRequests,
    updateRequestStatus: updateRequestStatus,
    findRequest: findRequest,
}