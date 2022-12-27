import { Button, Classes, Dialog, Divider, H3 } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import translateKey from "../../services/localization/translateText";

import readXlsxFile from "read-excel-file";
import writeXlsxFile from "write-excel-file";
import DragAndDropFile from "./DragAndDropFile";
import { AppToaster } from "../AppToaster/toaster";
import { setImportedRows } from "../../store/actions";
import { useState } from "react";

async function DownloadTempate(columns, title, required) {
  try {
    const data = [];
    const header = [];
    const columnsWidth = [];

    columns.forEach((col) => {
      const obj = {};
      const translated = col + ` "${translateKey(col)}"`;

      obj.value = translated;
      obj.borderStyle = "thin";
      obj.height = 35;
      obj.align = "center";
      obj.alignVertical = "center";
      obj.fontWeight = "bold";
      obj.color = required?.includes(col) ? "#ac2f33" : "#2d72d2";

      header.push(obj);
      columnsWidth.push({ width: translated.length + 4 });
    });

    data.push(header);

    await writeXlsxFile(data, {
      columns: columnsWidth,
      fontSize: 11,
      fileName: `${title} (${translateKey("template")}).xlsx`,
    });
  } catch (error) {
    AppToaster({ message: error.message, intent: "danger" });
  }
}

async function ExcelToData(file, required, { setImportedRowsF }) {
  try {
    const rows = await readXlsxFile(file);

    if (rows.length <= 1) throw Error(translateKey("data-not-found"));

    const resultReq = rows[0].filter(
      (i) =>
        required?.includes(i.split(" ")[0].trim()) ||
        required?.includes(i.split('"')[0].trim())
    );
    if (resultReq.length !== required?.length)
      throw Error(translateKey("required-columns-did-not-match"));

    if (!setImportedRowsF) return;
    setImportedRowsF(rows);

    AppToaster({
      message: translateKey("data-is-ready-to-set") + ` (${rows.length - 1})`,
    });
  } catch (error) {
    // console.error(error);
    if (error.message.includes("file or directory could not be found"))
      AppToaster({
        message: translateKey("file-or-directory-not-found"),
        intent: "danger",
      });
    else {
      AppToaster({ message: error.message, intent: "danger" });
    }
  }
}

const ImportTableForm = (props) => {
  const [currentFileRows, setCurrentFileRows] = useState(null);

  const dispatch = useDispatch();

  const setDataTable = (e) => {
    e.preventDefault();
    if (!currentFileRows) return;

    dispatch(setImportedRows({ rows: currentFileRows, uuid: props.uuid }));
    setCurrentFileRows(null);
  };

  const setCurrentRows = (rows) => {
    setCurrentFileRows(rows);
  };

  return (
    <Dialog
      style={{ width: "70%" }}
      isOpen={props.isOpen}
      onClose={props.handleClose}
      canOutsideClickClose={true}
      title={translateKey("import_from_excel")}
    >
      {FormBody({ ...props, setCurrentRows })}
      <form onSubmit={setDataTable}>
        <Divider />
        {FormFooter({ ...props, currentFileRows })}
      </form>
    </Dialog>
  );
};

function FormBody(props) {
  const setImportedRowsF = (rows) => {
    props.setCurrentRows(rows);
  };

  return (
    <div style={{ padding: "20px" }}>
      <DragAndDropFile
        handleFile={(file) => {
          ExcelToData(file, props.requiredColumns, { setImportedRowsF });
        }}
      />
      <div style={{ marginTop: "30px" }} className="d-flex">
        <div className="columns-parametrs">
          <H3>{translateKey("required-columns")}</H3>
          {props.columns?.map((col, index) => {
            if (props.requiredColumns?.includes(col))
              return HeaderCallout({ key: index, text: col, intent: "danger" });
            return null;
          })}
        </div>
        <div className="columns-parametrs">
          <H3>{translateKey("additional-columns")}</H3>
          {props.columns?.map((col, index) => {
            if (!props.requiredColumns?.includes(col))
              return HeaderCallout({ key: index, text: col });
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

const HeaderCallout = ({ key, text, intent = "primary" }) => {
  return (
    <Button
      key={key}
      style={{ margin: 2 }}
      large={true}
      intent={intent}
      outlined={true}
    >
      {text}{" "}
      <span className={Classes.TEXT_DISABLED}>
        &quot;{translateKey(text)}&quot;
      </span>
    </Button>
  );
};

function FormFooter(props) {
  const properties = useSelector((state) => state.properties);

  return (
    <div style={{ marginTop: 20 }} className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS + " rel"}>
        <Button
          className="abs left-pos"
          large={true}
          outlined={true}
          onClick={() =>
            DownloadTempate(
              props.columns,
              props.title ?? "",
              props.requiredColumns
            )
          }
        >
          {translateKey("download-template")}
        </Button>

        <Button
          large={true}
          outlined={properties.buttonOutlined}
          onClick={props.handleClose}
        >
          {translateKey("close")}
        </Button>
        <Button
          disabled={!props.currentFileRows}
          large={true}
          outlined={properties.buttonOutlined}
          type="submit"
          intent="success"
        >
          {translateKey("add")}
        </Button>
      </div>
    </div>
  );
}

export default ImportTableForm;
