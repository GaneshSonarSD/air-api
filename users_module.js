const mongoose = require("mongoose");
//var nodeoutlook = require('nodejs-nodemailer-outlook');
require('dotenv').config()
const accountSid = process.env.ACCOUNT;
const authToken = process.env.AUTH;
const client = require('twilio')(accountSid, authToken); 

//** connection to database */
const conn_str =
// "mongodb+srv://admin:admin@cluster0.cwsvi.mongodb.net/tcet?retryWrites=true&w=majority";
  "mongodb+srv://admin:admin@cluster0.jkxiq.mongodb.net/Project?retryWrites=true&w=majority";

mongoose
  .connect(conn_str, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected successfully..."))
  .catch((error) => console.log(error));

const userSchema = new mongoose.Schema({
 PM1: Number,
 PM2: Number,
 PM10: Number,
 Gas: Number,
 Temperature: Number,
 Humidity: Number,
 Year: Number,
 Month: Number,
 Date: Number,
 Hours: Number,
 Minutes: Number
});

const User = new mongoose.model("user", userSchema);

/** Express Mongoose Integration **/
const express = require("express");
const e = require("express");
const app = express();
const router = express.Router();


router.get("/:id", async (req, res) => {
  /** getting user email */
  console.log(req.params.id);
  let data = await User.find({ _id: req.params.id });
  console.log(data);

  // res.send(req.params);
  res.send(data);
});

router
  .route("/")
  .get(async(req, res) => {
    let data = await User.find(); // collection_name.find()
    //console.log(data);
    res.send(data);
   //res.sendFile(__dirname+"/index.html")
  })

// -------Posting Data--------//



  .post(async (req, res) => {
    req_data = req.body;
  
    // console.log(req_data);
    
    let obj = new User(req_data);
    let result = await obj.save();
    console.log(result);
    res.send(result);
    //console.log(result.id);
    //console.log(result.Gas);

    ///  threshold value setting and alert system
if(result.Gas > 4 && result.PM2 > 125 && result.PM10 > 61){

//   nodeoutlook.sendEmail({
//     auth: {
//         user: "vinodsonar9777@outlook.com",
//         pass: "Ajay@9930"
//     },
//     from: 'vinodsonar9777@outlook.com',
//     to: 'vinodsonar9777@gmail.com',
//     subject: ' Alert!!! Dangerous air particals detected',
//     html: '<b>Air Quality is Dangerous Be careful </b> ',
//     text: 'PM 2, PM10 and gas value are  ' +result.PM2 + ' '+ result.PM10+ ' '+ result.Gas,
//     replyTo: 'vinodsonar9777@gmail.com',
    
//     onError: (e) => console.log(e),
//     onSuccess: (i) => console.log(i)
    
// }
// );

//---- twilio msg module ----///
client.messages
    .create({
          
        // Message to be sent
        body: 'Harmful air practical detected please be careful. Check out the last 24 hour data https://charts.mongodb.com/charts-project-air-database-gfdps/embed/charts?id=62458df4-a9d6-4a62-8c4b-443080fcfe01&maxDataAge=3600&theme=light&autoRefresh=true',
  
        // Senders Number (Twilio Sandbox No.)
        from: 'whatsapp:+14155238886',
  
        // Number receiving the message
        to: 'whatsapp:9930597776'
    })
    .then(message => console.log("Message sent successfully"))
    .done();

  /////-----------------//////


} else {
//------------------------------//
     if(result.Gas > 4){
      
      //console.log("gas is more than 3");
    //   nodeoutlook.sendEmail({
    //     auth: {
    //         user: "vinodsonar9777@outlook.com",
    //         pass: "Ajay@9930"
    //     },
    //     from: 'vinodsonar9777@outlook.com',
    //     to: 'vinodsonar9777@gmail.com',
    //     subject: ' Alert!!! Dangerous air particals detected',
    //     html: '<h3>Gas Value is high be careful </h3>' + result.Gas,
    //     text: 'This is text version!',
    //     replyTo: 'vinodsonar9777@gmail.com',
        
    //     onError: (e) => console.log(e),
    //     onSuccess: (i) => console.log(i)
        
    // }
    // );
    //---- twilio msg module ----///
client.messages.create({
      
   

    // Senders Number (Twilio Sandbox No.)
    from: 'whatsapp:+14155238886',

    // Number receiving the message
    to: 'whatsapp:+919930597776',

     // Message to be sent
     body: 'Value of harmful gas is high ' + result.Gas + '.'+' Check out the last 24 hour data https://charts.mongodb.com/charts-project-air-database-gfdps/embed/charts?id=62458df4-a9d6-4a62-8c4b-443080fcfe01&maxDataAge=3600&theme=light&autoRefresh=true'
})
.then(message => console.log("Message sent successfully"))
.done();

/////-----------------//////
    }
//------------------------------//


///  PM2.5 threshold value set

if(result.PM2 > 125){
  
  //console.log("gas is more than 3");
//   nodeoutlook.sendEmail({
//     auth: {
//         user: "vinodsonar9777@outlook.com",
//         pass: "Ajay@9930"
//     },
//     from: 'vinodsonar9777@outlook.com',
//     to: 'vinodsonar9777@gmail.com',
//     subject: ' Alert!!! there is Dangerous air particals detected',
//     html: '<h3>PM 2.5 high be careful </h3>' + result.PM2,
//     text: 'This is text version!',
//     replyTo: 'vinodsonar9777@gmail.com',
    
//     onError: (e) => console.log(e),
//     onSuccess: (i) => console.log(i)
    
// }
// );
 //---- twilio msg module ----///
 client.messages.create({
      
   

  // Senders Number (Twilio Sandbox No.)
  from: 'whatsapp:+14155238886',

  // Number receiving the message
  to: 'whatsapp:+919930597776',

   // Message to be sent
   body: 'Value of PM2.5 is more than the safe values. the value is ' + result.PM2 + ' Check out the last 24 hour data https://charts.mongodb.com/charts-project-air-database-gfdps/embed/charts?id=62458df4-a9d6-4a62-8c4b-443080fcfe01&maxDataAge=3600&theme=light&autoRefresh=true'
})
.then(message => console.log("Message sent successfully"))
.done();

/////-----------------//////
}
//------------------------------//

///  PM2.5 threshold value set

if(result.PM10 > 60){
  
  //console.log("gas is more than 3");
//   nodeoutlook.sendEmail({
//     auth: {
//         user: "vinodsonar9777@outlook.com",
//         pass: "Ajay@9930"
//     },
//     from: 'vinodsonar9777@outlook.com',
//     to: 'vinodsonar9777@gmail.com',
//     subject: ' Alert!!! there is Dangerous air particle detected',
//     html: '<b>PM 10 is More Be careful </b> ' + result.PM10,
//     text: 'This is text version!',
//     replyTo: 'vinodsonar9777@gmail.com',
   
    
//     onError: (e) => console.log(e),
//     onSuccess: (i) => console.log(i)
    
// }
// );
 //---- twilio msg module ----///
 client.messages.create({
      
   

  // Senders Number (Twilio Sandbox No.)
  from: 'whatsapp:+14155238886',

  // Number receiving the message
  to: 'whatsapp:+919930597776',

   // Message to be sent
   body: 'Value of PM10 is more than the safe values. the value is ' + result.PM10 + ' Check out the last 24 hour data https://charts.mongodb.com/charts-project-air-database-gfdps/embed/charts?id=62458df4-a9d6-4a62-8c4b-443080fcfe01&maxDataAge=3600&theme=light&autoRefresh=true'
})
.then(message => console.log("Message sent successfully"))
.done();

/////-----------------//////
}

}
//------------------------------//

  // errror on concernt msg  



    // res.send(req_data);
  // res.send(result);
  })
  /*.put(async (req, res) => {
    req_data = req.body;
    console.log(req_data.id);
    let result = await user.updateOne(
      { _id: req_data.id },
      {
        $set: {
          name: req_data.name,
          age: req_data.age,
          city: req_data.city,
        },
      }
    );
    res.send(result);
    // res.send(req_data);
  })
  .delete(async (req, res) => {
    let result = await user.deleteOne({ _id: req.query.id });
    res.send(result);
  });*/

module.exports = router;