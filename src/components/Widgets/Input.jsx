import { Button, Icon, InputGroup, Label } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useState } from "react";

export function InputGroupWithMessage(props) {
  const [showPassword, handleLockClick] = useState(false);

  const renderIconInTooltip = () => {
    return props.message ? (
      <Tooltip2 key={1} content={props.message} intent={props.intent}>
        {renderIcon()}
      </Tooltip2>
    ) : (
      renderIcon()
    );
  };

  const passwordToggle = () => {
    if (props?.type !== "password") return;

    return (
      <Button
        key={"password-toggle"}
        icon={!showPassword ? "eye-open" : "eye-off"}
        minimal={true}
        onClick={() => handleLockClick(!showPassword)}
      />
    );
  };

  const renderIcon = () => {
    return (
      <Button className="input-right-button">
        <Icon
          iconSize={props.large ? Icon.SIZE_LARGE : Icon.SIZE_STANDARD}
          icon={messageIcon}
          intent={props.intent}
        />
      </Button>
    );
  };

  const {
    message,
    rightElement,
    messageIcon = "warning-sign",
    required,
    type,
    ...inprops
  } = props;
  const newRightElement = message
    ? [renderIconInTooltip(), rightElement, passwordToggle()]
    : [rightElement, passwordToggle()];

  return props.label ? (
    <Label>
      {props.label} {required && <span className="bp4-text-muted">*</span>}
      <InputGroup
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        {...inprops}
        rightElement={newRightElement}
      />
    </Label>
  ) : (
    <InputGroup
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      {...inprops}
      rightElement={newRightElement}
    />
  );
}
