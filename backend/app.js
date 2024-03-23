//Import the express module
const express = require("express");
//Import the mysql module
const mysql = require("mysql2");

//Create the express app
const app = express();

//Define the the connection parameter for the database
const dbConfig = {
  connectionLimit: 10,
  password: "sampleapp",
  user: "sampleapp",
  host: "127.0.0.1",
  database: "sampleapp",
};

//sampleapp public IP address: (18.191.189.228)
//root mysql on browser password: Sampleapp2024

//Create the connection to database
const connection = mysql.createConnection(dbConfig);
connection.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

//use the express.json() middleware to parse the request body
app.use(express.json());

//Allow CORS to all
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET, POST, PUT, PATCH, DELETE" //what matters her is that OPTIONS is present
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//create a simple get request handler to send a response back
app.get("/", (req, res) => {
  res.send("Testing!");
});

//post request handler to add a new employee to the database
app.post("/add-employee", (req, res) => {
  console.log(req.body);

  //write the sql query to add to the database table named employee_test
  const sql = `INSERT INTO employee_test ( first_name, last_name, email, password) VALUES ('${req.body.first_name}','${req.body.last_name}','${req.body.email}','${req.body.password}')`;

  //execute the query
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  //send a response back to the client
  const response = {
    status: "success",
    message: "Employee added successfully",
  };
  res.status(200).json(response);
});

//post request handler to login an employee
app.post("/login", (req, res) => {
  console.log(req.body);
  //write the sql query to retrieve the employee with the email and password provided by the user and compare it with the data in the database
  const sql = `SELECT * FROM employee_test WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
  //execute the query
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    //check if the result is empty or not
    if (result.length > 0) {
      //send a response back to the client
      const response = {
        status: "success",
        message: "Login Successful",
      };
      res.status(200).json(response);
    } else {
      //send a response back to the client
      const response = {
        status: "failure",
        message: "Invalid Username/Password",
      };
      res.status(401).json(response);
    }
  });
});

//set up the port to listen to
const port = 4000;
//set up the listener
app.listen(port, () => console.log(`Listening on ${port}`));

