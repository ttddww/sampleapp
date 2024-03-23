//import useState from react
import React, {useState} from 'react'

function AddEmployee (props) {
  //declare state variables for each of the form fields
const  [firstName, setFirstName] = useState("")
const  [lastName, setLastName ] = useState("")
const  [emailAddress, setEmailAddress] =  useState("")
const [password, setPassword] = useState("")
    //write a function to handle the form  submission
 function handleSubmit (event){
    //prevent the default behavior of the form submission
   event.preventDefault()
   //prepare the data to be sent to the server
   const data = {
    first_name: firstName,
     last_name : lastName ,
     email: emailAddress,
     password: password
   };
   //send the data to  the server
   const apiUrl = "http://18.191.189.228:4000/add-employee";
   const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
   }
 const response = fetch(apiUrl,requestOptions)
 response.then(res=> res.json())
 .then(res=>{
    console.log(res);
 })
    
    
 }
 
  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">First Name</label>
        <br />
        <input
          type="text"
          id="fname"
          name="fname"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <br />
        <label htmlFor="">Last Name</label>
        <br />
        <input
          type="text"
          id="lname"
          name="lname"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <br />
        <label htmlFor="">Email</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          value={emailAddress}
          onChange={(event) => setEmailAddress(event.target.value)}
        />
        <br />
        <label htmlFor="">Password</label>
        <br />
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddEmployee
