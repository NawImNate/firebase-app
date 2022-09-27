import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { db } from "../firebase_config";
import { collection, updateDoc } from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Updated state: state for new title and description
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const postsRef = collection(db, "posts");

  // update function
  async function updatePost(e, title, description) {
    try {
      await updateDoc(postsRef, {
        title: newTitle,
        description: newDesc,
      });
      console.log("we werkin");
      e.preventDefault();
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Edit Post
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="outlined-basic"
              label="update title"
              variant="outlined"
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="update description"
              variant="outlined"
              onChange={(e) => {
                setNewDesc(e.target.value);
              }}
            />
          </Typography>
          <Button variant="outlined" onClick={updatePost}>
            Update Post
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
