import UsersForm from "../../components/Forms/admin/UsersForm";
import DataTableWithDialog from "../../components/Table/Templates/DataTableWithDialog";
import {
  addData,
  deleteData,
  getByOffset,
  getOneById,
  updateData,
} from "../../services/http/admin/users";
import translateKey from "../../services/localization/translateText";

const REQUIRED_COLUMNS = ["name"];

const Users = () => {
  return (
    <DataTableWithDialog
      title={translateKey("user_managment")}
      requiredColumns={REQUIRED_COLUMNS}
      addData={addData}
      deleteData={deleteData}
      updateData={updateData}
      getByOffset={getByOffset}
      getOneById={getOneById}
      tableActions={{
        basket: false,
      }}
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
          <UsersForm
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

export default Users;
