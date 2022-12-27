import { Checkbox, Menu, MenuItem, Tag } from "@blueprintjs/core";
import { ContextMenu2 } from "@blueprintjs/popover2";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { TableContext } from "../../contexts/TableContext";
import translateKey from "../../services/localization/translateText";

const FORMATTED_COLUMNS = {
  createdAt: "date",
  updatedAt: "date",
};

const ContextMenuContent = ({
  row,
  editRow,
  deleteRow,
  copyRow,
  clipboard,
  pasteRow,
}) => (
  <Menu>
    <MenuItem onClick={editRow} icon="edit" text={translateKey("edit")} />
    <MenuItem
      onClick={() => copyRow(row)}
      icon="duplicate"
      text={translateKey("copy")}
    />
    <MenuItem
      disabled={!clipboard}
      onClick={() => pasteRow(clipboard)}
      icon="clipboard"
      text={translateKey("paste")}
    />
    <MenuItem
      onClick={deleteRow}
      icon="trash"
      text={translateKey("delete")}
      intent="danger"
    />
  </Menu>
);

export default function Table({
  notFound,
  data,
  customColumns,
  entries,
  currentPage,
  onDoubleClickRow,
  onCopyRow,
  onPasteRow,
  onDeleteRow,
}) {
  const context = useContext(TableContext);
  const clipboard = useSelector((state) => state.clipboard);

  const onClick = (row) => {
    if (context.selectedRow.includes(row.id) || context.selectMode) return;
    context.setSelectedRow([row.id]);
  };

  return (
    <React.Fragment>
      {notFound ? (
        <div className="no-data">
          <p>{translateKey("data_not_found")}!</p>
        </div>
      ) : (
        <table
          className={`bp4-html-table bp4-html-table-striped`} //hover effect ${data == null ? '' : 'bp4-interactive'}
        >
          <thead>
            {data === null ? (
              headTableSkeleton(
                customColumns.length === 0 ? 2 : customColumns.length
              )
            ) : (
              <tr>
                {context.selectMode && (
                  <th>
                    <Checkbox
                      checked={context.selectAllRow}
                      onChange={context.selectAll}
                    />
                  </th>
                )}
                <th>№</th>
                {customColumns.map((col, index) => (
                  <th datatype={FORMATTED_COLUMNS[col]} key={index}>
                    {translateKey(col)}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {data === null ? (
              bodyTableSkeleton(
                entries,
                customColumns.length === 0 ? 2 : customColumns.length
              )
            ) : (
              <>
                {context.body.map((row, index) => {
                  let newArray = Object.entries(row);

                  return (
                    <ContextMenu2
                      content={ContextMenuContent({
                        row,
                        clipboard,
                        editRow: onDoubleClickRow,
                        copyRow: onCopyRow,
                        deleteRow: onDeleteRow,
                        pasteRow: onPasteRow,
                      })}
                      tagName={"tr"}
                      className={
                        context.selectedRow.includes(row.id) &&
                        !context.selectMode
                          ? "selected-row"
                          : ""
                      }
                      onDoubleClick={onDoubleClickRow}
                      onContextMenu={() => onClick(row)}
                      onClick={() => onClick(row)}
                      key={index}
                    >
                      {context.selectMode && (
                        <td>
                          <Checkbox
                            checked={
                              context.selectedRow.includes(row.id) ||
                              context.selectAllRow
                            }
                            onChange={(e) => context.checkboxChecked(e, row)}
                          />
                        </td>
                      )}
                      <td>{index + 1 + (currentPage - 1) * entries}</td>
                      {newArray.map((item, index) => {
                        if (!customColumns.includes(item[0])) return null;
                        return getFormattedText(index, item);
                      })}
                    </ContextMenu2>
                  );
                })}
              </>
            )}
          </tbody>

          {/* <tfoot>
          <tr>
            <td colSpan={3}>Total</td>
            <td>{data ? data.data.length : '0'}</td>
          </tr>
        </tfoot> */}
        </table>
      )}
    </React.Fragment>
  );
}

function getFormattedText(index, text) {
  if (!text) return null;
  let result = text[1];

  if (isDate(text[1])) {
    const d = new Date(text[1]);
    result =
      ("0" + d.getHours()).slice(-2) +
      ":" +
      ("0" + d.getMinutes()).slice(-2) +
      ", " +
      ("0" + d.getDate()).slice(-2) +
      "." +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "." +
      d.getFullYear();
  } else if (Array.isArray(text[1])) {
    return (
      <td style={{ whiteSpace: "normal", maxWidth: "300px" }} key={index}>
        {result.map((item) => (
          <Tag
            style={{ margin: 3 }}
            interactive={true}
            large={true}
            key={item.id}
          >
            {item.name}
          </Tag>
        ))}
      </td>
    );
  }

  return <td key={index}>{result}</td>;
}

function isDate(_date) {
  const _regExp = new RegExp(
    "^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$"
  );
  return _regExp.test(_date);
}

const bodyTableSkeleton = (count, rowCount) => (
  <>
    {Array(Math.min(count, 15))
      .fill()
      .map((_, i) => (
        <tr key={i}>
          {Array(rowCount)
            .fill()
            .map((_, i) => (
              <td key={i}>
                <p className="bp4-skeleton skeleton-p">
                  {i === 0 ? "#" : "Lorem ipsum."}
                </p>
              </td>
            ))}
        </tr>
      ))}
  </>
);

const headTableSkeleton = (count) => (
  <tr>
    {Array(count)
      .fill()
      .map((_, i) => (
        <th key={i}>
          <p className="bp4-skeleton skeleton-p">
            {i === 0 ? "#" : "Lorem ipsum."}
          </p>
        </th>
      ))}
  </tr>
);
