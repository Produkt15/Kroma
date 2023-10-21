import React from 'react';
import "./Tab.css";

export const colorBlindness = [
    'Achromatomaly',
    'Achromatopsia',
    'Tritanomaly',
    'Tritanopia',
    'Deuteranomaly',
    'Protanomaly',
    'Protanopia',
];

const FilterButtons = ({ applyFilter }) => {
    return (
        <div className="tab-group" >
            {colorBlindness.map((filter, index) => (
                <button className='tab' key={index} onClick={() => applyFilter(filter)}>
                <div className="protanomaly">{filter}</div>
                </button>
            ))
            }
        </div>
    );
};

export default FilterButtons;
