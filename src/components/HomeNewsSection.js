"use client"
import { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import { Fancybox } from "@fancyapps/ui";
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { getNews } from '@/action/backendApi';

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  return { day, month };
}

function HomeNewsSection() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  useEffect(() => {
    Fancybox.bind("[data-fancybox='news-gallery']", {});

    const fetchData = async () => {
      try {
        const newsData = await getNews();
        setNews(newsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 596,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="home-news-section">
      <div className="container">
        <div className="news-title">
          <h2>Latest News</h2>
        </div>
        <div className="news-title-desc">
          <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some</p>
        </div>
        <div className="news-all-box">
          <div id="news-slider" className="news-slick-slider">
            <Slider {...settings}>
              {loading ? (
                [...Array(3)].map((_, index) => (
                  <div className="post-slide" key={index}>
                    <Skeleton height={200} />
                    <div className="news-date">
                      <Skeleton width={30} />
                      <Skeleton width={50} />
                    </div>
                    <div className="news-content">
                      <Skeleton width={100} />
                      <Skeleton count={3} />
                      <Skeleton width={80} />
                    </div>
                  </div>
                ))
              ) : (
                news.map(n => {
                  const { day, month } = formatDate(n.created_at);
                  return (
                    <div className="post-slide" key={n.id}>
                      <div className="news-imgs">
                        {n.video_link ? (
                          <Link href={n.video_link} data-fancybox="news-gallery">                            
                              <i className="far fa-play-circle"></i>
                              <img src={`https://img.youtube.com/vi/${n.video_image}/maxresdefault.jpg`} alt="news imgs" />                            
                          </Link>
                        ) : n.news_image ? (
                          <Link href={n.slug} >                            
                              <img src={n.news_image} alt="news imgs" />                            
                          </Link>
                        ) : (
                          <Link href={n.slug} >                            
                              <img src="../../sermon-1.png" alt="news imgs" />                            
                          </Link>
                        )}
                      </div>
                      <div className="news-date">
                        <span className="n-date-day">{day}</span>
                        <span className="n-date">{month}</span>
                      </div>
                      <div className="news-content">
                        <div className="news-cat">
                          <Link href={n.slug} >
                            <span className="n-category">{n.newscategory_name}</span>
                          </Link>
                        </div>
                        <div className="news-short-desc">
                          <Link href={n.slug} >
                            <h5>{n.name}</h5>
                          </Link>
                        </div>
                        <div className="news-desc">
                          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(n.description) }}></p>
                        </div>
                        <div className="news-readmore-btn">
                          <Link href={n.slug} >
                            READ MORE<i className="fas fa-caret-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeNewsSection;
