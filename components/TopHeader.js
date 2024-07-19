import { getAllSettings } from '@/lib/prisma';
import Link from 'next/link';
import "../src/app/custom.css";

const TopHeader = async () => {
    const settings = await getAllSettings();    
    return (
        <>
            <div className='top-header-wrap'>
                <div className='container'>
                    <div className='top-header-main'>
                        <div className='top-left'>
                            {settings && settings.storefront_welcome_text && (
                                <span>{settings.storefront_welcome_text}</span>
                            )}
                        </div>
                        <div className='top-right'>
                            <ul className="social-links">
                                {settings && settings.storefront_facebook_link && (
                                    <li>
                                        <Link to={settings.storefront_facebook_link}><i className="fa-brands fa-facebook"></i></Link>
                                    </li>
                                )}
                                {settings && settings.storefront_twitter_link && (
                                    <li>
                                        <Link to={settings.storefront_twitter_link}><i className="fab fa-twitter"></i></Link>
                                    </li>
                                )}
                                {settings && settings.storefront_instagram_link && (
                                    <li>
                                        <Link to={settings.storefront_instagram_link}><i className="fab fa-instagram"></i></Link>
                                    </li>
                                )}
                                {settings && settings.storefront_youtube_link && (
                                    <li>
                                        <Link to={settings.storefront_youtube_link}><i className="fab fa-youtube"></i></Link>
                                    </li>
                                )}
                            </ul>
                            <div className='login-data'>
                                <Link href="/login" className='top-login'> Login / Register </Link>
                                {/* {!accessToken ? (
                                ) : (
                                    <>
                                        <Link to="/account" className='top-account'> My Account </Link>
                                        <span onClick={handleLogout} className='top-logout'> Logout </span>
                                    </>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopHeader