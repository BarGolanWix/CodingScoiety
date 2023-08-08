import { Fab } from "@mui/material";

function Tag({
  tagName,
  postId = "",
  handleOnClick,
  selectedTagId = "",
  isDisabled,
}) {
  const dataTestId = postId ? `tag-${tagName}-${postId}` : `tag-${tagName}`;
  const color = selectedTagId === dataTestId ? "primary" : "default";

  return (
    <Fab
      key={tagName}
      variant="extended"
      size="small"
      disableRipple
      className="Badge"
      disabled={isDisabled}
      onClick={() => handleOnClick(tagName, dataTestId)}
      color={color}
      data-testid={dataTestId}
    >
      {tagName}
    </Fab>
  );
}

export default Tag;
