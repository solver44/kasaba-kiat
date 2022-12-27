import { Tab, Tabs } from "@blueprintjs/core";
import React from "react";
import RolesForm from "../../components/Forms/admin/RolesForm";
import DataTableWithDialog from "../../components/Table/Templates/DataTableWithDialog";
import {
  addData,
  deleteData,
  getByOffset,
  getOneById,
  updateData,
} from "../../services/http/admin/roles";
import Permissions from "./Permissions";

export default function Roles() {
  return (
    <Tabs large={true}>
      <Tab id="roles" title="Роллар" panel={<RolesPanel />} />
      <Tab id="permissions" title="Руҳсатлар" panel={<Permissions />} />
      <Tabs.Expander />
    </Tabs>
  );
}

const RolesPanel = () => {
  return (
    <DataTableWithDialog
      addData={addData}
      deleteData={deleteData}
      updateData={updateData}
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
          <RolesForm
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
};
