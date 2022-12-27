import React, { useEffect, useState } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import {
  AppToaster,
  AppToasterWithProgressBar,
  ToasterWithDrawer2,
} from "../../AppToaster/toaster";
import DataTable from "../DataTable";
import { useSelector } from "react-redux";
import translateKey from "../../../services/localization/translateText";
import { Dialog } from "@blueprintjs/core";
import { uuidGenerate } from "../../../helper/generator";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const BasketTable = (props) => {
  const {
    addData,
    deleteData,
    updateData,
    getByOffset,
    getOneById,
    basketOpen,
    handleClose,
  } = props;

  return (
    <Dialog
      canOutsideClickClose={true}
      isOpen={basketOpen}
      title={translateKey("basket")}
      onClose={handleClose}
    >
      <DataTableWithDialog
        addData={addData}
        deleteData={deleteData}
        updateData={updateData}
        getByOffset={getByOffset}
        getOneById={getOneById}
        isBasket={true}
      >
        {props.children}
      </DataTableWithDialog>
    </Dialog>
  );
};

export default function DataTableWithDialog(props) {
  const [data, setData] = useStateIfMounted(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useStateIfMounted(false);

  const [openForm, setOpenForm] = useState(false);
  const [dataForm, setDataForm] = useState(null);

  const [fetchValues, setFetchValues] = useState();

  const [uuid, setUUID] = useState(null);

  const currentImportedRows = useSelector((state) => state.importedRows);

  const [basketOpen, setBasketOpen] = useState(false);

  const {
    addData,
    getByOffset,
    getOneById,
    updateData,
    deleteData,
    title,
    children,
    isBasket,
    requiredColumns,
    byOffset,
    ...inprops
  } = props;

  const addManyData = async (rowsM) => {
    const errorRows = [];
    const rows = rowsM;
    let count = 0;
    let key;
    try {
      key = AppToasterWithProgressBar({
        total: rows.length - 1,
        onDismiss: () => {},
      });

      const columns = rows[0].map((item) => {
        return item.includes('"')
          ? item.split('"')[0].trim()
          : item.split(" ")[0].trim();
      });
      const convertedRows = [];
      rows.shift();

      rows.forEach((row) => {
        const obj = {};
        row.forEach((item, i) => {
          if (!item) return;
          obj[columns[i]] = item;
        });
        convertedRows.push(obj);
      });

      let abort = false;
      for (let i = 0; i < convertedRows.length; i++) {
        try {
          await addData(convertedRows[i]);
          count = i + 1;
        } catch (error) {
          const obj = {};
          obj.row = i + 1;
          obj.error = error.response.data.error;
          errorRows.push(obj);
        }
        if (rows.length <= 100) await sleep(50);
        else await sleep(10);

        AppToasterWithProgressBar({
          value: i + 1,
          total: rows.length,
          onDismiss: () => (abort = true),
          key,
        });
        if (abort) throw Error("dismiss");
      }
    } catch (error) {
      if (error.message !== "dismiss")
        AppToaster({ message: error.message, intent: "danger" });
    } finally {
      if (count > 0) {
        AppToaster({
          message: translateKey("successfully_added_rows", { number: count }),
          intent: "success",
        });
      }
      if (errorRows.length > 0)
        ToasterWithDrawer2({
          title: translateKey("error_while_adding_data"),
          body: errorRows,
        });

      AppToasterWithProgressBar({
        value: count,
        total: count,
        key,
        intent: "warning",
      });
    }
    await reloadData();
  };

  useEffect(() => {
    if (!currentImportedRows.rows || currentImportedRows.uuid !== uuid) return;
    addManyData(currentImportedRows.rows);
  }, [currentImportedRows]);

  const fetchNewData = async () => {
    try {
      const result = await getByOffset({
        offset: 0,
        limit: 15,
        trash: props?.isBasket,
      });
      setData(result);
    } catch (error) {
      // console.log(error.response.data.error);
      ToasterWithDrawer2({
        title: error.message,
        body: error.response.data.error ?? error.response.data.message,
      });
      setError({
        message: error.message,
        detailed: error.response.data,
      });
    }
  };
  useEffect(() => {
    if (uuid === null) setUUID(uuidGenerate());

    fetchNewData();
  }, []);

  const fetchData = async (offset, limit, columns, searchText) => {
    setData(null);
    try {
      setFetchValues({ offset, limit, columns, searchText });
      const response = await getByOffset({
        offset,
        limit,
        columns,
        searchText,
        trash: props?.isBasket,
      });
      setData(response);
    } catch (error) {
      setError({
        message: error.message,
        detailed: error.response.data.error,
      });
    }
  };

  const reloadData = async () => {
    await sleep(500);
    setLoading(false);
    if (fetchValues)
      fetchData(
        fetchValues.offset,
        fetchValues.limit,
        fetchValues.columns,
        fetchValues.searchText
      );
    else fetchNewData();
  };

  const restoreData = async (data) => {
    setLoading(true);
    const update = { trash: false };
    try {
      if (!Array.isArray(data)) await updateData(data, update);
      else {
        for (let i = 0; i < data.length; i++) {
          if (typeof data[i] === "object") await updateData(data[i].id, update);
          else await updateData(data[i], update);
        }
      }
    } catch (error) {
      setLoading(false);
      ToasterWithDrawer2({
        title: translateKey("try_again"),
        body: error.response.data.error,
      });
      return;
    }

    await reloadData();
    AppToaster({
      message: translateKey("successfully_restored"),
      intent: "success",
      detailed: data,
    });
  };

  const updateOrRemoveData = async ({ id, dataUpdate = null, full = 0 }) => {
    setLoading(true);
    if (!dataUpdate) {
      try {
        for (let i = 0; i < id.length; i++) {
          if (typeof id[i] === "object") await deleteData(id[i].id, full);
          else await deleteData(id[i], full);
        }
      } catch (error) {
        setLoading(false);
        ToasterWithDrawer2({
          title: translateKey("try_again"),
          body: error.response.data.error,
        });
        return;
      }

      await reloadData();
      AppToaster({
        message: translateKey("successfully_deleted"),
        intent: "success",
        detailed: id,
      });
      return;
    }

    try {
      const result = await updateData(id, dataUpdate);

      if (result.data === "updated-successfully")
        AppToaster({
          message: translateKey("successfully_changed"),
          intent: "success",
          detailed: dataUpdate,
        });
      else
        AppToaster({
          message: translateKey("try_again"),
          intent: "danger",
          detailed: result.data,
        });

      setOpenForm(false);
    } catch (error) {
      ToasterWithDrawer2({
        title: error.message,
        body: error.response.data.error,
      });
    } finally {
      await reloadData();
    }
  };

  const addNewData = async (data) => {
    try {
      setLoading(true);
      await addData(data);

      AppToaster({
        message: translateKey("successfully_added"),
        intent: "success",
        detailed: data,
      });
      setOpenForm(false);
    } catch (error) {
      ToasterWithDrawer2({
        title: error.message,
        body: error.response.data.error,
      });
    } finally {
      await reloadData();
    }
  };

  const openFormFunc = async (data = null, id = null) => {
    if (id) {
      try {
        const response = await getOneById(id);
        setDataForm(response.data);
      } catch (error) {
        ToasterWithDrawer2({
          title: error.message,
          body: error.response.data.error,
        });
        return;
      }
    } else if (data) {
      setDataForm(data);
    } else {
      setDataForm(null);
    }
    setOpenForm(true);
  };

  const toggleBasket = () => {
    setBasketOpen(!basketOpen);
  };
  return (
    <>
      {BasketTable({ ...props, basketOpen, handleClose: toggleBasket })}
      <h3 className="bp4-heading screen-title">{title ?? ""}</h3>
      {children({
        editable: !isBasket,
        data: dataForm,
        isLoading: isLoading,
        saveRow: (d) => {
          if (d.id) updateOrRemoveData({ id: d.id, dataUpdate: d });
          else addNewData(d);
        },
        isOpen: openForm,
        handleClose: () => {
          setOpenForm(false);
        },
      })}
      <DataTable
        isBasket={isBasket}
        uuid={uuid}
        requiredColumns={requiredColumns}
        title={title}
        openForm={openFormFunc}
        openBasket={toggleBasket}
        errorData={error}
        fetchData={fetchData}
        byOffset={byOffset ?? true}
        data={data}
        isLoading={isLoading}
        updateOrRemoveData={updateOrRemoveData}
        restoreData={restoreData}
        {...inprops}
      />
    </>
  );
}
