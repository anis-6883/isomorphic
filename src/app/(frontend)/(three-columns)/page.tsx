import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject(),
};

export default function Page() {
  return <h1>Hello World!</h1>;
}