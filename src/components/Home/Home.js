
import React, {useState , useEffect} from "react";
import Post from "../Post/Post";
import { makeStyles } from '@material-ui/core/styles';
import PostForm from "../Post/PostForm";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent : "center",
    alignItems : "center",
    backgroundColor: '#b7c3eb',
}
    
  }));

function Home(){
    const classes = useStyles();
   const [error , setError] = useState(null);
   const[isLoaded , setIsLoaded] = useState(false);
   const [postList,setPostList] = useState([]);
   const [test,setTest] = useState(false);

   const refreshPosts = () => {
    fetch("http://localhost:8080/posts")
    .then(res => res.json())
    .then(
        (result) => {
            setIsLoaded(true);
            setPostList(result)
        },
        (error) => {
            console.log(error)
            setIsLoaded(true);
            setError(error);
        }
    )
}


   useEffect(() => {
    refreshPosts();
},[])



if(error){
   return <div>  Error !!!! </div>;
}else if (!isLoaded) {
  return <div> Loading...... </div>;
}else{
   return ( 
        <div fixed  className = {classes.container}>
        <PostForm refreshPosts= {refreshPosts} ></PostForm>
        {postList.map(post => (
            <Post title= {post.title} text={post.text}></Post>
           ))}
        </div>

   );
}
}

export default Home;