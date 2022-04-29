// jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https')

const app = express()
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res)=>{
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;

    var data = {
        members: [
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME: lastName,
                }
        
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/7815843d72" 
    const option = {
        method: "POST",
        auth: "Phensic:671a3e1bd9e2c2f4791c3b0938b756af-us14"


    }
    
    const request = https.request(url, option, function (response) {
        if (response.statusCode === 200) {
            res.sendFile( __dirname + "/success.html");
        }else {
            res.sendFile( __dirname + "/faliure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        }) 
    })
    request.write(jsonData);
    request.end();
});


app.post("/faliure", function(req, res) {
    res.redirect("/")
})

app.listen(process.env.PORT || 1020, () => {
    console.log("app is running on http://localhost:1020/")
})



