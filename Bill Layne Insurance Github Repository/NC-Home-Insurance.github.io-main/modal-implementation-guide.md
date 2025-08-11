# Modal Implementation Guide

## Overview
The modal system allows all tool pages to open within the main page, keeping users on your site with a consistent header and navigation.

## How It Works
1. **Modal Trigger**: Links with class `modal-trigger` open tools in a modal
2. **Iframe Loading**: Tools load in an iframe within the modal
3. **Close Options**: Users can close via X button, Escape key, or clicking outside
4. **Mobile Responsive**: Full-screen modal on mobile devices

## Implementation Complete ✅
- Coverage Calculator
- Deductible Analyzer  
- Discount Checker
- Home Inventory Worksheet

## For Tool Pages
Add this script to each tool page before `</body>`:
```html
<script src="modal-close-button.js"></script>
```

This adds a "Close" button when the page is viewed in the modal.

## Benefits
1. **Better UX**: Users stay on main page
2. **Consistent Navigation**: Header always visible
3. **Faster Navigation**: No full page reloads
4. **SEO Friendly**: Tools still have their own URLs
5. **Mobile Optimized**: Full-screen experience on phones

## Customization
To add new tools:
1. Add to `toolUrls` object in `modal-tools.js`
2. Add `modal-trigger` class to links
3. Set `data-tool` and `data-title` attributes

## Fallback
If JavaScript is disabled, links still work normally (graceful degradation).