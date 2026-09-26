/* =========================================================
   ST. PAUL'S CHURCH — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       BASIC ELEMENTS
       ----------------------------------------------------- */

    const website = document.querySelector(".website");
    const preloader = document.querySelector(".preloader");
    const skipIntro = document.querySelector(".skip-intro");
    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const navbarMenu = document.querySelector(".navbar-menu");
    const backToTop = document.querySelector(".back-to-top");


    /* -----------------------------------------------------
       PRELOADER
       ----------------------------------------------------- */

    let introFinished = false;

    function finishIntro() {

        if (introFinished) return;

        introFinished = true;

        if (preloader) {
            preloader.classList.add("hide");
        }

        if (website) {
            setTimeout(() => {
                website.classList.add("loaded");
            }, 200);
        }
    }


    // Let the beautiful intro play for a few seconds
    const introTimer = setTimeout(() => {
        finishIntro();
    }, 3500);


    // Skip intro button
    if (skipIntro) {

        skipIntro.addEventListener("click", () => {

            clearTimeout(introTimer);

            finishIntro();

        });

    }


    /* -----------------------------------------------------
       HEADER — CHANGES WHEN SCROLLING
       ----------------------------------------------------- */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* -----------------------------------------------------
       MOBILE MENU
       ----------------------------------------------------- */

    if (menuToggle && navbarMenu) {

        menuToggle.addEventListener("click", () => {

            navbarMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");

        });


        // Close menu when a link is clicked
        const navLinks = navbarMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navbarMenu.classList.remove("active");
                menuToggle.classList.remove("active");

            });

        });

    }


    /* -----------------------------------------------------
       SCROLL REVEAL ANIMATIONS
       ----------------------------------------------------- */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        // Older browsers
        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* -----------------------------------------------------
       BACK TO TOP BUTTON
       ----------------------------------------------------- */

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }

    }

    window.addEventListener("scroll", updateBackToTop);

    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* -----------------------------------------------------
       SMOOTH SCROLLING
       ----------------------------------------------------- */

    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

    allAnchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* -----------------------------------------------------
       ACTIVE NAVIGATION LINK
       ----------------------------------------------------- */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-link");


    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }


    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    /* -----------------------------------------------------
       HERO PARALLAX EFFECT
       ----------------------------------------------------- */

    const heroLogo = document.querySelector(".hero-logo");
    const heroGlow = document.querySelector(".hero-glow");
    const heroContent = document.querySelector(".hero-content");


    window.addEventListener("scroll", () => {

        // Don't run this effect for users who prefer reduced motion
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const scrollPosition = window.scrollY;

        if (scrollPosition < window.innerHeight) {

            if (heroLogo) {
                heroLogo.style.transform =
                    `translateY(${scrollPosition * 0.12}px)`;
            }

            if (heroGlow) {
                heroGlow.style.transform =
                    `translateY(${scrollPosition * 0.06}px)`;
            }

            if (heroContent) {
                heroContent.style.transform =
                    `translateY(${scrollPosition * 0.04}px)`;
            }

        }

    });


    /* -----------------------------------------------------
       STAT NUMBER ANIMATION
       ----------------------------------------------------- */

    const statNumbers = document.querySelectorAll("[data-count]");


    function animateNumber(element) {

        const target = Number(element.getAttribute("data-count"));

        if (isNaN(target)) return;

        let current = 0;

        const duration = 1800;
        const startTime = performance.now();


        function updateNumber(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            // Smooth easing
            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            current = Math.floor(target * easedProgress);

            element.textContent = current.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(updateNumber);

            } else {

                element.textContent = target.toLocaleString();

            }

        }


        requestAnimationFrame(updateNumber);

    }


    if ("IntersectionObserver" in window && statNumbers.length > 0) {

        const statObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateNumber(entry.target);

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


        statNumbers.forEach(number => {

            statObserver.observe(number);

        });

    }


    /* -----------------------------------------------------
       BUTTON RIPPLE EFFECT
       ----------------------------------------------------- */

    const buttons = document.querySelectorAll(".button");


    buttons.forEach(button => {

        button.addEventListener("click", function(event) {

            const ripple = document.createElement("span");

            ripple.classList.add("button-ripple");


            const rect = button.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;


            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;


            button.appendChild(ripple);


            setTimeout(() => {

                ripple.remove();

            }, 700);

        });

    });


    /* -----------------------------------------------------
       MOUSE MOVEMENT — SUBTLE HERO EFFECT
       ----------------------------------------------------- */

    const hero = document.querySelector(".hero");


    if (hero && window.innerWidth > 900) {

        hero.addEventListener("mousemove", event => {

            if (
                window.matchMedia &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
                return;
            }


            const x =
                (event.clientX / window.innerWidth - 0.5) * 10;

            const y =
                (event.clientY / window.innerHeight - 0.5) * 10;


            if (heroLogo) {

                heroLogo.style.transform =
                    `translate(${x * 0.35}px, ${y * 0.35}px)`;

            }

        });


        hero.addEventListener("mouseleave", () => {

            if (heroLogo) {

                heroLogo.style.transform = "";

            }

        });

    }


    /* -----------------------------------------------------
       ESC KEY — CLOSE MOBILE MENU
       ----------------------------------------------------- */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (navbarMenu) {
                navbarMenu.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }

        }

    });


    /* -----------------------------------------------------
       PAGE LOADED
       ----------------------------------------------------- */

    console.log(
        "St. Paul's Church website loaded successfully."
    );

});