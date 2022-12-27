import {
  Classes,
  Intent,
  Position,
  ProgressBar,
  Drawer,
  Toaster,
} from "@blueprintjs/core";
import { useState } from "react";
import translateKey from "../../services/localization/translateText";
import { GET_ERRORS } from "../../helper/error";
import ReactDOM from "react-dom";

function GET_ICON(intent) {
  switch (intent) {
    case "danger":
      return "warning-sign";
    case "success":
      return "tick";
    default:
      return "info";
  }
}
const AppToasterShow =
  typeof window !== "undefined"
    ? Toaster.create({
        className: "app-toaster",
        position: Position.TOP_LEFT,
        maxToasts: 5,
      })
    : { show: () => {} };

export const AppToaster = (props) => {
  const { detailed, ...inprops } = props;
  let icon = inprops.icon;
  if (!icon) icon = GET_ICON(inprops.intent);
  // if(props.detailed)
  //     sendLog(1, props.message, props.detailed);

  return AppToasterShow.show({ ...inprops, icon });
};

export const AppToasterWithProgressBar = (props) => {
  // if(props.detailed)
  //     sendLog(1, props.message, props.detailed);
  const {
    value = 0,
    total = 100,
    showCount = true,
    key,
    intent = Intent.SUCCESS,
  } = props;

  return !key
    ? AppToasterShow.show({
        icon: "cloud-upload",
        message: (
          <div className="d-flex align-center h-100">
            <ProgressBar
              className={{ [Classes.PROGRESS_NO_STRIPES]: value >= total }}
              intent={value < total ? Intent.PRIMARY : intent}
              value={value / total}
            />
            {showCount && (
              <span style={{ flex: "none", marginLeft: 10 }}>
                {value}/{total}
              </span>
            )}
          </div>
        ),
        onDismiss: (didTimeoutExpire) => {
          if (!didTimeoutExpire) {
            try {
              props.onDismiss();
            } catch (error) {}
          }
        },
        timeout: value < total ? 0 : 1000,
      })
    : AppToasterShow.show(
        {
          icon: "cloud-upload",
          message: (
            <div className="d-flex align-center h-100">
              <ProgressBar
                className={{ [Classes.PROGRESS_NO_STRIPES]: value >= total }}
                intent={value < total ? Intent.PRIMARY : Intent.SUCCESS}
                value={value / total}
              />
              {showCount && (
                <span style={{ flex: "none", marginLeft: 10 }}>
                  {value}/{total}
                </span>
              )}
            </div>
          ),
          onDismiss: (didTimeoutExpire) => {
            if (!didTimeoutExpire) {
              try {
                props.onDismiss();
              } catch (error) {}
            }
          },
          timeout: value < total ? 0 : 2000,
        },
        key
      );
};

const AppDrawer = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Drawer
      isOpen={isOpen}
      isCloseButtonShown={true}
      icon={props.icon ?? "error"}
      onClose={() => {
        setIsOpen(false);
      }}
      hasBackdrop={false}
      position="bottom"
      title={props.title ?? ""}
      usePortal={false}
    >
      <div className="drawer-body">
        {props.body && Array.isArray(props.body)
          ? props.body.map((i, _) => <p key={_}>{JSON.stringify(i)}</p>)
          : JSON.stringify(props.body)}
      </div>
    </Drawer>
  );
};

export const ToasterWithDrawer2 = ({
  title,
  body,
  intent = "danger",
  icon,
}) => {
  const header = GET_ERRORS(body);
  if (!icon) icon = GET_ICON(intent);

  const action = {
    onClick: () => {
      const doc = window?.document || {};
      const container = doc.createElement("div");
      container.className = "drawer";
      doc.body.appendChild(container);

      ReactDOM.render(<AppDrawer title={title} body={body} />, container);
    },
    text: translateKey("comment"),
  };
  AppToasterShow.show({
    message: header ?? title,
    intent: intent,
    icon,
    action: !header ? action : null,
    detailed: body,
  });
};
