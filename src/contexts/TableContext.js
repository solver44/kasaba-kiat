import { createContext, useState } from "react";

export const TableContext = createContext();

export function useTableContext({ body }) {
  const [selectMode, setSelectMode] = useState(false);
  const [selectAllRow, setSelectAllRow] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);

  const selectTableMode = (e) => {
    const { checked } = e.target;
    setSelectAllRow(false);
    setSelectedRow([]);
    if (!checked) {
      setSelectMode(false);
      return;
    }
    setSelectMode(true);
  };
  const selectAll = (e) => {
    const { checked } = e.target;
    if (!checked) {
      setSelectAllRow(false);
      setSelectedRow([]);
    } else {
      setSelectAllRow(true);
      setSelectedRow(body.map((col) => col.id));
    }
  };
  const checkboxChecked = (e, col) => {
    const { checked } = e.target;
    setSelectAllRow(false);
    if (checked) setSelectedRow([...selectedRow, col.id]);
    else setSelectedRow(selectedRow.filter((i) => i !== col.id));
  };

  return {
    body,
    selectAllRow,
    selectMode,
    setSelectMode,
    selectedRow,
    setSelectedRow,
    selectTableMode,
    selectAll,
    setSelectAllRow,
    checkboxChecked,
  };
}
