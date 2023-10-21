import React from 'react';
import './Tab.css';

const Tab = ({ applyFilter, label = 'Protanomaly', tabTabIndex }) => {
  return (
    <button className="tab" onClick={() => applyFilter(filter)} tabIndex={tabTabIndex}>
    <div className="protanomaly">{label}</div>
    </button>
  );
};

export default Tab;
