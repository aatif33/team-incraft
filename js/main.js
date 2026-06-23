/*==================================================
TEAM INCRAFT WEBSITE
main.js
Author : Team INCRAFT
==================================================*/

"use strict";

/*==================================================
DOM LOADED
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    loaderAnimation();

    navbarScroll();


    smoothScroll();

    revealElements();

    activeNavigation();

    lazyImages();

    floatingHero();

});
/*==================================================
EUROPE COUNTDOWN
====================================================*/

const targetDate = new Date("June 28, 2026 09:00:00").getTime();

const dayEl = document.getElementById("days");
const hourEl = document.getElementById("hours");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");

if(dayEl){

    function updateCountdown(){

        const now = new Date().getTime();

        const distance = targetDate - now;

        if(distance <= 0){

            document.querySelector(".countdown-card").innerHTML=`

                <p class="countdown-title">

                    🇮🇳 TEAM INCRAFT IS NOW COMPETING AT EUROPE 2026

                </p>

            `;

            return;

        }

        dayEl.textContent=Math.floor(distance/(1000*60*60*24));

        hourEl.textContent=Math.floor((distance%(1000*60*60*24))/(1000*60*60));

        minuteEl.textContent=Math.floor((distance%(1000*60*60))/(1000*60));

        secondEl.textContent=Math.floor((distance%(1000*60))/1000);

    }

    updateCountdown();

    setInterval(updateCountdown,1000);

}

const currentPage = window.location.pathname.split("/").pop();
const form = document.querySelector(".contact-form");
const btn = document.getElementById("submitBtn");
/*==================================================
WINDOW LOAD
==================================================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");
        const website = document.getElementById("website");

        if (loader) {

            loader.classList.add("loader-hide");

            setTimeout(() => {

                loader.remove();

            }, 900);

        }

        if (website) {

            website.classList.add("website-loaded");

        }

    }, 2600);

});



/*==================================================
LOADER
==================================================*/

function loaderAnimation(){

    const loader=document.getElementById("loader");

    if(!loader) return;

}
const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);

        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 80));

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {

                counter.textContent = target;
                clearInterval(timer);

            } else {

                counter.textContent = current;

            }

        }, 20);

        observer.unobserve(counter);

    });

}, {
    threshold: 0.4
});

counters.forEach(counter => observer.observe(counter));



/*==================================================
NAVBAR
==================================================*/

function navbarScroll(){

    const navbar=document.querySelector(".navbar");

    if(!navbar) return;

    function scrollEffect(){

        if(window.scrollY>60){

            navbar.classList.add("scrolled");

        }

        else{

            navbar.classList.remove("scrolled");

        }

    }

    scrollEffect();

    window.addEventListener("scroll",scrollEffect);

}


/*==================================================
MOBILE MENU
==================================================*/




/*==================================================
SMOOTH SCROLL
==================================================*/

function smoothScroll(){

    const links=document.querySelectorAll('a[href^="#"]');

    links.forEach(link=>{

        link.addEventListener("click",(e)=>{

            const target=document.querySelector(link.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        });

    });

}


/*==================================================
SCROLL REVEAL
==================================================*/

function revealElements(){

    const revealItems=document.querySelectorAll(

        ".section-heading,.timeline-item,.team-card,.about-grid,.cta-wrapper,.footer,.sponsor-logo"

    );

    revealItems.forEach(item=>{

        item.classList.add("reveal");

    });

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("active");

            }

        });

    },{

        threshold:.15

    });

    revealItems.forEach(item=>{

        observer.observe(item);

    });

}
/*==================================================
ACTIVE NAVIGATION
==================================================*/

function activeNavigation(){

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link=>{

        const href = link.getAttribute("href");

        if(href === currentPage){

            link.classList.add("active");

        }else{

            link.classList.remove("active");

        }

    });

}


/*==================================================
LAZY IMAGE LOADING
==================================================*/

function lazyImages(){

    const images=document.querySelectorAll("img[data-src]");

    if(images.length===0) return;

    const imageObserver=new IntersectionObserver((entries,observer)=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const img=entry.target;

            img.src=img.dataset.src;

            img.removeAttribute("data-src");

            img.onload=()=>{

                img.classList.add("loaded");

            };

            observer.unobserve(img);

        });

    },{

        rootMargin:"100px"

    });

    images.forEach(img=>{

        imageObserver.observe(img);

    });

}


/*==================================================
FLOATING HERO SUBMARINE
==================================================*/

function floatingHero(){

    const heroImage=document.querySelector(".hero-image");

    if(!heroImage) return;

    let mouseX=0;
    let mouseY=0;

    window.addEventListener("mousemove",(e)=>{

        mouseX=(e.clientX/window.innerWidth-.5)*18;

        mouseY=(e.clientY/window.innerHeight-.5)*18;

    });

    function animate(){

        heroImage.style.transform=
        `translate(${mouseX}px, ${mouseY}px)`;

        requestAnimationFrame(animate);

    }

    animate();

}


/*==================================================
SPONSOR CAROUSEL
==================================================*/

function sponsorCarousel(){

    const track=document.querySelector(".sponsor-track");

    if(!track) return;

    const logos=[...track.children];

    logos.forEach(logo=>{

        const clone=logo.cloneNode(true);

        clone.setAttribute("aria-hidden","true");

        track.appendChild(clone);

    });

}

sponsorCarousel();


/*==================================================
MARQUEE DUPLICATION
==================================================*/

function marqueeLoop(){

    const track=document.querySelector(".marquee-track");

    if(!track) return;

    const content=track.innerHTML;

    track.innerHTML+=content;

}

marqueeLoop();


/*==================================================
PAGE FADE-IN
==================================================*/

const website=document.getElementById("website");

if(website){

    website.style.opacity="0";

    window.addEventListener("load",()=>{

        requestAnimationFrame(()=>{

            website.style.transition="opacity .8s ease";

            website.style.opacity="1";

        });

    });

}


/*==================================================
PARALLAX HERO BACKGROUND
==================================================*/

window.addEventListener("scroll",()=>{

    const hero=document.querySelector(".hero");

    if(!hero) return;

    const offset=window.pageYOffset;

    hero.style.backgroundPosition=
    `center ${offset*0.35}px`;

});


/*==================================================
BUTTON RIPPLE EFFECT
==================================================*/

document.querySelectorAll(".primary-btn,.secondary-btn").forEach(button=>{

    button.addEventListener("click",(e)=>{


        const rect=button.getBoundingClientRect();

        const size=Math.max(rect.width,rect.height);

        ripple.style.width=size+"px";
        ripple.style.height=size+"px";

        ripple.style.left=e.clientX-rect.left-size/2+"px";
        ripple.style.top=e.clientY-rect.top-size/2+"px";

        ripple.classList.add("ripple");

        button.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});


/*==================================================
SCROLL TO TOP
==================================================*/

window.addEventListener("beforeunload",()=>{

    window.scrollTo(0,0);

});




form.addEventListener("submit", () => {

    btn.innerHTML = "Sending...";
    btn.disabled = true;

});


document.querySelectorAll(".bottom-nav .nav-item").forEach(item => {

    const href = item.getAttribute("href");

    item.classList.remove("active");

    if (href === currentPage) {

        item.classList.add("active");

    }});


/*==========================
Animated donter
==========================*/



/*==================================================
END OF FILE
==================================================*/