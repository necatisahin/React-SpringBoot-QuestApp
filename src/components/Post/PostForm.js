import React, {useState, useRef, useEffect} from "react";
import { ReactDOM } from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CommentIcon from '@mui/icons-material/Comment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { InputAdornment } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { PostWithAuth } from "../../services/HttpService";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const useStyles = makeStyles((theme) => ({
   root: {
    margin : 50,
     width: 700
   },
   title: {
    margin : 10,
     width: 400
   },
   media: {
     height: 0,
     paddingTop: '56.25%', // 16:9
   },
   button:{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
   color: 'white'},
   expand: {
     transform: 'rotate(0deg)',
     marginLeft: 'auto',
     transition: theme.transitions.create('transform', {
       duration: theme.transitions.duration.shortest,
     }),
     
   },
   avatar: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
},
   expandOpen: {
   },
 }));

function PostForm(props){

   const classes = useStyles();
   const {refreshPosts}=props;
   const [expanded, setExpanded] = React.useState(false);
   const [inputTitle, setInputTitle] = useState("");
   const [inputText, setInputText] = useState("");
   const [isSent, setIsSent] = useState(false);
   let userId =1;
   const handleExpandClick = () => {
     setExpanded(!expanded);
   };
   const handleText = (value) => {
    setInputText(value);    
   };
    const handleTitle = (value) => {
        setInputTitle(value);   
   };
   const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSent(false);
  };

  const savePost = () => {
    console.log(localStorage.getItem("tokenKey"));
    PostWithAuth("/posts", {
      title: inputTitle, 
      userId : userId,
      text : inputText,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
    }
   

 

   const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setInputTitle("");
        setInputText("");
        refreshPosts();
   }
   

   const {title,text} = props;

   return (   
    <div>

      <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Your post is sent!
        </Alert>
      </Snackbar>
      <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={<OutlinedInput 
        id ="outlined-adorment-amount"
         placeholder="Title"
         value={inputTitle}
          inputProps={{maxLength:25}} 
          onChange={(i)=> handleTitle(i.target.value)}
          className={classes.title}> 
            </OutlinedInput>}
      />
      <CardContent>
      

        <Typography variant="body2" color="textSecondary" component="p">
        <OutlinedInput 
        id ="outlined-adorment-amount"
         fullWidth placeholder="Text" 
         value={inputText}
         inputProps={{maxLength:255}}
         onChange={(i)=> handleText(i.target.value)}
        endAdornment= {
             <InputAdornment position="end">
             <Button className={classes.button}  onClick={handleSubmit} >
                Post
                </Button>
             </InputAdornment>
        }> 
            </OutlinedInput>
        </Typography>

      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        </CardContent>
      </Collapse>
    </Card>
    </div>
   )

}

export default PostForm;