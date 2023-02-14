import React from "react";
import SpSooguForm from "../../components/Forms/directory/SpSoogu";
import DataTableWithDialog from "../../components/Table/Templates/DataTableWithDialog";
import {
  addSection,
  deleteSection,
  getByOffset,
  getOneById,
  updateSection,
} from "../../services/http/directory/soogu";
import translateKey from "../../services/localization/translateText";

const REQUIRED_COLUMNS = ["name_ru", "name_uz", "name_uzl"];

export default function Translate() {
  return (
    <div className="sections-screen">
      <DataTableWithDialog
        title={translateKey("soogu")}
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
            is_active,
            saveRow,
            isOpen,
            handleClose,
            ...inprops
          } = props;
          return (
            <SpSooguForm
              data={data}
              error={error}
              isLoading={isLoading}
              is_active={is_active}
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
