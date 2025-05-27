"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // Utility function to safely select elements
    const $ = (selector, parent = document) => parent.querySelector(selector);
    const $$ = (selector, parent = document) => parent.querySelectorAll(selector);

    // Navbar toggle
    const $navbar = $("[data-navbar]");
    const $navToggler = $("[data-nav-toggler]");

    if ($navbar && $navToggler) {
        $navToggler.addEventListener("click", () => {
            const isActive = $navbar.classList.toggle("active");
            $navToggler.setAttribute("aria-expanded", isActive.toString());
            $navToggler.classList.toggle("active", isActive); // For styling toggler icon
        });

        // Close navbar when a link is clicked (for mobile UX)
        $navbar.addEventListener("click", e => {
            if (e.target.matches(".navbar-link") || e.target.closest(".navbar-link")) {
                $navbar.classList.remove("active");
                $navToggler.setAttribute("aria-expanded", "false");
                $navToggler.classList.remove("active");
            }
        });

        // Close navbar if clicking outside on mobile
        document.addEventListener("click", (e) => {
            if ($navbar.classList.contains("active") && !$navbar.contains(e.target) && !$navToggler.contains(e.target)) {
                $navbar.classList.remove("active");
                $navToggler.setAttribute("aria-expanded", "false");
                $navToggler.classList.remove("active");
            }
        });

    } else {
        console.warn("Navbar or nav toggler not found.");
    }

    // Header scroll effect
    const $header = $("[data-header]");

    if ($header) {
        const headerScrollObserver = new IntersectionObserver(
            ([entry]) => {
                $header.classList.toggle("active", !entry.isIntersecting || window.scrollY > 50);
            },
            { rootMargin: "0px", threshold: 0.99 } // Adjust threshold as needed
        );
        
        // Create a sentinel element to observe for header scroll detection
        // This is an alternative to window.scrollY if you want to trigger based on an element
        // For simple scrollY check, the window event listener is fine too.
        // For now, let's stick to the simpler scrollY check.
        
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateHeaderOnScroll = () => {
            $header.classList.toggle("active", window.scrollY > 50);
            ticking = false;
        };

        window.addEventListener("scroll", () => {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(updateHeaderOnScroll);
                ticking = true;
            }
        });
        // Initial check in case page loads scrolled
        updateHeaderOnScroll();

    } else {
        console.warn("Header element with [data-header] not found. Scroll event listener not added.");
    }

    // Set current year in footer
    const $currentYear = $("#current-year");
    if ($currentYear) {
        $currentYear.textContent = new Date().getFullYear();
    } else {
        console.warn("Element with ID 'current-year' not found.");
    }
});