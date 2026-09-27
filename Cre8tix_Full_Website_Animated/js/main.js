// Cre8tix interactive motion
const hamburger = document.querySelector('.hamb');
const nav = document.querySelector('.header nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => nav.classList.toggle('open'));
}
document.querySelectorAll('.header nav a').forEach(a =>
  a.addEventListener('click', () => nav && nav.classList.remove('open'))
);

// Reveal content as it enters the viewport.
const revealTargets = document.querySelectorAll(
  '.section > *, .cards .info, .cards .review, .project, .services-mini > div, .trust > div, .contactbox'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

// Timeline gets its own reveal class so the staggered CSS animation works.
const timelineObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.timeline article').forEach(el => timelineObserver.observe(el));

// Portfolio category buttons: lightweight client-side filtering.
const filterButtons = document.querySelectorAll('.filters button');
const portfolioItems = document.querySelectorAll('.portfolio-grid .project');

if (filterButtons.length && portfolioItems.length) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      const filter = button.textContent.trim().toLowerCase();
      portfolioItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const show = filter === 'all' ||
          (filter === 'web design' && text.includes('web')) ||
          (filter === 'ui/ux' && text.includes('ui/ux')) ||
          (filter === 'branding' && text.includes('branding')) ||
          (filter === 'e-commerce' && text.includes('e-commerce'));

        item.style.display = show ? '' : 'none';
        if (show) {
          item.classList.remove('revealed');
          requestAnimationFrame(() => item.classList.add('revealed'));
        }
      });
    });
  });
}

// Contact form feedback.
const form = document.querySelector('.form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const success = form.querySelector('.success');
    if (success) success.classList.add('show');
    form.reset();
  });
}
