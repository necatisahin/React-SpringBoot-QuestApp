import React, {useState} from "react";
import {FormControl, InputLabel, Input, Button, FormHelperText} from "@material-ui/core"
import { useNavigate  } from "react-router";
import { PostWithoutAuth } from "../../services/HttpService";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function Auth() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isRegistered, setIsRegistered] = useState("")
    let history = useNavigate();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsRegistered(false);
      };
    const handleUsername = (value) => {
        setUsername(value)
    } 

    const handlePassword = (value) => {
        setPassword(value)
    } 

    const sendRequest = (path) => {
        PostWithoutAuth(("/auth/"+path), {
            userName : username, 
            password : password,
          })
          .then((res) => res.json())
          .then((result) => {localStorage.setItem("tokenKey",result.accessToken);
                            localStorage.setItem("refreshKey",result.refreshToken);
                            localStorage.setItem("currentUser",result.userId);
                            localStorage.setItem("userName",username)})
          .catch((err) => console.log(err))
    }

    const handleButton = (path) => {
        sendRequest(path)
        setUsername("")
        setPassword("")
        setIsRegistered(true)
        //history.go("/auth")
    }

    const handleLoginButton = (path) => {
      sendRequest(path)
      setUsername("")
      setPassword("")
      setIsRegistered(true)
      history(-1)
      //history.go("/auth")
  }

    
    

    

    return(
        <div>
                  <Snackbar open={isRegistered} autoHideDuration={1200} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Registered!
        </Alert>
      </Snackbar>
      <FormControl>
            <InputLabel>Username</InputLabel>
            <Input  onChange = {(i) => handleUsername(i.target.value)}/>
            <InputLabel  style={{top: 80}}>Password</InputLabel>
            <Input  style={{top: 40}}
            onChange = {(i) => handlePassword(i.target.value)}/>
            <Button variant = "contained"
                style = {{marginTop : 60,
                background :'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color : 'white'}}
                onClick= {() => handleButton("register")}>Register</Button>
            <FormHelperText style={{margin:20}}>Are you already registered?</FormHelperText>
            <Button variant = "contained"
                style = {{
                background :'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color : 'white'}}
                onClick={() => handleLoginButton("login")}>Login</Button>
            
        </FormControl>
        </div>
        
    )
}

export default Auth;