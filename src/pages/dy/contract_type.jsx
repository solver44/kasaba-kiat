import React from "react";
import SpContractForm from "../../components/Forms/directory/SpContractForm";
import DataTableWithDialog from "../../components/Table/Templates/DataTableWithDialog";
import {
  addSection,
  deleteSection,
  getByOffset,
  getOneById,
  updateSection,
} from "../../services/http/directory/contract_type";
import translateKey from "../../services/localization/translateText";

const REQUIRED_COLUMNS = ["name_ru", "name_uz", "name_uzl"];

export default function Translate() {
  return (
    <div className="sections-screen">
      <DataTableWithDialog
        title={translateKey("contract type")}
        requiredColumns={REQUIRED_COLUMNS}
        addData={addSection}
        deleteData={deleteSection}
        updateData={updateSection}
        getByOffset={getByOffset}
        getOneById={getOneById}
      >
        {(props) => {
          const {
            data,
            error,
            isLoading,
            saveRow,
            isOpen,
            handleClose,
            ...inprops
          } = props;
          return (
            <SpContractForm
              data={data}
              error={error}
              isLoading={isLoading}
              saveRow={saveRow}
              isOpen={isOpen}
              handleClose={handleClose}
              {...inprops}
            />
          );
        }}
      </DataTableWithDialog>
    </div>
  );
}
