import React from "react";
import nmailer from "nodemailer";



let transporter = nmailer.createTransport({
    service: {EMAIL_SERVICE},
    auth: {
        user: {EMAIL_ADDRESS},
        pass: {EMAIL_PASSWORD}
    },
    tls: {
        rejectUnauthorized: false,
    },
});

let mailOptions = {
    from: {EMAIL_ADDRESS},
    to: {EMAIL_ADDRESS},
    subject: "Ohana Homes Review",
    text: {someVar}
};

function sendEmail() {
    transporter.sendEmail(mailOptions, function(err){
        if(err){
            console.log("fail");
        } else {
            console.log("success");
        }
    });
  return (
    <h2>yo</h2>
  );
}

export default sendEmail;