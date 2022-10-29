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



const useStyles = makeStyles((theme) => ({
   root: {
    margin : 50,
     width: 700
   },
   media: {
     height: 0,
     paddingTop: '56.25%', // 16:9
   },
   avatar: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
},
   expand: {
     transform: 'rotate(0deg)',
     marginLeft: 'auto',
     transition: theme.transitions.create('transform', {
       duration: theme.transitions.duration.shortest,
     }),
   },
   expandOpen: {
   },
 }));

function Post(props){

   const classes = useStyles();
   const [expanded, setExpanded] = React.useState(false);
 
   const handleExpandClick = () => {
     setExpanded(!expanded);
   };

   const {title,text} = props;

   return (   
      <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={title}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            {text}
        </Typography>

      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        </CardContent>
      </Collapse>
    </Card>
   )

}

export default Post;