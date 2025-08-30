'use client';

import React, { useState, useEffect } from 'react';
import { 
  extractElementorData, 
  extractElementorDesignData, 
  parseElementorLayout, 
  getContainerOrder,
  HeaderData,
  ExtractedElementorData,
  DesignData,
  LayoutStyles
} from '../../utils/elementorParser';
import ElementorNavigation from '../../components/ElementorNavigation';

export default function TestHeader() {
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  // Fetch header data from WordPress REST API
  const fetchHeaderData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8081/wp-json/au-lac/v1/elementor/82');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: HeaderData = await response.json();
      setHeaderData(data);
      setLastFetch(new Date());
      console.log('✅ Header data fetched successfully:', data);
      
    } catch (err: any) {
      console.error('❌ Error fetching header data:', err);
      setError(err.message || 'Failed to fetch header data');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchHeaderData();
  }, []);

  // Debug logging
  useEffect(() => {
    console.log('🔍 TestHeader component rendered with:', { headerData, isLoading, error });
  }, [headerData, isLoading, error]);

  // Build the header component dynamically from Elementor data
  const buildHeaderComponent = (headerData: HeaderData) => {
    console.log('🔍 buildHeaderComponent called with:', headerData);
    
    const extractedData = extractElementorData(headerData);
    console.log('🔍 extractedData:', extractedData);
    
    if (!extractedData) {
      console.log('❌ No extracted data, returning null');
      return null;
    }
    
    const designData = extractElementorDesignData(extractedData.elementorData);
    console.log('🔍 designData:', designData);
    
    const layoutStyles = parseElementorLayout(extractedData.elementorData);
    console.log('🔍 layoutStyles:', layoutStyles);
    
    // Function to render container based on Elementor layout
    const renderContainer = (containerId: string, containerData: any) => {
      const { elementType, settings, elementStyles, depth } = containerData;
      
      if (elementType !== 'container') return null;
      
      // Extract actual Elementor design data for this container
      const containerDesign = designData.containers[containerId];
      
      // Build dynamic styles from Elementor data
      const containerStyle: any = {
        display: 'flex',
        flexDirection: settings.flex_direction || 'row',
        width: settings.width ? `${settings.width.size}${settings.width.unit || '%'}` : 'auto',
        gap: settings.flex_gap && settings.flex_gap.size > 0 ? `${settings.flex_gap.size}${settings.flex_gap.unit || 'px'}` : '0px',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        backgroundColor: '#f9f9f9',
        margin: '8px',
        minHeight: '60px',
        alignItems: 'center',
        justifyContent: settings.flex_direction === 'row-reverse' ? 'flex-end' : 'flex-start',
        position: 'relative'
      };
      
      // Apply Elementor design data if available
      if (containerDesign && containerDesign.design) {
        const design = containerDesign.design;
        
        // Apply background color
        if (design.background.color) {
          containerStyle.backgroundColor = design.background.color;
        }
        
        // Apply border properties
        if (design.border.type && design.border.type !== 'none') {
          containerStyle.border = `${design.border.width || '1px'} ${design.border.type} ${design.border.color || '#ddd'}`;
        }
        
        // Apply border radius
        if (design.border.radius) {
          containerStyle.borderRadius = design.border.radius;
        }
        
        // Apply positioning
        if (design.advanced.position) {
          containerStyle.position = design.advanced.position;
        }
        
        if (design.advanced.zIndex) {
          containerStyle.zIndex = design.advanced.zIndex;
        }
        
        // Apply spacing
        if (design.spacing.padding) {
          containerStyle.padding = design.spacing.padding;
        }
        
        if (design.spacing.margin) {
          containerStyle.margin = design.spacing.margin;
        }
      }
      
      // Parse the actual Elementor data to find child elements
      let childElements: any[] = [];
      try {
        const elementorData = extractedData.elementorData;
        
        // Find this container in the Elementor data using recursion
        const findContainer = (elements: any[], targetId: string, currentPath: string = 'root'): any => {
          for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const elementPath = `${currentPath}[${i}]`;
            
            if (element.id === targetId) {
              console.log(`🔍 Found container ${targetId} at path: ${elementPath}`);
              return element;
            }
            
            // Recursive case: search in nested elements
            if (element.elements && Array.isArray(element.elements)) {
              const found = findContainer(element.elements, targetId, elementPath);
              if (found) return found;
            }
          }
          return null;
        };
        
        const container = findContainer(elementorData, containerId);
        console.log(`🔍 Container ${containerId} found:`, container);
        
        if (container && container.elements) {
          console.log(`🔍 Container ${containerId} has ${container.elements.length} child elements:`, container.elements);
          childElements = container.elements.map((child: any) => {
            const childData = {
              id: child.id,
              type: child.elType,
              widgetType: child.widgetType,
              settings: child.settings || {},
              elementStyles: child.elementStyles || {},
              // Store the original child element for deeper inspection
              originalElement: child
            };
            console.log(`🔍 Child element:`, childData);
            return childData;
          });
        } else {
          console.warn(`⚠️ Container ${containerId} has no child elements or container not found`);
          // Try alternative search method - look for elements with this container as parent
          const findChildrenByParent = (elements: any[], parentId: string): any[] => {
            const children: any[] = [];
            elements.forEach((element, index) => {
              if (element.parent_id === parentId || element.parent === parentId) {
                console.log(`🔍 Found child by parent relationship:`, element);
                children.push({
                  id: element.id,
                  type: element.elType,
                  widgetType: element.widgetType,
                  settings: element.settings || {},
                  elementStyles: element.elementStyles || {},
                  originalElement: element
                });
              }
              // Recursive search
              if (element.elements && Array.isArray(element.elements)) {
                children.push(...findChildrenByParent(element.elements, parentId));
              }
            });
            return children;
          };
          
          childElements = findChildrenByParent(elementorData, containerId);
          console.log(`🔍 Alternative search found ${childElements.length} children for container ${containerId}`);
        }
      } catch (error) {
        console.error('Error parsing Elementor data for children:', error);
      }
      
      // Recursive function to render child elements
      const renderChildElement = (child: any, depth: number = 0) => {
        const indentStyle = { marginLeft: `${depth * 20}px` };
        
        if (child.type === 'widget') {
          // Extract widget design data
          const widgetDesign = designData.widgets[child.id];
          
          if (child.widgetType === 'theme-site-logo') {
            // Apply Elementor logo styling
            const logoStyle: any = {
              ...indentStyle, 
              padding: '8px', 
              backgroundColor: '#e3f2fd', 
              borderRadius: '4px', 
              minWidth: '120px'
            };
            
            if (widgetDesign && widgetDesign.design) {
              if (widgetDesign.design.background.color) {
                logoStyle.backgroundColor = widgetDesign.design.background.color;
              }
              if (widgetDesign.design.border.color) {
                logoStyle.backgroundColor = widgetDesign.design.border.color;
              }
            }
            
            return (
              <div key={child.id} style={logoStyle}>
                <strong>Logo Widget</strong>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1976d2' }}>Site Logo Placeholder</div>
              </div>
            );
          }
          
          if (child.widgetType === 'mega-menu' || child.widgetType === 'nav-menu') {
            // Enhanced mega-menu rendering with Elementor design data
            const menuItems = child.settings.menu_items || [];
            
            // Extract menu design data
            const menuStyle: any = {
              ...indentStyle, 
              padding: '8px', 
              backgroundColor: '#e8f5e8', 
              borderRadius: '4px', 
              flex: 1
            };
            
            if (widgetDesign && widgetDesign.design) {
              if (widgetDesign.design.background.color) {
                menuStyle.backgroundColor = widgetDesign.design.background.color;
              }
              if (widgetDesign.design.border.color) {
                menuStyle.border = `1px solid ${widgetDesign.design.border.color}`;
              }
            }
            
            return (
              <div key={child.id} style={menuStyle}>
                <strong>Navigation Menu</strong>
                <div style={{ display: 'flex', gap: '15px', marginTop: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {menuItems.map((item: any, index: number) => {
                    const hasDropdown = item.item_dropdown_content === 'yes';
                    const isHotelItem = item.item_title?.toLowerCase().includes('hotel');
                    
                    // Build dynamic menu item styles from Elementor data
                    const menuItemStyle: any = {
                      padding: '8px 16px',
                      backgroundColor: 'transparent',
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      marginBottom: '5px',
                      border: '1px solid transparent',
                      transition: 'all 0.3s ease'
                    };
                    
                    // Apply Elementor text color if available
                    if (widgetDesign && widgetDesign.design && widgetDesign.design.typography.color) {
                      menuItemStyle.color = widgetDesign.design.typography.color;
                    }
                    
                    // Apply hover color if available
                    if (widgetDesign && widgetDesign.design && widgetDesign.design.hover.color) {
                      // Note: :hover not supported in inline styles - will be handled by CSS later
                      console.log('Hover color available:', widgetDesign.design.hover.color);
                    }
                    
                    return (
                      <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={menuItemStyle}>
                          {item.item_title} {isHotelItem && '🏨'}
                        </span>
                        
                        {/* Special handling for Hotels menu item with nested containers */}
                        {hasDropdown && (
                          <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '3px',
                            padding: '8px',
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            borderRadius: '4px',
                            border: '1px solid rgba(76, 175, 80, 0.3)',
                            minWidth: '150px'
                          }}>
                            <div style={{ fontSize: '10px', color: '#666', marginBottom: '5px', textAlign: 'center' }}>
                              {isHotelItem ? 'Hotel Options:' : 'Dropdown Options:'}
                            </div>
                            
                            {/* Enhanced nested content rendering based on our structure analysis */}
                            {(() => {
                              try {
                                // Get the nested container for this menu item using the correct path
                                const nestedContainer = child.elements?.[index];
                                
                                if (nestedContainer && nestedContainer.elements) {
                                  // Look for nested mega-menu widgets within this container
                                  const nestedMegaMenu = nestedContainer.elements.find((el: any) => 
                                    el.elType === 'widget' && el.widgetType === 'mega-menu'
                                  );
                                  
                                  if (nestedMegaMenu && nestedMegaMenu.settings?.menu_items) {
                                    return nestedMegaMenu.settings.menu_items.map((nestedItem: any, nestedIndex: number) => (
                                      <div key={nestedIndex} style={{ 
                                        padding: '6px 12px', 
                                        backgroundColor: 'rgba(255,255,255,0.05)', 
                                        color: 'white', 
                                        borderRadius: '3px', 
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        marginBottom: '4px',
                                        transition: 'all 0.2s ease'
                                      }}>
                                        {nestedItem.item_title}
                                      </div>
                                    ));
                                  }
                                }
                                
                                // Fallback: search in broader Elementor data for hotel content
                                if (isHotelItem) {
                                  // For now, show a simple message - we can enhance this later
                                  return (
                                    <div style={{ 
                                      padding: '4px 8px', 
                                      backgroundColor: 'rgba(255,255,255,0.05)', 
                                      color: 'white', 
                                      borderRadius: '3px', 
                                      fontSize: '10px',
                                      textAlign: 'center'
                                    }}>
                                      Hotel options will be loaded here
                                    </div>
                                  );
                                }
                                
                                return (
                                  <div style={{ 
                                    padding: '4px 8px', 
                                    backgroundColor: '#ffcdd2', 
                                    color: '#c62828', 
                                    borderRadius: '3px', 
                                    fontSize: '10px',
                                    textAlign: 'center'
                                  }}>
                                    {isHotelItem ? 'No hotel options found' : 'No nested menu found'}
                                  </div>
                                );
                              } catch (error) {
                                console.error('Error processing nested menu:', error);
                                return (
                                  <div style={{ 
                                    padding: '4px 8px', 
                                    backgroundColor: '#ffcdd2', 
                                    color: '#c62828', 
                                    borderRadius: '3px', 
                                    fontSize: '10px',
                                    textAlign: 'center'
                                  }}>
                                    Error loading nested menu
                                  </div>
                                );
                              }
                            })()}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
          
          if (child.widgetType === 'search') {
            // Apply Elementor search widget styling
            const searchStyle: any = {
              ...indentStyle, 
              padding: '8px', 
              backgroundColor: '#fff3e0', 
              borderRadius: '4px', 
              minWidth: '200px'
            };
            
            if (widgetDesign && widgetDesign.design) {
              if (widgetDesign.design.background.color) {
                searchStyle.backgroundColor = widgetDesign.design.background.color;
              }
              if (widgetDesign.design.border.color) {
                searchStyle.border = `1px solid ${widgetDesign.design.border.color}`;
              }
            }
            
            return (
              <div key={child.id} style={searchStyle}>
                <strong>Search Widget</strong>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <input 
                    type="search" 
                    placeholder={child.settings.search_input_placeholder_text || 'Search...'}
                    style={{ 
                      padding: '8px 12px', 
                      fontSize: '13px', 
                      border: '1px solid rgba(255,255,255,0.3)', 
                      borderRadius: '4px', 
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      minWidth: '150px'
                    }}
                  />
                  <button style={{ 
                    padding: '8px 16px', 
                    fontSize: '13px', 
                    backgroundColor: 'rgba(255,255,255,0.2)', 
                    color: 'white', 
                    border: '1px solid rgba(255,255,255,0.3)', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                    {child.settings.submit_button_text || 'Search'}
                  </button>
                </div>
              </div>
            );
          }
          
          if (child.widgetType === 'button') {
            // Apply Elementor button widget styling
            const buttonStyle: any = {
              ...indentStyle, 
              padding: '8px', 
              backgroundColor: '#f3e5f5', 
              borderRadius: '4px'
            };
            
            if (widgetDesign && widgetDesign.design) {
              if (widgetDesign.design.background.color) {
                buttonStyle.backgroundColor = widgetDesign.design.background.color;
              }
              if (widgetDesign.design.border.color) {
                buttonStyle.border = `1px solid ${widgetDesign.design.border.color}`;
              }
            }
            
            return (
              <div key={child.id} style={buttonStyle}>
                <strong>Button Widget</strong>
                <div style={{ 
                  padding: '6px 16px', 
                  backgroundColor: '#9c27b0', 
                  color: 'white', 
                  borderRadius: '4px', 
                  fontSize: '13px', 
                  display: 'inline-block', 
                  cursor: 'pointer' 
                }}>
                  {child.settings.text || 'Click here'}
                </div>
              </div>
            );
          }
          
          return (
            <div key={child.id} style={{ ...indentStyle, padding: '5px', backgroundColor: '#f5f5f5', borderRadius: '2px' }}>
              <strong>{child.widgetType || 'Unknown'} Widget</strong>
            </div>
          );
        }
        
        if (child.type === 'container') {
          // Recursive case: render nested container
          const nestedContainerData = layoutStyles[child.id];
          if (nestedContainerData) {
            return (
              <div key={child.id} style={{ ...indentStyle, flex: 1 }}>
                {renderContainer(child.id, nestedContainerData)}
              </div>
            );
          } else {
            return (
              <div key={child.id} style={{ ...indentStyle, padding: '5px', backgroundColor: '#f0f0f0', borderRadius: '2px', border: '1px solid #ccc' }}>
                <strong>Nested Container: {child.id}</strong>
                <div>Type: {child.settings?.flex_direction || 'unknown'}</div>
                <div style={{ color: '#666', fontSize: '11px' }}>No layout data available</div>
              </div>
            );
          }
        }
        
        return null;
      };
      
      return (
        <div key={containerId} style={containerStyle}>
          <div style={{ fontSize: '10px', color: '#666', marginBottom: '8px', position: 'absolute', top: '2px', left: '8px' }}>
            Container {containerId}: {settings.flex_direction} | Width: {settings.width ? `${settings.width.size}${settings.width.unit}` : 'auto'} | Depth: {depth}
          </div>
          
          {/* Debug info for container */}
          <div style={{ fontSize: '9px', color: '#999', marginBottom: '5px', textAlign: 'center' }}>
            Child Elements: {childElements.length} | Container Design: {containerDesign ? '✅' : '❌'}
          </div>
          
          {/* Render child elements with proper nesting */}
          {childElements.length > 0 ? (
            childElements.map((child: any) => renderChildElement(child, depth + 1))
          ) : (
            <div style={{ 
              padding: '10px', 
              backgroundColor: '#ffebee', 
              color: '#c62828', 
              borderRadius: '4px', 
              fontSize: '11px',
              textAlign: 'center',
              border: '1px solid #ffcdd2'
            }}>
              ⚠️ No child elements found for container {containerId}
              <br />
              <small>Check console for debugging info</small>
            </div>
          )}
        </div>
      );
    };
    
    // Get the actual Elementor layout structure to determine container order
    const containerOrder = getContainerOrder(extractedData.elementorData);
    
    return (
      <div>
        <h3 style={{ margin: '20px 0 10px 0', color: '#333' }}>Dynamic Elementor Header Layout:</h3>
        
        {/* Debug Section for Elementor Design Data */}
        <div style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          backgroundColor: '#e8f5e8', 
          borderRadius: '6px',
          border: '1px solid #4caf50'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>🎨 Debug: Elementor Design Data Extracted</h4>
          <div style={{ fontSize: '12px', marginBottom: '10px' }}>
            <strong>Containers:</strong> {Object.keys(designData.containers).length} | 
            <strong>Widgets:</strong> {Object.keys(designData.widgets).length}
          </div>
          <div style={{ fontSize: '11px', color: '#666' }}>
            Check the browser console for detailed design data including colors, borders, positioning, and typography.
          </div>
        </div>
        
        {/* Raw Elementor Data Structure Debug */}
        <div style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          backgroundColor: '#fff3e0', 
          borderRadius: '6px',
          border: '1px solid #ff9800'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>🔍 Debug: Raw Elementor Data Structure</h4>
          <div style={{ fontSize: '12px', marginBottom: '10px' }}>
            <strong>Top-level elements:</strong> {extractedData.elementorData?.length || 0}
          </div>
          <details style={{ fontSize: '11px' }}>
            <summary style={{ cursor: 'pointer', color: '#f57c00', fontWeight: 'bold' }}>
              Click to view raw Elementor data structure
            </summary>
            <pre style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '10px', 
              borderRadius: '4px', 
              fontSize: '10px', 
              overflow: 'auto',
              maxHeight: '200px',
              border: '1px solid #ddd'
            }}>
              {JSON.stringify(extractedData.elementorData, null, 2)}
            </pre>
          </details>
        </div>
        
        {/* Render the actual Elementor header layout */}
        <div style={{ 
          border: '2px solid #007cba', 
          padding: '20px', 
          margin: '20px 0',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          position: 'relative',
          minHeight: '120px'
        }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#007cba' }}>Elementor Header Layout (Full Structure):</h4>
          
          {/* Main containers in Elementor's actual order */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px',
            position: 'relative',
            minHeight: '80px'
          }}>
            {containerOrder.map(containerId => {
              // Create a simple container data structure for rendering
              const containerData = {
                elementType: 'container',
                settings: { flex_direction: 'row' },
                elementStyles: {},
                depth: 0
              };
              return renderContainer(containerId, containerData);
            })}
          </div>
        </div>
        
        {/* Design Data Display */}
        <div style={{ 
          border: '2px solid #ff9800', 
          padding: '20px', 
          margin: '20px 0',
          backgroundColor: '#fff3e0',
          borderRadius: '8px'
        }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#f57c00' }}>Elementor Design Data:</h4>
          
          {Object.entries(designData.containers).map(([containerId, containerData]: [string, any]) => (
            <div key={containerId} style={{ 
              marginBottom: '15px', 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}>
              <h5>Container: {containerId}</h5>
              <div style={{ fontSize: '12px', color: '#666' }}>
                <div>Background Color: {containerData.design.background.color || 'None'}</div>
                <div>Border Type: {containerData.design.border.type || 'None'}</div>
                <div>Border Radius: {containerData.design.border.radius || 'None'}</div>
                <div>Position: {containerData.design.advanced.position || 'None'}</div>
                <div>Sticky: {containerData.design.advanced.sticky || 'None'}</div>
              </div>
            </div>
          ))}
          
          {Object.entries(designData.widgets).map(([widgetId, widgetData]: [string, any]) => (
            <div key={widgetId} style={{ 
              marginBottom: '15px', 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}>
              <h5>Widget: {widgetData.widgetType}</h5>
              <div style={{ fontSize: '12px', color: '#666' }}>
                <div>Text Color: {widgetData.design.typography.color || 'None'}</div>
                <div>Background Color: {widgetData.design.background.color || 'None'}</div>
                <div>Hover Color: {widgetData.design.hover.color || 'None'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>Loading header data...</div>
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

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={fetchHeaderData}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007cba', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          🔄 Refresh Header Data
        </button>
        {lastFetch && (
          <span style={{ fontSize: '12px', color: '#666' }}>
            Last updated: {lastFetch.toLocaleTimeString()}
          </span>
        )}
      </div>
      
      {/* Elementor Navigation Component */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#f0f4ff', 
        borderRadius: '8px',
        border: '2px solid #4338ca'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#4338ca' }}>🧭 Clean Navigation Component (Using Parsed Layout):</h3>
        <ElementorNavigation headerPostId={82} />
      </div>
      
      {/* Full Layout Structure */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#f0f8ff', 
        borderRadius: '8px',
        border: '2px solid #007cba'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#007cba' }}>🔧 Full Layout Structure (Debug & Analysis):</h3>
        {buildHeaderComponent(headerData)}
      </div>
    </div>
  );
}
