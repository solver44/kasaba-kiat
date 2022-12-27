import {
  ButtonGroup,
  Button,
  AnchorButton,
  InputGroup,
  Menu,
  MenuItem,
  Checkbox,
} from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import translateKey from "../../services/localization/translateText";
import ExportTableForm from "../Other/ExportToExcel";
import ImportTableForm from "../Other/ImportFromExcel";
import DropDownButton from "../Widgets/DropDownButton";

const excelMenu = (props) => (
  <Menu>
    <MenuItem
      icon="export"
      onClick={props.uploadToExcel}
      text={translateKey("upload_to_excel")}
    />
    {!props.isBasket && (
      <MenuItem
        icon="import"
        onClick={props.importFromExcel}
        text={translateKey("import_from_excel")}
      />
    )}
  </Menu>
);

export default function TableActions(props) {
  const {
    isBasket,
    uuid,
    title,
    currentTable,
    selectedRow,
    filterData,
    tableMenu,
    deleteRow,
    fullDeleteRow,
    updateRow,
    addRow,
    restoreRow,
    selectMode,
    basketToggle,
    ...other
  } = props;

  const [openExport, setOpenExport] = useState(false);
  const [openImport, setOpenImport] = useState(false);

  const openExportForm = () => {
    setOpenExport(true);
  };
  const openImportForm = () => {
    setOpenImport(true);
  };
  const handleClose = () => {
    setOpenExport(false);
    setOpenImport(false);
  };

  const properties = useSelector((state) => state.properties);

  const trashMenu = (selectedRow) => {
    return [
      <>
        <Button
          text={
            translateKey("delete") +
            (selectedRow.length > 1 ? ` (${selectedRow?.length})` : "")
          }
          icon="trash"
          intent="danger"
          onClick={(e) => {
            e.stopPropagation();
            deleteRow();
          }}
        />
      </>,
      <>
        <MenuItem
          text={translateKey("basket")}
          icon="archive"
          intent="danger"
          onClick={basketToggle}
        />
      </>,
    ];
  };

  return (
    <div className="table-actions">
      <ExportTableForm
        title={title}
        columns={currentTable?.columns}
        body={currentTable?.body}
        isOpen={openExport}
      />
      <ImportTableForm
        uuid={uuid}
        title={title}
        requiredColumns={currentTable?.requiredColumns}
        columns={currentTable?.allColumns}
        body={currentTable?.body}
        isOpen={openImport}
        handleClose={handleClose}
      />

      <div className={"d-flex"}>
        <ButtonGroup large={properties.buttonLarge}>
          {isBasket ? (
            <Button
              intent="success"
              outlined={properties.buttonOutlined}
              onClick={restoreRow}
              icon="history"
            >
              {translateKey("restore")}
            </Button>
          ) : (
            <Button
              intent="primary"
              outlined={properties.buttonOutlined}
              onClick={() => addRow()}
              icon="plus"
            >
              {translateKey("add")}
            </Button>
          )}
          <Button
            intent="primary"
            disabled={selectedRow.length > 1}
            outlined={properties.buttonOutlined}
            onClick={updateRow}
            icon={isBasket ? "eye-open" : "edit"}
          >
            {translateKey(isBasket ? "watch" : "edit")}
          </Button>
          {!isBasket && (
            <DropDownButton
              intent="danger"
              arrow={other?.basket === undefined ? true : other.basket}
              default={trashMenu(selectedRow)[0]}
              items={trashMenu(selectedRow)[1]}
            />
          )}
          <Popover2
            {...properties.popover2}
            content={excelMenu({
              isBasket,
              uploadToExcel: openExportForm,
              importFromExcel: openImportForm,
            })}
          >
            <AnchorButton
              intent="success"
              outlined={properties.buttonOutlined}
              icon="th"
              rightIcon="caret-down"
            >
              {translateKey("excel")}
            </AnchorButton>
          </Popover2>
          <Popover2 {...properties.popover2} content={tableMenu}>
            <AnchorButton
              icon="settings"
              outlined={properties.buttonOutlined}
              rightIcon="caret-down"
            >
              {translateKey("setting")}
            </AnchorButton>
          </Popover2>
          {isBasket && (
            <Button
              icon="trash"
              intent="danger"
              minimal
              onClick={fullDeleteRow}
            >
              {selectedRow.length > 1 ? ` (${selectedRow?.length})` : ""}
            </Button>
          )}
        </ButtonGroup>
        <Checkbox
          onChange={selectMode}
          large={true}
          style={{ marginLeft: 10, top: "50%", transform: "translateY(-50%)" }}
        />
      </div>
      <InputGroup
        large={properties.buttonLarge}
        fill={false}
        type="text"
        leftIcon="search"
        placeholder={translateKey("search")}
        onKeyDown={(e) => {
          filterData(e);
        }}
      />
    </div>
  );
}
