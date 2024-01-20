import { Field, FieldArray } from 'formik';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import FormBlockWrapper from './FormBlockWrapper';

export default function StreamingInfoForm({ values }) {
  return (
    <FormBlockWrapper title="Streaming Sources Information">
      <FieldArray name="streaming_sources">
        {(arrayHelpers) => (
          <div>
            {values.streaming_sources.map((streamSource, sourceIndex) => (
              <div
                className="mb-4 rounded border border-gray-200 p-4"
                key={sourceIndex}
              >
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-primary">
                    Streaming Source: {sourceIndex + 1}
                  </p>
                  {sourceIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(sourceIndex)}
                    >
                      <AiOutlineClose className="rounded bg-gray-200 text-2xl hover:bg-red-300 hover:text-rose-600" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    name={`streaming_sources[${sourceIndex}].stream_title`}
                  >
                    {({ field, meta }) => (
                      <>
                        <label className="form-control w-full">
                          <div className="label">
                            <span className="label-text font-semibold">
                              Stream Title{' '}
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

                  <Field name={`streaming_sources[${sourceIndex}].is_premium`}>
                    {({ field }) => (
                      <>
                        <label className="form-control w-full">
                          <div className="label">
                            <span className="label-text font-semibold">
                              Is Premium?
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

                  <Field name={`streaming_sources[${sourceIndex}].resolution`}>
                    {({ field }) => (
                      <>
                        <label className="form-control w-full">
                          <div className="label">
                            <span className="label-text font-semibold">
                              Resolution
                            </span>
                          </div>
                          <select className="select select-bordered" {...field}>
                            <option value="1080p">1080p</option>
                            <option value="720p">720p</option>
                            <option value="480p">480p</option>
                            <option value="360p">360p</option>
                          </select>
                        </label>
                      </>
                    )}
                  </Field>

                  <Field name={`streaming_sources[${sourceIndex}].platform`}>
                    {({ field }) => (
                      <>
                        <label className="form-control w-full">
                          <div className="label">
                            <span className="label-text font-semibold">
                              Platform
                            </span>
                          </div>
                          <select className="select select-bordered" {...field}>
                            <option value="both">Both</option>
                            <option value="android">Android</option>
                            <option value="ios">IOS</option>
                          </select>
                        </label>
                      </>
                    )}
                  </Field>

                  <Field
                    name={`streaming_sources[${sourceIndex}].portrait_watermark`}
                  >
                    {({ field }) => (
                      <>
                        <label className="form-control w-full">
                          <div className="label">
                            <span className="label-text font-semibold">
                              Portrait Watermark(json)
                            </span>
                          </div>
                          <textarea
                            className="textarea textarea-bordered"
                            {...field}
                          ></textarea>
                        </label>
                      </>
                    )}
                  </Field>

                  <Field
                    name={`streaming_sources[${sourceIndex}].landscape_watermark`}
                  >
                    {({ field }) => (
                      <>
                        <label className="form-control w-full">
                          <div className="label">
                            <span className="label-text font-semibold">
                              Landscape Watermark(json)
                            </span>
                          </div>
                          <textarea
                            className="textarea textarea-bordered"
                            {...field}
                          ></textarea>
                        </label>
                      </>
                    )}
                  </Field>

                  <Field
                    name={`streaming_sources[${sourceIndex}].stream_status`}
                  >
                    {({ field }) => (
                      <>
                        <label className="form-control w-full">
                          <div className="label">
                            <span className="label-text font-semibold">
                              Status
                            </span>
                          </div>
                          <select className="select select-bordered" {...field}>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                          </select>
                        </label>
                      </>
                    )}
                  </Field>

                  <Field name={`streaming_sources[${sourceIndex}].stream_type`}>
                    {({ field }) => (
                      <>
                        <label className="form-control w-full">
                          <div className="label">
                            <span className="label-text font-semibold">
                              Stream Type
                            </span>
                          </div>
                          <select className="select select-bordered" {...field}>
                            <option value="">Select One</option>
                            <option value="root_stream">Root Stream</option>
                            <option value="restricted">Restricted</option>
                            <option value="m3u8">M3u8</option>
                            <option value="web">Web</option>
                          </select>
                        </label>
                      </>
                    )}
                  </Field>

                  {streamSource.stream_type !== 'root_stream' && (
                    <Field
                      name={`streaming_sources[${sourceIndex}].stream_url`}
                    >
                      {({ field }) => (
                        <>
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text font-semibold">
                                Stream Url
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
                  )}
                </div>
              </div>
            ))}

            <div className="mt-3">
              <button
                type="button"
                className="btn btn-accent btn-sm rounded text-white"
                onClick={() =>
                  arrayHelpers.push({
                    stream_title: `Server SD`,
                    platform: 'both',
                    is_premium: '0',
                    stream_status: '1',
                    resolution: '480p',
                    stream_type: '',
                    stream_url: '',
                    portrait_watermark:
                      '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.0,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
                    landscape_watermark:
                      '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.5,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
                    headers: [
                      { key: 'Origin', value: '' },
                      { key: 'Referer', value: '' },
                    ],
                    root_streams: [
                      {
                        root_stream_type: 'flussonic',
                        root_stream_status: '1',
                        root_stream_stream_url: '',
                        root_stream_stream_key: '',
                      },
                    ],
                  })
                }
              >
                <AiOutlinePlus /> Streaming
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </FormBlockWrapper>
  );
}