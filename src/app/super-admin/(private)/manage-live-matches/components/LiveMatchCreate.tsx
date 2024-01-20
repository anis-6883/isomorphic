'use client';

import getStreamObject from '@/utils/get-stream-object';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { ImSpinner } from 'react-icons/im';
import * as Yup from 'yup';
import MatchInfoForm from './MatchInfoForm';
import StreamingInfoForm from './StreamingInfoForm';
import TeamInfoForm from './TeamInfoForm';

export default function LiveMatchCreate({ queryString }) {
  const [teamOneImage, setTeamOneImage] = useState(null);
  const [teamTwoImage, setTeamTwoImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    fixture_id: queryString?.fixture_id || '',
    match_title: queryString?.title || '',
    time: queryString?.time || '',
    is_hot: '0',
    sports_type_name: queryString?.sports_type || 'football',
    status: '1',
    team_one_name: queryString?.t1_name || '',
    team_two_name: queryString?.t2_name || '',
    team_one_image_type: queryString?.t1_img ? 'url' : '',
    team_two_image_type: queryString?.t2_img ? 'url' : '',
    team_one_image: queryString?.t1_img || '',
    team_two_image: queryString?.t2_img || '',
    streaming_sources: getStreamObject(queryString?.title ? true : false),
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

  const handleSubmit = async (values) => {
    console.log('values: ', values);
    // setIsSubmitting(true);

    // values.id = generateRandomId(15);
    // values.utcTime = moment(values.time).utc().unix();

    // let teamOneImageUrl = '';
    // let teamTwoImageUrl = '';

    // if (teamOneImage) teamOneImageUrl = await uploadImage(teamOneImage);
    // if (teamTwoImage) teamTwoImageUrl = await uploadImage(teamTwoImage);

    // const liveMatchData = {
    //   ...values,
    //   team_one_image:
    //     values.team_one_image_type === ''
    //       ? `${process.env.NEXT_PUBLIC_XOOM_BACKEND_URL}/public/default/team-logo.png`
    //       : values.team_one_image_type === 'image'
    //         ? teamOneImageUrl
    //         : values?.team_one_image,
    //   team_two_image:
    //     values.team_two_image_type === ''
    //       ? `${process.env.NEXT_PUBLIC_XOOM_BACKEND_URL}/public/default/team-logo.png`
    //       : values.team_two_image_type === 'image'
    //         ? teamTwoImageUrl
    //         : values?.team_two_image,
    // };

    // try {
    //   const { data } = await asiaSportBackendUrl.post(
    //     '/api/admin/matches/create',
    //     liveMatchData
    //   );

    //   if (data.status) {
    //     toast.success('Live Matches Created Successfully!');
    //     setIsSubmitting(false);
    //     router.push('/xoomadmin/manage-live');
    //   }
    // } catch (error) {
    //   console.error('Error creating Live Matches:', error);
    //   setIsSubmitting(false);
    // }
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
          {({ values, setFieldValue, errors, touched }) => {
            console.log('errors: ', errors);
            console.log('touched: ', touched);

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
                />
                <div className="my-5 border-b border-dashed border-slate-300"></div>
                <StreamingInfoForm values={values} />
                <div className="fixed bottom-[50px] right-[47px] mt-3 animate-bounce hover:animate-none">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm rounded-md text-white"
                  >
                    Submit{' '}
                    {isSubmitting ? (
                      <ImSpinner className="ml-1 animate-spin" />
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
