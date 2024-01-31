import timeZoneData from '@/utils/get-timezone-list';
import { Field } from 'formik';
import es from 'react-phone-input-2/lang/es.json';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import FormBlockWrapper from '../../components/FormBlockWrapper';

export default function GeneralSettingsForm({
  setFieldValue,
  values,
}: {
  setFieldValue: any;
  values: any;
}) {
  const animatedComponents = makeAnimated();
  const convertedData = convertDataToObject(es);

  return (
    <FormBlockWrapper title="Main Information">
      <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-3">
        <Field name="company_name">
          {({ field, meta }: { field: any; meta: any }) => (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">
                    Company Name{' '}
                    <span className="text-red-600">
                      *{' '}
                      {meta.touched && meta.error && (
                        <span>({meta.error})</span>
                      )}
                    </span>
                  </span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...field}
                />
              </label>
            </>
          )}
        </Field>

        <Field name="site_title">
          {({ field, meta }: { field: any; meta: any }) => (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">
                    Site Title{' '}
                    <span className="text-red-600">
                      *{' '}
                      {meta.touched && meta.error && (
                        <span>({meta.error})</span>
                      )}
                    </span>
                  </span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...field}
                />
              </label>
            </>
          )}
        </Field>

        <Field name="timezone">
          {({ field, meta }: { field: any; meta: any }) => (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">
                    Time Zone{' '}
                    <span className="text-red-600">
                      * {meta.touched && meta.error && <span>(Required!)</span>}
                    </span>
                  </span>
                </div>
                <Select
                  id="type"
                  placeholder="Select an option"
                  options={timeZoneData}
                  onChange={(timezoneOption) => {
                    setFieldValue('timezone', timezoneOption);
                  }}
                  value={values?.timezone}
                />
              </label>
            </>
          )}
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-2">
        <Field name="allowed_country">
          {({ field }: { field: any; meta: any }) => (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">
                    Allowed Countries (User Sign In)
                  </span>
                </div>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  name="Country"
                  onChange={(allowedCountry) => {
                    setFieldValue('allowed_country', allowedCountry);
                  }}
                  options={convertedData}
                  value={values?.allowed_country}
                />
              </label>
            </>
          )}
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
        <Field name="qpsms_appkey">
          {({ field, meta }: { field: any; meta: any }) => (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">
                    QP SMS App Key (OTP)
                  </span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...field}
                />
              </label>
            </>
          )}
        </Field>

        <Field name="qpsms_secretkey">
          {({ field, meta }: { field: any; meta: any }) => (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">
                    QP SMS Secret Key (OTP)
                  </span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...field}
                />
              </label>
            </>
          )}
        </Field>
      </div>
    </FormBlockWrapper>
  );
}

function convertDataToObject(inputData: any) {
  const dataArray = [];

  for (const key in inputData) {
    if (Object.prototype.hasOwnProperty.call(inputData, key)) {
      dataArray.push({
        value: key,
        label: inputData[key],
      });
    }
  }

  return dataArray;
}
