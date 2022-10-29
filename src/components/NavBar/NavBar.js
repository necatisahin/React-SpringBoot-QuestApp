import React from "react";
import {Link, useNavigate} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { LockOpen } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title1: {
      flexGrow: 1,
      textAlign : "left",
    },
    title2: {
        flexGrow: 1,
        textAlign : "right",
      },
    link: {
        textDecoration : "none",
        boxShadow : "none",
        color : "white"
    }
  }));

function Navbar(){
    const classes = useStyles();
    let userId=5;


    let history = useNavigate();

    const onClick = () => {
      localStorage.removeItem("tokenKey")
      localStorage.removeItem("currentUser")
      localStorage.removeItem("refreshKey")
      localStorage.removeItem("userName")
      history(1)
    }
return (
<div>
    <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography className = {classes.title1} variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link className={classes.link} to="/">Home</Link>
          </Typography>
          <Typography variant="h6">
            {localStorage.getItem("currentUser") == null ? <Link  className={classes.link} to="/auth">Login/Register</Link>:
             <div><IconButton className={classes.link} onClick = {onClick}><LockOpen></LockOpen></IconButton>
            <Link  className={classes.link} to={{pathname : '/users/' + localStorage.getItem("currentUser")}}>Profile</Link>
            </div>}
          
          </Typography>
          
        </Toolbar>
      </AppBar>
      
</div>
);

}

export default Navbar;