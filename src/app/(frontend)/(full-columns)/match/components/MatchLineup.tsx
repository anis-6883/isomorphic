import MainLoading from '@/app/shared/MainLoading';
import { useGetFixturesMatchLineupByIdQuery } from '@/features/front-end/fixture/fixtureApi';
import Image from 'next/image';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import PlayerView from './PlayerView';

export default function MatchLineup({ matchData }) {
  const findTeamInfo = (location, participants) => {
    const team = participants.find((team) => team.meta.location === location);
    return {
      id: team?.id,
      name: team?.name,
      image: team?.image_path,
    };
  };

  const homeTeamInfo = findTeamInfo('home', matchData?.data.participants);
  const awayTeamInfo = findTeamInfo('away', matchData?.data.participants);

  const { isLoading: matchLineupsLoading, data: matchLineupsData } =
    useGetFixturesMatchLineupByIdQuery(matchData?.data.id);
  console.log(matchLineupsData);

  if (matchLineupsLoading) {
    return <MainLoading />;
  }

  const getAdjustedLineup = (apiResponse) => {
    const getFormation = (location) =>
      apiResponse.formations.find(
        (formation) => formation.location === location
      )?.formation;

    // Main Schema
    let formattedLineup = {
      home: {
        id: homeTeamInfo.id,
        name: homeTeamInfo.name,
        image: homeTeamInfo.image,
        formation: getFormation('home'),
        lineup: { goalkeeper: [], defender: [], midfielder: [], attacker: [] },
        bench: { goalkeeper: [], defender: [], midfielder: [], attacker: [] },
      },
      away: {
        id: awayTeamInfo.id,
        name: awayTeamInfo.name,
        image: awayTeamInfo.image,
        formation: getFormation('away'),
        lineup: { goalkeeper: [], defender: [], midfielder: [], attacker: [] },
        bench: { goalkeeper: [], defender: [], midfielder: [], attacker: [] },
      },
    };

    const addToPosition = (player, team, position, type, details) => {
      const rating = details.find((topic) => topic.type_id === 118)?.data.value;
      const playerGoals = details.find((topic) => topic.type_id === 52)?.data
        .value;
      const playerAssists = details.find((topic) => topic.type_id === 79)?.data
        .value;
      const playerYellowCards = details.find((topic) => topic.type_id === 84)
        ?.data.value;
      const playerRedCards = details.find((topic) => topic.type_id === 85)?.data
        .value;
      const playerSubstitution = details.find((topic) => topic.type_id === 18)
        ?.data.value;

      const playerInfo = {
        id: player.player.id,
        jersey: player.jersey_number,
        name: player.player.display_name,
        image: player.player.image_path,
        rating,
        playerGoals: playerGoals,
        playerAssists: playerAssists,
        playerYellowCards: playerYellowCards,
        playerRedCards: playerRedCards,
        playerSubstitution: playerSubstitution,
      };

      formattedLineup[team][type][position] =
        formattedLineup[team][type][position] || [];

      formattedLineup[team][type][position].push(playerInfo);
    };

    // Create Main Result
    apiResponse.lineups.forEach((player) => {
      const team = player.team_id === homeTeamInfo.id ? 'home' : 'away';
      const positionCode = player?.position?.code;
      const details = player?.details;

      if (player.type.code === 'lineup') {
        addToPosition(player, team, positionCode, 'lineup', details);
      } else if (player.type.code === 'bench') {
        addToPosition(player, team, positionCode, 'bench', details);
      }
    });

    for (const team of ['home', 'away']) {
      const formation = formattedLineup[team].formation;
      const midfielders = formattedLineup[team].lineup.midfielder;

      if (formation?.split('-').length === 4) {
        const splitIndex = Math.floor(midfielders.length / 2);
        formattedLineup[team].lineup.midfielder = midfielders.slice(
          0,
          splitIndex
        );
        formattedLineup[team].lineup.midfielder_second_half =
          midfielders.slice(splitIndex);
      }
    }
    return formattedLineup;
  };

  const adjustedData = getAdjustedLineup(matchLineupsData?.data);

  const benchedPlayers = matchLineupsData?.data?.lineups
    .filter(
      (lineup) => lineup?.type?.code === 'bench' && lineup.details.length > 0
    )
    .sort((a, b) => {
      const getMinutesPlayed = (player) =>
        player?.details?.find(
          (stat) => stat.type.developer_name === 'MINUTES_PLAYED'
        )?.data?.value || 0;

      return getMinutesPlayed(b) - getMinutesPlayed(a);
    });
  const substitutesPlayers = matchLineupsData?.data?.events
    .filter((substitute) => substitute?.type_id === 18)
    .sort((a, b) => {
      const getMinutesPlayed = (player) =>
        player?.details?.find(
          (stat) => stat.type.developer_name === 'MINUTES_PLAYED'
        )?.data?.value || 0;

      return getMinutesPlayed(b) - getMinutesPlayed(a);
    });

  const homeSubstitutesPlayers = substitutesPlayers.filter(
    (players) => players?.participant_id === homeTeamInfo?.id
  );
  const awaySubstitutesPlayers = substitutesPlayers.filter(
    (players) => players?.participant_id === awayTeamInfo?.id
  );
  const homeBenchPlayers = benchedPlayers.filter(
    (players) => players?.team_id === homeTeamInfo?.id
  );
  const awayBenchPlayers = benchedPlayers.filter(
    (players) => players?.team_id === awayTeamInfo?.id
  );

  return (
    <div className="grid-col m-2 mb-20 mt-10 grid text-gray-500 md:m-0 md:mb-0 md:grid-cols-5">
      <div className="col-span-3">
        <div className="relative mb-3  w-fit md:mb-0">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="h-full w-full md:w-[670px]"
            src="/images/06.png"
            alt="field image"
          />

          <div className="absolute inset-0 h-full w-full md:w-[670px]">
            <div className="grid h-full grid-rows-2 gap-2 p-5">
              <div className="relative flex h-full flex-col  justify-between text-gray-300">
                <div className="mx-auto flex items-center justify-around gap-0 md:gap-4">
                  {adjustedData?.home?.lineup?.goalkeeper.map((player) => (
                    <PlayerView key={player.id} player={player} />
                  ))}
                </div>
                <div
                  className={`mx-auto flex items-center justify-around gap-0 md:gap-4`}
                >
                  {adjustedData?.home?.lineup?.defender.map((player) => (
                    <PlayerView key={player.id} player={player} />
                  ))}
                </div>
                <div
                  className={`mx-auto flex items-center justify-around gap-0 md:gap-4`}
                >
                  {adjustedData?.home?.lineup?.midfielder.map((player) => (
                    <PlayerView key={player.id} player={player} />
                  ))}
                </div>
                {adjustedData?.home?.lineup?.midfielder_second_half ? (
                  <>
                    <div
                      className={`mx-auto flex items-center justify-around gap-0 md:gap-4`}
                    >
                      {adjustedData?.home?.lineup?.midfielder_second_half?.map(
                        (player) => (
                          <PlayerView key={player.id} player={player} />
                        )
                      )}
                    </div>
                    <div
                      className={`mx-auto flex items-center justify-around gap-0 md:gap-4`}
                    >
                      {adjustedData?.home?.lineup?.attacker.map((player) => (
                        <PlayerView key={player.id} player={player} />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`mx-auto flex items-center justify-around gap-0 md:gap-4`}
                    >
                      {adjustedData?.home?.lineup?.attacker.map((player) => (
                        <PlayerView key={player.id} player={player} />
                      ))}
                    </div>
                  </>
                )}

                {/* Home Team */}

                <div className="absolute -top-4 left-0 flex items-center gap-2 text-[11px] md:-top-3 md:left-5 md:text-sm">
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-5 w-5 rounded-full p-0.5  md:h-8 md:w-8"
                    src={homeTeamInfo?.image}
                    alt="Logo"
                  />
                  <span className="text-gray-300">{homeTeamInfo?.name}</span>
                  <span className="text-gray-300">
                    {matchLineupsData?.data?.formations
                      ? matchLineupsData.data.formations
                          .filter((f) => f.location === 'home')
                          .map((filteredFormation) => (
                            <div key={filteredFormation.id}>
                              {filteredFormation?.formation}
                            </div>
                          ))
                      : 'No formations available'}
                  </span>
                </div>
              </div>
              <div className="relative flex h-full flex-col  justify-between text-gray-300">
                {adjustedData?.away?.lineup?.midfielder_second_half ? (
                  <>
                    <div
                      className={`mx-auto flex items-center justify-around gap-0 md:gap-4`}
                    >
                      {adjustedData?.away?.lineup?.midfielder_second_half?.map(
                        (player) => (
                          <PlayerView key={player.id} player={player} />
                        )
                      )}
                    </div>
                    <div
                      className={`mx-auto flex items-center justify-around gap-0 md:gap-4`}
                    >
                      {adjustedData?.away?.lineup?.attacker.map((player) => (
                        <PlayerView key={player.id} player={player} />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`mx-auto flex items-center justify-around gap-0 md:gap-4`}
                    >
                      {adjustedData?.away?.lineup?.attacker.map((player) => (
                        <PlayerView key={player.id} player={player} />
                      ))}
                    </div>
                  </>
                )}
                <div
                  className={`mx-auto flex items-center justify-around gap-0 md:gap-4`}
                >
                  {adjustedData?.away?.lineup?.midfielder.map((player) => (
                    <PlayerView key={player.id} player={player} />
                  ))}
                </div>
                <div
                  className={`mx-auto flex items-center justify-around gap-0 md:gap-4`}
                >
                  {adjustedData?.away?.lineup?.defender.map((player) => (
                    <PlayerView key={player.id} player={player} />
                  ))}
                </div>
                <div className="mx-auto flex items-center justify-around gap-0 md:gap-4">
                  {adjustedData?.away?.lineup?.goalkeeper.map((player) => (
                    <PlayerView key={player.id} player={player} />
                  ))}
                </div>
                {/* Away Team */}

                <div className="absolute right-5 top-[16.4rem] flex items-center gap-2 pb-1 text-[11px] md:top-[29.70rem] md:text-sm">
                  <span className="text-gray-300">
                    {matchLineupsData?.data?.formations
                      ? matchLineupsData.data.formations
                          .filter((f) => f.location === 'away')
                          .map((filteredFormation) => (
                            <div key={filteredFormation.id}>
                              {filteredFormation?.formation}
                            </div>
                          ))
                      : 'No formations available'}
                  </span>
                  <span className="text-gray-300 ">{awayTeamInfo?.name}</span>
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-5 w-5 rounded-full p-0.5 md:h-8 md:w-8"
                    src={awayTeamInfo?.image}
                    alt="Logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        {/* substitutes */}
        <div className="rounded-2xl  border-[1px] border-primary p-4">
          <h4 className="font-semibold text-primary">Substitutes</h4>
          <div className="my-4 grid grid-cols-2 text-[12px] md:text-base">
            <div className="grid grid-cols-5 content-center items-center gap-2">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="w-[40px] rounded-full "
                src={homeTeamInfo?.image}
                alt="Logo"
              />
              <p className="col-span-3 "> {homeTeamInfo?.name}</p>
            </div>
            <div className="grid grid-cols-5 content-center items-center gap-2 ">
              <p className="col-span-3"> {awayTeamInfo?.name}</p>
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="w-[40px] rounded-full  "
                src={awayTeamInfo?.image}
                alt="Logo"
              />
            </div>
          </div>

          <div className="justify-items-between grid grid-cols-2">
            <div>
              {homeSubstitutesPlayers?.map((playerData) => {
                return (
                  <div key={playerData.id}>
                    <div className=" my-2 grid grid-cols-5 content-center items-center gap-2 ">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-[40px] rounded-full "
                        src={playerData?.player?.image_path}
                        alt="Logo"
                      />
                      <div className="col-span-2">
                        <p className="me-3 text-[9px] font-medium md:text-xs ">
                          {playerData?.player?.display_name}
                        </p>
                        <p className="text-[8px] md:text-[10px]">
                          {playerData?.player?.position?.name}
                        </p>
                      </div>
                      <div className="flex items-center rounded-full bg-slate-900 text-[10px]">
                        <ImArrowRight className="mx-1 text-green-500" />
                        <span className="text-[#C7ED00] ">
                          {playerData?.minute}
                          {"'"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              {' '}
              {awaySubstitutesPlayers?.map((playerData) => {
                return (
                  <div key={playerData.id}>
                    <div className=" my-2 grid  grid-cols-5 content-center items-center gap-2">
                      <div className="flex items-center text-[10px]">
                        <span className="text-[#C7ED00]">
                          {playerData?.minute}
                          {"'"}
                        </span>
                        <ImArrowLeft className="mx-1 text-green-500" />
                      </div>
                      <div className="col-span-2">
                        <p className="me-3 text-[9px] font-medium md:text-xs  ">
                          {playerData?.player?.display_name}
                        </p>
                        <p className="text-[8px] md:text-[10px]">
                          {playerData?.player?.position?.name}
                        </p>
                      </div>

                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-[40px] rounded-full "
                        src={playerData?.player?.image_path}
                        alt="Logo"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* bench player */}
        <div className="mt-2 rounded-2xl border-[1px] border-primary p-4">
          <h4 className="font-semibold text-primary">Bench</h4>

          <div className="my-4 grid grid-cols-2 text-[12px] md:text-base">
            <div className="grid grid-cols-5 content-center items-center gap-2">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="w-[40px] rounded-full "
                src={homeTeamInfo?.image}
                alt="Logo"
              />
              <p className="col-span-3 "> {homeTeamInfo?.name}</p>
            </div>
            <div className="grid grid-cols-5 content-center items-center gap-2 ">
              <p className="col-span-3"> {awayTeamInfo?.name}</p>
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="w-[40px] rounded-full  "
                src={awayTeamInfo?.image}
                alt="Logo"
              />
            </div>
          </div>

          <div className="justify-items-between grid grid-cols-2">
            <div>
              {homeBenchPlayers?.map((playerData) => {
                return (
                  <div key={playerData.id}>
                    <div className=" my-2 grid grid-cols-5 content-center items-center gap-2">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-[40px] rounded-full "
                        src={playerData?.player?.image_path}
                        alt="Logo"
                      />
                      <div className="col-span-3">
                        <p className="me-3 text-[9px] font-medium md:text-xs  ">
                          {playerData?.player?.display_name}
                        </p>
                        <p className="text-[8px] md:text-[10px]">
                          {playerData?.player?.position?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              {' '}
              {awayBenchPlayers?.map((playerData) => {
                return (
                  <div key={playerData.id}>
                    <div className=" my-2 grid  grid-cols-5 content-center items-center gap-2">
                      <div className="col-span-3">
                        <p className="me-3 text-[9px] font-medium md:text-xs ">
                          {playerData?.player?.display_name}
                        </p>
                        <p className="text-[8px] md:text-[10px]">
                          {playerData?.player?.position?.name}
                        </p>
                      </div>

                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-[40px] rounded-full "
                        src={playerData?.player?.image_path}
                        alt="Logo"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
