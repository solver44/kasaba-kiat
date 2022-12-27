import { Button, Icon } from "@blueprintjs/core";
import React, { useRef, useEffect, useState } from "react";

import translateKey from "../../services/localization/translateText";
import { AppToaster } from "../AppToaster/toaster";

export default function DragAndDropFile(props) {
  const dropArea = useRef(null);
  const input = useRef(null);
  const dragText = useRef(null);

  const [enter, setEnter] = useState(false);
  const [file, setFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    if (enter) return;
    setEnter(true);
    dropArea.current?.classList.add("active");
    dragText.current.textContent = translateKey("release-to-upload-file");
  };
  const handleDragOut = () => {
    setEnter(false);
    dropArea.current?.classList.remove("active");
    dragText.current.textContent = translateKey("drag-and-drop-here");
  };
  const handleDrop = (e) => {
    e.preventDefault();
    handleDragOut();

    setFile(e.dataTransfer.files[0]);
    viewfile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    dropArea.current?.classList.add("active");
    viewfile(e.target.files[0]);
  };

  function viewfile(file) {
    if (!file?.type) return;
    let fileType = file.type;
    let validExtensions = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (validExtensions.includes(fileType)) {
      // let fileReader = new FileReader();
      // fileReader.onload = ()=>{
      //   let fileURL = fileReader.result;
      //   console.log(fileURL);
      // }
      // fileReader.readAsDataURL(file);
      props.handleFile(file);
    } else {
      AppToaster({
        message: translateKey("not-validate-file"),
        intent: "warning",
      });
    }
  }

  useEffect(() => {
    dropArea.current?.addEventListener("dragenter", handleDrag);
    dropArea.current?.addEventListener("dragleave", handleDragOut);
    dropArea.current?.addEventListener("dragover", handleDrag);
    dropArea.current?.addEventListener("drop", handleDrop);
    input.current?.addEventListener("change", handleChange);
  }, []);

  return (
    // <Card elevation={0}>
    <div ref={dropArea} className="dragn-drop-file">
      {file && <div className="file-name">{file?.name}</div>}
      <div tabIndex={0} className="icon-upload">
        <Icon size={60} icon={"cloud-upload"} />
      </div>
      <h6 tabIndex={0} ref={dragText}>
        {translateKey("drag-and-drop-here")}
      </h6>
      <span>{translateKey("or")}</span>
      {!enter && (
        <Button
          onClick={() => {
            input.current?.click();
          }}
          outlined={true}
        >
          {translateKey("select-file")}
        </Button>
      )}
      <input
        ref={input}
        type="file"
        hidden
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </div>
    // </Card>
  );
}
