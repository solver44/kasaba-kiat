import { Button, ButtonGroup, Classes, Menu } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import React from "react";
import { useSelector } from "react-redux";

export default function DropDownButton(props) {
  const properties = useSelector((state) => state.properties);

  const renderMenu = () => {
    const { items } = props;
    return <Menu className="dropdown_button_body">{items}</Menu>;
  };

  return (
    <Popover2
      {...properties.popover2}
      // minimal
      content={renderMenu()}
      hasBackdrop
    >
      <div className="dropdown-button">
        <ButtonGroup fill>
          {props?.default}

          {props?.arrow && (
            <Button
              outlined={properties.buttonOutlined}
              intent={props?.intent}
              className={`dropdown-button-arrow ${Classes.FIXED}`}
              rightIcon="caret-down"
            />
          )}
        </ButtonGroup>
      </div>
    </Popover2>
  );
}
