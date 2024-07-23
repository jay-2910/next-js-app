"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getMenu, getPages, getSettings } from "@/action/backendApi";

const Header = () => {
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

  const handleNavCollapse = () => {
    const navbar = document.getElementById("navbarSupportedContent");
    if (navbar) {
      navbar.classList.remove("show");
    }
  };

  return (
    <>
      <div className='header-wrap'>
        <nav className={`navbar navbar-expand-lg`}>
          <div className="container">
            <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
              <div className="sidebar-menu-icon"><span></span> <span></span> <span></span></div>
            </button>
            <Link className="navbar-brand" href={'/'}>
              {settings ? (
                <img src={settings.logo_path} alt="logo" />
              ) : (
                <Skeleton width={266} height={60} />
              )}
            </Link>

            <div className={`collapse navbar-collapse justify-content-end`} id="navbarSupportedContent">
              <button type="button" className="btn-close mobile-close-btn"></button>
              <ul className="navbar-nav">
                {isLoading ? (
                  <>
                    <li className="nav-item">
                      <Skeleton width={100} height={20} />
                    </li>
                    <li className="nav-item">
                      <Skeleton width={100} height={20} />
                    </li>
                    <li className="nav-item">
                      <Skeleton width={100} height={20} />
                    </li>
                  </>
                ) : (
                  menuItems?.topmenu?.map(item => (
                    <li className="nav-item" key={item.id}>
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
                          <Link className="nav-link" href={menuUrl} onClick={handleNavCollapse}>
                            {item.name}
                          </Link>
                        );
                      })()}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
