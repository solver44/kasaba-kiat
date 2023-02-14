import Tree from "../Tree";
import { useRouter } from "next/router";
import translateKey from "../../services/localization/translateText";
import { Navbar, Icon, Tag } from "@blueprintjs/core";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { TreeContext, useTreeContext } from "../../contexts/TreeContext";
import ClientOnly from "../ClientOnly";

function treeData() {
  return [
    {
      key: "/dashboard",
      label: translateKey("home"),
      icon: "home",
      value: "home",
    },
    {
      key: "0",
      label: translateKey("information_resources"),
      icon: "database",
      value: "Documents Folder",
      children: [
        {
          key: "0-1",
          label: translateKey("bkut_ppo"),
          icon: "document",
          value: "Documents Folder",
        },
        {
          key: "0-2",
          label: translateKey("bkuq"),
          icon: "document",
          value: "Documents Folder",
        },
        {
          key: "0-3",
          label: translateKey("collective_agreements"),
          icon: "document",
          value: "Documents Folder",
        },
        {
          key: "0-4",
          label: translateKey("normative_documents"),
          icon: "document",
          value: "Documents Folder",
        },
        {
          key: "0-5",
          label: translateKey("federation_organizations"),
          icon: "document",
          value: "Documents Folder",
        },
      ],
    },
    {
      key: "1",
      label: translateKey("reference_books"),
      icon: "git-repo",
      value: "Info",
      children: [
        {
          key: "/dy/sections",
          icon: "document",
          label: translateKey("sections"),
          value: "sections",
        },
        {
          key: "/dy/countries",
          icon: "document",
          label: translateKey("countries"),
          value: "country",
        },
        {
          key: "/dy/coato",
          icon: "document",
          label: translateKey("coato"),
          value: "coato",
        },
        {
          key: "/dy/okonx",
          icon: "document",
          label: translateKey("okonx"),
          value: "okonx",
        },
        {
          key: "/dy/opf",
          icon: "document",
          label: translateKey("opf"),
          value: "opf",
        },
        {
          key: "/dy/form_of_ownership",
          icon: "document",
          label: translateKey("form_of_ownership"),
          value: "form_of_ownership",
        },
        {
          key: "/dy/networks",
          icon: "document",
          label: translateKey("networks"),
          value: "networks",
        },
        {
          key: "/dy/type_of_organization",
          icon: "document",
          label: translateKey("type_of_organization"),
          value: "type_of_organization",
        },
        {
          key: "/dy/soogu",
          icon: "document",
          label: translateKey("soogu"),
          value: "soogu",
        },
        {
          key: "/dy/engine_group",
          icon: "document",
          label: translateKey("engine_group"),
          value: "engine_group",
        },
        {
          key: "/dy/contract_type",
          icon: "document",
          label: translateKey("contract_type"),
          value: "contract_type",
        },
        {
          key: "/dy/type_of_documents",
          icon: "document",
          label: translateKey("type_of_documents"),
          value: "type_of_documents",
        },
      ],
    },
    {
      key: "2",
      label: translateKey("reports"),
      icon: "timeline-area-chart",
      value: "Downloads Folder",
    },
    {
      key: "/settings",
      label: translateKey("settings"),
      icon: "settings",
      value: "Downloads Folder",
    },
    {
      key: "/admin",
      label: translateKey("administrator"),
      icon: "person",
      value: "admin",
      children: [
        {
          key: "/admin/users",
          icon: "inherited-group",
          label: translateKey("user_managment"),
          value: "users",
        },
        {
          key: "/admin/roles",
          icon: "cog",
          label: translateKey("roles_managment"),
          value: "roles",
        },
        {
          key: "/admin/translate",
          icon: "translate",
          label: translateKey("setting_translations"),
          value: "translate",
        },
        
      ],
    },
  ];
}

function AppSidebar() {
  let router = useRouter();
  const tree = useTreeContext();
  const sidebar = useSelector((state) => state.sidebar);

  const onClickedTreeNode = (data) => {
    router.push(data.key);
  };

  return (
    <TreeContext.Provider value={tree}>
      <ClientOnly>
        <CSSTransition
          in={sidebar.show}
          timeout={300}
          classNames="left-in-out"
          unmountOnExit
        >
          <div className="app-sidebar">
            <Navbar.Heading className="header-title">
              {translateKey("app_name")}
              <Tag className="header-tag">alpha</Tag>
            </Navbar.Heading>
            <div className="tree-sidebar">
              <Tree onClicked={onClickedTreeNode} data={treeData()} />
            </div>
          </div>
        </CSSTransition>
      </ClientOnly>
    </TreeContext.Provider>
  );
}
export default AppSidebar;
