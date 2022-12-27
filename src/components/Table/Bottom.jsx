import { Button, NumericInput } from "@blueprintjs/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import translateKey from "../../services/localization/translateText";
import { MAX_TABLE_ROWS } from "../../shared/Constants";
import { AppToaster } from "../AppToaster/toaster";
import Pagination from "./Pagination";

export default function BottomTable({
  totalCount,
  tableEntries,
  entries,
  totalItemCount,
  current,
  onPaginate,
}) {
  const [numEntries, setEntries] = useState(15);

  const setEntriesF = (e) => {
    if (e?.key !== "Enter") return;
    if (numEntries <= MAX_TABLE_ROWS && numEntries > 0) {
      entries(numEntries);
      return;
    }
    AppToaster({
      message: translateKey("table_rows_should_not_exceed", {
        number: MAX_TABLE_ROWS,
      }),
      intent: "danger",
    });
  };

  const properties = useSelector((state) => state.properties);
  return (
    <div className="bottom-table">
      <div className="pages-content">
        <p>
          {(current - 1) * numEntries} -{" "}
          {(current - 1) * numEntries + numEntries} {translateKey("total")}:{" "}
          {totalItemCount}
        </p>
      </div>
      <div className="d-flex-row right-bottom-table">
        <label className="d-flex-row bp4-inline" style={{ lineHeight: "25px" }}>
          {translateKey("rows_count")}
          <NumericInput
            style={{ width: 100 }}
            large={properties.buttonLarge}
            buttonPosition="left"
            value={numEntries}
            maxLength={MAX_TABLE_ROWS}
            minLength={1}
            rightElement={
              numEntries !== tableEntries && (
                <Button
                  minimal={true}
                  onClick={() => setEntriesF({ key: "Enter" })}
                  icon={"tick"}
                ></Button>
              )
            }
            onKeyDown={setEntriesF}
            onValueChange={(val) => setEntries(val)}
          />
        </label>
        <Pagination
          totalCount={totalCount}
          current={current}
          onPaginate={onPaginate}
        />
      </div>
    </div>
  );
}
