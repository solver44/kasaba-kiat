import React, { useState } from "react";
import {
  Button,
  Alignment,
  Navbar,
  Menu,
  MenuItem,
  ButtonGroup,
  H5,
  Tag,
} from "@blueprintjs/core";
import { Classes, Popover2 } from "@blueprintjs/popover2";
import { useAuth } from "../../services/auth";
import translateKey from "../../services/localization/translateText";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarShow } from "../../store/actions/sidebar";
import { setLanguage } from "../../services/http/userAPI";
import { ToasterWithDrawer2 } from "../AppToaster/toaster";

const LANGUAGES = {
  uz: {
    text: "Узб",
    flag: "uzb",
  },
  ru: {
    text: "Рус",
    flag: "rus",
  },
  uzl: {
    text: "O'zb",
    flag: "uzb",
  },
};

function Header() {
  const dispatch = useDispatch();
  const { properties, user, sidebar } = useSelector((state) => state);

  const lang = user.language ?? "uz";
  const [currentLang, setLang] = useState(lang);
  const [otherLanguages, setOtherLanguages] = useState(
    Object.keys(LANGUAGES).filter((i) => i !== lang)
  );

  const toggleLanguage = async (lang) => {
    setLang(lang);
    setOtherLanguages(Object.keys(LANGUAGES).filter((i) => i !== lang));
    try {
      await setLanguage(user?.id, lang);
      window.location.reload();
    } catch (error) {
      ToasterWithDrawer2({ title: error.message, body: error.response.data });
    }
  };

  const collapseSidebar = () => {
    dispatch(setSidebarShow(!sidebar.show));
  };

  // <Breadcrumb items={ITEMS} />
  return (
    <div className="header">
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Button large={true} icon="list" minimal onClick={collapseSidebar} />
          <Navbar.Divider />
          <Button large={true} icon="chat" minimal />
          <Button large={true} icon="notifications" minimal />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <ButtonGroup large={true} minimal>
            <Popover2
              {...properties.popover2}
              content={
                <Menu>
                  <MenuItem
                    onClick={() => toggleLanguage(otherLanguages[0])}
                    icon={flag(LANGUAGES[otherLanguages[0]].flag, "15px")}
                    text={LANGUAGES[otherLanguages[0]].text}
                  />
                  <MenuItem
                    onClick={() => toggleLanguage(otherLanguages[1])}
                    icon={flag(LANGUAGES[otherLanguages[1]].flag, "15px")}
                    text={LANGUAGES[otherLanguages[1]].text}
                  />
                </Menu>
              }
              placement="bottom-end"
            >
              <Button
                intent="primary"
                rightIcon="caret-down"
                text={LANGUAGES[currentLang].text}
                icon={flag(LANGUAGES[currentLang].flag)}
              />
            </Popover2>

            <Popover2
              {...properties.popover2}
              interactionKind="click"
              popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
              placement="bottom"
              content={<ProfileMenu user={user} />}
              renderTarget={({ isOpen, ref, ...p }) => (
                <Button
                  {...p}
                  elementRef={ref}
                  intent="primary"
                  icon="user"
                  rightIcon="caret-down"
                  text={user?.email}
                />
              )}
            />
          </ButtonGroup>
        </Navbar.Group>
      </Navbar>
    </div>
  );
}

export default Header;

const ProfileMenu = ({ user }) => {
  // let history = useRouter();
  const auth = useAuth();

  const signout = () => {
    auth.logout({});
  };

  return (
    <div>
      <H5>
        {user?.roles.map((role) => (
          <Tag
            interactive
            fill
            large
            style={{ textAlign: "center" }}
            key={role}
          >
            {role}
          </Tag>
        ))}
      </H5>
      <Button
        onClick={signout}
        icon="log-out"
        text={translateKey("logout")}
        intent="danger"
      />
    </div>
  );
};

const flag = (country, height) => (
  <img
    alt="flag"
    height={height ?? "18px"}
    src={`/icons/${country}_flag.png`}
  />
);
