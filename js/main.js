/**
 * TechCYT LLP - Official Corporate Website Script
 * Version: 1.0
 * Pure Vanilla JavaScript (No Frameworks, No Dependencies)
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Sticky Navbar on Scroll
  const navbar = document.querySelector('.navbar-custom');
  const backToTopBtn = document.getElementById('backToTopBtn');

  function handleScroll() {
    const scrollPos = window.scrollY || document.documentElement.scrollTop;

    // Sticky Navbar
    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to Top Visibility
    if (backToTopBtn) {
      if (scrollPos > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // 2. Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Mobile Nav Auto-Close on Item Click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navCollapse = document.getElementById('navbarTechCYT');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // 4. Contact Enquiry Form Handler (Static Site Mailto Dispatcher)
  const contactForm = document.getElementById('techcytContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const fullName = (document.getElementById('senderName')?.value || '').trim();
      const email = (document.getElementById('senderEmail')?.value || '').trim();
      const phone = (document.getElementById('senderPhone')?.value || '').trim();
      const subject = (document.getElementById('emailSubject')?.value || '').trim();
      const message = (document.getElementById('senderMessage')?.value || '').trim();

      const statusBox = document.getElementById('formStatusBox');

      if (!fullName || !email || !subject || !message) {
        if (statusBox) {
          statusBox.innerHTML = `
            <div class="alert alert-danger d-flex align-items-center mb-0 mt-3" role="alert">
              <i class="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
              <div>Please fill in all mandatory fields (Name, Email, Subject, and Message).</div>
            </div>`;
          statusBox.classList.remove('d-none');
        }
        return;
      }

      // Construct mailto link
      const emailRecipient = 'techcytllp@gmail.com';
      const fullSubject = encodeURIComponent(`[TechCYT Enquiry] ${subject} - From ${fullName}`);
      const bodyContent = encodeURIComponent(
        `Name: ${fullName}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone || 'Not provided'}\n` +
        `Subject: ${subject}\n\n` +
        `Message:\n${message}\n\n` +
        `----------------------------------------\n` +
        `Sent via TechCYT LLP Official Website Enquiry Form`
      );

      const mailtoUrl = `mailto:${emailRecipient}?subject=${fullSubject}&body=${bodyContent}`;

      // Open mail client
      window.location.href = mailtoUrl;

      // Provide clear feedback
      if (statusBox) {
        statusBox.innerHTML = `
          <div class="alert alert-success mt-3 mb-0" role="alert">
            <h6 class="alert-heading fw-bold mb-1"><i class="bi bi-envelope-check me-2"></i>Email Client Triggered</h6>
            <p class="small mb-2">We opened your default email application with your enquiry details addressed to <strong>${emailRecipient}</strong>. Please press <strong>Send</strong> in your email client to dispatch the message.</p>
            <div class="small text-muted">Alternatively, you can write directly to <a href="mailto:${emailRecipient}" class="fw-semibold text-decoration-underline">${emailRecipient}</a> or call <a href="tel:+916354462509" class="fw-semibold text-decoration-underline">+91 6354462509</a>.</div>
          </div>`;
        statusBox.classList.remove('d-none');
      }
    });
  }

  // 5. Dynamic Current Year in Footer
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(function (el) {
    el.textContent = currentYear >= 2026 ? currentYear : 2026;
  });
});
