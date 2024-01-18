import { FormBlockWrapper } from '@/app/shared/invoice/form-utils';
import PageHeader from '@/app/shared/page-header';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';

const pageHeader = {
  title: 'Create A Live Match',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dashboard',
    },
    {
      href: routes.manageLive.home,
      name: 'Live Matches',
    },
    {
      name: 'Create',
    },
  ],
};

export const metadata = {
  ...metaObject('Manage Live'),
};

export default function Page() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      {/* <AddressInfo type="billingAddress" title="Billing Information" /> */}
      <div className="flex-grow pb-10">
        <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
          <FormBlockWrapper
            title={'From:'}
            description={'From he who sending this invoice'}
          >
            <Input
              label="Name"
              placeholder="Enter your name"
              //   {...register('fromName')}
              //   error={errors.fromName?.message}
            />
            {/* <Controller
                  name="fromPhone"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <PhoneNumber
                      label="Phone Number"
                      country="us"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                /> */}
            <Textarea
              label="Address"
              placeholder="Enter your address"
              //   {...register('fromAddress')}
              //   error={errors.fromAddress?.message}
              textareaClassName="h-20"
              className="col-span-2"
            />
          </FormBlockWrapper>

          <FormBlockWrapper
            title={'To:'}
            description={'To he who will receive this invoice'}
            className="pt-7 @2xl:pt-9 @3xl:pt-11"
          >
            <Input
              label="Name"
              placeholder="Enter your name"
              //   {...register('toName')}
              //   error={errors.toName?.message}
            />
            {/* <Controller
                  name="toPhone"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <PhoneNumber
                      label="Phone Number"
                      country="us"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                /> */}
            <Textarea
              label="Address"
              placeholder="Enter your address"
              //   {...register('toAddress')}
              //   error={errors.toAddress?.message}
              textareaClassName="h-20"
              className="col-span-2"
            />
          </FormBlockWrapper>
        </div>
      </div>
    </>
  );
}
