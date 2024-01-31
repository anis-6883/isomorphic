import SingleNewsDetails from '../components/SingleNewsDetails';

export const metadata = {
  title: 'AsiaSport | News',
  description: 'AsiaSport',
};

export default async function page({ params } : {params:{news_slug:string} }) {
  const { news_slug } = params;

  return <SingleNewsDetails newsSlug={news_slug} />;
}
