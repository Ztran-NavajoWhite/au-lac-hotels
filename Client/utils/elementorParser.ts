// Elementor Parser Utility
// Handles RAW → EXTRACT → PARSE → LAYOUT flow for Elementor data

export interface HeaderData {
  id: number;
  content: { 
    rendered: string;
    raw: string;
  };
  elementor_data: string;
  elementor_css: string;
  elementor_css_urls: string[];
  page_settings: any;
  site_url: string;
  theme_url: string;
}

export interface ExtractedElementorData {
  elementorData: any[];
  elementorCSS: string;
  elementorPageSettings: any;
}

export interface DesignData {
  containers: { [key: string]: any };
  widgets: { [key: string]: any };
}

export interface LayoutStyles {
  [key: string]: any;
}

// Helper function to extract values from Elementor objects
const extractValue = (value: any): string | null => {
  if (value === null || value === undefined) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  if (typeof value === 'object' && value.size !== undefined) {
    return `${value.size}${value.unit || 'px'}`;
  }
  if (typeof value === 'object' && value.value !== undefined) {
    return value.value;
  }
  return JSON.stringify(value);
};

// Step 1: EXTRACT - Parse Elementor raw data
export const extractElementorData = (data: HeaderData): ExtractedElementorData | null => {
  console.log('🚀 extractElementorData function called!');
  
  try {
    const elementorData = JSON.parse(data.elementor_data);
    const elementorCSS = data.elementor_css;
    const elementorPageSettings = data.page_settings || {};
    
    console.log('✅ Elementor data extracted successfully');
    console.log('📊 Elementor data length:', elementorData?.length || 0);
    
    return {
      elementorData,
      elementorCSS,
      elementorPageSettings
    };
  } catch (error) {
    console.error('❌ Error extracting Elementor data:', error);
    return null;
  }
};

// Step 2: PARSE - Extract design data from Elementor structure
export const extractElementorDesignData = (elementorData: any[]): DesignData => {
  const designData: DesignData = {
    containers: {},
    widgets: {}
  };
  
  const extractDesignRecursively = (elements: any[], path: string = 'root', depth: number = 0) => {
    elements.forEach((element, index) => {
      const currentPath = path + '[' + index + ']';
      const elementId = element.id;
      
      // Extract container design data
      if (element.elType === 'container') {
        designData.containers[elementId] = {
          id: elementId,
          path: currentPath,
          depth: depth,
          settings: element.settings || {},
          design: {
            background: {
              color: extractValue(element.settings?.background_color),
              image: element.settings?.background_image?.url || null
            },
            border: {
              type: element.settings?.border_type || null,
              width: extractValue(element.settings?.border_width),
              color: extractValue(element.settings?.border_color),
              radius: extractValue(element.settings?.border_radius)
            },
            layout: {
              flexDirection: element.settings?.flex_direction || null,
              justifyContent: element.settings?.justify_content || null,
              alignItems: element.settings?.align_items || null,
              gap: extractValue(element.settings?.flex_gap)
            },
            spacing: {
              padding: extractValue(element.settings?.padding),
              margin: extractValue(element.settings?.margin)
            },
            advanced: {
              position: element.settings?.position || null,
              zIndex: extractValue(element.settings?.z_index),
              sticky: element.settings?.sticky || null,
              top: extractValue(element.settings?.top)
            }
          }
        };
      }
      
      // Extract widget design data
      if (element.elType === 'widget') {
        designData.widgets[elementId] = {
          id: elementId,
          path: currentPath,
          depth: depth,
          widgetType: element.widgetType,
          settings: element.settings || {},
          design: {
            typography: {
              color: extractValue(element.settings?.color),
              fontSize: extractValue(element.settings?.font_size),
              fontWeight: element.settings?.font_weight || null,
              textAlign: element.settings?.text_align || null
            },
            background: {
              color: extractValue(element.settings?.background_color),
              image: element.settings?.background_image?.url || null
            },
            border: {
              type: element.settings?.border_type || null,
              width: extractValue(element.settings?.border_width),
              color: extractValue(element.settings?.border_color),
              radius: extractValue(element.settings?.border_radius)
            },
            spacing: {
              padding: extractValue(element.settings?.padding),
              margin: extractValue(element.settings?.margin)
            },
            hover: {
              color: extractValue(element.settings?.hover_color),
              backgroundColor: extractValue(element.settings?.hover_background_color)
            }
          }
        };
      }
      
      // Recursive case: extract from nested elements
      if (element.elements && Array.isArray(element.elements)) {
        extractDesignRecursively(element.elements, currentPath, depth + 1);
      }
    });
  };
  
  extractDesignRecursively(elementorData);
  console.log('🎨 Elementor Design Data Extracted:', designData);
  return designData;
};

// Step 3: LAYOUT - Parse Elementor layout structure
export const parseElementorLayout = (elementorData: any[]): LayoutStyles => {
  console.log('🔍 parseElementorLayout function exists:', typeof parseElementorLayout);
  console.log('🔍 Calling parseElementorLayout now...');
  
  const layoutStyles: LayoutStyles = {};
  
  try {
    const extractLayoutRecursively = (elements: any[], path: string = 'root', depth: number = 0) => {
      elements.forEach((element, index) => {
        const currentPath = path + '[' + index + ']';
        const elementId = element.id;
        
        // Extract layout properties for containers
        if (element.elType === 'container') {
          layoutStyles[elementId] = {
            id: elementId,
            path: currentPath,
            depth: depth,
            elementType: 'container',
            settings: {
              flex_direction: element.settings?.flex_direction || 'row',
              width: element.settings?.width || { size: 'auto', unit: '%' },
              flex_gap: element.settings?.flex_gap || { size: 0, unit: 'px' },
              justify_content: element.settings?.justify_content || 'flex-start',
              align_items: element.settings?.align_items || 'center'
            },
            elementStyles: element.elementStyles || {}
          };
        }
        
        // Extract layout properties for widgets
        if (element.elType === 'widget') {
          layoutStyles[elementId] = {
            id: elementId,
            path: currentPath,
            depth: depth,
            elementType: 'widget',
            widgetType: element.widgetType,
            settings: element.settings || {},
            elementStyles: element.elementStyles || {}
          };
        }
        
        // Recursive case: extract from nested elements
        if (element.elements && Array.isArray(element.elements)) {
          extractLayoutRecursively(element.elements, currentPath, depth + 1);
        }
      });
    };
    
    extractLayoutRecursively(elementorData);
    console.log('🔍 parseElementorLayout completed successfully');
    console.log('📐 Layout styles extracted:', Object.keys(layoutStyles).length, 'elements');
    
  } catch (error) {
    console.error('❌ Error parsing Elementor layout:', error);
  }
  
  return layoutStyles;
};

// Get container order for proper layout rendering
export const getContainerOrder = (elementorData: any[]): string[] => {
  try {
    const containerOrder: string[] = [];
    
    const extractTopLevelContainers = (elements: any[]) => {
      elements.forEach(element => {
        if (element.elType === 'container') {
          containerOrder.push(element.id);
        }
      });
    };
    
    extractTopLevelContainers(elementorData);
    return containerOrder;
  } catch (error) {
    console.error('Error extracting container order:', error);
    return [];
  }
};
