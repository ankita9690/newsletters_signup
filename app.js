const express=require("express")
const bodyparser=require("body-parser")
const request=require("request")
const https=require("https")
const app=express()

app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}))

app.get("/",function(req,res){
res.sendFile(__dirname+ "/signup.html")
})

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.post("/",function(req,res){
const fname=req.body.fname;
const lname=req.body.lname;
const ename=req.body.ename;
// console.log(fname+lname+ename);
const data={
  members:[
    {
      email_address:ename,
      status:"subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }
    }
  ]
};
const jsonData=JSON.stringify(data);
const url="https://us13.api.mailchimp.com/3.0/lists/0d210fd4bf"
const options={
  method:"POST",
  auth:"ankita:002d1aa98b1b4c32d46f93e3c4863d93-us13"
}
const request=https.request(url,options,function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
  }else{
    res.sendFile(__dirname+"/failure.html");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data))
  })
})
// request.write(jsonData)
request.end()
})

app.listen(process.env.PORT||3000,function(){
  console.log("server is running on port 3000")
})

//API KEY
//002d1aa98b1b4c32d46f93e3c4863d93-us13
//LIST ID
//0d210fd4bf
