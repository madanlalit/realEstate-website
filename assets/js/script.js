"use strict";

const $navbar = document.querySelector("[data-navbar]");
const $navToggler = document.querySelector("[data-nav-toggler]");

$navToggler.addEventListener("click", () => $navbar.classList.toggle("active"));

const $header = document.querySelector("[data-header]");

if ($header) {
    window.addEventListener("scroll", e => { // CORRECTED: "scroll" (string)
        $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
    });
} else {
    console.warn("Header element with [data-header] not found. Scroll event listener not added.");
}