import React from "react";
import TranslateForm from "../../components/Forms/admin/TranslateForm";
import DataTableWithDialog from "../../components/Table/Templates/DataTableWithDialog";
import {
  addTranslate,
  deleteTranslate,
  getByOffset,
  getOneById,
  updateTranslate,
} from "../../services/http/admin/translate";
import translateKey from "../../services/localization/translateText";

const REQUIRED_COLUMNS = ["translate_uz", "translate_ru", "translate_uzl"];

export default function Translate() {
  return (
    <DataTableWithDialog
      title={translateKey("setting_translations")}
      requiredColumns={REQUIRED_COLUMNS}
      addData={addTranslate}
      deleteData={deleteTranslate}
      updateData={updateTranslate}
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
          <TranslateForm
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
  );
}
