# Localization & RTL/LTR Support

This project includes an automatic language detection and RTL/LTR direction switching system.

## How It Works

The `localization.js` script:
1. **Auto-detects browser language** on page load
2. **Checks if the language is RTL** (Arabic, Hebrew, Persian, Urdu, etc.)
3. **Automatically applies RTL/LTR styling** by setting the `dir` attribute on the HTML element
4. **Stores language preference** in localStorage for returning visitors

## Supported RTL Languages

- Arabic (`ar`)
- Hebrew (`he`)
- Persian/Farsi (`fa`)
- Urdu (`ur`)
- Yiddish (`yi`, `ji`)
- Kurdish in Arabic script (`ku`)

All other languages default to LTR (Left-to-Right).

## Usage

### Basic Setup (Already Configured)

The script is already included in `index.html`:
```html
<script src="localization.js"></script>
```

The CSS already includes RTL styles:
```css
html[dir="rtl"] {
  direction: rtl;
  text-align: right;
}
```

### Manual Language Change

You can programmatically change the language:
```javascript
// Set language to Arabic (RTL)
setPageDirection('ar');

// Set language to English (LTR)
setPageDirection('en');
```

### Create a Language Switcher

Add a container in your HTML:
```html
<div id="language-switcher"></div>
```

Then call the function in a script:
```javascript
createLanguageSwitcher(['en', 'ar', 'fr'], 'language-switcher');
```

This creates clickable buttons to switch between English, Arabic, and French.

### Browser Language Auto-Detection

The script automatically uses:
1. **Saved preference** (from localStorage)
2. **Browser language** (from navigator.language)
3. **Fallback to English** (if neither available)

## Available Functions

### `setPageDirection(languageCode)`
Changes the page language and applies RTL/LTR styling.

**Example:**
```javascript
setPageDirection('ar-EG'); // Arabic (Egypt) - RTL
```

### `isRTLLanguage(languageCode)`
Returns `true` if a language code is RTL, `false` otherwise.

**Example:**
```javascript
if (isRTLLanguage('ar')) {
  console.log('This is a right-to-left language');
}
```

### `getBrowserLanguage()`
Returns the user's browser language code.

**Example:**
```javascript
const lang = getBrowserLanguage(); // Returns 'en-US', 'ar', etc.
```

### `createLanguageSwitcher(languages, containerId)`
Generates clickable language buttons.

**Example:**
```javascript
createLanguageSwitcher(['en', 'ar', 'fr', 'es'], 'lang-switcher');
```

## CSS Classes

Language switcher buttons have these classes:
- `.lang-btn` - All language buttons
- `.lang-btn.active` - Currently active language button

You can style them in your CSS:
```css
.lang-btn {
  background-color: #007bff;
  padding: 8px 12px;
}

.lang-btn.active {
  background-color: #0056b3;
  font-weight: bold;
}
```

## Storage

The selected language is saved to browser localStorage as `preferredLanguage`. This persists across page reloads and browser sessions.

Clear saved preference:
```javascript
localStorage.removeItem('preferredLanguage');
```

## Testing

1. Open the page in different browsers
2. Check the browser console (F12 → Console) for language change logs
3. Try switching languages using the language switcher
4. Reload the page to verify persistence

## Browser Support

Works on all modern browsers that support:
- `document.documentElement` manipulation
- `navigator.language`
- localStorage
- `classList` DOM API

## Notes

- The script handles both simple language codes (`ar`) and locales (`ar-EG`)
- RTL styling is already included in `style.css`
- Bootstrap 5 includes built-in RTL support (already linked in HTML)
- The timeline cards and all content automatically adjust with RTL/LTR changes
