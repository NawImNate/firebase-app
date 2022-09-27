import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "./app.css";
import { useEffect, useState } from "react";
import { db } from "./firebase_config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Modal from "./components/Modal";

function App({ newTitle, newDesc }) {
  // state for new title and description
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  // state that will hold posts from our table/collection
  const [posts, setPosts] = useState([]);
  const postsRef = collection(db, "posts");
  // state for image upload
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // Create: use addDoc to create new documents
  async function createPost(e) {
    try {
      await addDoc(postsRef, {
        title: postTitle,
        description: postDescription,
      });
      console.log("gets this far");
      refreshPosts();
      e.preventDefault();
    } catch (err) {
      console.log(err.message);
    }
  }

  // Read: useEffect to render posts list. when making a request with an api the api will try to return a promise(data that needs to be resolved, either a success or a failure), when making api calls use async await functions
  useEffect(() => {
    async function getPosts() {
      const postsRef = collection(db, "posts");
      const data = await getDocs(postsRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getPosts();
  }, []);

  async function refreshPosts() {
    const postsRef = collection(db, "posts");
    const data = await getDocs(postsRef);
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  // Update a post
  // async function updatePost(e, title, description) {
  //   try {
  //     e.preventDefault();
  //     await updateDoc(postsRef, {
  //       title: title,
  //       description: description,
  //     });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }

  //  Delete a post
  async function deletePost(id) {
    const userDoc = doc(db, "posts", id);
    try {
      await deleteDoc(userDoc);
      alert("Post Deleted");
      refreshPosts();
    } catch (err) {
      console.log(err.message);
    }
  }

  // preview image side effect
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

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
            setPostTitle(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="description"
          variant="outlined"
          onChange={(e) => {
            setPostDescription(e.target.value);
          }}
        />
        {/* input to select image */}
        <input
          accept="image/*"
          type="file"
          id="select-image"
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />
        {/* image preview */}
        {imageUrl && selectedImage && (
          <Box mt={2} textAlign="center">
            <div>Image Preview:</div>
            <img src={imageUrl} alt={selectedImage.name} height="100px" />
          </Box>
        )}
        {/* button to upload image */}
        <label htmlFor="select-image">
          <Button variant="contained" color="primary">
            Upload Image
          </Button>
        </label>
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
            <CardMedia
              component="img"
              height="140"
              image=""
              alt="post picture"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <h6>{post.title}</h6>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <p>{post.description}</p>
              </Typography>
            </CardContent>
            <CardActions>
              {/* modal for edit button */}
              <Modal newTitle={newTitle} newDesc={newDesc} />
              <Button
                size="small"
                onClick={() => {
                  deletePost(post.id);
                }}
              >
                delete
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export default App;
