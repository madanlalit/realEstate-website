"use strict";

// Utility function to safely select elements
const $ = selector => document.querySelector(selector);

// Navbar toggle
const $navbar = $("[data-navbar]");
const $navToggler = $("[data-nav-toggler]");

if ($navbar && $navToggler) {
    $navToggler.addEventListener("click", () => {
        const isActive = $navbar.classList.toggle("active");
        $navToggler.setAttribute("aria-expanded", isActive);
    });

    // Close navbar when a link is clicked (for mobile UX)
    $navbar.addEventListener("click", e => {
        if (e.target.matches(".navbar-link")) {
            $navbar.classList.remove("active");
            $navToggler.setAttribute("aria-expanded", "false");
        }
    });
} else {
    console.warn("Navbar or nav toggler not found.");
}

// Header scroll effect
const $header = $("[data-header]");

if ($header) {
    window.addEventListener("scroll", () => {
        $header.classList.toggle("active", window.scrollY > 50);
    });
} else {
    console.warn("Header element with [data-header] not found. Scroll event listener not added.");
}