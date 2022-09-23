import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "./app.css";
import { useEffect, useState } from "react";
import { db } from "./firebase_config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function App() {
  // state for new title and description
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  // state that will hold posts from our table/collection
  const [posts, setPosts] = useState([]);
  const postsRef = collection(db, "posts");

  // create post, use addDoc to create new documents
  async function createPost(e) {
    try {
      await addDoc(postsRef, { title: newTitle, description: newDescription });
      console.log("gets this far");
      e.preventDefault();
    } catch (err) {
      console.log(err.message);
    }
  }

  // useEffect to render posts list. when making a request with an api the api will try to return a promise(data that needs to be resolved, either a success or a failure), when making api calls use async await functions
  useEffect(() => {
    async function getPosts() {
      const postsRef = collection(db, "posts");
      const data = await getDocs(postsRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
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
        <TextField
          id="outlined-basic"
          label="title"
          variant="outlined"
          onChange={(e) => {
            setNewTitle(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="description"
          variant="outlined"
          onChange={(e) => {
            setNewDescription(e.target.value);
          }}
        />
        <Button variant="outlined" onClick={createPost}>
          Create Post
        </Button>
      </Box>
      {posts.map((post) => {
        return (
          <Card
            sx={{
              maxWidth: 345,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* <CardMedia
              component="img"
              height="140"
              image=""
              alt="post picture"
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
              <Button size="small">edit</Button>
              <Button size="small">delete</Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export default App;
