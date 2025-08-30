'use client';

import React, { useState, useEffect } from 'react';
import { 
  extractElementorData, 
  HeaderData
} from '../utils/elementorParser';
import './ElementorNavigation.advanced.css';

interface ElementorNavigationProps {
  headerPostId: number;
}

const ElementorNavigation: React.FC<ElementorNavigationProps> = ({ headerPostId }) => {
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeaderData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:8081/wp-json/au-lac/v1/elementor/${headerPostId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: HeaderData = await response.json();
      setHeaderData(data);
      
    } catch (err: any) {
      console.error('Error fetching header data:', err);
      setError(err.message || 'Failed to fetch header data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHeaderData();
  }, [headerPostId]);

  const buildNavigation = (headerData: HeaderData) => {
    const extractedData = extractElementorData(headerData);
    if (!extractedData) return null;

    const extractNavigationData = () => {
      const navData = {
        logo: null as any,
        menuItems: [] as any[],
        search: null as any,
        userActions: [] as any[]
      };

      const jsonString = JSON.stringify(extractedData.elementorData).toLowerCase();
      
      // Search for Logo
      if (jsonString.includes('logo') || jsonString.includes('site-logo') || jsonString.includes('theme-site-logo')) {
        navData.logo = { id: 'logo-found', design: null };
      }

      // Search for Menu
      if (jsonString.includes('menu') || jsonString.includes('nav') || jsonString.includes('mega-menu')) {
        const menuElements = extractedData.elementorData.filter(el => {
          const elementString = JSON.stringify(el).toLowerCase();
          return elementString.includes('menu') || elementString.includes('nav') || elementString.includes('item_title');
        });
        
        if (menuElements.length > 0) {
          const menuElement = menuElements[0];
          
          let foundMenuItems = null;
          if (menuElement.settings?.menu_items) {
            foundMenuItems = menuElement.settings.menu_items;
          } else if (menuElement.settings?.menu) {
            foundMenuItems = menuElement.settings.menu;
          } else if (menuElement.settings?.items) {
            foundMenuItems = menuElement.settings.items;
          } else if (menuElement.settings?.menu_list) {
            foundMenuItems = menuElement.settings.menu_list;
          }
          
          if (foundMenuItems) {
            navData.menuItems = foundMenuItems;
          } else {
            // Deep search for mega-menu widgets
            const searchForMegaMenu = (element: any): any[] => {
              let allMenuItems: any[] = [];
              
              if (element.elType === 'widget' && element.widgetType === 'mega-menu' && element.settings?.menu_items) {
                allMenuItems = allMenuItems.concat(element.settings.menu_items);
              }
              
              if (element.elements && Array.isArray(element.elements)) {
                element.elements.forEach((child: any) => {
                  allMenuItems = allMenuItems.concat(searchForMegaMenu(child));
                });
              }
              
              return allMenuItems;
            };
            
            const deepMenuItems = searchForMegaMenu(menuElement);
            if (deepMenuItems.length > 0) {
              // Filter out specific sub-menu items by name
              const filteredMenuItems = deepMenuItems.filter(item => {
                const itemTitle = (item.item_title || item.title || item.text || '').toLowerCase();
                const isSubMenuItem = itemTitle.includes('au lac legend hotel') || 
                                    itemTitle.includes('au lac charner hotel');
                return !isSubMenuItem;
              });
              
              navData.menuItems = filteredMenuItems;
            }
          }
        }
      }

      // Search for Search
      if (jsonString.includes('search') || jsonString.includes('input') || jsonString.includes('placeholder')) {
        navData.search = {
          id: 'search-found',
          settings: { search_input_placeholder_text: 'Search hotels, rooms...', submit_button_text: 'Search' },
          design: null
        };
      }

      // Search for Buttons
      if (jsonString.includes('button') || jsonString.includes('login') || jsonString.includes('register')) {
        navData.userActions = [
          { id: 'login-btn', text: 'Login', design: null },
          { id: 'register-btn', text: 'Register', design: null }
        ];
      }

      return navData;
    };

    const navigationData = extractNavigationData();

    return (
      <header className="hero-header">
        {/* Hero Image Background */}
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        
        {/* Top Navigation Bar - Level 1 Container */}
        <div className="top-navigation-advanced">
            {/* Left side - Unified Sign in / Register button */}
            {navigationData.userActions.length > 0 && (
              <div className="top-left">
                <button className="signin-register-button">
                  <span className="button-text">Sign in / Register</span>
                  <span className="button-icon">{'>'}</span>
                </button>
                <button className="language-button">
                <svg className="flag-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <defs>
                    <clipPath id="circleClip">
                      <circle cx="10" cy="10" r="9"/>
                    </clipPath>
                  </defs>
                  <circle cx="10" cy="10" r="9" fill="#B22234"/>
                  <g clipPath="url(#circleClip)">
                    <rect x="1" y="1" width="18" height="18" fill="#B22234"/>
                    <rect x="1" y="1" width="18" height="1.2" fill="white"/>
                    <rect x="1" y="3.2" width="18" height="1.2" fill="white"/>
                    <rect x="1" y="5.4" width="18" height="1.2" fill="white"/>
                    <rect x="1" y="7.6" width="18" height="1.2" fill="white"/>
                    <rect x="1" y="9.8" width="18" height="1.2" fill="white"/>
                    <rect x="1" y="12" width="18" height="1.2" fill="white"/>
                    <rect x="1" y="14.2" width="18" height="1.2" fill="white"/>
                    <rect x="1" y="16.4" width="18" height="1.2" fill="white"/>
                    <rect x="1" y="1" width="7" height="9" fill="#3C3B6E"/>
                    <circle cx="4" cy="3" r="0.4" fill="white"/>
                    <circle cx="4" cy="5" r="0.4" fill="white"/>
                    <circle cx="4" cy="7" r="0.4" fill="white"/>
                    <circle cx="6" cy="4" r="0.4" fill="white"/>
                    <circle cx="6" cy="6" r="0.4" fill="white"/>
                    <circle cx="8" cy="5" r="0.4" fill="white"/>
                  </g>
                </svg>
                <span className="language-text">English</span>
                <svg className="dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>
                
              </div>
            )}
            
            {/* Right side - Search widget and Language selector */}
            <div className="right-side-controls">
              {navigationData.search && (
                <div className="search-advanced">
                  <button className="search-button-advanced">
                    <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                    <a href="/search" className="search-text">Search</a>
                  </button>
                </div>
              )}
              
              {/* Reserve Button */}
              <button className="reserve-button">
                  <span className="button-text">Reserve</span>
              </button>
            </div>
          </div>

        {/* Main Navigation Bar - Level 2 Container */}
        <div className="main-navigation-advanced">
  
            
            {/* Left side - Navigation Menu (40%) */}
            {navigationData.menuItems.length > 0 && (
              <nav className="menu-advanced menu-left-advanced">
                {navigationData.menuItems.slice(0, Math.ceil(navigationData.menuItems.length / 2)).map((item: any, index: number) => {
                  const hasDropdown = item.item_dropdown_content === 'yes';
                  const isHotelItem = item.item_title?.toLowerCase().includes('hotel');
                  
                  return (
                    <div 
                      key={index} 
                      className={`menu-item-advanced ${hasDropdown ? 'has-dropdown' : ''}`}
                    >
                      <span className="menu-text">{item.item_title}</span>
                      
                      {/* Dropdown for Hotels */}
                      {hasDropdown && isHotelItem && (
                        <div className="dropdown-advanced">
                          <div className="dropdown-item-advanced">Au Lac Legend Hotel</div>
                          <div className="dropdown-item-advanced">Au Lac Charner Hotel</div>
                        </div>
                      )}
                      
                      {/* Dropdown for other menu items */}
                      {hasDropdown && !isHotelItem && (
                        <div className="dropdown-advanced">
                          <div className="dropdown-item-advanced">Option 1</div>
                          <div className="dropdown-item-advanced">Option 2</div>
                          <div className="dropdown-item-advanced">Option 3</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            )}

            {/* Center - Logo (20%) */}
            {navigationData.logo && (
              <div className="logo-advanced">
                <div className="logo-icon-advanced">
                </div>
              </div>
            )}

            {/* Right side - Navigation Menu (40%) */}
            {navigationData.menuItems.length > Math.ceil(navigationData.menuItems.length / 2) && (
              <nav className="menu-advanced menu-right-advanced">
                {navigationData.menuItems.slice(Math.ceil(navigationData.menuItems.length / 2)).map((item: any, index: number) => {
                  const hasDropdown = item.item_dropdown_content === 'yes';
                  const isHotelItem = item.item_title?.toLowerCase().includes('hotel');
                  
                  return (
                    <div 
                      key={index + Math.ceil(navigationData.menuItems.length / 2)} 
                      className={`menu-item-advanced ${hasDropdown ? 'has-dropdown' : ''}`}
                    >
                      <span className="menu-text">{item.item_title}</span>
                      
                      {/* Dropdown for Hotels */}
                      {hasDropdown && isHotelItem && (
                        <div className="dropdown-advanced">
                          <div className="dropdown-item-advanced">Au Lac Legend Hotel</div>
                          <div className="dropdown-item-advanced">Au Lac Charner Hotel</div>
                        </div>
                      )}
                      
                      {/* Dropdown for other menu items */}
                      {hasDropdown && !isHotelItem && (
                        <div className="dropdown-advanced">
                          <div className="dropdown-item-advanced">Option 1</div>
                          <div className="dropdown-item-advanced">Option 2</div>
                          <div className="dropdown-item-advanced">Option 3</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            )}
        </div>
      </header>
    );
  };

  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>Loading navigation...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <div>Error: {error}</div>
        <button 
          onClick={fetchHeaderData}
          style={{ 
            marginTop: '10px', 
            padding: '8px 16px', 
            backgroundColor: '#007cba', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!headerData) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>No header data available</div>
        <button 
          onClick={fetchHeaderData}
          style={{ 
            marginTop: '10px', 
            padding: '8px 16px', 
            backgroundColor: '#007cba', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Load Header
        </button>
      </div>
    );
  }

  return buildNavigation(headerData);
};

export default ElementorNavigation;

