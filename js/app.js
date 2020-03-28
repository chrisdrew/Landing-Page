/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

/**
 * Const Variables
 * 
*/
const navItems = document.getElementsByTagName('section');

/**
 * let Variables
 * 
*/
let navbar = document.getElementById('navbar__list');
let navID, navName;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav() {
    for (let i = 0; i <= navItems.length - 1; i++) {
        if (navItems[i].hasAttribute('id')) {
            navID = navItems[i].getAttribute('id');
            navName = navItems[i].getAttribute('data-nav');
            
            const templateNav = `
                <li>
                <a href="#${navID}" class="menu__link">
                    ${navName}
                </a>
            </li>
            `;
            navbar.insertAdjacentHTML('beforeEnd', templateNav);
        }
    }
    return
}
// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Scroll to section on link click

// Set sections as active
