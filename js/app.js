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
const sections = document.getElementsByTagName('section');
const backTop  = document.getElementById('back_top');

/**
 * let Variables
 * 
*/
let navbar = document.getElementById('navbar__list');
let header = document.querySelector('header');
let navID, navName, prevousSection;
let navArray = [];
let isScrolling;

/**
 * End Global Variables
 * Begin Main Functions
 * 
*/

/**
* @description console log out typeof parm, and how it looks.
* @param {number} parm - when console logged it will tell you what it is.
*/
function whatType(parm){
    console.log('You are a: ' + typeof parm);
    console.log('what you return is ' + parm);
}

// 
// Navigation functions
// 

/**
* @description Build the Navigation.
*/
function buildNav() {
    for (let i = 0; i <= sections.length - 1; i++) {
        if (sections[i].hasAttribute('id')) {
            navID = sections[i].getAttribute('id');
            navName = sections[i].getAttribute('data-nav');
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
    getNavItems(1);
    return
}

/**
* @description Scroll to section on link click.
*/
function buildNavClick(){
    const buttons = document.querySelectorAll('a');
    for (const button of buttons) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const scrollString = event.target.hash.substring(1);
            const scrollTo = document.getElementById(scrollString);
            scrollTo.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            getNavItems( parseInt(scrollString.substring(scrollString.length-1)) );
            addActive(scrollTo);
            return
        })
    }
}
 
/**
* @description add/remove active state for navigation item.
* @param {number} currentNav - passes in a number for the current nav item.
*/
function getNavItems(currentNav){
    const navItems = document.getElementsByClassName('menu__link');
    for (let i = 0; i <= navItems.length-1; i++){
        navItems[i].classList.remove('menu__active');
    }
    navItems[currentNav-1].classList.add('menu__active');
}

/**
* @description Animates navagation when scrolling.
*/
function animateHeader(){
    // Clear our timeout throughout the scroll
	window.clearTimeout( isScrolling );
	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function() {

		// Run the callback
        header.classList.remove('hide_nav');
        header.classList.add('show_nav');

    }, 66);
    
    header.classList.remove('show_nav');
    header.classList.add('hide_nav');
}

// 
// Sections functions
// 

/**
* @description This adds and removes active classes for the sections.
*/
function scrollingStuff(){
    animateHeader();
    showHideTopButton();
    
    // change section active class
    for (section of sections){
        const bonding = section.getBoundingClientRect();
        // checking whether fully visible
        if(bonding.top >= 0 && bonding.bottom <= window.innerHeight) {
            activeSection(section);
            return
        }

        // checking for partial visibility
        if(bonding.top < window.innerHeight/2 && bonding.bottom >= window.innerHeight/2) {
            activeSection(section);
            return
        }

    }
}

/**
* @description Add class 'active' to section when near top of viewport.
* @param {object} curSection - current active section.
*/
function addActive(curSection){
    if (prevousSection){
        prevousSection.classList.remove('your-active-class');
    }
    curSection.classList.add('your-active-class');
    prevousSection = curSection;
    return
}

/**
* @description removes active class in sections and then adds active to current section.
* @param {string} sectionActive - current active section.
*/
function activeSection(sectionActive){
    for (section of sections){
        section.classList.remove('your-active-class');
    }

    sectionActive.classList.add('your-active-class');
    const currentNumber = parseInt( sectionActive.getAttribute('id').slice(sectionActive.getAttribute('id').length-1) );
    getNavItems(currentNumber);
}

// 
// Back to Top functions
// 

/**
* @description animate scroll to top.
*/
function scrollToTop(){
    window.scrollTo({
        top: 100,
        left: 100,
        behavior: 'smooth'
    });
}

/**
* @description show/hide the back to top button
*/
function showHideTopButton(){
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backTop.classList.remove('hide_top');
        backTop.classList.add('show_top');
      } else {
        backTop.classList.remove('show_top');
        backTop.classList.add('hide_top');
      }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();
buildNavClick();

// Setup isScrolling variable
document.addEventListener('scroll', scrollingStuff);

// The back to top button
backTop.addEventListener('click', scrollToTop);