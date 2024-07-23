"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getMenu, getPages, getSettings } from "@/action/backendApi";
import DOMPurify from 'dompurify';

function Footer() {
    const [settings, setSettings] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [pages, setPages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const settingsData = await getSettings();
                const menuData = await getMenu();
                const pagesData = await getPages();
                setSettings(settingsData);
                setMenuItems(menuData);
                setPages(pagesData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }   
        };
        fetchData();
    }, []);
    return (
        <>
            <footer className="footer-wrap">
                <div className="container">
                    <div className="footer">
                        <div className="footer-top">
                            <div className="footer-links">
                                <ul className="list-inline">
                                    {menuItems?.footermenu?.map(item => (
                                        <li key={item.id}>
                                            {(() => {
                                                let menuUrl = '';
                                                if (item.type === "url") {
                                                    menuUrl = item.url;
                                                } else if (item.type === "page") {
                                                    const page = pages.find(page => page.id === item.page_id);
                                                    if (page) {
                                                        menuUrl = `/page/${page.slug}`;
                                                    }
                                                }
                                                return (
                                                    <Link href={menuUrl}>{item.name} </Link>
                                                );
                                            })()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="contact-us">
                                <h4 className="title">Contact Us</h4>
                                <ul className="list-inline contact-info">
                                    {settings && settings?.store_phone && (
                                        <li><i className="fa-solid fa-phone"></i> <Link href={`tel:${settings?.store_phone}`}><span>{settings && settings?.store_phone}</span></Link> </li>
                                    )}
                                    {settings && settings?.store_email && (
                                        <li><i className="fa-solid fa-envelope"></i> <Link href={`mailto:${settings?.store_email}`}><span>{settings && settings?.store_email}</span></Link> </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <ul className="list-inline social-links">
                                {settings && settings?.storefront_facebook_link && (
                                    <li>
                                        <Link href={settings?.storefront_facebook_link}><i className="fa-brands fa-facebook"></i></Link>
                                    </li>
                                )}
                                {settings && settings?.storefront_twitter_link && (
                                    <li>
                                        <Link href={settings?.storefront_twitter_link}><i className="fab fa-twitter"></i></Link>
                                    </li>
                                )}
                                {settings && settings?.storefront_instagram_link && (
                                    <li>
                                        <Link href={settings?.storefront_instagram_link}><i className="fab fa-instagram"></i></Link>
                                    </li>
                                )}
                                {settings && settings?.storefront_youtube_link && (
                                    <li>
                                        <Link href={settings?.storefront_youtube_link}><i className="fab fa-youtube"></i></Link>
                                    </li>
                                )}
                            </ul>
                            <div className="footer-text">
                                {settings && settings?.storefront_copyright_text && (
                                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(settings?.storefront_copyright_text) }}></p>
                                )}
                            </div>
                            <div id="phx-signature">
                                <Link href="https://www.phxsolution.com" target="_blank" className="phxsolution">Website By: <span></span> PHXSolution</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer