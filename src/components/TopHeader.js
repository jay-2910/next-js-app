import { getAllSettings } from '@/lib/prisma';
import Link from 'next/link';
import getSettingValue from "@/utils/helper";

const TopHeader = async () => {
    const settings = await getAllSettings();    
    return (
        <>
            <div className='top-header-wrap'>
                <div className='container'>
                    <div className='top-header-main'>
                        <div className='top-left'>
                            <span>{settings ? getSettingValue(settings, 'storefront_welcome_text', 'en') : null}</span>
                        </div>
                        <div className='top-right'>
                            <ul className="social-links">
                                 {settings && (
                                    <li>
                                        <Link href={ settings ? getSettingValue(settings, 'storefront_facebook_link') : null}><i className="fa-brands fa-facebook"></i></Link>
                                    </li>
                                )}
                                {settings && (
                                    <li>
                                        <Link href={ settings ? getSettingValue(settings, 'storefront_twitter_link') : null}><i className="fab fa-twitter"></i></Link>
                                    </li>
                                )}
                                {settings && (
                                    <li>
                                        <Link href={ settings ? getSettingValue(settings, 'storefront_instagram_link') : null}><i className="fab fa-instagram"></i></Link>
                                    </li>
                                )}
                                {settings && (
                                    <li>
                                        <Link href={ settings ? getSettingValue(settings, 'storefront_youtube_link') : null}><i className="fab fa-youtube"></i></Link>
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