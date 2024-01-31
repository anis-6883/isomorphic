import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/dark.css';
import { Field } from 'formik';
import Flatpickr from 'react-flatpickr';
import FormBlockWrapper from '../../components/FormBlockWrapper';

export default function MatchInfoForm({
  values,
  setFieldValue,
}: {
  values: any;
  setFieldValue: any;
}) {
  type RenderProps = {
    defaultValue: any;
    value: any;
    props: any;
  };
  return (
    <FormBlockWrapper title="Match Information">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Field name="match_title">
          {({ field, meta }: { field: any; meta: any }) => (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">
                    Match Title{' '}
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
                  className={`input input-bordered w-full ${
                    meta.touched && meta.error && 'input-error'
                  }`}
                  {...field}
                />
              </label>
            </>
          )}
        </Field>

        <Field name="time">
          {({ field, meta }: { field: any; meta: any }) => (
            <Flatpickr
              value={values?.time}
              render={({ defaultValue, value, ...props }, ref) => (
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Match Time{' '}
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
                    className={`input input-bordered w-full ${
                      meta.touched && meta.error && 'input-error'
                    }`}
                    ref={ref}
                    // {...props}
                    placeholder="YYYY-MM-DD HH:MM"
                  />
                </label>
              )}
              options={{
                onChange: function (selectedDates, dateStr) {
                  setFieldValue('time', dateStr);
                },
                enableTime: true,
                disableMobile: true,
                allowInput: false,
              }}
            />
          )}
        </Field>

        <Field name="fixture_id">
          {({ field }: { field: any }) => (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">Fixture ID</span>
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Field name="is_hot">
          {({ field }: { field: any }) => (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">
                    Is Hot Match?
                  </span>
                </div>
                <select className="select select-bordered" {...field}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </label>
            </>
          )}
        </Field>
        <Field name="sports_type_name">
          {({ field }: { field: any }) => (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">Sports Type</span>
                </div>
                <select className="select select-bordered" {...field}>
                  <option value="football">Football</option>
                  <option value="cricket">Cricket</option>
                  <option value="basketball">Basketball</option>
                  <option value="tennis">Tennis</option>
                  <option value="baseball">Baseball</option>
                  <option value="volleyball">Volleyball</option>
                </select>
              </label>
            </>
          )}
        </Field>
        <Field name="status">
          {({ field }: { field: any }) => (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">Status</span>
                </div>
                <select className="select select-bordered" {...field}>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </label>
            </>
          )}
        </Field>
      </div>
    </FormBlockWrapper>
  );
}
