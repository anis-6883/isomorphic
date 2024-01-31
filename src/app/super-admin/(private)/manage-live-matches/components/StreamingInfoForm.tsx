import { Field, FieldArray } from 'formik';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiCloseCircleFill } from 'react-icons/ri';
import FormBlockWrapper from '../../components/FormBlockWrapper';

export default function StreamingInfoForm({ values }: { values: any }) {
  return (
    <FormBlockWrapper title="Streaming Sources Information">
      <FieldArray name="streaming_sources">
        {(arrayHelpers) => (
          <div>
            {values.streaming_sources.map(
              (streamSource: any, sourceIndex: number) => (
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
                        <RiCloseCircleFill className="rounded text-2xl hover:text-rose-600" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field
                      name={`streaming_sources[${sourceIndex}].stream_title`}
                    >
                      {({ field, meta }: { field: any; meta: any }) => (
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

                    <Field
                      name={`streaming_sources[${sourceIndex}].is_premium`}
                    >
                      {({ field }: { field: any }) => (
                        <>
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text font-semibold">
                                Is Premium?
                              </span>
                            </div>
                            <select
                              className="select select-bordered"
                              {...field}
                            >
                              <option value="0">No</option>
                              <option value="1">Yes</option>
                            </select>
                          </label>
                        </>
                      )}
                    </Field>

                    <Field
                      name={`streaming_sources[${sourceIndex}].resolution`}
                    >
                      {({ field }: { field: any }) => (
                        <>
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text font-semibold">
                                Resolution
                              </span>
                            </div>
                            <select
                              className="select select-bordered"
                              {...field}
                            >
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
                      {({ field }: { field: any }) => (
                        <>
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text font-semibold">
                                Platform
                              </span>
                            </div>
                            <select
                              className="select select-bordered"
                              {...field}
                            >
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
                      {({ field }: { field: any }) => (
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
                      {({ field }: { field: any }) => (
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
                      {({ field }: { field: any }) => (
                        <>
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text font-semibold">
                                Status
                              </span>
                            </div>
                            <select
                              className="select select-bordered"
                              {...field}
                            >
                              <option value="1">Active</option>
                              <option value="0">Inactive</option>
                            </select>
                          </label>
                        </>
                      )}
                    </Field>

                    <Field
                      name={`streaming_sources[${sourceIndex}].stream_type`}
                    >
                      {({ field, meta }: { field: any; meta: any }) => (
                        <>
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text font-semibold">
                                Stream Type{' '}
                                <span className="text-red-600">
                                  * {meta.error && <span>({meta.error})</span>}
                                </span>
                              </span>
                            </div>
                            <select
                              className={`select select-bordered ${
                                meta.error && 'select-error'
                              }`}
                              {...field}
                            >
                              <option value="">Select One</option>
                              <option value="root_stream">Own Stream</option>
                              <option value="m3u8">M3u8</option>
                              {/* <option value="restricted">Restricted</option> */}
                              {/* <option value="web">Web</option> */}
                            </select>
                          </label>
                        </>
                      )}
                    </Field>

                    {streamSource.stream_type !== 'root_stream' && (
                      <Field
                        name={`streaming_sources[${sourceIndex}].stream_url`}
                      >
                        {({ field, meta }: { field: any; meta: any }) => (
                          <>
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text font-semibold">
                                  Stream Url{' '}
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
                    )}
                  </div>

                  {/* Restricted */}
                  {streamSource.stream_type === 'restricted' && (
                    <FieldArray
                      name={`streaming_sources[${sourceIndex}].headers`}
                    >
                      {(arrayHelpers) => (
                        <div className="mt-6">
                          {streamSource.headers.map(
                            (headers: any, headersIndex: number) => (
                              <div
                                key={headersIndex}
                                className="relative mt-3 rounded border border-gray-100 bg-gray-50 p-4 shadow"
                              >
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                  <Field
                                    name={`streaming_sources[${sourceIndex}].headers[${headersIndex}].key`}
                                  >
                                    {({
                                      field,
                                      meta,
                                    }: {
                                      field: any;
                                      meta: any;
                                    }) => (
                                      <>
                                        <label className="form-control w-full">
                                          <div className="label">
                                            <span className="label-text font-semibold">
                                              Key
                                            </span>
                                          </div>
                                          <input
                                            type="text"
                                            className={`input input-bordered w-full ${
                                              meta.touched &&
                                              meta.error &&
                                              'input-error'
                                            }`}
                                            {...field}
                                          />
                                        </label>
                                      </>
                                    )}
                                  </Field>

                                  <Field
                                    name={`streaming_sources[${sourceIndex}].headers[${headersIndex}].value`}
                                  >
                                    {({
                                      field,
                                      meta,
                                    }: {
                                      field: any;
                                      meta: any;
                                    }) => (
                                      <>
                                        <label className="form-control w-full">
                                          <div className="label">
                                            <span className="label-text font-semibold">
                                              Value
                                            </span>
                                          </div>
                                          <input
                                            type="text"
                                            className={`input input-bordered w-full ${
                                              meta.touched &&
                                              meta.error &&
                                              'input-error'
                                            }`}
                                            {...field}
                                          />
                                        </label>
                                      </>
                                    )}
                                  </Field>

                                  {/* {headersIndex > 0 && ( */}
                                  <div
                                    className={`${
                                      headersIndex > 0
                                        ? 'absolute right-1 top-1 block'
                                        : ' hidden'
                                    }`}
                                  >
                                    <button
                                      type="button"
                                      onClick={() =>
                                        arrayHelpers.remove(headersIndex)
                                      }
                                    >
                                      <RiCloseCircleFill className="rounded text-2xl hover:text-rose-600" />
                                    </button>
                                  </div>
                                  {/* )} */}
                                </div>
                              </div>
                            )
                          )}
                          <div className="mt-3">
                            <button
                              className="btn btn-outline btn-accent btn-sm rounded-md"
                              type="button"
                              onClick={() =>
                                arrayHelpers.push({ key: '', value: '' })
                              }
                            >
                              <AiOutlinePlus />
                              Header
                            </button>
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  )}

                  {/* Root streams */}
                  {streamSource.stream_type === 'root_stream' && (
                    <FieldArray
                      name={`streaming_sources[${sourceIndex}].root_streams`}
                    >
                      {(arrayHelpers) => (
                        <div className="mt-6">
                          {streamSource.root_streams?.map(
                            (root_stream: any, root_streamIndex: number) => (
                              <div
                                key={root_streamIndex}
                                className="relative mt-3 rounded border border-gray-200 bg-gray-50 p-4 shadow"
                              >
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                  <Field
                                    name={`streaming_sources[${sourceIndex}].root_streams[${root_streamIndex}].root_stream_type`}
                                  >
                                    {({ field }: { field: any }) => (
                                      <>
                                        <label className="form-control w-full">
                                          <div className="label">
                                            <span className="label-text font-semibold">
                                              Stream Type
                                            </span>
                                          </div>
                                          <select
                                            className="select select-bordered"
                                            {...field}
                                          >
                                            <option value="flussonic">
                                              Flussonic
                                            </option>
                                          </select>
                                        </label>
                                      </>
                                    )}
                                  </Field>

                                  <Field
                                    name={`streaming_sources[${sourceIndex}].root_streams[${root_streamIndex}].root_stream_status`}
                                  >
                                    {({ field }: { field: any }) => (
                                      <>
                                        <label className="form-control w-full">
                                          <div className="label">
                                            <span className="label-text font-semibold">
                                              Stream Status
                                            </span>
                                          </div>
                                          <select
                                            className="select select-bordered"
                                            {...field}
                                          >
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                          </select>
                                        </label>
                                      </>
                                    )}
                                  </Field>

                                  <Field
                                    name={`streaming_sources[${sourceIndex}].root_streams[${root_streamIndex}].root_stream_stream_url`}
                                  >
                                    {({ field }: { field: any }) => (
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

                                  <Field
                                    name={`streaming_sources[${sourceIndex}].root_streams[${root_streamIndex}].root_stream_stream_key`}
                                  >
                                    {({ field }: { field: any }) => (
                                      <>
                                        <label className="form-control w-full">
                                          <div className="label">
                                            <span className="label-text font-semibold">
                                              Stream Key
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

                                  <div
                                    className={`${
                                      root_streamIndex > 0
                                        ? 'absolute right-2 top-2 block'
                                        : ' hidden'
                                    }`}
                                  >
                                    <button
                                      type="button"
                                      onClick={() =>
                                        arrayHelpers.remove(root_streamIndex)
                                      }
                                    >
                                      <RiCloseCircleFill className="rounded text-2xl hover:text-rose-600" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                          {/* <div className="mt-6">
                          <button
                            className="btn btn-outline btn-accent btn-sm rounded-md"
                            type="button"
                            onClick={() =>
                              arrayHelpers.push({
                                root_stream_type: 'flussonic',
                                root_stream_status: '1',
                                root_stream_stream_url: '',
                                root_stream_stream_key: '',
                              })
                            }
                          >
                            <AiOutlinePlus />
                            Add Root Streams
                          </button>
                        </div> */}
                        </div>
                      )}
                    </FieldArray>
                  )}
                </div>
              )
            )}

            <div className="mt-6">
              <button
                type="button"
                className="btn btn-outline btn-accent btn-sm rounded-md"
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
