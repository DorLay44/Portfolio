
/**
 * Portfolio Core Engine Initialization
 * Adheres strictly to WCAG 2.1 specifications and performance constraints.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // Core Operational Selection Identifiers
    const themeCheckbox = document.querySelector('#checkbox');
    const systemStatusText = document.querySelector('#theme-status');
	const sectionsButtons = document.querySelectorAll('.nav-btn');
	const DOMContainers = document.querySelectorAll('.container');

    /* ==========================================================================
       Task 2: Dynamic Time-Based Theme Management (6PM - 6AM Rule)
       ========================================================================== */
    function initializeThemeEngine() {
        const persistedPreference = localStorage.getItem('portfolio-theme');
        
        if (persistedPreference) {
            // Priority 1: Honor manual override selection states instantly
            applyThemeToken(persistedPreference);
        } else {
            // Priority 2: Use client device local time to evaluate environmental conditions
            const deviceHour = new Date().getHours();
            const automaticDarkWindow = deviceHour >= 18 || deviceHour < 6; // 18:00 to 05:59
            
            applyThemeToken(automaticDarkWindow ? 'dark' : 'light');
        }
    }

    function applyThemeToken(selectedTheme) {
        document.documentElement.setAttribute('data-theme', selectedTheme);
        
        if (selectedTheme === 'dark') {
            themeCheckbox.checked = true;
            updateARIAStatusMessage(true);
        } else {
            themeCheckbox.checked = false;
            updateARIAStatusMessage(false);
        }
    }

    function updateARIAStatusMessage(isActiveDark) {
        if (systemStatusText) {
            systemStatusText.textContent = isActiveDark ? "Dark mode active" : "Light mode active";
        }
    }

    // Toggle event tracking loop intercepting user actions
    themeCheckbox.addEventListener('change', (event) => {
        const userSelectedTheme = event.target.checked ? 'dark' : 'light';
        applyThemeToken(userSelectedTheme);
        localStorage.setItem('portfolio-theme', userSelectedTheme);
    });

    /* ==========================================================================
       Task 3: Performance Section Switcher (Tabs Engine)
       ========================================================================== */
    function initializeSectionSwitcher() {
        sectionsButtons.forEach(activeSelectionButton => {
            activeSelectionButton.addEventListener('click', () => {
                const targetID = activeSelectionButton.getAttribute('aria-controls');

                // Step A: Control button interactive context attributes (ARIA State Modification)
                sectionsButtons.forEach(buttonElement => {
                    if (buttonElement === activeSelectionButton) {
                        buttonElement.classList.add('active');
                        buttonElement.setAttribute('aria-selected', 'true');
                    } else {
                        buttonElement.classList.remove('active');
                        buttonElement.setAttribute('aria-selected', 'false');
                    }
                });

                // Step B: Toggle visibility safely using semantic HTML attributes
                DOMContainers.forEach(containerElement => {
                    // Match layout identifiers accurately across header/section structures
                    if (containerElement.id === targetID) {
                        containerElement.removeAttribute('hidden');
                        containerElement.classList.add('active');
                    } else {
                        // Skip theme toggle control container to prevent visual loss
                        if (!containerElement.classList.contains('theme-switch-wrapper')) {
                            containerElement.setAttribute('hidden', '');
                            containerElement.classList.remove('active');
                        }
                    }
                });
            });
        });
    }

    // Parallel Runtime Boot Steps Execution
    initializeThemeEngine();
    initializeSectionSwitcher();
});

/*
(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
   document.querySelector(".theme-switch-wrapper").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    })	
	
})();
*/


const typedTextSpan = document.querySelector(".itype");
const cursorSpan = document.querySelector(".icursor");
const textArray = ["Ekeke Dorlee R."];
const typingDelay = 200;
const erasingDelay = 150;
const newTextDelay = 2000; 
let textArrayIndex = 0;
let charIndex = 0;

function type() {
	if(charIndex < textArray[textArrayIndex].length) {
		if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
		typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
		charIndex++;
		setTimeout(type, typingDelay);
	}
else {
	cursorSpan.classList.remove("typing");
	setTimeout(erase, newTextDelay);
	}
}
function erase() {
	if(charIndex > 0) {
		if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
		typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex -1);
		charIndex--;
		setTimeout(erase, erasingDelay);
	}
	else {
		cursorSpan.classList.remove("typing");
		textArrayIndex++;
		if(textArrayIndex >= textArray.length) textArrayIndex = 0;
		setTimeout(type, typingDelay + 1100);
	}
}

document.addEventListener("DOMContentLoaded", function(){
	if(textArray.length) setTimeout(type, newTextDelay + 250);
}) 


var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("doty");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

