
const app = require('express')();
const parser = require("body-parser");

const fs = require("fs");
const dir = __dirname;
 

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

 

let user = [];
 
function readData(){
    const filename = "user.json"; 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    employees = JSON.parse(jsonContent);
}
 
function saveData(){
    const filename = "user.json";
    const jsonData = JSON.stringify(user);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/user", (req, res)=>{
    readData();
    res.send(JSON.stringify(user));    
})
 
app.get("/user/:id", (req, res)=>{
    const userid = req.params.id;
    if(user.length == 0){
        readData();
    }
    let foundRec = user.find((e) => e.userId == userid);
    if(foundRec == null)
        throw "User not found";
    res.send(JSON.stringify(foundRec))
})
 
app.put("/user", (req, res)=>{
    if(user.length == 0)
        readData();
    let body = req.body;
    
    for (let index = 0; index < user.length; index++) {
        let element = user[index];
        if (element.userId == body.userId) {
            element.userName = body.userName;
            element.userAddress = body.userAddress;
            element.userSalary = body.userSalary;
            saveData();
            res.send("User updated successfully");
        }
    }
   
})
 
app.post('/user', (req, res)=>{
    if (user.length == 0)
        readData();
    let body = req.body;
    user.push(body);  
    saveData();
    res.send("User added successfully");
})
/*app.delete("/employees/:id", (req, res)=>{
    const empid = req.params.id;
    if(employees.length == 0){
        readData();
    }
    let foundRec = employees.find((e) => e.empId == empid);
    if(foundRec == null)
        throw "Employee not found";
    else{
        let index = employees.findIndex(foundRec)
        employees.splice(index,1)
        saveData()
    }


})*/

 
app.listen(1234, ()=>{
    console.log("Server available at 1234");
})