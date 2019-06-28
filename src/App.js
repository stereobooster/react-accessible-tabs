import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./App.module.css";
import "./index.css";

const Tab = ({ children, selected = false, id, index, onClick }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (selected && ref.current) {
      ref.current.focus();
    }
  }, [selected]);

  return (
    <button
      role="tab"
      type="button"
      aria-selected={selected}
      aria-controls={`${id}-tab`}
      id={`${id}-tab`}
      tabIndex={selected ? undefined : -1}
      onClick={() => onClick(index)}
      ref={ref}
    >
      {children}
    </button>
  );
};

const TabList = ({ children, label, onKeyDown }) => (
  <div role="tablist" aria-label={label} onKeyDown={onKeyDown}>
    {children}
  </div>
);

const TabPanel = ({ children, id, selected = false }) => (
  <div
    tabIndex={0}
    role="tabpanel"
    id={`${id}-tab-panel`}
    aria-labelledby={id}
    hidden={!selected}
  >
    {children}
  </div>
);

const Tabs = ({ content }) => {
  const [activeTab, setActiveTab] = useState(0);
  const onKeyDown = useCallback(
    e => {
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          setActiveTab(activeTab + 1 === content.length ? 0 : activeTab + 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setActiveTab(activeTab === 0 ? content.length - 1 : activeTab - 1);
          break;
        case "Home":
          e.preventDefault();
          setActiveTab(0);
          break;
        case "End":
          e.preventDefault();
          setActiveTab(content.length - 1);
          break;
        default:
          break;
      }
    },
    [activeTab, content.length, setActiveTab]
  );

  return (
    <>
      <TabList label="Tabs" onKeyDown={onKeyDown}>
        {content.map((tab, i) => (
          <Tab
            key={i}
            index={i}
            selected={activeTab === i}
            id={tab.title.split(" ").join("-")}
            onClick={setActiveTab}
          >
            {tab.title}
          </Tab>
        ))}
      </TabList>
      {content.map((tab, i) => (
        <TabPanel
          key={i}
          id={tab.title.split(" ").join("-")}
          selected={activeTab === i}
        >
          {tab.panel}
        </TabPanel>
      ))}
    </>
  );
};

function App() {
  const content = [
    {
      title: "tab 1",
      panel: <p>content 1</p>
    },
    {
      title: "tab 2",
      panel: <p>content 2</p>
    },
    {
      title: "tab 3",
      panel: <p>content 3</p>
    },
    {
      title: "tab 4",
      panel: <p>content 4</p>
    }
  ];
  return (
    <div className={styles.Wrapper}>
      <Tabs content={content} />
    </div>
  );
}

export default App;
