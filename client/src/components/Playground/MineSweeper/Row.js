import React, { useEffect } from "react";
import Cell from "./Cell";
import { useState } from "react";

function Row({ boardRow, openCellFunc, flagCellFunc }) {
  return (
    <>
      <div className="row">
        {boardRow.map((entry, index) => {
          if (index === boardRow.length - 1 || index === 0) return;
          return (
            <Cell
              cellInfo={entry}
              openCellFunc={openCellFunc}
              flagCellFunc={flagCellFunc}
              key={`cell-${index}`}
            />
          );
        })}
      </div>
    </>
  );
}

export default Row;
