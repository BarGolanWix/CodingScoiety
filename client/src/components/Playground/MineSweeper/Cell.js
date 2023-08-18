import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";

function Cell({ cellInfo, openCellFunc, flagCellFunc }) {
  const handleOnContextMenu = (e) => {
    e.preventDefault();
    flagCellFunc(cellInfo);
  };

  return (
    <>
      <button
        className="cell"
        onClick={() => openCellFunc(cellInfo)}
        onContextMenu={(e) => handleOnContextMenu(e)}
        style={{
          backgroundColor: cellInfo.flag
            ? "blue"
            : cellInfo.isOpen &&
              !cellInfo.isMine &&
              cellInfo.mineNeighbours == 0
            ? "grey"
            : "lightgray" && cellInfo.isOpen && cellInfo.isMine && "red",
        }}
      >
        {cellInfo.isOpen && !cellInfo.isMine && cellInfo.mineNeighbours}
        {cellInfo.isMine && cellInfo.isOpen && (
          <FontAwesomeIcon icon={faBomb} />
        )}
      </button>
    </>
  );
}

export default Cell;
