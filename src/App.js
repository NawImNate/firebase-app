import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "./app.css";

function App() {
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
    </div>
  );
}

export default App;
