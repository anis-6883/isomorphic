'use client';

import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default function ProbabilityCol1() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Handicap');

  const options = [
    { label: 'Svelte Svelte', value: 'Svelte Svelte' },
    { label: 'Vue Svelte', value: 'Vue Svelte' },
    { label: 'React Svelte', value: 'React Svelte' },
  ];

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (value : string) => {
    setSelectedValue(value);
    setShowOptions(false);
  };
  return (
    <div className="text-white text-xs">
      <div className="flex justify-between items-center p-3">
        <h2>Live Index</h2>
        <div>
          <div className="relative inline-block text-left">
            <div className=" ">
              <button
                onClick={handleToggleOptions}
                type="button"
                className="inline-flex justify-center z-[999] w-17 h-6 rounded-3xl border border-white bg-none px-4 text-white text-sm font-medium shadow-sm hover:text-black hover:bg-[#01C3F7] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="my-auto">{selectedValue}</span>
                <MdKeyboardArrowDown className="my-auto font-bold ms-3 text-xl" />
              </button>
            </div>
            {showOptions && (
              <div className="absolute z-10 bg-[#35454D] rounded-md shadow-lg my-1">
                <ul className="py-1 ">
                  {options.map((option) => (
                    <li key={option.value}>
                      <a
                        href="#"
                        className="block py-2 text-sm text-white px-3 hover:bg-indigo-100 rounded-md"
                        onClick={() => handleOptionSelect(option.value)}
                      >
                        {option.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto py-2 px-1 ">
        <table className="table table-xs select-none w-[98%] border-[0.2px] ">
          {/* head */}
          <thead className="text-white text-xs rounded-t-lg">
            <tr>
              <th>Time</th>
              <th>Score</th>
              <th colSpan={4} className="text-center">
                Index
              </th>
            </tr>
          </thead>
          <tbody className="!text-[3px]">
            {/* row 1 */}
            <tr>
              <td rowSpan={2} className=" border-[0.5px] text-center">
                HT
              </td>
              <td rowSpan={2} className="border-[0.5px] text-center">
                2.0
              </td>
              <td>Open</td>
              <td>0.5</td>
              <td>1.11</td>
              <td>0.81</td>
            </tr>
            <tr>
              <td>Open</td>
              <td>0.5</td>
              <td>1.11</td>
              <td>0.81</td>
            </tr>
            <tr>
              <td rowSpan={2} className="border-[0.5px] text-center">
                HT
              </td>
              <td rowSpan={2} className="border-[0.5px] text-center">
                2.0
              </td>
              <td>Open</td>
              <td>0.5</td>
              <td>1.11</td>
              <td>0.81</td>
            </tr>
            <tr>
              <td>Open</td>
              <td>0.5</td>
              <td>1.11</td>
              <td>0.81</td>
            </tr>
            <tr>
              <td rowSpan={2} className="border-[0.5px] text-center">
                HT
              </td>
              <td rowSpan={2} className="border-[0.5px] text-center">
                2.0
              </td>
              <td>Open</td>
              <td>0.5</td>
              <td>1.11</td>
              <td>0.81</td>
            </tr>
            <tr>
              <td>Open</td>
              <td>0.5</td>
              <td>1.11</td>
              <td>0.81</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
