'use client';

import MainLoading from '@/app/shared/MainLoading';
import {
  useGetAllNewsQuery,
  useGetGroupByNewsQuery,
} from '@/features/front-end/news/newsApi';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../css/newsSlider.css';

function formatNewsTimestamp(timestamp) {
  const momentTimestamp = moment(timestamp);
  if (momentTimestamp.isValid()) {
    return momentTimestamp.fromNow();
  }
  return 'Invalid Date';
}

export default function NewsHome() {
  const { isLoading: newsLoading, data: newsData } = useGetAllNewsQuery(null);
  const { isLoading, data: groupByNewsData } = useGetGroupByNewsQuery(null);

  if (newsLoading || isLoading) {
    return <MainLoading />;
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    pauseOnHover: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  return (
    <div className="mx-auto mb-20 mt-6 max-w-screen-xl md:mb-5">
      <h3 className="my-7 text-2xl font-medium text-white">Top News</h3>

      {newsData?.data.length > 0 && (
        <Slider {...sliderSettings}>
          {newsData?.data.slice(0, 3).map((news) => (
            <div key={news._id}>
              <Link href={`/news/${news.slug}`}>
                <div className="grid grid-cols-12">
                  <div className="col-span-6">
                    <Image
                      src={news.image}
                      alt="Demo"
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="mr-4 h-[400px] w-full p-1"
                    />
                  </div>
                  <div className="col-span-6 bg-[#1C2536] p-10">
                    <h4 className="text-xl text-white">{news.title}</h4>
                    <p className="py-5 text-justify text-white">
                      {news?.short_description.length > 350
                        ? `${news.short_description.slice(0, 350)}...`
                        : news.short_description}
                    </p>
                    <div className="flex items-center gap-5">
                      <span className="badge badge-md border-gray-700 bg-[#374151] px-5 py-4 text-gray-200">
                        Match Reports
                      </span>
                      <span className="text-sm text-white">
                        {formatNewsTimestamp(news?.publish_date)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      )}

      {groupByNewsData?.data.length > 0 &&
        groupByNewsData?.data.map((group, index) => (
          <div key={index}>
            <h3 className="mx-5 my-7 text-xl font-medium text-white md:mx-0">
              {group.league}
            </h3>
            <div className="mx-5 grid grid-cols-12 gap-5 md:mx-0">
              {group.news.map((item) => (
                <div
                  key={item._id}
                  className="col-span-12 flex flex-col rounded-xl text-white md:col-span-6 lg:col-span-3"
                >
                  <div>
                    <Link href={`/news/${item.slug}`}>
                      <Image
                        src={item.image}
                        alt="Demo"
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="h-48 w-full select-none"
                      />
                    </Link>
                  </div>
                  <div className="flex min-h-[155px] flex-col justify-between bg-[#1C2536] ">
                    <Link href={`/news/${item.slug}`}>
                      <p className="p-3 text-justify font-light ">
                        {item?.title.length > 95
                          ? `${item.title.slice(0, 95)}...`
                          : item.title}
                      </p>
                    </Link>

                    <div className="flex items-center justify-between p-3">
                      <span className="badge badge-md border-gray-700 bg-[#374151] px-5 py-4">
                        Match Reports
                      </span>
                      <span className="text-sm">
                        {formatNewsTimestamp(item?.publish_date)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
