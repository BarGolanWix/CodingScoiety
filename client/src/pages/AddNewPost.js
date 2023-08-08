import {
  Card,
  CardContent,
  CardActions,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  TextField,
  Button,
  Select,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function AddNewPost({ handleAddPost, tagsList }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const handleSubmit = () => {
    if (title === "" || content === "") {
      return alert("all required fields must not be empty!");
    }
    handleAddPost(uuidv4(), title, content, selectedTag);
    navigate("/home");
  };

  const setTitleLimited = (event) => {
    if (title.length <= 80) {
      setTitle(event.target.value);
    } else {
      alert("Title too long! Title must be 80 characters or less...");
    }
  };

  return (
    <div className="container">
      <Card component="form" className="form" data-testid="addNewPost-card">
        <CardContent className="formFields">
          <Typography
            variant="h5"
            component="div"
            className="formTitle"
            data-testid="addNewPost-title"
          >
            Add A New Post
          </Typography>
          <Typography
            gutterBottom
            variant="caption"
            component="div"
            data-testid="addNewPost-required"
          >
            *Required
          </Typography>
          <FormControl sx={{ minWidth: "100%" }}>
            <InputLabel
              required
              htmlFor="title-field"
              data-testid="addNewPost-postTitleLabel"
            >
              Title
            </InputLabel>
            <OutlinedInput
              error={false}
              id="addNewPost-postTitleInput"
              label="Title"
              fullWidth
              value={title}
              onChange={(event) => {
                setTitleLimited(event);
              }}
              data-testid="addNewPost-postTitle"
            />
          </FormControl>
          <TextField
            id="addNewPost-postContentInput"
            label="Content"
            multiline
            rows={4}
            fullWidth
            required
            error={false}
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
            data-testid="addNewPost-postContent"
          />
          <FormControl sx={{ m: 1, minWidth: "max-content", width: "200px" }}>
            <InputLabel
              id="select-tag-label"
              data-testid="addNewPost-postTagLabel"
            >
              Tag
            </InputLabel>
            <Select
              labelId="select-tag-label"
              id="addNewPost-postTagSelect"
              value={selectedTag}
              label="Tag"
              onChange={(event) => {
                setSelectedTag(event.target.value);
              }}
              data-testid="addNewPost-postTag"
            >
              {tagsList.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  data-testid={`addNewPost-postTagOption-${option}`}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            data-testid="addNewPost-submitBtn"
            onClick={handleSubmit}
          >
            submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default AddNewPost;
