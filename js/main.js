/**
 * Jorge Fonseca — main.js
 * Nav scroll · Mobile menu · Scroll reveals · Contact form
 */

'use strict';

/* ============================================
   NAV SCROLL BEHAVIOR
   ============================================ */
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
})();


/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */
(function () {
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  function toggleMenu(open) {
    hamburger.classList.toggle('is-open', open);
    mobileMenu.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.contains('is-open');
    toggleMenu(!isOpen);
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMenu(false);
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      toggleMenu(false);
      hamburger.focus();
    }
  });
})();


/* ============================================
   ACTIVE NAV LINK
   ============================================ */
(function () {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();


/* ============================================
   SCROLL REVEAL — IntersectionObserver
   ============================================ */
(function () {
  // Single elements with .reveal class
  var revealEls = document.querySelectorAll('.reveal');
  // Lists with .stagger-list class (fires once on the parent)
  var staggerLists = document.querySelectorAll('.stagger-list');

  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything immediately
    revealEls.forEach(function (el) { el.classList.add('visible'); });
    staggerLists.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(function (el) { observer.observe(el); });
  staggerLists.forEach(function (el) { observer.observe(el); });
})();


/* ============================================
   CONTACT FORM — Validation & Submission
   ============================================ */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var successMsg = document.getElementById('form-success');

  function getField(id) {
    return document.getElementById(id);
  }

  function showError(input, msgEl, text) {
    input.classList.add('field-error');
    if (msgEl) {
      msgEl.textContent = text;
      msgEl.classList.add('visible');
    }
  }

  function clearError(input, msgEl) {
    input.classList.remove('field-error');
    if (msgEl) {
      msgEl.textContent = '';
      msgEl.classList.remove('visible');
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateForm() {
    var isValid = true;

    var nameInput   = getField('field-name');
    var nameError   = getField('error-name');
    var emailInput  = getField('field-email');
    var emailError  = getField('error-email');
    var msgInput    = getField('field-message');
    var msgError    = getField('error-message');

    // Name
    if (!nameInput.value.trim()) {
      showError(nameInput, nameError, 'Por favor, escribe tu nombre.');
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // Email
    if (!emailInput.value.trim()) {
      showError(emailInput, emailError, 'Por favor, escribe tu email.');
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, emailError, 'El email no parece correcto.');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // Message
    if (!msgInput.value.trim() || msgInput.value.trim().length < 20) {
      showError(msgInput, msgError, 'Cuéntame un poco más (mínimo 20 caracteres).');
      isValid = false;
    } else {
      clearError(msgInput, msgError);
    }

    return isValid;
  }

  // Live validation on blur
  ['field-name', 'field-email', 'field-message'].forEach(function (id) {
    var input = getField(id);
    if (!input) return;
    input.addEventListener('blur', function () { validateForm(); });
    input.addEventListener('input', function () {
      if (input.classList.contains('field-error')) { validateForm(); }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    var submitBtn = form.querySelector('[type="submit"]');
    submitBtn.textContent = 'Enviando…';
    submitBtn.disabled = true;

    // Si usas Formspree, descomenta estas líneas y añade tu endpoint:
    // var data = new FormData(form);
    // fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
    //   .then(function(r) { r.ok ? showSuccess() : showNetworkError(); })
    //   .catch(function() { showNetworkError(); });

    // Simulación (quita esto cuando configures Formspree):
    setTimeout(function () {
      form.style.display = 'none';
      if (successMsg) successMsg.classList.add('visible');
    }, 900);
  });

  function showNetworkError() {
    var submitBtn = form.querySelector('[type="submit"]');
    submitBtn.textContent = '[ Cuéntame tu caso ]';
    submitBtn.disabled = false;
    alert('Hubo un problema al enviar. Prueba de nuevo o escríbeme directamente.');
  }
})();
