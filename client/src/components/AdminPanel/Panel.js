import TagsCloud from "../Tags/TagsCloud";
import { Container, Divider, Typography } from "@mui/material";
import FunctiolitiesList from "./FunctiolitiesList";
import LogsList from "./LogsList";

function Panel({ tagsList, handleAddNewTag, selectedTagId, handleTagClick }) {
  return (
    <Container
      maxWidth="xs"
      className="tagsListContainer"
      data-testid="tagList"
      sx={{ width: "25%" }}
    >
      {/* <Typography
        variant="h6"
        sx={{ fontWeight: "bold" }}
        color="primary"
        data-testid="tagList-title"
      >
        Control Panel
      </Typography> */}
      {/* <Divider sx={{ padding: "3px" }} /> */}
      <FunctiolitiesList />
      <TagsCloud
        tagsList={tagsList}
        handleAddNewTag={handleAddNewTag}
        selectedTagId={selectedTagId}
        handleTagClick={handleTagClick}
      />
      <LogsList />
    </Container>
  );
}

export default Panel;
