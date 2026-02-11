/**
 * Language Localization Script
 * Detects language changes and applies RTL/LTR styling automatically
 */

// List of Right-to-Left (RTL) languages
const RTL_LANGUAGES = [
  'ar',    // Arabic
  'he',    // Hebrew
  'fa',    // Persian/Farsi
  'ur',    // Urdu
  'yi',    // Yiddish
  'ji',    // Yiddish (alternate code)
  'iw',    // Hebrew (alternate code)
  'ku',    // Kurdish (when written in Arabic script)
];

/**
 * Checks if a language code is RTL
 * @param {string} languageCode - The language code (e.g., 'ar', 'en')
 * @returns {boolean} - True if language is RTL, false otherwise
 */
function isRTLLanguage(languageCode) {
  // Extract base language code (e.g., 'ar' from 'ar-EG')
  const baseLanguage = languageCode.split('-')[0].toLowerCase();
  return RTL_LANGUAGES.includes(baseLanguage);
}

/**
 * Applies RTL or LTR to the page
 * @param {string} languageCode - The language code to apply
 */
function setPageDirection(languageCode) {
  const htmlElement = document.documentElement;
  const isRTL = isRTLLanguage(languageCode);

  // Update the lang attribute
  htmlElement.lang = languageCode;

  // Update the dir attribute
  htmlElement.dir = isRTL ? 'rtl' : 'ltr';

  // Optional: Store the language preference in localStorage
  localStorage.setItem('preferredLanguage', languageCode);

  // Log the change for debugging
  console.log(
    `Language changed to: ${languageCode} | Direction: ${isRTL ? 'RTL' : 'LTR'}`
  );
}

/**
 * Gets the browser's preferred language
 * @returns {string} - The browser's language code
 */
function getBrowserLanguage() {
  // Use navigator.language (most browsers) or navigator.languages[0] as fallback
  return navigator.language || navigator.userLanguage;
}

/**
 * Initializes the localization on page load
 * Checks for saved preference or uses browser language
 */
function initLocalization() {
  // Check if user has a saved language preference
  const savedLanguage = localStorage.getItem('preferredLanguage');

  // Use saved language, or fall back to browser language, or default to English
  const languageToUse = savedLanguage || getBrowserLanguage() || 'en';

  // Apply the language
  setPageDirection(languageToUse);
}

/**
 * Creates a language switcher (optional utility function)
 * @param {Array<string>} languages - Array of language codes to support (e.g., ['en', 'ar'])
 * @param {string} containerId - ID of container to place language buttons
 */
function createLanguageSwitcher(languages, containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Container with ID "${containerId}" not found`);
    return;
  }

  // Clear existing content
  container.innerHTML = '';

  // Create buttons for each language
  languages.forEach((lang) => {
    const button = document.createElement('button');
    button.textContent = lang.toUpperCase();
    button.className = 'lang-btn';
    button.setAttribute('data-lang', lang);

    // Add active class to current language
    if (document.documentElement.lang === lang) {
      button.classList.add('active');
    }

    // Add click handler
    button.addEventListener('click', () => {
      setPageDirection(lang);

      // Update active button
      document.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.classList.remove('active');
      });
      button.classList.add('active');
    });

    container.appendChild(button);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initLocalization);

// Also initialize immediately in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLocalization);
} else {
  initLocalization();
}

// Export functions for use in other scripts (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isRTLLanguage,
    setPageDirection,
    getBrowserLanguage,
    initLocalization,
    createLanguageSwitcher,
  };
}
