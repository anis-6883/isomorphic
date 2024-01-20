import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/dark.css';
import { Field } from 'formik';
import Flatpickr from 'react-flatpickr';
import FormBlockWrapper from './FormBlockWrapper';

export default function MatchInfoForm({ values, setFieldValue }) {
  return (
    <FormBlockWrapper title="Match Information">
      <div className="grid grid-cols-3 gap-4">
        <Field name="match_title">
          {({ field, meta }) => (
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
          {({ field, meta }) => (
            <Flatpickr
              render={({ defaultValue, value, ...props }, ref) => (
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
                      ref={ref}
                      {...props}
                      placeholder="YYYY-MM-DD HH:MM"
                    />
                  </label>
                </>
              )}
              options={{
                onChange: function (selectedDates, dateStr) {
                  setFieldValue('time', dateStr);
                },
                enableTime: true,
                disableMobile: true,
                allowInput: false,
                defaultDate: values?.time || '',
              }}
            />
          )}
        </Field>

        <Field name="fixture_id">
          {({ field }) => (
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

      <div className="grid grid-cols-3 gap-4">
        <Field name="is_hot">
          {({ field }) => (
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
          {({ field }) => (
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
                  <option value="golf">Golf</option>
                  <option value="rugby">Rugby</option>
                  <option value="swimming">Swimming</option>
                  <option value="table_tennis">Table Tennis</option>
                </select>
              </label>
            </>
          )}
        </Field>
        <Field name="status">
          {({ field }) => (
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
