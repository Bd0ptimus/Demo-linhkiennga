import express from "express";
import { uploads, uploadsExcel } from "../../multerconf";
import SendMail from '../../utils/mail/sendMail';
const router = express.Router({ mergeParams: true });
router.use(express.json());
import requestController from "../../controllers/requestController";
router.post('/create-request', uploadsExcel("requests").array("fileSelected"), requestController.createNewRequest);
router.get('/get-all-request', requestController.getAllRequests);
router.put('/update-request-status', requestController.updateRequestStatus);
router.get('/find-request/:requestCode', requestController.findRequest);

module.exports = router;
