document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     SCROLL EFFECTS (HEADER GLASSMOPRHISM)
     ========================================================================== */
  const header = document.getElementById('main-header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Call once on load in case page was refreshed halfway down

  /* ==========================================================================
     MOBILE HAMBURGER MENU TOGGLE
     ========================================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-item');

  const toggleMenu = () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');
  };

  menuToggle.addEventListener('click', toggleMenu);

  // Close menu when a navigation link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  /* ==========================================================================
     TYPEWRITER EFFECT IN HERO SECTION
     ========================================================================== */
  const typewriter = document.getElementById('typewriter');
  const words = [
    "Backend Specialists.",
    "Software Development Engineers.",
    "Scalable API Architectures.",
    "Modular Python & Java Services.",
    "Optimized SQL Performance."
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const typeEffect = () => {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Deleting characters
      typewriter.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Delete faster
    } else {
      // Typing characters
      typewriter.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    // Handlers for word transitions
    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Advance to next word
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Brief pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  };

  if (typewriter) {
    typeEffect();
  }

  /* ==========================================================================
     ACTIVE NAVIGATION LINK HIGHLIGHTING ON SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('section');
  
  const navObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the main screen area
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  /* ==========================================================================
     PROJECTS FILTERING SYSTEM
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Switch active class
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          // Fade in transition
          card.classList.remove('hide');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          }, 50);
        } else {
          // Hide
          card.classList.add('hide');
        }
      });
    });
  });

  /* ==========================================================================
     CONTACT FORM HANDLING & SUBMISSION FEEDBACK
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all the fields.', 'error');
        return;
      }

      // Show loading feedback
      formSubmitBtn.disabled = true;
      const originalBtnText = formSubmitBtn.innerHTML;
      formSubmitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
      
      // Simulate form submission (e.g. backend integration or email client dispatch)
      setTimeout(() => {
        // Construct mailto link as fallback since we don't have an active server API
        const mailtoLink = `mailto:bhagyayedrami25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Bhagyashree,\n\n${message}\n\nFrom,\n${name} (${email})`)}`;
        
        // Open the email client window
        window.location.href = mailtoLink;

        showStatus('Message prepared in your email client! Thank you.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Restore button state
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalBtnText;
      }, 1200);
    });
  }

  const showStatus = (msg, type) => {
    formStatus.textContent = msg;
    formStatus.className = 'form-status-msg ' + type;
    
    // Clear message after 5 seconds
    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className = 'form-status-msg';
    }, 5000);
  };
});
