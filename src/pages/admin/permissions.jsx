import PermissionsForm from "../../components/Forms/admin/PermissionsForm";
import DataTableWithDialog from "../../components/Table/Templates/DataTableWithDialog";
import {
  addData,
  deleteData,
  getByOffset,
  getOneById,
  updateData,
} from "../../services/http/admin/permissions";

const REQUIRED_COLUMNS = ["name"];

const Permissions = () => {
  return (
    <DataTableWithDialog
      requiredColumns={REQUIRED_COLUMNS}
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
          <PermissionsForm
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

export default Permissions;
