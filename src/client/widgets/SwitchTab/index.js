import React, { useState } from "react";

import Text from "Widgets/Text/index";

import "./style.scss";

const SwitchTab = props => {
  const { defaultActiveTab, tabs } = props;
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = id => {
    setActiveTab(id);
  };

  return (
    <div className="SwitchTab d-flex">
      {tabs.map(tab =>
        <div
          key={tab.id}
          className={`SwitchTab-tab text-uppercase d-flex justify-content-center align-items-center cursor-pointer ${
            activeTab === tab.id ? "active" : ""
          }`}
          onClick={() => handleTabClick(tab.id)}
        >
          <Text className="font-primary-medium-14" text={tab.text} />
        </div>
      )}
    </div>
  )
};

export default SwitchTab;
