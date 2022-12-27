import React from "react";
import { Button, ButtonGroup, Intent } from "@blueprintjs/core";
import { useSelector } from "react-redux";

const CELL_COUNT = 7;
const CELL_MID_LEN = ~~(CELL_COUNT / 2);

export default function Pagination({ totalCount, current, onPaginate }) {
  const properties = useSelector((state) => state.properties);
  const LARGE = properties.buttonLarge;
  const OUTLINED = properties.buttonOutlined;

  function getPagingLayout() {
    let pages = [];

    if (totalCount > CELL_COUNT) {
      // Fill in first and last positions
      pages[0] = { nr: 1 };
      pages[1] = { nr: 2 };
      pages[CELL_COUNT - 2] = { nr: totalCount - 1 };
      pages[CELL_COUNT - 1] = { nr: totalCount };

      if (current <= CELL_MID_LEN) {
        // b ellipse is enabled and the rest of the array is filled
        pages[CELL_COUNT - 2].ellipsis = true;
        for (let i = 2; i < CELL_COUNT - 2; i++) {
          pages[i] = { nr: i + 1 };
        }
      } else if (totalCount - current < CELL_MID_LEN) {
        // a ellipsis is enabled and the later part of array is filled
        pages[1].ellipsis = true;
        for (let i = 2; i < CELL_COUNT - 2; i++) {
          pages[i] = { nr: totalCount - CELL_COUNT + i + 1 };
        }
      } else {
        // both a and b ellipsis are enabled
        pages[1].ellipsis = true;
        pages[CELL_COUNT - 2].ellipsis = true;

        // Current selected is put in centre
        pages[CELL_MID_LEN] = { nr: current };
        // Fill next and prev to mid point
        // CELL_COUNT - 5 := n{MID, FIRST, SECOND, LAST, SECONDLAST}
        for (let i = 1; i < CELL_COUNT - 5; i++) {
          pages[CELL_MID_LEN + i] = { nr: current + i };
          pages[CELL_MID_LEN - i] = { nr: current - i };
        }
      }
    } else {
      for (let i = 0; i < totalCount; i++) {
        pages[i] = { nr: i + 1, ellipsis: false };
      }
    }

    pages.forEach((p) => {
      if (p.nr === current) {
        p.active = true;
      }
    });

    return pages;
  }

  const ltEnable = current > 1;
  const rtEnable = current < totalCount;
  const pages = getPagingLayout();

  return (
    <ButtonGroup large={LARGE}>
      <Button
        icon="chevron-left"
        disabled={!ltEnable}
        large={LARGE}
        outlined={OUTLINED}
        onClick={() => onPaginate(current - 1)}
      />
      {pages.map((p) => (
        <Button
          text={p.ellipsis ? "..." : p.nr}
          key={p.nr}
          large={LARGE}
          outlined={p.active ? false : OUTLINED}
          disabled={p.ellipsis}
          intent={p.active ? Intent.PRIMARY : Intent.DEFAULT}
          onClick={() => onPaginate(p.nr)}
        />
      ))}
      <Button
        icon="chevron-right"
        disabled={!rtEnable}
        large={LARGE}
        outlined={OUTLINED}
        onClick={() => onPaginate(current + 1)}
      />
    </ButtonGroup>
  );
}
