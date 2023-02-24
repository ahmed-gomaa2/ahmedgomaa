'use strict';

const navBtn = document.querySelector('.Header__nav-toggle');
const nav = document.querySelector('.Header__nav');
const headerOverlay = document.querySelector('.Header__nav-overlay');
const header = document.querySelector('.Header');
const headerContainer = document.querySelector('.Header__container');
const int = document.querySelector('.Intersecting');
const navLinks = document.querySelectorAll('.Header__nav-item');
const cancelBtn = document.querySelector('.Header__nav-cancel');

navBtn.addEventListener('click',(e) => {
    e.preventDefault();
    nav.style.transform = 'none';
    headerOverlay.style.transform = 'none';
});

headerOverlay.addEventListener('click',(e) => {
    e.preventDefault();
    nav.style.transform = 'translateX(100%)';
    headerOverlay.style.transform = 'translateX(100%)';
    nav.style.transitionDelay = '0';
    headerOverlay.style.transitionDelay = '0.4s';
});

cancelBtn.addEventListener('click',(e) => {
    e.preventDefault();
    nav.style.transform = 'translateX(100%)';
    headerOverlay.style.transform = 'translateX(100%)';
});

window.addEventListener('resize', e => {
    e.preventDefault();
    console.log(e)
    if(e.target.innerWidth > 1100) {
        nav.style.transform = 'none';
        headerOverlay.style.transform = 'none';
    } else {
        nav.style.transform = 'translateX(100%)';
        headerOverlay.style.transform = 'translateX(100%)';
    }
})

const stickyNav = function (enteries) {
    const [entry] = enteries;

    console.log(entry);

    if(!entry.isIntersecting) {
        console.log('intersecting')
        header.classList.add('Header__fixed');
    }
    else{
        console.log('not intersecting')
        header.classList.remove('Header__fixed');
    }
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    rootMargin: '100px',
    threshold: 0
});

headerObserver.observe(int);

navLinks.forEach((link, i) => {
    link.style.animation = `fadeIn 0.5s forwards 2.${i + 2}s`
});

const aboutSection = document.querySelector('.About');

const aboutObserver = (entries) => {
    const [entry] = entries;
    if(!entry.isIntersecting) return;
    aboutSection.classList.remove('section--hidden');
    aboutSection.querySelector('.About__header').style.animation = 'fadeIn 0.5s forwards 0.2s';
    aboutSection.querySelector('.About__desc').style.animation = 'fadeIn 0.5s forwards 0.3s';
    aboutSection.querySelector('.About__skills h4').style.animation = 'fadeIn 0.5s forwards 0.4s';
    aboutSection.querySelector('.About__right').style.animation = 'fadeIn 0.5s forwards 0.5s';
    aboutSection.querySelectorAll('.About__skill').forEach((s, i) => {
        s.style.animation = `fadeIn 0.5s forwards ${0.5 + i / 20}s`
    })
}

const animatedAbout = new IntersectionObserver(aboutObserver, {
    root: null,
    rootMargin: '-150px',
    threshold: 0
});

animatedAbout.observe(aboutSection);
aboutSection.classList.add('section--hidden');