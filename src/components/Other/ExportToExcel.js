import { useEffect } from "react";
import { Button, Classes, Dialog, Divider } from "@blueprintjs/core";
import { useSelector } from "react-redux";
import translateKey from "../../services/localization/translateText";

import writeXlsxFile from "write-excel-file";
import { AppToaster } from "../AppToaster/toaster";

const firstColumn = () => {
  const obj = {};
  obj.value = "№";
  obj.borderStyle = "thin";
  obj.height = 35;
  obj.align = "center";
  obj.alignVertical = "center";
  obj.fontWeight = "bold";

  return obj;
};
const firstRow = (index) => {
  const obj = {};
  obj.value = index;
  obj.borderStyle = "thin";

  return obj;
};

async function HtmlTOExcel(columns, body, title) {
  try {
    const hasFirstRow = true;

    const data = [];
    const allWidth = hasFirstRow ? [[2]] : [];
    const header = hasFirstRow ? [firstColumn()] : [];

    columns.forEach((col) => {
      const obj = {};
      const translated = translateKey(col);

      obj.value = translated;
      obj.borderStyle = "thin";
      obj.height = 35;
      obj.align = "center";
      obj.alignVertical = "center";
      obj.fontWeight = "bold";

      allWidth.push([translated.length]);

      header.push(obj);
    });

    data.push(header);

    const objects = body;
    objects.forEach((obj, index) => {
      const dataVal = [];
      if (hasFirstRow) {
        dataVal.push(firstRow(index + 1));
        allWidth[0].push((index + 1).toString().length);
      }

      let countCol = hasFirstRow ? 1 : 0;
      Object.keys(obj).forEach((item) => {
        if (!columns.includes(item)) return null;

        const manipulatedValue = Array.isArray(obj[item])
          ? obj[item]
              .map((o) => (typeof o === "object" ? o?.name : o))
              .join(",")
          : obj[item];

        const objectValue =
          typeof manipulatedValue === "object"
            ? manipulatedValue?.name
            : manipulatedValue;

        allWidth[countCol].push(manipulatedValue?.length ?? 0);
        countCol++;

        const obb = {};
        obb.value = objectValue;
        obb.borderStyle = "thin";

        dataVal.push(obb);
      });
      data.push(dataVal);
    });

    const columnsWidth = [];
    allWidth.forEach((widths) => {
      columnsWidth.push({ width: Math.max.apply(Math, widths) + 3 });
    });

    await writeXlsxFile(data, {
      columns: columnsWidth,
      fontSize: 11,
      fileName: (title ?? "export") + ".xlsx",
    });
  } catch (error) {
    AppToaster({ message: error, intent: "danger" });
  }
}

const ExportTableForm = (props) => {
  const exportTable = (e) => {
    e.preventDefault();
    HtmlTOExcel(props.columns, props.body, props.title);
  };
  useEffect(() => {
    if (!props.isOpen) return;

    HtmlTOExcel(props.columns, props.body, props.title);
  }, [props.isOpen]);

  return <></>;
  // return (<Dialog
  // isOpen={props.isOpen}
  // onClose={props.handleClose}
  // canOutsideClickClose={true}
  // title={translateKey('upload_to_excel')}
  // >
  //   {/* {props.table} */}
  //   <form onSubmit={exportTable}>
  //     <Divider />
  //     {FormFooter(props)}
  //   </form>
  // </Dialog>);
};
function FormFooter(props) {
  const properties = useSelector((state) => state.properties);

  return (
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button
          large={properties.buttonLarge}
          outlined={properties.buttonOutlined}
          onClick={props.handleClose}
        >
          {translateKey("close")}
        </Button>
        <Button
          large={properties.buttonLarge}
          outlined={properties.buttonOutlined}
          type="submit"
          intent="primary"
        >
          {translateKey("download")}
        </Button>
      </div>
    </div>
  );
}

export default ExportTableForm;
