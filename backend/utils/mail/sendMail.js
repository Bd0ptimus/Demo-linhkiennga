import Transporter from './setup';
import dotenv from "dotenv";

const requestConfirm = (userData) => {
  let mailData = {
    from: process.env.EMAIL_USER,  // sender address
    to: userData.email,   // list of receivers
    subject: 'Xác nhận yêu cầu báo giá',
    text: 'That was easy!',
    // html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    html: `<html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #EDF2F7;
              display:flex;
              justify-content:center;
              flex-warp:wrap;

            }
            
            .mail-main{
              background-color:#EDF2F7;
              flex-warp:wrap;

              width : 100%;
              height:auto;
            }

            .mail-header{
              width : 100%;
            }

            .mail-header h5{
              text-align:center;
              font-size:25px;
              font-weight:bold;
              color : #05234D;
            }

            .mail-inner{
              flex-warp:wrap;
              background-color:white;
              margin : 20px 0%;
              height:auto;
              padding : 20px;
            }

            .mail-inner-row{
              width:100%;
              margin : 10px;
            }

            .mail-inner-greeting{
              font-size:20px;
              font-weight:bold;
              text-align:center
            }

            .mail-inner-main-text{
              font-size:15px;

            }

            .mail-inner-main-request-code{
              font-size:18px;
              font-weight:bold;
            }

            .mail-inner-access-btn-sec{
              display:flex;
              justify-content: center;
            }

            .mail-inner-access-btn{
              font-size : 15px;
              font-weight:bold;
              width:50%;
              margin : 0px 25%;
              color:white;
              text-decoration: none;
              text-align:center;
            }
          </style>
        </head>
        <body>
         <div class="mail-main">
          <div class="mail-header">
            <h5>HTK-ASIA</h5>
          </div>
          <div class="mail-inner">
            <div class="mail-inner-row">
              <p class = "mail-inner-greeting">Cảm ơn đã sử dụng dịch vụ của HTK-ASIA</p>
            </div>
            <div class="mail-inner-row">
              <p class = "mail-inner-main-text">Xin chào ${userData.name}!</p>
            </div>
            <div class="mail-inner-row">
              <p class = "mail-inner-main-text">Quý khách đã gửi một yêu cầu báo giá linh kiện điện tử. Yêu cầu của quý khách đã được chấp nhận. Chúng tôi đang xem xét và sẽ phản hồi lại với quý khách trong thời gian ngắn nhất.</p>
            </div>
            <div class="mail-inner-row">
              <p class = "mail-inner-main-text">Mã yêu cầu của quý khách là <h5 class="mail-inner-main-request-code"> ${userData.requestCode} </p></p>
            </div>
            <div class="mail-inner-row">
              <p class = "mail-inner-main-text">Các file đính kèm của quý khách đã được đính kèm cùng mail này!</p>
            </div>
            <div class="mail-inner-row">
              <div class = "mail-inner-access-btn-sec"> 
                <a class = "mail-inner-access-btn" href="#">Truy cập trang web của chúng tôi</a>
              </div>
            </div>
            <div class="mail-inner-row">
              <p class = "mail-inner-main-text">${userData.accountString}</p>
            </div>
            <hr>
            <div class="mail-inner-row">
              <p>Xin cảm ơn,</p>
              <p>HTK-ASIA</p>
            </div>

          </div>
         </div>
        </body>
      </html>`,
    attachments: userData.attachments
  }

  Transporter.sendMail(mailData, function (err, info) {
    if (err)
      return false;

    else
      return true;
  });
}

module.exports = {
  requestConfirm: requestConfirm,
}