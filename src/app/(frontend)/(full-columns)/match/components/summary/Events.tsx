import MainLoading from '@/app/shared/MainLoading';
import { useGetFixturesInfoAndCommentsQuery } from '@/features/front-end/fixture/fixtureApi';
import { IEvent, IEventType, IFormattedEvent, IMatchData, INestedObject, Team } from '@/types';
import Image from 'next/image';
import { BiFootball } from 'react-icons/bi';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';

export default function Events({ matchData , totalGoal } :{matchData:INestedObject ;totalGoal:string}) {
  const awayTeam = matchData?.data.participants.find(
    (team: Team | undefined) => team?.meta?.location === 'away'
  )?.id;

  const homeTeam = matchData?.data.participants.find(
    (team : Team | undefined) => team?.meta?.location === 'home'
  )?.id;

  const { isLoading: matchEventsLoading, data: eventData } =
    useGetFixturesInfoAndCommentsQuery(matchData?.data.id, {
      skip: !matchData?.data.id,
    });
  if (matchEventsLoading) {
    return <MainLoading />;
  }
  let newArray : IFormattedEvent[]= [];

  eventData?.data?.events.forEach((eventItem: IEventType) => {
    const formattedEvent: IFormattedEvent = {
      participant_id: eventItem.participant_id || '',
      minute: eventItem.minute || '',
      name: eventItem.type?.name || '',
      code: eventItem.type?.code || '',
      player: eventItem.player_name || '',
      related_player: eventItem.related_player_name || '',
    };
  
    if (
      eventItem.type &&
      (eventItem.type.code === 'yellowcard' ||
        eventItem.type.code === 'redcard' ||
        eventItem.type.code === 'substitution' ||
        eventItem.type.code === 'VAR_CARD' ||
        eventItem.type.code === 'goal' ||
        eventItem.type.code === 'owngoal' ||
        eventItem.type.code === 'VAR')
    ) {
      newArray.push(formattedEvent);
    }
  });


  

  type RenderedEvent = JSX.Element | null;

  const renderEvent = (event :IEvent, style:string):RenderedEvent => {
    switch (event.code) {
      case 'yellowcard':
        return yellowCard(event, style);
      case 'redcard':
        return redCard(event, style);
      case 'substitution':
        return substitution(event);
      case 'VAR':
        return VAR(event);
      case 'VAR_CARD':
        return VAR_CARD(event);
      case 'goal':
        return goal(event, style);
      case 'owngoal':
        return ownGoal(event);
      default:
        return null;
    }
  };

  const substitution = (event : IEvent) => {
    return (
      <>
        <div className="flex flex-col gap-1 p-1">
          <BsFillArrowRightCircleFill className="text-base text-green-500" />
          <BsFillArrowLeftCircleFill className="text-base text-red-500" />
        </div>
        <div className="text-[8px] font-normal md:text-base">
          <p>{event.player}</p>
          <p>{event.related_player}</p>
        </div>
      </>
    );
  };

  const yellowCard = (event:IEvent, style:string) => {
    return (
      <>
        <div className="flex h-8 w-4 flex-col gap-1 rounded bg-yellow-400"></div>
        <div>
          <h2 className="text-[8px] md:text-base">{event.player}</h2>
          <p className={`${style} text-[8px] md:text-sm`}>Foul</p>
        </div>
      </>
    );
  };

  const redCard = (event:IEvent, style:string) => {
    return (
      <>
        <div className="flex h-8 w-4 flex-col gap-1 rounded bg-red-600"></div>
        <h2 className="text-[8px] md:text-base">{event.player}</h2>
        <p className={`${style} text-[8px] md:text-sm`}>Foul</p>
      </>
    );
  };

  const goal = (event:IEvent, style:string) => {
    return (
      <>
        <BiFootball className="text-2xl" />
        <div>
          <h2 className="text-[8px] md:text-base">{event.player}</h2>
          <p className={`${style} text-[8px] md:text-sm`}>Goal</p>
        </div>
      </>
    );
  };

  const ownGoal = (event:IEvent) => {
    return (
      <>
        <BiFootball className="text-[8px] md:text-base" />
        <p className="font-normal">{event.player}</p>
      </>
    );
  };

  const VAR_CARD = (event:IEvent) => {
    return (
      <>
        <Image
          src="/icons/var.png"
          alt="var-logo"
          height={0}
          width={0}
          sizes="100vw"
          className="w-6 rounded-md"
        />
        <div className="text-[8px] font-normal md:text-base">
          <p>{event.player}</p>
          <p>Goal Confirm</p>
        </div>
      </>
    );
  };

  const VAR = (event:IEvent) => {
    return (
      <>
        <Image
          src="/icons/var.png"
          alt="var-logo"
          height={0}
          width={0}
          sizes="100vw"
          className="w-6 rounded-md"
        />
        <div className="text-[8px] font-normal md:text-base">
          <p>{event.player}</p>
          <p>Goal Confirm</p>
        </div>
      </>
    );
  };

  const firstHalfAwayGoal = matchData?.data.scores?.filter(
    (team : Team | undefined) =>
      team?.description === '1ST_HALF' && team?.score?.participant === 'away'
  );
  const firstHalfHomeGoal = matchData?.data.scores?.filter(
    (team : Team | undefined) =>
      team?.description === '1ST_HALF' && team?.score?.participant === 'home'
  );

  const totalFirstHalfGoal = `${firstHalfHomeGoal[0]?.score?.goals} - ${firstHalfAwayGoal[0]?.score?.goals}`;

  return (
    <div className="mb-20  mt-10 md:mb-20">
      <div>
        <div className="my-2 bg-[#1B2435] py-2 text-center">
          <h2 className="text-white">Full Time</h2>
          <h2 className="text-white">{totalGoal}</h2>
        </div>
        {newArray
          .sort((a, b) => {
            const minuteA = a?.minute ? parseInt(a.minute, 10) : 0;
            const minuteB = b?.minute ? parseInt(b.minute, 10) : 0;
          
            return minuteB - minuteA;
          })
          .map((event, index) => {
            if (
              Number(event.minute) >
              45 + Number(matchData?.data.periods[0]?.time_added)
            ) {
              return (
                <div
                  key={index}
                  className=" mx-auto mt-3 grid h-16 w-full grid-cols-3 items-center gap-5 px-4 text-white"
                >
                  <div>
                    {homeTeam === event.participant_id ? (
                      <div
                        className={`flex ${
                          homeTeam === event.participant_id
                            ? 'flex-row-reverse'
                            : ''
                        } col-span-1 w-full items-center justify-start gap-2 p-2`}
                      >
                        {renderEvent(event, 'text-end')}
                      </div>
                    ) : (
                      <div className="col-span-1"></div>
                    )}
                  </div>

                  <div className="col-span-1 h-16 w-16 justify-self-center rounded-full bg-[#061A30] text-center">
                    <h4 className="mt-5">
                      {event?.minute}
                      {`'`}
                    </h4>
                  </div>

                  <div>
                    {awayTeam === event.participant_id ? (
                      <div
                        className={`flex ${
                          awayTeam === event.participant_id ? 'flex-row ' : ''
                        } col-span-1 w-full items-center justify-start gap-2 p-2`}
                      >
                        {renderEvent(event, 'text-start')}
                      </div>
                    ) : (
                      <div className="col-span-1"></div>
                    )}
                  </div>
                </div>
              );
            }
          })}
      </div>
      <div>
        <div className="my-2 bg-[#1B2435] py-2 text-center">
          <h2 className="text-white">1st Half</h2>
          <h2 className="text-white">{totalFirstHalfGoal}</h2>
        </div>
        {newArray
          .sort((a, b) => {
            const minuteA = a?.minute ? parseInt(a.minute, 10) : 0;
            const minuteB = b?.minute ? parseInt(b.minute, 10) : 0;
          
            return minuteB - minuteA;
          })
          .map((event, index) => {
            if (
              Number(event.minute) <
              45 + Number(matchData?.data.periods[1]?.time_added)
            ) {
              return (
                <div
                  key={index}
                  className=" mx-auto mt-3 grid h-16 w-full grid-cols-3 items-center gap-5 px-4 text-white"
                >
                  <div>
                    {homeTeam === event.participant_id ? (
                      <div
                        className={`flex ${
                          homeTeam === event.participant_id
                            ? 'flex-row-reverse'
                            : ''
                        } col-span-1 w-full items-center justify-start gap-2 p-2`}
                      >
                        {renderEvent(event, 'text-end')}
                      </div>
                    ) : (
                      <div className="col-span-1"></div>
                    )}
                  </div>
                  <div className="col-span-1 h-16 w-16 justify-self-center rounded-full bg-[#061A30] text-center">
                    <h4 className="mt-5">
                      {event?.minute}
                      {`'`}
                    </h4>
                  </div>

                  <div>
                    {awayTeam === event.participant_id ? (
                      <div
                        className={`flex ${
                          awayTeam === event.participant_id ? 'flex-row' : ''
                        } col-span-1 w-full items-center justify-start gap-2 p-2`}
                      >
                        {renderEvent(event, 'text-start')}
                      </div>
                    ) : (
                      <div className="col-span-1"></div>
                    )}
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
