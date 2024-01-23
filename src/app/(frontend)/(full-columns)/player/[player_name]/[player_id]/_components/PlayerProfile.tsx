import getSlugify from '@/utils/get-slugify';
import Image from 'next/image';
import Link from 'next/link';

function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

function formatMoney(amount) {
  if (amount >= 1e6) {
    return (amount / 1e6)?.toFixed(2) + 'M';
  } else if (amount >= 1e3) {
    return (amount / 1e3)?.toFixed(2) + 'K';
  } else {
    return amount?.toFixed(2);
  }
}

function findRecentSeasonStats(statistics) {
  return statistics?.find((item) => {
    return (
      item.has_values === true &&
      item.season.is_current === true &&
      item.season.league.sub_type === 'domestic'
    );
  });
}

export default function PlayerProfile({ playerData }) {
  const recentSeasonStats = findRecentSeasonStats(playerData?.statistics);

  const displayIfNullOrUndefined = (value, postfix = '') =>
    value !== null && value !== undefined ? `${value} ${postfix}` : '--';

  return (
    <>
      <div className="mb-5 rounded-2xl border-[1px] border-primary p-5 text-white">
        <h4 className="mb-4 text-lg font-semibold text-secondary">Overview</h4>
        <div className="mb-4 flex items-center justify-between text-lg font-light">
          <span>Name</span>
          <span>{playerData?.name || '-'}</span>
        </div>
        <div className="mb-4 flex items-center justify-between text-lg font-light">
          <span>Team</span>
          <span>{recentSeasonStats?.season?.league?.name || '-'}</span>
        </div>
        <div className="mb-4 flex items-center justify-between text-lg font-light">
          <span>Nationality</span>
          <span>{playerData?.country?.name || '-'}</span>
        </div>
        <div className="mb-4 flex items-center justify-between text-lg font-light">
          <span>Birth Date</span>
          <span>{playerData?.date_of_birth || '-'}</span>
        </div>
        <div className="mb-4 flex items-center justify-between text-lg font-light">
          <span>Age</span>
          <span>{calculateAge(playerData?.date_of_birth || '-')}</span>
        </div>
        <div className="mb-4 flex items-center justify-between text-lg font-light">
          <span>Position</span>
          <span>{playerData?.position?.name || '-'}</span>
        </div>
        <div className="mb-4 flex items-center justify-between text-lg font-light">
          <span>Height</span>
          <span>
            {displayIfNullOrUndefined(playerData?.height, 'cm') || '-'}
          </span>
        </div>
        <div className="mb-4 flex items-center justify-between text-lg font-light">
          <span>Weight</span>
          <span>
            {displayIfNullOrUndefined(playerData?.weight, 'Kg') || '-'}
          </span>
        </div>
      </div>

      <div className="rounded-2xl border-[1px] border-primary py-5 text-white">
        <h4 className="mx-5 mb-2 text-lg font-semibold text-secondary">
          Transfers
        </h4>

        <div className="max-h-[350px] overflow-y-auto">
          <div className="overflow-x-auto px-1">
            <table className="table">
              <thead>
                <tr className="border-none">
                  <th className="text-lg font-light">From</th>
                  <th className="text-lg font-light">To</th>
                  <th className="text-lg font-light">Value</th>
                </tr>
              </thead>
              <tbody>
                {playerData.transfers.map((transfer) => (
                  <tr key={transfer.id} className="border-none">
                    <td>
                      <Link
                        className="flex items-center "
                        href={`/team/${getSlugify(
                          transfer?.fromteam?.name
                        )}/${transfer?.fromteam?.id}`}
                      >
                        <Image
                          src={transfer?.fromteam?.image_path}
                          alt={transfer?.fromteam?.name}
                          height={0}
                          width={0}
                          sizes="100vw"
                          className="mr-4 h-7 w-7 rounded-full bg-white ring-1 ring-gray-100"
                        />
                        <span>{transfer?.fromteam?.name}</span>
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="flex items-center "
                        href={`/team/${getSlugify(
                          transfer?.toteam?.name
                        )}/${transfer?.toteam?.id}`}
                      >
                        <Image
                          src={transfer?.toteam?.image_path}
                          alt={transfer?.toteam?.name}
                          height={0}
                          width={0}
                          sizes="100vw"
                          className="mr-4 h-7 w-7 rounded-full bg-white ring-1 ring-gray-100"
                        />
                        <span>{transfer?.toteam?.name}</span>
                      </Link>
                    </td>
                    <td>{formatMoney(transfer?.amount) || '-'}</td>
                  </tr>
                ))}

                {/* <tr>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
          
              <tr>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
