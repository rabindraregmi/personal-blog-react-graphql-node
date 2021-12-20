import { useState } from "react";
import "./TabModule.scss";

interface TabModuleProps {
  children: any;
  selected?: any;
  tabMapping?: any;
  componentName?: any;
  setTab?: Function;
  onTabChange?: Function;
  changeTab?: any;
}

const TabModule = (props: TabModuleProps) => {
  const [selectedTab, setSelectedTab] = useState(props.selected);
  const tabMapping = JSON.parse(props.tabMapping);

  return (
    <>
      <div className="tab-module">
        <ul className="nav nav-tabs">
          {Object.values(tabMapping).map((tab: any) => {
            return (
              <>
                <li
                  className="nav-item"
                  data-view={"CO"}
                  onClick={() => {
                    setSelectedTab(tab[0]);
                    if (props.onTabChange) {
                      props.onTabChange(tab[0]);
                    }
                  }}
                  style={{ borderColor: "green" }}
                >
                  <div
                    className={
                      selectedTab === tab[0] ? "nav-link active" : "nav-link"
                    }
                    data-view={"CO"}
                    data-toggle="tab"
                  >
                    {tab[1]}
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </div>
      <div className="nav-body">
        {props.children.map((child: any) => {
          let tb = tabMapping[child.props.componentName];
          tb = tb && Array.isArray(tb) ? tb[0] : undefined;
          // if (selectedTab === tb) {
          return child;
          // } else {
          //   return <></>;
          // }
        })}
      </div>
    </>
  );
};

export default TabModule;
