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

  /* ==========================================================================
     INTERACTIVE API SIMULATOR & ARCHITECTURE MODAL
     ========================================================================== */
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const tabBtns = document.querySelectorAll('.modal-tab-btn');
  const tabContents = document.querySelectorAll('.modal-tab-content');
  
  // Project 1 Threat Elements
  const runThreatBtn = document.getElementById('run-threat-btn');
  const threatSelect = document.getElementById('threat-log-select');
  const threatSpinner = document.getElementById('threatSpinner');
  const threatResult = document.getElementById('threatResult');

  // Project 2 Tumor Elements
  const runTumorBtn = document.getElementById('run-tumor-btn');
  const tumorSelect = document.getElementById('tumor-select');
  const tumorSpinner = document.getElementById('tumorSpinner');
  const tumorResult = document.getElementById('tumorResult');

  // Project 3 Ledger Elements
  const runLedgerBtn = document.getElementById('run-ledger-btn');
  const ledgerSelect = document.getElementById('ledger-select');
  const ledgerSpinner = document.getElementById('ledgerSpinner');
  const ledgerResult = document.getElementById('ledgerResult');

  const openModal = (tabName, projectKey) => {
    if (!modal) return;

    const demoWrappers = document.querySelectorAll('.project-demo-wrapper');
    const archWrappers = document.querySelectorAll('.project-arch-wrapper');
    
    demoWrappers.forEach(wrap => {
      if (wrap.id === `project-demo-${projectKey}`) {
        wrap.classList.remove('hide');
      } else {
        wrap.classList.add('hide');
      }
    });
    
    archWrappers.forEach(wrap => {
      if (wrap.id === `project-arch-${projectKey}`) {
        wrap.classList.remove('hide');
      } else {
        wrap.classList.add('hide');
      }
    });
    
    modal.classList.add('active');
    document.body.classList.add('overflow-hidden');
    switchTab(tabName);
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  };

  const switchTab = (tabId) => {
    tabBtns.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    tabContents.forEach(content => {
      if (content.getAttribute('id') === tabId) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
  };

  const setupModalTrigger = (btnId, tabName, projectKey) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(tabName, projectKey);
      });
    }
  };

  // Threat Triggers
  setupModalTrigger('demo-btn-threat', 'demo-tab', 'threat');
  setupModalTrigger('arch-btn-threat', 'arch-tab', 'threat');

  // Tumor Triggers
  setupModalTrigger('demo-btn-tumor', 'demo-tab', 'tumor');
  setupModalTrigger('arch-btn-tumor', 'arch-tab', 'tumor');

  // Ledger Triggers
  setupModalTrigger('demo-btn-ledger', 'demo-tab', 'ledger');
  setupModalTrigger('arch-btn-ledger', 'arch-tab', 'ledger');

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.getAttribute('data-tab'));
    });
  });

  // Mock Responses for Network Threat
  const mockThreatResponses = {
    normal_ping: {
      timestamp: new Date().toISOString(),
      source_ip: "192.168.1.45",
      dest_port: 80,
      protocol: "TCP",
      request_rate: "1.2 req/sec",
      anomaly_score: 0.12,
      anomaly_flag: "NORMAL",
      engine_decision: "ALLOW_TRAFFIC",
      security_action: "No action required. Traffic patterns conform to standard local network usage metrics."
    },
    ddos_flood: {
      timestamp: new Date().toISOString(),
      source_ip: "45.22.189.12",
      dest_port: 80,
      protocol: "TCP",
      request_rate: "850 req/sec",
      anomaly_score: 0.94,
      anomaly_flag: "ANOMALOUS",
      engine_decision: "DENY_RATE_LIMIT",
      security_action: "Burst volume exceeds rate-limiting threshold. Active rate-limit middleware triggered. Temporarily dropped connections from source IP for 300 seconds."
    },
    sql_inject: {
      timestamp: new Date().toISOString(),
      source_ip: "109.88.23.101",
      dest_port: 443,
      protocol: "HTTPS",
      request_rate: "0.5 req/sec",
      anomaly_score: 0.98,
      anomaly_flag: "CRITICAL_ANOMALOUS",
      engine_decision: "DENY_IP_BLOCK",
      security_action: "SQL injection payload signature detected in request query parameters. Active socket terminated. IP address appended to system IPTables firewall block list."
    }
  };

  // Mock Responses for Tumor Detection
  const mockTumorResponses = {
    benign_sample: {
      timestamp: new Date().toISOString(),
      model_accuracy: "96.49%",
      features_parsed: {
        clump_thickness: 2,
        uniformity_cell_size: 1,
        uniformity_cell_shape: 1,
        marginal_adhesion: 1,
        single_epithelial_size: 2,
        bare_nuclei: 1,
        bland_chromatin: 1,
        normal_nucleoli: 1,
        mitoses: 1
      },
      classification: "BENIGN",
      malignant_probability: "3.2%",
      benign_probability: "96.8%",
      clinical_recommendation: "Routine observation only. Cell structures are consistent with typical benign characteristics."
    },
    malignant_sample: {
      timestamp: new Date().toISOString(),
      model_accuracy: "96.49%",
      features_parsed: {
        clump_thickness: 8,
        uniformity_cell_size: 10,
        uniformity_cell_shape: 10,
        marginal_adhesion: 8,
        single_epithelial_size: 7,
        bare_nuclei: 10,
        bland_chromatin: 9,
        normal_nucleoli: 7,
        mitoses: 4
      },
      classification: "MALIGNANT",
      malignant_probability: "98.9%",
      benign_probability: "1.1%",
      clinical_recommendation: "Immediate biopsy recommended. Model weights indicate high density malignant cluster structures."
    },
    borderline_sample: {
      timestamp: new Date().toISOString(),
      model_accuracy: "96.49%",
      features_parsed: {
        clump_thickness: 5,
        uniformity_cell_size: 4,
        uniformity_cell_shape: 4,
        marginal_adhesion: 5,
        single_epithelial_size: 3,
        bare_nuclei: 3,
        bland_chromatin: 5,
        normal_nucleoli: 4,
        mitoses: 2
      },
      classification: "BORDERLINE / INDETERMINATE",
      malignant_probability: "48.5%",
      benign_probability: "51.5%",
      clinical_recommendation: "Additional histopathology tests recommended. Intermediate sample characteristics prevent clear single-model classification."
    }
  };

  // Mock Responses for Ledger REST API
  const mockLedgerResponses = {
    get_balance: {
      timestamp: new Date().toISOString(),
      request_url: "/api/v1/ledger/balance?account_id=ACC-8809",
      response_status: 200,
      elapsed_time: "1.2ms",
      query_optimization: {
        index_used: "idx_account_id",
        tables_joined: ["accounts", "transactions"],
        orm_overhead_saved: "25ms"
      },
      data: {
        account_id: "ACC-8809",
        holder: "Bhagyashree PY",
        currency: "USD",
        current_balance: 12450.00,
        last_updated: "2026-07-07T11:30:00Z"
      }
    },
    post_txn: {
      timestamp: new Date().toISOString(),
      request_url: "/api/v1/ledger/transaction",
      response_status: 201,
      elapsed_time: "2.4ms",
      query_optimization: {
        ACID_lock_applied: "EXCLUSIVE",
        db_write_safety: "CONCURRENCY_SAFE",
        transaction_isolation: "SERIALIZABLE"
      },
      data: {
        reference_id: "TXN-90214",
        status: "COMPLETED",
        from_account: "ACC-8809",
        to_account: "ACC-1045",
        amount: 150.00,
        audit_checksum: "sha256-a189f7bc882"
      }
    },
    get_audit: {
      timestamp: new Date().toISOString(),
      request_url: "/api/v1/ledger/audit?account_id=ACC-8809",
      response_status: 200,
      elapsed_time: "1.8ms",
      query_optimization: {
        full_table_scan_avoided: true,
        checksum_verified: true
      },
      data: {
        account_id: "ACC-8809",
        ledger_state: "HEALTHY",
        verified_transactions_count: 1420,
        integrity_score: "1.00"
      }
    }
  };

  // Run Threat Simulator
  if (runThreatBtn && threatSelect && threatResult && threatSpinner) {
    runThreatBtn.addEventListener('click', () => {
      const selectedValue = threatSelect.value;
      threatResult.classList.add('hide');
      threatSpinner.classList.remove('hide');
      runThreatBtn.disabled = true;
      runThreatBtn.innerHTML = 'Scanning Packet... <i class="fas fa-spinner fa-spin"></i>';
      
      setTimeout(() => {
        const responseData = mockThreatResponses[selectedValue] || { error: "Unknown packet payload." };
        responseData.timestamp = new Date().toISOString();
        
        threatResult.textContent = JSON.stringify(responseData, null, 2);
        threatSpinner.classList.add('hide');
        threatResult.classList.remove('hide');
        runThreatBtn.disabled = false;
        runThreatBtn.innerHTML = 'Scan Network Packet <i class="fas fa-shield-alt"></i>';
        
        if (typeof registerHoverTargets === 'function') {
          registerHoverTargets();
        }
      }, 1200);
    });
  }

  // Run Tumor Simulator
  if (runTumorBtn && tumorSelect && tumorResult && tumorSpinner) {
    runTumorBtn.addEventListener('click', () => {
      const selectedValue = tumorSelect.value;
      tumorResult.classList.add('hide');
      tumorSpinner.classList.remove('hide');
      runTumorBtn.disabled = true;
      runTumorBtn.innerHTML = 'Running Model... <i class="fas fa-spinner fa-spin"></i>';
      
      setTimeout(() => {
        const responseData = mockTumorResponses[selectedValue] || { error: "Unknown cell sample." };
        responseData.timestamp = new Date().toISOString();
        
        tumorResult.textContent = JSON.stringify(responseData, null, 2);
        tumorSpinner.classList.add('hide');
        tumorResult.classList.remove('hide');
        runTumorBtn.disabled = false;
        runTumorBtn.innerHTML = 'Run Classifier Inference <i class="fas fa-microscope"></i>';
        
        if (typeof registerHoverTargets === 'function') {
          registerHoverTargets();
        }
      }, 1200);
    });
  }

  // Run Ledger Simulator
  if (runLedgerBtn && ledgerSelect && ledgerResult && ledgerSpinner) {
    runLedgerBtn.addEventListener('click', () => {
      const selectedValue = ledgerSelect.value;
      ledgerResult.classList.add('hide');
      ledgerSpinner.classList.remove('hide');
      runLedgerBtn.disabled = true;
      runLedgerBtn.innerHTML = 'Executing Query... <i class="fas fa-spinner fa-spin"></i>';
      
      setTimeout(() => {
        const responseData = mockLedgerResponses[selectedValue] || { error: "Unknown API action." };
        responseData.timestamp = new Date().toISOString();
        
        ledgerResult.textContent = JSON.stringify(responseData, null, 2);
        ledgerSpinner.classList.add('hide');
        ledgerResult.classList.remove('hide');
        runLedgerBtn.disabled = false;
        runLedgerBtn.innerHTML = 'Execute Query <i class="fas fa-paper-plane"></i>';
        
        if (typeof registerHoverTargets === 'function') {
          registerHoverTargets();
        }
      }, 1200);
    });
  }

  /* ==========================================================================
     CUSTOM CURSOR INTERPOLATION (LERP)
     ========================================================================== */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  let cursorVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!cursorVisible) {
      if (cursorDot) cursorDot.style.opacity = '1';
      if (cursorRing) cursorRing.style.opacity = '1';
      cursorVisible = true;
    }
  });

  document.addEventListener('mouseleave', () => {
    if (cursorDot) cursorDot.style.opacity = '0';
    if (cursorRing) cursorRing.style.opacity = '0';
    cursorVisible = false;
  });

  function updateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
    
    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    
    requestAnimationFrame(updateCursor);
  }
  requestAnimationFrame(updateCursor);

  const registerHoverTargets = () => {
    const targets = document.querySelectorAll('.hover-target');
    targets.forEach(target => {
      target.removeEventListener('mouseenter', addCursorActive);
      target.removeEventListener('mouseleave', removeCursorActive);
      
      target.addEventListener('mouseenter', addCursorActive);
      target.addEventListener('mouseleave', removeCursorActive);
    });
  };

  function addCursorActive() {
    if (cursorRing) cursorRing.classList.add('active');
  }

  function removeCursorActive() {
    if (cursorRing) cursorRing.classList.remove('active');
  }

  registerHoverTargets();

  /* ==========================================================================
     DYNAMIC GITHUB API REPOSITORIES FETCHING
     ========================================================================== */
  const githubUsername = 'BRaven23';
  const githubReposGrid = document.getElementById('github-repos-grid');
  
  const langColors = {
    python: '#3572A5',
    java: '#b07219',
    javascript: '#f1e05a',
    html: '#e34c26',
    css: '#563d7c',
    jupyter: '#DA5B0B',
    default: '#8b8b8b'
  };

  const escapeHTML = (str) => {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  };

  const fetchGitHubRepos = async () => {
    if (!githubReposGrid) return;
    try {
      const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=15`);
      if (!response.ok) throw new Error('Failed to query GitHub repositories.');
      
      const repos = await response.json();
      
      const filteredRepos = repos.filter(repo => {
        const nameLower = repo.name.toLowerCase();
        const isAssignment = nameLower === 'assignments123' || nameLower === 'assigments123';
        const isPortfolio = nameLower.includes('portfolio') || nameLower === 'rk_port';
        const isWellsFargo = nameLower.includes('wells-fargo') || nameLower.includes('wellsfargo') || nameLower.includes('wells_fargo');
        return !isAssignment && !isPortfolio && !isWellsFargo;
      });

      if (filteredRepos.length === 0) {
        githubReposGrid.innerHTML = `
          <div class="loading-state">
            <span>No public repositories found.</span>
          </div>
        `;
        return;
      }

      githubReposGrid.innerHTML = ''; // Clear loading

      const customRepoDescriptions = {
        'AI_Network_Defence_System': 'Built to identify zero-day network threats and volumetric traffic anomalies. Exposes async FastAPI endpoints to a React dashboard.',
        'Tumor_Detection': 'ML pre-screening classification API achieving 96.49% test accuracy on the Wisconsin Diagnostic dataset.',
        'financial-advisory-system': 'Financial microservice ledger managing accounts and transaction histories. SQLite implementation leveraging direct query optimizations.',
        'Employee_Performance_and_Retention_analysis': 'Data-driven analysis utilizing Python libraries to dissect factors contributing to employee retention, training needs and overall workspace productivity levels.',
        'Neural_Network': 'A pure Python implementation of deep neural layers from scratch to solve vanishing gradient issues by replacing Sigmoid with ReLU and implementing Xavier initialization.',
        'New': 'Built and trained predictive models in Python to project weather fluctuations and precipitation probabilities using historical climate datasets.'
      };

      filteredRepos.forEach(repo => {
        const lang = repo.language ? repo.language : 'Repository';
        const langLower = lang.toLowerCase();
        const color = langColors[langLower] || langColors.default;
        
        const rawDesc = repo.description || '';
        const description = customRepoDescriptions[repo.name] || rawDesc || 'No description provided. Click below to inspect code.';
        
        const card = document.createElement('a');
        card.href = repo.html_url;
        card.target = '_blank';
        card.rel = 'noopener';
        card.className = 'repo-card hover-target';
        card.innerHTML = `
          <div class="repo-top">
            <svg class="repo-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            <div class="repo-stars">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>${repo.stargazers_count}</span>
            </div>
          </div>
          <div>
            <h4 class="repo-title">${escapeHTML(repo.name)}</h4>
            <p class="repo-desc">${escapeHTML(description)}</p>
          </div>
          <div class="repo-bottom">
            <div class="repo-lang">
              <span class="lang-color" style="background-color: ${color}"></span>
              <span>${lang}</span>
            </div>
            <span>Update: ${new Date(repo.updated_at).toLocaleDateString(undefined, {month: 'short', year: 'numeric'})}</span>
          </div>
        `;
        
        githubReposGrid.appendChild(card);
      });
      
      registerHoverTargets();
    } catch (error) {
      console.error('GitHub API error:', error);
      githubReposGrid.innerHTML = `
        <div class="loading-state">
          <span>Failed to load repositories. Click profile icon to view Github directly.</span>
        </div>
      `;
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchGitHubRepos);
  } else {
    fetchGitHubRepos();
  }
});
