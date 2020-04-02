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
let navArray = new Array();
let isScrolling;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function scrollToTop(){
    window.scrollTo({
        top: 100,
        left: 100,
        behavior: 'smooth'
    });
}

function showHideTopButton(){
    var a = document.getElementsByClassName('main__hero');

    console.log('a' + a.offsetHeight);
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backTop.classList.remove('hide_top');
        backTop.classList.add('show_top');
      } else {
        backTop.classList.remove('show_top');
        backTop.classList.add('hide_top');
      }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

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
    return
}
// Add class 'active' to section when near top of viewport
function addActive(item){
    if (prevousSection){
        prevousSection.classList.remove('your-active-class');
    }
    item.classList.add('your-active-class');
    prevousSection = item;
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

// checking current scroll location
// This checks if user is scrolling, then will add and remove the correct class
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

// This adds and removes active classes for the sections
function scrollingStuff(){
    animateHeader();
    showHideTopButton();
    
    // change section active class
    for (section of sections){
        const bonding = section.getBoundingClientRect();
        // checking whether fully visible
        if(bonding.top >= 0 && bonding.bottom <= window.innerHeight) {
            section.classList.add('your-active-class');
        }else{
            section.classList.remove('your-active-class');
        }

        // checking for partial visibility
        if(bonding.top < window.innerHeight/2 && bonding.bottom >= window.innerHeight/2) {
            section.classList.add('your-active-class');
        }else{
            section.classList.remove('your-active-class');

        }

    }
}

// Setup isScrolling variable
document.addEventListener('scroll', scrollingStuff);

// The back to top button
backTop.addEventListener('click', scrollToTop);

// Set sections as active
