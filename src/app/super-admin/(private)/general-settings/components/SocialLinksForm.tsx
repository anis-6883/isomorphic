import { Field } from 'formik';
import FormBlockWrapper from '../../components/FormBlockWrapper';

export default function SocialLinksForm() {
  return (
    <FormBlockWrapper title="Apps & Social Links">
      <div className="grid grid-cols-1 gap-y-2">
        <Field name="facebook">
          {({ field, meta }) => (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">Facebook</span>
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

        <Field name="instagram">
          {({ field }) => (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">Instagram</span>
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

        <Field name="youtube">
          {({ field }) => (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">Youtube</span>
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
