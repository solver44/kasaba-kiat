import React, { useEffect, useRef, useState } from "react";
import { Button, FormGroup, Icon, MenuItem } from "@blueprintjs/core";
import translateKey from "../../services/localization/translateText";
import { Tooltip2 } from "@blueprintjs/popover2";
import { Suggest } from "@blueprintjs/select";

export default function SelectInput(props) {
  const [items, setItems] = useState([]);
  const [queryItems, setQueryItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const selectRef = useRef(null);

  const fetchData = async () => {
    const response = await props.fetchData();
    setItems(response.data);
    setQueryItems(response.data);

    if (props.defaultValues)
      setSelectedItems(
        response.data.filter((item) => props.defaultValues.includes(item.id))
      );
  };

  useEffect(() => fetchData(), []);

  const isItemSelected = (item) => {
    return selectedItems.includes(item);
  };

  const renderData = (item, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        style={{ width: selectRef.current.offsetWidth - 10 }}
        selected={modifiers.active}
        icon={isItemSelected(item) ? "tick" : "blank"}
        key={item.id}
        label={item.id}
        onClick={handleClick}
        text={`${item.name}`}
        shouldDismissPopover={false}
      />
    );
  };

  const passData = (data) => {
    props.handleDataSelect(data.map((i) => i.id));
  };

  const renderInputValue = (item) => item.name;

  const handleDataSelect = (item) => {
    const result = [item];

    setSelectedItems(result);
    passData(result);
  };

  const onQueryChange = (str) => {
    setQueryItems(
      items.filter((i) => i.name.toLowerCase().includes(str.toLowerCase()))
    );
  };

  return (
    <div ref={selectRef}>
      <FormGroup
        label={props.label}
        labelInfo={props.required && "*"}
        labelFor="multi-select"
      >
        <Suggest
          fill
          selectedItem={selectedItems[0]}
          inputValueRenderer={renderInputValue}
          itemRenderer={renderData}
          items={queryItems}
          noResults={
            <MenuItem
              style={{ width: selectRef?.current?.offsetWidth - 10 }}
              disabled={true}
              text={translateKey("data_not_found")}
            />
          }
          onItemSelect={handleDataSelect}
          // onItemsPaste={handleFilmsPaste}
          popoverProps={{ minimal: true }}
          onQueryChange={onQueryChange}
          inputProps={{
            leftIcon: props.leftIcon,
            large: true,
            placeholder: "",
            intent: props.errorMessage ? "danger" : "none",
            rightElement: props.errorMessage
              ? renderIcon({ message: props.errorMessage })
              : "",
          }}
        />
      </FormGroup>
    </div>
  );
}

const renderIcon = (props) => {
  return (
    <Tooltip2 content={props.message} intent={props?.intent ?? "danger"}>
      <Button className="input-right-button">
        <Icon
          iconSize={props?.large ? Icon.SIZE_LARGE : Icon.SIZE_STANDARD}
          icon="warning-sign"
          intent={props?.intent ?? "danger"}
        />
      </Button>
    </Tooltip2>
  );
};
