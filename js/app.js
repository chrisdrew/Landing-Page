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
let navArray = new Array();
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
// ************************
// clean up code later
// ************************

function buildNav() {
    for (let i = 0; i <= navItems.length - 1; i++) {
        if (navItems[i].hasAttribute('id')) {
            navID = navItems[i].getAttribute('id');
            navName = navItems[i].getAttribute('data-nav');
            const templateNav = `
                <li>
                <a href="#${navID}" class="menu__link" id="section_${i+1}">
                    ${navName}
                </a>
            </li>
            `;
            navArray.push(templateNav);
            navbar.insertAdjacentHTML('beforeEnd', templateNav);
        }
    }
    return
}
// Add class 'active' to section when near top of viewport
function addActive(item){
    const sections = document.getElementsByTagName('section');
    for (let section of sections) {
        if(section.classList.contains('your-active-class')){
            section.classList.remove('your-active-class');
        }
    }
    item.classList.add('your-active-class');
    return
 
}

// Scroll to anchor ID using scrollTO event
function scrollTo(event){
    event.preventDefault();
    const scrollString = event.target.hash.substring(1);
    const scrollTo = document.getElementById(scrollString);
    scrollTo.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    addActive(scrollTo);
    return
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Scroll to section on link click
const buttons = document.querySelectorAll('a');
for (const button of buttons) {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const scrollString = event.target.hash.substring(1);
        const scrollTo = document.getElementById(scrollString);
        scrollTo.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        addActive(scrollTo);
        return
    })
}


// Set sections as active
