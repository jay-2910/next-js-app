"use client"
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getEvents } from '@/action/backendApi';
import Link from 'next/link';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Fancybox } from "@fancyapps/ui";

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const weekday = date.toLocaleString('default', { weekday: 'long' });

    return { day, month, weekday };
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hoursInt = parseInt(hours);
    const suffix = hoursInt >= 12 ? 'pm' : 'am';
    const hours12 = hoursInt % 12 || 12;
    return `${hours12}:${minutes} ${suffix}`;
}

function formatTimeRange(startTime, endTime) {
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);
    return `${formattedStartTime} - ${formattedEndTime}`;
}

const HomeEvent = () => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState(true);

    Fancybox.bind("[data-fancybox='event-gallery']", {});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventData = await getEvents();
                setEvents(eventData);
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
        <>
            <section className="letest-event-wrap">
                <div className="container">
                    <div className="letest-event">
                        <div className="letest-event-head">
                            <h2>Latest Events</h2>
                        </div>
                        <div id="event-slide" className="event-slick-slide">
                            <Slider {...settings}>
                                {loading ? (
                                    [...Array(3)].map((_, index) => (
                                        <div className="letest-event-list text-center" key={index}>
                                            <Skeleton height={200} />
                                            <Skeleton width={60} />
                                            <Skeleton count={2} />
                                        </div>
                                    ))
                                ) : (
                                    events.map(event => {
                                        const { day, month, weekday } = formatDate(event.event_date);
                                        const timeRange = formatTimeRange(event.start_time, event.end_time);
                                        return (
                                            <div className="letest-event-list" key={event.id}>
                                                <div className="letest-event-img">
                                                    {event.video_link ? (
                                                        <Link href={event.video_link} data-fancybox="event-gallery">
                                                            <i className="far fa-play-circle"></i>
                                                            <img src={`https://img.youtube.com/vi/${event.video_image}/maxresdefault.jpg`} alt="event imgs" />
                                                        </Link>
                                                    ) : event.event_image ? (
                                                        <Link href={event.slug}>
                                                            <img src={event.event_image} alt="event imgs" />
                                                        </Link>
                                                    ) : (
                                                        <Link href={event.slug}>
                                                            <img src="./sermon-1.png" alt="event imgs" />
                                                        </Link>
                                                    )}
                                                </div>
                                                <Link href={event.slug}>
                                                    <div className="letest-event-date"><span>{day}</span> <span>{month}</span></div>
                                                </Link>
                                                <div className="letest-event-detail">
                                                    <h5><Link href={event.slug}>{event.name}</Link></h5>
                                                    <span className="event-time"><em className="fa fa-clock"></em> {weekday} ({timeRange})</span> <span className="event-loc"><em className="fas fa-map-marker-alt"></em> {event.address}</span>
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
        </>
    );
};

export default HomeEvent;
