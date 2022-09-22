import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "./app.css";
import { useEffect, useState } from "react";
import { db } from "./firebase_config";
import { collection, getDocs } from "firebase/firestore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function App() {
  // state that will hold posts from our table/collection
  const [posts, setPosts] = useState([]);
  const postsRef = collection(db, "posts");

  // useEffect to render list. when making a request with an api the api will try to return a promise(data that needs to be resolved, either a success or a failure), when making api calls use async await functions
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  return (
    <div className="App">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="title" variant="outlined" />
        <TextField id="outlined-basic" label="description" variant="outlined" />
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </Box>
      {posts.map((post) => {
        return (
          <Card sx={{ maxWidth: 345 }}>
            {/* <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <h6>{post.title}</h6>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <p>{post.description}</p>
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export default App;
