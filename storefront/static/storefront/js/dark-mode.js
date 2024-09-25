// storefront/static/storefront/js/dark-mode.js

document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('darkModeSwitch');
    const currentTheme = localStorage.getItem('theme');

    // Check for previously saved theme
    if (currentTheme) {
        document.body.classList.add(currentTheme);

        if (currentTheme === 'dark-mode') {
            toggleSwitch.checked = true;
        }
    }

    // Toggle between dark and light mode
    toggleSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');  // Save the user's preference
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');  // Save the user's preference
        }

        // Update navbar and content blocks
        updateElementsForDarkMode(this.checked);
    });
});

// Update other elements for dark mode (like navbar and blocks)
function updateElementsForDarkMode(isDarkMode) {
    const navbar = document.querySelector('.navbar');
    const contentBlocks = document.querySelectorAll('.content-block');
    const menuItems = document.querySelectorAll('.menu-item');

    if (isDarkMode) {
        navbar.classList.add('dark-mode');
        contentBlocks.forEach(block => block.classList.add('dark-mode'));
        menuItems.forEach(item => item.classList.add('dark-mode'));
    } else {
        navbar.classList.remove('dark-mode');
        contentBlocks.forEach(block => block.classList.remove('dark-mode'));
        menuItems.forEach(item => item.classList.remove('dark-mode'));
    }
}
