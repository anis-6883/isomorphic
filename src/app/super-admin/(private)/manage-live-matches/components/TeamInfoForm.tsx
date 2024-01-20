import ImageDropzoneSingle from '@/components/image-dropzone-single';
import { Field } from 'formik';
import Image from 'next/image';
import FormBlockWrapper from './FormBlockWrapper';

export default function TeamInfoForm({
  values,
  teamOneImage,
  setTeamOneImage,
  teamTwoImage,
  setTeamTwoImage,
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormBlockWrapper title="Team One">
        <div className="grid grid-cols-1 gap-2">
          <Field name="team_one_name">
            {({ field, meta }) => (
              <>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Name{' '}
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

          <Field name="team_one_image_type">
            {({ field }) => (
              <>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">Image Type</span>
                  </div>
                  <select className="select select-bordered" {...field}>
                    <option value="">Select One</option>
                    <option value="url">Url</option>
                    <option value="image">Image</option>
                  </select>
                </label>
              </>
            )}
          </Field>

          {values?.team_one_image_type === 'url' && (
            <Field name="team_one_image">
              {({ field, meta }) => (
                <>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Image Url
                      </span>
                    </div>
                    <input
                      type="url"
                      className={`input input-bordered w-full ${
                        meta.touched && meta.error && 'input-error'
                      }`}
                      {...field}
                    />
                  </label>
                </>
              )}
            </Field>
          )}

          {values?.team_one_image_type === 'url' && values.team_one_image && (
            <div className="mt-2">
              <Image
                src={values.team_one_image}
                alt="Image"
                width={0}
                height={0}
                sizes="100vw"
                className="h-24 w-24 rounded-md border border-gray-200 object-contain p-1"
              />
            </div>
          )}

          {values?.team_one_image_type === 'image' && (
            <ImageDropzoneSingle
              className="mt-2"
              value={teamOneImage}
              onChange={(image) => setTeamOneImage(image)}
              size={1024 * 1000}
              sizeText="1MB"
            />
          )}
        </div>
      </FormBlockWrapper>

      <FormBlockWrapper title="Team Two">
        <div className="grid grid-cols-1 gap-2">
          <Field name="team_two_name">
            {({ field, meta }) => (
              <>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Name{' '}
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

          <Field name="team_two_image_type">
            {({ field }) => (
              <>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">Image Type</span>
                  </div>
                  <select className="select select-bordered" {...field}>
                    <option value="">Select One</option>
                    <option value="url">Url</option>
                    <option value="image">Image</option>
                  </select>
                </label>
              </>
            )}
          </Field>

          {values?.team_two_image_type === 'url' && (
            <Field name="team_two_image">
              {({ field, meta }) => (
                <>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Image Url
                      </span>
                    </div>
                    <input
                      type="url"
                      className={`input input-bordered w-full ${
                        meta.touched && meta.error && 'input-error'
                      }`}
                      {...field}
                    />
                  </label>
                </>
              )}
            </Field>
          )}

          {values?.team_two_image_type === 'url' && values.team_two_image && (
            <div className="mt-2">
              <Image
                src={values.team_two_image}
                alt="Image"
                width={0}
                height={0}
                sizes="100vw"
                className="h-24 w-24 rounded-md border border-gray-200 object-contain p-1"
              />
            </div>
          )}

          {values?.team_two_image_type === 'image' && (
            <ImageDropzoneSingle
              className="mt-2"
              value={teamTwoImage}
              onChange={(image) => setTeamTwoImage(image)}
              size={1024 * 1000}
              sizeText="1MB"
            />
          )}
        </div>
      </FormBlockWrapper>
    </div>
  );
}
