import React from "react";
import SpCountriesForm from "../../components/Forms/directory/SpCoatoForm";
import DataTableWithDialog from "../../components/Table/Templates/DataTableWithDialog";
import {
  addSection,
  deleteSection,
  getByOffset,
  getOneById,
  updateSection,
} from "../../services/http/directory/coato";
import translateKey from "../../services/localization/translateText";

const REQUIRED_COLUMNS = ["name_ru", "name_uz", "name_uzl", "name_of_centre_ru", "name_of_centre_uz", "name_of_centre_uzl"];

export default function Translate() {
  return (
    <div className="sections-screen">
      <DataTableWithDialog
        title={translateKey("МХОВТ (СОАТО)")}
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
            <SpCountriesForm
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
