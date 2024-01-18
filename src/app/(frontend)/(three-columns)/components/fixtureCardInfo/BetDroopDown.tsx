import Image from 'next/image';

export default function BetDroopDown() {
  return (
    <div className="">
      <h2 className="text-white p-3 text-md">IBCBet</h2>
      <div className="bg-[#212B30]">
        <div>
          <div className="grid grid-cols-3 text-white  justify-items-center bg-[#4B616C]">
            <h2 className="col-span-"></h2>
            <h2 className="col-span-">Full Time</h2>
            <h2 className="text-start">1st Half</h2>
          </div>
          <div>
            <div className="overflow-x-auto">
              <table className="table text-white text-xs border-collapse text-end border-transparent ">
                {/* head */}
                <tbody>
                  {/* row 1 */}
                  <tr className="">
                    <td className="border border-transparent"></td>
                    <td className="border border-transparent"></td>
                    <td className="border border-transparent">HDP</td>
                    <td className="border border-transparent">O/U</td>
                    <td className="border border-transparent">1X2</td>
                    <td className="border border-transparent">HDP</td>
                    <td className="border border-transparent">O/U</td>
                    <td className="border border-transparent">1X2</td>
                  </tr>
                  {/* row 2 */}
                  <tr className="border border-transparent">
                    <td className="border border-transparent text-start flex items-center gap-2">
                      <Image
                        src="/images/earth-americas.png"
                        alt="team two"
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="w-4 h-4 border border-transparent"
                      />
                      <h2>Bangladesh</h2>
                    </td>

                    <td className="border border-transparent"></td>
                    <td className="border border-transparent">
                      <span className="text-blue-500 mx-1">-1</span> 1.12
                    </td>
                    <td className="border border-transparent">
                      <span className="text-blue-500 mx-1">2.75</span> 1.05
                    </td>
                    <td className="border border-transparent">1.61</td>
                    <td className="border border-transparent">
                      {' '}
                      <span className="text-blue-500 mx-1">-0.25</span> 0.77
                    </td>
                    <td className="border border-transparent">
                      <span className="text-blue-500 mx-1">1</span> 1.12
                    </td>
                    <td className="border border-transparent">2.26</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <td className="border border-transparent text-start flex items-center gap-2">
                      <Image
                        src="/images/earth-americas.png"
                        alt="team two"
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="w-4 h-4 "
                      />
                      <h2> Bangladesh</h2>
                    </td>
                    <td className="border border-transparent"></td>
                    <td className="border border-transparent">
                      <span className="text-blue-500 mx-1">-1</span> 1.12
                    </td>
                    <td className="border border-transparent">
                      <span className="text-blue-500 mx-1">2.75</span> 1.05
                    </td>
                    <td className="border border-transparent">1.61</td>
                    <td className="border border-transparent">
                      {' '}
                      <span className="text-blue-500 mx-1">-0.25</span> 0.77
                    </td>
                    <td className="border border-transparent">
                      <span className="text-blue-500 mx-1">1</span> 1.12
                    </td>
                    <td className="border border-transparent">2.26</td>
                  </tr>
                  <tr>
                    <td className="border border-transparent text-start">
                      Draw
                    </td>
                    <td className="border border-transparent"></td>
                    <td className="border border-transparent"></td>
                    <td className="border border-transparent"></td>
                    <td className="border border-transparent">2.25</td>
                    <td className="border border-transparent"></td>
                    <td className="border border-transparent"></td>
                    <td className="border border-transparent">4.05</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BetMobileModal() {
  return (
    <div className="text-white">
      <h2 className=" p-3 text-md ">IBCBet</h2>
      {/* 1st div  */}

      <div className="relative max-w-2xl shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-[#061728] text-center">
            <tr></tr>
            <tr>
              <th scope="col" className=" "></th>
              <th scope="col" className=" "></th>
              <th scope="col" className=" "></th>
              <th scope="col" className=" ">
                1st Half
              </th>
              <th scope="col" className=" "></th>
            </tr>
            <tr>
              <th scope="col" className=" "></th>
              <th scope="col" className=" "></th>
              <th scope="col" className=" ">
                HDP
              </th>
              <th scope="col" className=" ">
                O/U
              </th>
              <th scope="col" className=" ">
                1X2
              </th>
            </tr>
          </thead>
          <tbody className="text-center bg-[#1B2435] text-white">
            <tr className=" border-b ">
              <th
                scope="row"
                className="font-normal  whitespace-nowrap dark:text-white border-l-1"
              >
                India
              </th>
              <td className=" border-l"></td>
              <td className=" ">
                <span>
                  <span>+1.5</span> 1{' '}
                </span>
              </td>
              <td className=" ">
                <span>
                  <span>+1.5</span> 1{' '}
                </span>
              </td>
              <td className=" ">6.9</td>
            </tr>
            <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 ">
              <th
                scope="row"
                className="  border-l-1 font-normal  whitespace-nowrap dark:text-white"
              >
                Bangladesh
              </th>
              <td className=" border-l"></td>
              <td className=" ">
                {' '}
                <span>
                  <span>+1.5</span> 1{' '}
                </span>
              </td>
              <td className=" ">
                <span>
                  <span>+1.5</span> 1{' '}
                </span>
              </td>
              <td className=" ">6.9</td>
            </tr>
            <tr className="   ">
              <th
                scope="row"
                className=" border-l-1 0 font-normal whitespace-nowrap dark:text-white"
              >
                Draw
              </th>
              <td className=" border-l"></td>

              <td className=" "></td>
              <td className=" "></td>
              <td className=" ">9</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-white uppercase bg-[#061728] text-center">
            <tr></tr>
            <tr>
              <th scope="col" className=" "></th>
              <th scope="col" className=" "></th>
              <th scope="col" className=" "></th>
              <th scope="col" className=" ">
                1st Half
              </th>
              <th scope="col" className=" "></th>
            </tr>
            <tr>
              <th scope="col" className=" "></th>
              <th scope="col" className=" "></th>
              <th scope="col" className=" ">
                HDP
              </th>
              <th scope="col" className=" ">
                O/U
              </th>
              <th scope="col" className=" ">
                1X2
              </th>
            </tr>
          </thead>
          <tbody className="text-center bg-[#1B2435] text-white">
            <tr className=" border-b ">
              <th
                scope="row"
                className="font-normal  whitespace-nowrap dark:text-white border-l-1"
              >
                India
              </th>
              <td className=" border-l"></td>
              <td className=" ">
                <span>
                  <span>+1.5</span> 1{' '}
                </span>
              </td>
              <td className=" ">
                <span>
                  <span>+1.5</span> 1{' '}
                </span>
              </td>
              <td className=" ">6.9</td>
            </tr>
            <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 ">
              <th
                scope="row"
                className="  border-l-1 font-normal  whitespace-nowrap dark:text-white"
              >
                Bangladesh
              </th>
              <td className=" border-l"></td>
              <td className=" ">
                {' '}
                <span>
                  <span>+1.5</span> 1{' '}
                </span>
              </td>
              <td className=" ">
                <span>
                  <span>+1.5</span> 1{' '}
                </span>
              </td>
              <td className=" ">6.9</td>
            </tr>
            <tr className="   ">
              <th
                scope="row"
                className=" border-l-1 0 font-normal whitespace-nowrap dark:text-white"
              >
                Draw
              </th>
              <td className=" border-l"></td>

              <td className=" "></td>
              <td className=" "></td>
              <td className=" ">9</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
