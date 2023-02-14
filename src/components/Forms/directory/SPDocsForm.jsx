import React from "react";
import SpTypeOfOrgForm from "../../components/Forms/directory/SpTypeOfOrgForm";
import DataTableWithDialog from "../../components/Table/Templates/DataTableWithDialog";
import {
  addSection,
  deleteSection,
  getByOffset,
  getOneById,
  updateSection,
} from "../../services/http/directory/type_of_organization";
import translateKey from "../../services/localization/translateText";

const REQUIRED_COLUMNS = ["name_ru", "name_uz", "name_uzl"];

export default function Translate() {
  return (
    <div className="sections-screen">
      <DataTableWithDialog
        title={translateKey("type_of_organization")}
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
            <SpTypeOfOrgForm
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
