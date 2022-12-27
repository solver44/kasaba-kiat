import React, { useEffect, useState } from "react";
import { Card, Checkbox, Intent, Label, Menu } from "@blueprintjs/core";

import BottomTable from "./Bottom";
import TableActions from "./Actions";
import { AppToaster } from "../../components/AppToaster/toaster";
import { confirmAlert } from "../../shared/alerts";
import ErrorCallout from "../Errors/ErrorCallout";
import translateKey from "../../services/localization/translateText";
import Table from "./Table";
import { TableContext, useTableContext } from "../../contexts/TableContext";
import { copyToClipboard } from "../../services/clipboard";
import { useDispatch } from "react-redux";
import { HIDED_COLUMNS, UNSELECTED_COLUMNS } from "../../shared/Constants";
import ClientOnly from "../ClientOnly";

const tableMenu = (columns, customColumns, setCheckedBox) => (
  <Menu style={{ padding: "15px" }}>
    <Label>{translateKey("table_columns")}</Label>
    {columns.map((col, i) => {
      return (
        <Checkbox
          onChange={setCheckedBox}
          defaultChecked={customColumns.includes(col)}
          key={i}
          label={translateKey(col)}
          value={col}
        />
      );
    })}
  </Menu>
);

const showToast = (mess, intent, detailed = null) => {
  AppToaster({ message: mess, intent, detailed });
};

const DataTable = (props) => {
  const {
    isBasket,
    uuid,
    title,
    requiredColumns,
    byOffset = false,
    fetchData,
    data,
    isLoading,
    updateOrRemoveData,
    errorData,
    openForm,
    openBasket,
    restoreData,
    tableActions,
    tableBottoms,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [columns, setColumns] = useState([]);
  const [customColumns, setCustomColumns] = useState([]);
  const [body, setBody] = useState([]);

  const [notFound, setNotFound] = useState(true);

  const [searchText, setSearchText] = useState("");

  const [entries, setEntries] = useState(15);
  const [totalPage, setTotalPage] = useState(0);

  const [alertInfo, setAlertInfo] = useState({});

  const dispatch = useDispatch();

  const context = useTableContext({ body: body });

  const fetchParentData = (currentPage, entries, searchText) => {
    if (byOffset && fetchData) {
      // setTotalPage(Math.ceil(totalItemsCount / entries));
      const offset = (currentPage - 1) * entries;
      fetchData(offset, entries, customColumns, searchText);
    }
  };
  const onPagePaginate = (d) => {
    fetchParentData(d, entries, searchText);

    setCurrentPage(parseInt(d));
  };

  const funcEntries = (value) => {
    if (!value || notFound) return;
    fetchParentData(currentPage, value, searchText);
    setEntries(value);
  };

  const filterData = async (filter) => {
    if (filter.key !== "Enter" || filter.target.value === searchText) return;
    setCurrentPage(1);
    setSearchText(filter.target.value);
    fetchParentData(1, entries, filter.target.value);
  };

  const makeData = (data) => {
    context.setSelectedRow([]);
    if (data === null) return;
    setNotFound(false);
    document.getElementById("data-table").scrollTo(0, 0);

    if (byOffset) {
      setTotalItemsCount(data.data.count);
      setTotalPage(Math.ceil(data.data.count / entries));
      data = data.data.rows;
      setBody(data);
    } else {
      data = data.data;
      setTotalItemsCount(data.length);
      setTotalPage(Math.ceil(data.length / entries));
      setBody(data.slice((currentPage - 1) * entries, entries));
    }

    if (data.length <= 0) {
      setNotFound(true);
      return;
    }
    setColumns(
      Object.keys(data[0]).filter((col) => !HIDED_COLUMNS.includes(col))
    );
    if (customColumns.length > 0) return;
    setCustomColumns(
      Object.keys(data[0]).filter((item) => !UNSELECTED_COLUMNS.includes(item))
    );
  };

  useEffect(() => {
    if (data === null || notFound) return;

    const currentIndex = (currentPage - 1) * entries;

    if (data.status === 200) {
      makeData(data);
      return;
    }
    setBody(data.slice(currentIndex, currentIndex + entries));
    setTotalPage(Math.ceil(totalItemsCount / entries));
  }, [currentPage, entries]);

  useEffect(() => {
    makeData(data);
  }, [data]);

  const setCheckedBox = (val) => {
    const ch = val.target;
    if (ch.checked)
      setCustomColumns(
        columns.filter((e) => customColumns.includes(e) || e === ch.value)
      );
    else setCustomColumns(customColumns.filter((e) => e !== ch.value));
  };

  const addRow = (data = null) => {
    openForm(data, null);
  };
  const restoreRow = () => {
    if (context.selectedRow.length <= 0 && !context.selectAllRow) {
      showToast(translateKey("select_row"), Intent.DANGER);
      return;
    }
    setAlertInfo({
      open: true,
      text: translateKey("are_you_sure_restore_row"),
      icon: "history",
      intent: "success",
      confirmButtonText: translateKey("restore"),
      onclick: async () => {
        await restoreData(context.selectAllRow ? body : context.selectedRow);
        setAlertInfo({ ...alertInfo, open: false });
      },
    });
  };
  const copyRow = (row) => {
    const hide = HIDED_COLUMNS;
    hide.push("id", "createdAt", "updatedAt");
    hide.forEach((col) => delete row[col]);
    copyToClipboard(dispatch, row);
  };
  const pasteRow = (row) => {
    addRow(row);
  };
  const updateRow = () => {
    if (context.selectedRow.length <= 0) {
      showToast(translateKey("select_row"), Intent.DANGER);
      return;
    } else if (context.selectedRow.length > 1) {
      showToast(translateKey("select_one_row"), Intent.DANGER);
      return;
    }
    openForm(null, context.selectedRow[0]);
  };
  // !Delete rows
  const deleteRow = () => {
    if (context.selectedRow.length <= 0 && !context.selectAllRow) {
      showToast(translateKey("select_row"), Intent.DANGER);
      return;
    }
    setAlertInfo({
      open: true,
      text: translateKey("are_you_sure_delete_row"),
      icon: "trash",
      intent: "danger",
      confirmButtonText: translateKey("delete"),
      onclick: async () => {
        await updateOrRemoveData({
          id: context.selectAllRow ? body : context.selectedRow,
        });
        setAlertInfo({ ...alertInfo, open: false });
      },
    });
  };
  const fullDeleteRow = () => {
    if (context.selectedRow.length <= 0 && !context.selectAllRow) {
      showToast(translateKey("select_row"), Intent.DANGER);
      return;
    }
    setAlertInfo({
      open: true,
      text: translateKey("are_you_sure_to_completely_delete_row"),
      icon: "delete",
      intent: "danger",
      confirmButtonText: translateKey("delete"),
      onclick: async () => {
        await updateOrRemoveData({
          id: context.selectAllRow ? body : context.selectedRow,
          full: 1,
        });
        setAlertInfo({ ...alertInfo, open: false });
      },
    });
  };

  return (
    <ClientOnly>
      <div className={`data-table`}>
        {confirmAlert({
          text: alertInfo.text,
          intent: alertInfo.intent,
          icon: alertInfo.icon,
          isOpen: alertInfo.open,
          confirmButtonText: alertInfo.confirmButtonText,
          isLoading,
          handleMoveCancel: () => {
            setAlertInfo({ ...alertInfo, open: false });
          },
          handleMoveConfirm: alertInfo.onclick,
        })}

        {errorData !== null ? (
          <ErrorCallout error={errorData} />
        ) : (
          <>
            <TableActions
              isBasket={isBasket}
              uuid={uuid}
              title={title}
              currentTable={{
                columns: customColumns,
                body,
                allColumns: columns,
                requiredColumns,
              }}
              selectMode={context.selectTableMode}
              selectedRow={context.selectedRow}
              addRow={addRow}
              updateRow={updateRow}
              restoreRow={restoreRow}
              deleteRow={deleteRow}
              fullDeleteRow={fullDeleteRow}
              basketToggle={openBasket} //Korzina
              filterData={filterData} //Filtr funksiyasi
              tableMenu={tableMenu(columns, customColumns, setCheckedBox)} //Sozlashga ustunlar jadvalini yuborish
              {...tableActions}
            />
            <Card id="data-table" elevation={0}>
              <TableContext.Provider value={context}>
                <Table
                  isBasket={isBasket}
                  onDeleteRow={deleteRow}
                  onCopyRow={copyRow}
                  onPasteRow={pasteRow}
                  notFound={notFound}
                  data={data}
                  customColumns={customColumns}
                  entries={entries}
                  currentPage={currentPage}
                  onDoubleClickRow={updateRow}
                />
              </TableContext.Provider>
            </Card>
            <BottomTable
              uuid={uuid}
              totalCount={totalPage}
              entries={funcEntries}
              tableEntries={entries}
              totalItemCount={totalItemsCount}
              current={currentPage}
              onPaginate={onPagePaginate}
              {...tableBottoms}
            />
          </>
        )}
      </div>
    </ClientOnly>
  );
};

export default DataTable;
