'use client';

import { routes } from '@/config/routes';
import {
  useCreateLiveMatchMutation,
  useGetLiveMatchesQuery,
} from '@/features/super-admin/live-match/liveMatchApi';
import { IFixtureSearchParams } from '@/types';
import { generateRandomId } from '@/utils/generate-random-id';
import getStreamObject from '@/utils/get-stream-object';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiCheckCircle } from 'react-icons/fi';
import { PiSpinnerLight } from 'react-icons/pi';
import * as Yup from 'yup';
import MatchInfoForm from './MatchInfoForm';
import StreamingInfoForm from './StreamingInfoForm';
import TeamInfoForm from './TeamInfoForm';

export default function LiveMatchCreate({
  searchParams,
}: {
  searchParams: IFixtureSearchParams;
}) {
  const router = useRouter();
  const [createLiveMatch, { data: response, isSuccess, isError }] =
    useCreateLiveMatchMutation();
  const { refetch } = useGetLiveMatchesQuery(undefined);
  const [teamOneImage, setTeamOneImage] = useState(null);
  const [teamTwoImage, setTeamTwoImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isError) {
      setIsSubmitting(false);
      toast.error('Something went wrong!');
    }
    if (isSuccess) {
      setIsSubmitting(false);
      toast.success('Live match created successfully!');
      refetch();
      router.push(routes.manageLive.home);
    }
  }, [isError, isSuccess, refetch, response, router]);

  const initialValues = {
    fixture_id: searchParams?.fixture_id || '',
    match_title: searchParams?.match_title || '',
    time: searchParams?.time || '',
    is_hot: '0',
    sports_type_name: searchParams?.sport_type || 'football',
    status: '1',
    team_one_name: searchParams?.t1_name || '',
    team_two_name: searchParams?.t2_name || '',
    team_one_image_type: searchParams?.t1_img ? 'url' : '',
    team_two_image_type: searchParams?.t2_img ? 'url' : '',
    team_one_image: searchParams?.t1_img || '',
    team_two_image: searchParams?.t2_img || '',
    streaming_sources: getStreamObject(false),
  };

  const matchSchema = Yup.object().shape({
    match_title: Yup.string().required('Required!'),
    time: Yup.string().required('Required!'),
    sports_type_name: Yup.string().required('Required!'),
    fixture_id: Yup.string(),
    team_one_name: Yup.string().required('Required!'),
    team_two_name: Yup.string().required('Required!'),
    status: Yup.string(),
    team_one_image_type: Yup.string(),
    team_two_image_type: Yup.string(),
    team_one_image: Yup.string(),
    team_two_image: Yup.string(),
    streaming_sources: Yup.array().of(
      Yup.object().shape({
        stream_title: Yup.string().required('Required!'),
        stream_type: Yup.string().required('Required!'),
        stream_url: Yup.string().when('stream_type', {
          is: (value: string) => ['web', 'm3u8', 'restricted'].includes(value),
          then: () => Yup.string().required('Required!'),
        }),
      })
    ),
  });

  // Live Match Create Handler
  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);

    values.id = generateRandomId(15);
    values.utcTime = moment(values.time).utc().unix();

    const liveMatchData = {
      ...values,
      team_one_image:
        values.team_one_image_type === ''
          ? `${process.env.NEXT_PUBLIC_ASIASPORT_BACKEND_URL}/public/default/team-logo.png`
          : values.team_one_image_type === 'image'
          ? teamOneImage
          : values?.team_one_image,
      team_two_image:
        values.team_two_image_type === ''
          ? `${process.env.NEXT_PUBLIC_ASIASPORT_BACKEND_URL}/public/default/team-logo.png`
          : values.team_two_image_type === 'image'
          ? teamTwoImage
          : values?.team_two_image,
    };

    var formBody = new FormData();

    formBody.append('id', liveMatchData?.id);
    formBody.append('match_title', liveMatchData?.match_title);
    formBody.append('time', liveMatchData?.time);
    formBody.append('match_time', liveMatchData?.utcTime);
    formBody.append('fixture_id', liveMatchData?.fixture_id);
    formBody.append('is_hot', liveMatchData?.is_hot);
    formBody.append('sports_type_name', liveMatchData?.sports_type_name);
    formBody.append('status', liveMatchData?.status);
    formBody.append('team_one_name', liveMatchData?.team_one_name);
    formBody.append('team_two_name', liveMatchData?.team_two_name);
    formBody.append(
      'team_one_image_type',
      liveMatchData?.team_one_image_type || 'url'
    );
    formBody.append(
      'team_two_image_type',
      liveMatchData?.team_two_image_type || 'url'
    );
    formBody.append(
      'streaming_sources',
      JSON.stringify(liveMatchData?.streaming_sources)
    );

    teamOneImage
      ? formBody.append('team_one_image', teamOneImage)
      : formBody.append('team_one_image_url', liveMatchData?.team_one_image);

    teamTwoImage
      ? formBody.append('team_two_image', teamTwoImage)
      : formBody.append('team_two_image_url', liveMatchData?.team_two_image);

    createLiveMatch(formBody);
  };

  return (
    <div className="flex-grow pb-10">
      <div className="grid grid-cols-1 gap-8 @2xl:gap-10 @3xl:gap-12">
        <Formik
          initialValues={initialValues}
          validationSchema={matchSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors }) => {
            return (
              <Form>
                <MatchInfoForm values={values} setFieldValue={setFieldValue} />
                <div className="my-5 border-b border-dashed border-slate-300"></div>
                <TeamInfoForm
                  values={values}
                  teamOneImage={teamOneImage}
                  setTeamOneImage={setTeamOneImage}
                  teamTwoImage={teamTwoImage}
                  setTeamTwoImage={setTeamTwoImage}
                  setFieldValue={setFieldValue}
                />
                <div className="my-5 border-b border-dashed border-slate-300"></div>
                <StreamingInfoForm values={values} />
                <div className="fixed bottom-[50px] right-[47px] mt-3 animate-bounce hover:animate-none">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm rounded-md text-white"
                    disabled={isSubmitting}
                  >
                    Submit{' '}
                    {isSubmitting ? (
                      <PiSpinnerLight className="ml-1 animate-spin" />
                    ) : (
                      <FiCheckCircle className="ml-1" />
                    )}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
