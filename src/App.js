import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./App.module.css";

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
      id={id}
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
    id={`${id}-tab`}
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
    <div>
      <TabList label="Tabs" onKeyDown={onKeyDown}>
        {content.map((tab, i) => (
          <Tab
            key={i}
            index={i}
            selected={activeTab === i}
            id={tab.title}
            onClick={setActiveTab}
          >
            {tab.title}
          </Tab>
        ))}
      </TabList>
      {content.map((tab, i) => (
        <TabPanel key={i} id={tab.title} selected={activeTab === i}>
          {tab.panel}
        </TabPanel>
      ))}
    </div>
  );
};

function App() {
  const content = [
    {
      title: "One",
      panel: <p>This is the content area for Tab One.</p>
    },
    {
      title: "Two",
      panel: <p>This is the content area for Tab Two.</p>
    },
    {
      title: "Three",
      panel: <p> This is the content area for Tab Three.</p>
    },
    {
      title: "Four",
      panel: <p> This is the content area for Tab Three.</p>
    }
  ];
  return (
    <div className={styles.Wrapper}>
      <Tabs content={content} />
    </div>
  );
}

export default App;
