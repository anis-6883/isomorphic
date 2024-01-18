'use client';
import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
export default function ProbabilityCol2() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState('30');

  const options = [
    { label: '30', value: '30' },
    { label: '40', value: '40' },
    { label: '1150', value: '1150' },
  ];

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (value:string) => {
    setSelectedValue(value);
    setShowOptions(false);
  };
  return (
    <div className="text-white ">
      <div className="flex justify-between items-center p-3">
        <h2 className="text-xs">probability of Home & Away</h2>
        <div>
          <div className="relative inline-block text-left">
            <div className="flex gap-2 items-center text-xs">
              <h2>Recent</h2>
              <button
                onClick={handleToggleOptions}
                type="button"
                className="inline-flex justify-center w-14 h-6 rounded-3xl border border-white bg-none px-1 text-white text-sm font-medium shadow-sm hover:text-black hover:bg-[#01C3F7] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="my-auto">{selectedValue}</span>
                <MdKeyboardArrowDown className="my-auto font-bold  text-md" />
              </button>
              <h2>Games</h2>
            </div>
            {showOptions && (
              <div className="absolute ms-14 z-10 bg-[#35454D] rounded-md shadow-lg my-1">
                <ul className="py-1 ">
                  {options.map((option) => (
                    <li key={option.value}>
                      <a
                        href="#"
                        className="block  py-2 text-sm text-white px-3 hover:bg-indigo-100 rounded-md"
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
      <div className="overflow-x-auto py-1  ">
        <table className="table table-xs text-xs select-none border-[0.5px] ">
          {/* head */}
          <thead className="text-white">
            <tr>
              <th colSpan={5} className="text-center">
                Home/Away
              </th>
            </tr>
          </thead>
          <thead className="text-white">
            <tr>
              <th>Goal</th>
              <th>Conceded</th>
              <th className="bg-[#4B616C]">Period</th>
              <th>Goal</th>
              <th>Conceded</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {/* row 1 */}
            <tr>
              <td>Open</td>
              <td>0.5</td>
              <td className="bg-[#4B616C]">1.11</td>
              <td>0.81</td>
              <td>0.81</td>
            </tr>
            <tr>
              <td>Open</td>
              <td>0.5</td>
              <td className="bg-[#4B616C]">1.11</td>
              <td>0.81</td>
              <td>0.81</td>
            </tr>
            <tr>
              <td>Open</td>
              <td>0.5</td>
              <td className="bg-[#4B616C]">1.11</td>
              <td>0.81</td>
              <td>0.81</td>
            </tr>
            <tr>
              <td>Open</td>
              <td>0.5</td>
              <td className="bg-[#4B616C]">1.11</td>
              <td>0.81</td>
              <td>0.81</td>
            </tr>
            <tr>
              <td>Open</td>
              <td>0.5</td>
              <td className="bg-[#4B616C]">1.11</td>
              <td>0.81</td>
              <td>0.81</td>
            </tr>
            <tr>
              <td>Open</td>
              <td>0.5</td>
              <td className="bg-[#4B616C]">1.11</td>
              <td>0.81</td>
              <td>0.81</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
