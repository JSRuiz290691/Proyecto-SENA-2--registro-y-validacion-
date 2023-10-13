/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const cookieValue = document.cookie
                        .split("; ")
                        .find((row) => row.startsWith("name="))
                        ?.split("=")[1];
    console.log(cookieValue);

    const login_link = document.getElementsByClassName("login_link");
    const logged = document.getElementsByClassName("logged");
    const welcome_message = document.getElementById("welcome_message");
    const logout = document.getElementById("logout_link");

    if (cookieValue) {
        welcome_message.innerHTML = "<span>Bienvenido " + cookieValue + "</span>";
        login_link[0].style.display = "none";
        logged[0].style.display = "list-item";
        logged[1].style.display = "list-item";
    }else{
        logged[0].style.display = "none";
        logged[1].style.display = "none";
        login_link[0].style.display = "list-item";
    }

    logout.addEventListener("click", (e) => {
        console.log('logout');
        e.preventDefault();
        document.cookie = 'name=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        location.reload();
    });
});
