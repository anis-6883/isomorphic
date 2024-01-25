'use client';

import {
  useGetGeneralSettingsQuery,
  useUpdateGeneralSettingsMutation,
} from '@/features/super-admin/general-settings/generalSettingsApi';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { ImSpinner } from 'react-icons/im';
import * as Yup from 'yup';
import CloudinaryForm from './CloudinaryForm';
import GeneralSettingsForm from './GeneralSettingsForm';
import LogoAndIconForm from './LogoAndIconForm';
import PrivacyAndPolicyForm from './PrivacyAndPolicyForm';
import SocialLinksForm from './SocialLinksForm';
import TabButtonItem from './TabButtonItem';
import TermsAndConditionForm from './TermsAndConditionForm';

export default function SettingsMainForm() {
  const {
    data: generalSetting,
    isLoading,
    isError,
  } = useGetGeneralSettingsQuery(undefined);

  const [updateSettings, {}] = useUpdateGeneralSettingsMutation();

  const [currentTab, setCurrentTab] = useState(0);
  const [siteLogo, setSiteLogo] = useState(null);
  const [siteLogoOnline, setSiteLogoOnline] = useState(null);
  const [siteIcon, setSiteIcon] = useState(null);
  const [siteIconOnline, setSiteIconOnline] = useState(null);
  const [timezoneOption, setTimezoneOption] = useState('');
  const [languageOption, setLanguageOption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allowedCountry, setAllowedCountry] = useState([]);

  const [initialValues, setInitialValues] = useState({
    company_name: '',
    site_title: '',
    timezone: {},
    allowed_country: [],
    // language: {},
    facebook: 'https://www.facebook.com/',
    youtube: 'https://www.youtube.com/',
    instagram: 'https://www.instagram.com/',
    site_logo: '',
    site_icon: '',
    terms: '',
    policy: '',
    cloudinary_cloud_name: '',
    cloudinary_api_key: '',
    cloudinary_app_secret: '',
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log(generalSetting);

      setInitialValues({
        company_name: generalSetting?.data?.company_name || '',
        site_title: generalSetting?.data?.site_title || '',
        timezone: {},
        allowed_country: [],
        facebook: generalSetting?.data?.facebook || '',
        youtube: generalSetting?.data?.youtube || '',
        instagram: generalSetting?.data?.instagram || '',
        site_logo: generalSetting?.data?.site_logo || '',
        site_icon: generalSetting?.data?.site_icon || '',
        terms: generalSetting?.data?.terms || '',
        policy: generalSetting?.data?.policy || '',
        cloudinary_cloud_name:
          generalSetting?.data?.cloudinary_cloud_name || '',
        cloudinary_api_key: generalSetting?.data?.cloudinary_api_key || '',
        cloudinary_app_secret:
          generalSetting?.data?.cloudinary_app_secret || '',
      });
    }
  }, [generalSetting, isError, isLoading]);

  const tabs = [
    'General Settings',
    'Apps & Social Links',
    'Logo & Icon',
    'Terms and Condition',
    'Privacy and Policy',
    'Cloudinary',
  ];

  const handleTabChange = (tab: number) => {
    setCurrentTab(tab);
  };

  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required('Required!'),
    site_title: Yup.string().required('Required!'),
    timezone: Yup.object().shape({
      label: Yup.string().required('Required!'),
      value: Yup.string().required('Required!'),
    }),
  });

  // Submit Handler
  const handleSubmit = async (values) => {
    // setIsSubmitting(true);
    console.log(values);

    var formBody = new FormData();

    formBody.append('company_name', values?.company_name);
    formBody.append('site_title', values?.site_title);
    formBody.append('timezone', JSON.stringify(values?.timezone));
    formBody.append('allowed_country', JSON.stringify(values?.allowed_country));
    formBody.append('facebook', values?.facebook);
    formBody.append('youtube', values?.youtube);
    formBody.append('instagram', values?.instagram);
    formBody.append('terms', values?.terms);
    formBody.append('policy', values?.policy);

    updateSettings(formBody);

    // let siteLogoUrl = siteLogoOnline
    //   ? siteLogoOnline
    //   : `${process.env.NEXT_PUBLIC_ASIASPORT_BACKEND_URL}/public/default/company-logo.png`;
    // let siteIconUrl = siteIconOnline
    //   ? siteIconOnline
    //   : `${process.env.NEXT_PUBLIC_ASIASPORT_BACKEND_URL}/public/default/company-logo.png`;

    // if (siteLogo) siteLogoUrl = await uploadImage(siteLogo);
    // if (siteIcon) siteIconUrl = await uploadImage(siteIcon);

    // values.site_logo = siteLogoUrl;
    // values.site_icon = siteIconUrl;

    // const { data } = await asiaSportBackendUrl.post(
    //   '/api/admin/administration-settings/update',
    //   values
    // );

    // if (data?.status) {
    //   setIsSubmitting(false);
    //   toast.success('General settings updated successfully!');
    // } else {
    //   setIsSubmitting(false);
    //   toast.error('Something went wrong!');
    // }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              <div className="col-span-1 flex flex-col md:col-span-3">
                {tabs.map((tab, index) => (
                  <TabButtonItem
                    key={index}
                    tab={tab}
                    onClick={() => handleTabChange(index)}
                    active={currentTab === index}
                  />
                ))}
              </div>
              <div className="col-span-1 w-full rounded-lg border border-gray-200 bg-white p-5 shadow md:col-span-9">
                <div hidden={currentTab === 0 ? false : true}>
                  <GeneralSettingsForm
                    setTimezoneOption={setTimezoneOption}
                    timezoneOption={timezoneOption}
                    setFieldValue={setFieldValue}
                    setLanguageOption={setLanguageOption}
                    setAllowedCountry={setAllowedCountry}
                    allowedCountry={allowedCountry}
                    // languageOption={languageOption}
                    // allowedCountryIntoDb={allowedCountryIntoDb}
                  />
                </div>

                <div hidden={currentTab === 1 ? false : true}>
                  <SocialLinksForm />
                </div>

                <div hidden={currentTab === 2 ? false : true}>
                  <LogoAndIconForm
                    values={values}
                    setFieldValue={setFieldValue}
                    setSiteIcon={setSiteIcon}
                    siteIcon={siteIcon}
                    setSiteLogo={setSiteLogo}
                    siteLogo={siteLogo}
                  />
                </div>

                <div hidden={currentTab === 3 ? false : true}>
                  <TermsAndConditionForm
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                </div>

                <div hidden={currentTab === 4 ? false : true}>
                  <PrivacyAndPolicyForm
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                </div>

                <div hidden={currentTab === 5 ? false : true}>
                  <CloudinaryForm />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end">
              <button
                type="submit"
                className="btn btn-primary btn-sm mt-6 text-white"
                disabled={isSubmitting}
              >
                Submit{' '}
                {isSubmitting && <ImSpinner className="ml-2 animate-spin" />}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
