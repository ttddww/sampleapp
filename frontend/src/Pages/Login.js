//import useState from react
import React,{useState} from 'react'

function Login() {
  //declare state variables for each of the form fields
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  //declare a state variables to store the response from the server
  const [responseMessage, setResponseMessage] = useState(null);
    //write a function to handle the form  submission
 function handleSubmit (event){
    //prevent the default behavior of the form submission
   event.preventDefault()
   //prepare the data to be sent to the server
   const loginData = {
       email: emailAddress,
       password: password
   }
   //check if the data is being captured correctly
   console.log(loginData);
   //send the data to the server
   const apiUrl = "http://18.191.189.228:4000/login";
   const  requestOptions = {
     method: "POST",
     headers: {"Content-Type": "application/json"},
      body: JSON.stringify(loginData)
 }
 const response = fetch(apiUrl,requestOptions)
 //save the response from the server in the state variable
 response.then(res=>res.json())
 .then(data=>{setResponseMessage(data.message)
if (data.status==="success"){
    //redirect the user to the home page after 5 seconds
    //setTimeout (() => {window.location.replace("/")}, 5000)

}})
.catch(error => console.log(error))
 }
  return (
    <div>
        {/* display the return message here */}
        <div className='notice'><h2>{responseMessage}</h2></div>
        <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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

export default Login
