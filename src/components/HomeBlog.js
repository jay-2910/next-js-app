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
import { getBlogs } from '@/action/backendApi';

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });

    return { day, month };
}

const HomeBlog = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState(true);

    Fancybox.bind("[data-fancybox='blog-gallery']", {});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogsData = await getBlogs();
                setBlogs(blogsData);
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
    if (loading) {
        return (
            <section className="home-blog-section">
                <div className="container">
                    <div className="blog-title"><h2>Sermon</h2></div>
                    <div className="blog-all-box">
                        <div id="blog-slider" className="blog-slick-slider">
                            <Slider {...settings}>                            
                                {[...Array(3)].map((_, index) => (
                                    <div className="post-slide" key={index}>
                                        <Skeleton height={200} />
                                        <div className="blog-date">
                                            <Skeleton width={30} />
                                            <Skeleton width={50} />
                                        </div>
                                        <div className="blog-content">
                                            <Skeleton width={100} />
                                            <Skeleton count={3} />
                                            <Skeleton width={80} />
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="home-blog-section">
            <div className="container">
                <div className="blog-title"><h2>Sermon</h2></div>
                <div className="blog-all-box">
                    <div id="blog-slider" className="blog-slick-slider">
                        <Slider {...settings}>
                            {blogs.map(blog => {
                                const { day, month } = formatDate(blog.created_at);
                                return (
                                    <div className="post-slide" key={blog.id}>
                                        <div className="blog-imgs">
                                            {blog.video_link ? (
                                                <Link href={blog.video_link} data-fancybox="blog-gallery">                                                    
                                                    <i className="far fa-play-circle"></i>
                                                    <img src={`https://img.youtube.com/vi/${blog.video_image}/maxresdefault.jpg`} alt="blog imgs" />                                                    
                                                </Link>
                                            ) : blog.blog_image ? (
                                                <Link href={blog.slug} >                                                    
                                                    <img src={blog.blog_image} alt="blog imgs" />
                                                </Link>
                                            ) : (
                                                <Link href={blog.slug}>                                                
                                                    <img src="../../sermon-1.png" alt="blog imgs" />                                                
                                                </Link>
                                            )}
                                        </div>
                                        <div className="blog-date">
                                            <span className="n-date-day">{day}</span>
                                            <span className="n-date">{month}</span>
                                        </div>
                                        <div className="blog-content">
                                            <div className="blog-short-desc">
                                                <Link href={blog.slug}>
                                                    <h5>{blog.title}</h5>
                                                </Link>
                                            </div>
                                            <div className="blog-desc">
                                                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.description) }}></p>
                                            </div>
                                            <div className="blog-readmore-btn">
                                                <Link href={blog.slug}>
                                                    READ MORE<i className="fas fa-caret-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeBlog;
