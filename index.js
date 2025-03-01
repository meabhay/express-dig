 require("dotenv").config();
 const express = require("express"); 
 const port = process.env.PORT || 3000;
 const app = express();

 app.use(express.json());    //Middleware

 let teaData = [];
 let nextId = 1;

 //Adding new tea with name and price
 app.post("/teas", (req, res) => {
    let {name, price} = req.body ;         //it can be written as name = req.body.name , price = req.body.price
    let newTea = {id: nextId++, name, price};
    teaData.push(newTea);
    res.status(201).send(newTea);
 })

 //Get all teas
 app.get("/teas",(req, res) => {
    res.status(201).send(teaData);
 })

 //Get a tea with id 
 app.get("/teas/:id", (req, res) => {
    let tea = teaData.find(t => t.id === parseInt(req.params.id));
    if(!tea){
        return res.status(404).send("Tea not found");
    }
    res.status(200).send(tea);
 }) 

 //Update tea 
 app.put("/teas/:id", (req, res) => {
    let tea = teaData.find((t) => t.id === parseInt(req.params.id));
    if (!tea) {
      return res.status(404).send("Tea not found");
    }
    let {name, price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
 })

 // Delete a tea
 app.delete("/teas/:id", (req, res) => {
    let index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).send("Tea not found");
    }
    teaData.splice(index, 1);
    return res.status(404).send("deleted");
 })

 app.listen(port, () => {
    console.log(`Server started running at port number ${port} `);
 })