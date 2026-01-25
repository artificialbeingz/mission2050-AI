/**
 * Responsive style utilities for inline styles
 * Use with useDeviceType() hook
 */

import { CSSProperties } from "react";

// Common responsive padding values
export const responsivePadding = {
  mobile: "12px 16px",
  tablet: "16px 20px",
  desktop: "20px 24px",
};

// Common responsive font sizes
export const responsiveFontSize = {
  h1: { mobile: "28px", tablet: "36px", desktop: "48px" },
  h2: { mobile: "22px", tablet: "28px", desktop: "32px" },
  h3: { mobile: "18px", tablet: "20px", desktop: "24px" },
  body: { mobile: "14px", tablet: "15px", desktop: "16px" },
  small: { mobile: "12px", tablet: "13px", desktop: "14px" },
};

// Common responsive gap values
export const responsiveGap = {
  small: { mobile: "8px", tablet: "12px", desktop: "16px" },
  medium: { mobile: "16px", tablet: "20px", desktop: "24px" },
  large: { mobile: "24px", tablet: "32px", desktop: "48px" },
};

/**
 * Helper to create responsive grid columns
 */
export const getResponsiveGridColumns = (
  isMobile: boolean,
  isTablet: boolean,
  mobileColumns = 1,
  tabletColumns = 2,
  desktopColumns = 3
): string => {
  if (isMobile) return `repeat(${mobileColumns}, 1fr)`;
  if (isTablet) return `repeat(${tabletColumns}, 1fr)`;
  return `repeat(${desktopColumns}, 1fr)`;
};

/**
 * Helper to merge responsive styles
 */
export const mergeStyles = (...styles: (CSSProperties | undefined)[]): CSSProperties => {
  return styles.reduce<CSSProperties>((acc, style) => {
    if (style) {
      return { ...acc, ...style };
    }
    return acc;
  }, {});
};

/**
 * Get responsive value based on device type
 */
export function getResponsiveValue<T>(
  isMobile: boolean,
  isTablet: boolean,
  values: { mobile: T; tablet: T; desktop: T }
): T {
  if (isMobile) return values.mobile;
  if (isTablet) return values.tablet;
  return values.desktop;
}

/**
 * Common responsive container styles
 */
export const getContainerStyle = (isMobile: boolean): CSSProperties => ({
  maxWidth: "1400px",
  margin: "0 auto",
  padding: isMobile ? "16px" : "24px",
});

/**
 * Common responsive card styles
 */
export const getCardStyle = (isMobile: boolean): CSSProperties => ({
  backgroundColor: "#162032",
  borderRadius: isMobile ? "8px" : "12px",
  border: "1px solid #2A3A4D",
  padding: isMobile ? "16px" : "20px",
});

/**
 * Responsive flex layout - stacks on mobile
 */
export const getFlexLayoutStyle = (
  isMobile: boolean,
  gap: string = "20px"
): CSSProperties => ({
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  gap,
});

/**
 * Responsive two-column layout
 */
export const getTwoColumnStyle = (
  isMobile: boolean,
  leftWidth: string = "300px"
): CSSProperties => ({
  display: isMobile ? "flex" : "grid",
  flexDirection: isMobile ? "column" : undefined,
  gridTemplateColumns: isMobile ? undefined : `${leftWidth} 1fr`,
  gap: "20px",
});

/**
 * Scrollable table wrapper for mobile
 */
export const getTableWrapperStyle = (isMobile: boolean): CSSProperties => ({
  overflowX: isMobile ? "auto" : "visible",
  WebkitOverflowScrolling: "touch",
});
