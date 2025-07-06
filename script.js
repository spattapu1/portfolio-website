document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    // Add smooth scrolling to navigation links (only for internal links)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (those starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // External links (email, GitHub, LinkedIn) will open in new tab as intended
        });
    });
    
    // Handwriting effect for the home heading
    const homeHeading = document.querySelector('#home h1');
    const text = homeHeading.textContent;
    homeHeading.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            homeHeading.textContent += text.charAt(i);
            i++;
            // Random delay to simulate natural handwriting
            const delay = Math.random() * 100 + 50;
            setTimeout(typeWriter, delay);
        }
    };
    
    // Start the handwriting effect after a short delay
    setTimeout(typeWriter, 1000);

    // Load and display projects from projects.json
    loadProjects();

    // Load and display experience from experience.json
    loadExperience();

    // Setup scroll animations
    setupScrollAnimations();

    // Scroll a bit down when "Let's connect" is clicked
    const scrollCta = document.getElementById('scroll-cta');
    if (scrollCta) {
      scrollCta.addEventListener('click', function() {
        window.scrollBy({
          top: window.innerHeight * 0.7,
          left: 0,
          behavior: 'smooth'
        });
      });
    }
});

// Function to load projects from JSON file
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback: display error message
        const container = document.getElementById('projects-container');
        container.innerHTML = '<div class="content-item"><p>Error loading projects. Please try again later.</p></div>';
    }
}

// Function to display projects in the DOM
function displayProjects(projects) {
    const container = document.getElementById('projects-container');
    
    if (!projects || projects.length === 0) {
        container.innerHTML = '<div class="content-item"><p>No projects available at the moment.</p></div>';
        return;
    }
    
    const projectsHTML = projects.map(project => {
        // Create technologies pills
        const technologiesHTML = project.technologies 
            ? `<div class="project-technologies">
                 ${project.technologies.map(tech => `<span class="tech-pill">${tech}</span>`).join('')}
               </div>`
            : '';
        
        // Create header icons
        const headerIcons = [];
        if (project.url) {
            headerIcons.push(`<a href="${project.url}" target="_blank" class="header-icon" title="View Project"><i class="fas fa-external-link-alt"></i></a>`);
        } else if (project.image && project.image !== "No_Image") {
            // If no URL but has image, add a link to open the image
            headerIcons.push(`<a href="${project.image}" target="_blank" class="header-icon" title="View Project"><i class="fas fa-external-link-alt"></i></a>`);
        }
        if (project.repository) {
            headerIcons.push(`<a href="${project.repository}" target="_blank" class="header-icon repository-icon" title="View Code"><i class="fab fa-github"></i></a>`);
        }
        
        const headerIconsHTML = headerIcons.length > 0 
            ? `<div class="header-icons">${headerIcons.join('')}</div>`
            : '';

        // Always render icons above the title
        const projectHeaderHTML = `
            <div class="project-header">
                ${headerIconsHTML}
            </div>
            <div class="project-title-box">
                <h3>${project.title}</h3>
            </div>
        `;

        return `
            <div class="content-item">
                ${projectHeaderHTML}
                <p class="project-description">${project.description}</p>
                ${technologiesHTML}
                <div class="project-footer">
                    <span class="project-year-small">${project.year}</span>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = projectsHTML;
    reapplyFadeInClasses();
}

// Function to load experience from JSON file
async function loadExperience() {
    try {
        const response = await fetch('experience.json');
        const experiences = await response.json();
        displayExperience(experiences);
    } catch (error) {
        console.error('Error loading experience:', error);
        // Fallback: display error message
        const companyList = document.getElementById('company-list');
        const experienceDetails = document.getElementById('experience-details');
        companyList.innerHTML = '<div class="content-item"><p>Error loading experience. Please try again later.</p></div>';
        experienceDetails.innerHTML = '';
    }
}

// Function to display experience in the DOM
function displayExperience(experiences) {
    const companyList = document.getElementById('company-list');
    const experienceDetails = document.getElementById('experience-details');
    
    if (!experiences || experiences.length === 0) {
        companyList.innerHTML = '<div class="content-item"><p>No experience available at the moment.</p></div>';
        experienceDetails.innerHTML = '';
        return;
    }
    
    // Generate company list HTML
    const companyListHTML = experiences.map((experience, index) => {
        const companyId = experience.company.toLowerCase().replace(/\s+/g, '');
        const isActive = index === 0 ? 'active' : '';
        return `
            <div class="company-item ${isActive}" data-company="${companyId}">
                <h3>${experience.company}</h3>
                <span class="company-role">${experience.role}</span>
            </div>
        `;
    }).join('');
    
    // Generate experience details HTML
    const experienceDetailsHTML = experiences.map((experience, index) => {
        const companyId = experience.company.toLowerCase().replace(/\s+/g, '');
        const isActive = index === 0 ? 'active' : '';
        
        // Create bullets HTML
        const bulletsHTML = experience.bullets.map(bullet => `<li>${bullet}</li>`).join('');
        
        // Create technologies HTML
        const technologies = experience.technologies.split(', ').map(tech => tech.trim());
        const technologiesHTML = technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
        
        return `
            <div class="experience-detail ${isActive}" id="${companyId}">
                <div class="experience-header">
                    <div class="experience-title-section">
                        <h2>${experience.role}</h2>
                        <span class="experience-date">${experience.dates}</span>
                    </div>
                </div>
                <ul class="experience-bullets">
                    ${bulletsHTML}
                </ul>
                <div class="experience-tech">
                    ${technologiesHTML}
                </div>
            </div>
        `;
    }).join('');
    
    companyList.innerHTML = companyListHTML;
    experienceDetails.innerHTML = experienceDetailsHTML;
    
    // Setup experience tabs after content is loaded
    setupExperienceTabs();
    reapplyFadeInClasses();
}

// Function to setup experience section tabs
function setupExperienceTabs() {
    const companyItems = document.querySelectorAll('.company-item');
    const experienceDetails = document.querySelectorAll('.experience-detail');
    
    companyItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetCompany = this.getAttribute('data-company');
            
            // Remove active class from all company items
            companyItems.forEach(company => company.classList.remove('active'));
            
            // Add active class to clicked company
            this.classList.add('active');
            
            // Hide all experience details
            experienceDetails.forEach(detail => detail.classList.remove('active'));
            
            // Show the selected experience detail
            const targetDetail = document.getElementById(targetCompany);
            if (targetDetail) {
                targetDetail.classList.add('active');
            }
        });
    });
}

// Function to setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    addFadeInClasses();
    
    // Observe all fade-in elements
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach(element => {
        observer.observe(element);
    });
}

// Function to add fade-in classes to elements
function addFadeInClasses() {
    // About section
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.classList.add('fade-in');
    }

    // Experience section
    const experienceLayout = document.querySelector('.experience-layout');
    if (experienceLayout) {
        experienceLayout.classList.add('fade-in');
    }

    // Projects section
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.classList.add('fade-in');
    }

    // Skills list items
    const skillsList = document.querySelector('.skills-list');
    if (skillsList) {
        const skillsItems = skillsList.querySelectorAll('li');
        skillsItems.forEach((item, index) => {
            item.classList.add('fade-in', `fade-in-delay-${Math.min(index + 1, 5)}`);
        });
    }

    // Experience bullets
    const experienceBullets = document.querySelectorAll('.experience-bullets li');
    experienceBullets.forEach((bullet, index) => {
        bullet.classList.add('fade-in', `fade-in-delay-${Math.min(index + 1, 5)}`);
    });

    // Project items
    const projectItems = document.querySelectorAll('.content-item');
    projectItems.forEach((item, index) => {
        item.classList.add('fade-in', `fade-in-delay-${Math.min(index + 1, 5)}`);
    });

    // Tech tags
    const techTags = document.querySelectorAll('.tech-tag, .tech-pill');
    techTags.forEach((tag, index) => {
        tag.classList.add('fade-in', `fade-in-delay-${Math.min(index + 1, 5)}`);
    });

    // Section titles
    const sectionTitles = document.querySelectorAll('section h1');
    sectionTitles.forEach((title) => {
        title.classList.add('fade-in');
    });
}

// Function to reapply fade-in classes after dynamic content loads
function reapplyFadeInClasses() {
    // Remove existing fade-in classes first
    const existingFadeInElements = document.querySelectorAll('.fade-in');
    existingFadeInElements.forEach(element => {
        element.classList.remove('fade-in', 'fade-in-visible', 'fade-in-delay-1', 'fade-in-delay-2', 'fade-in-delay-3', 'fade-in-delay-4', 'fade-in-delay-5');
    });

    // Reapply classes
    addFadeInClasses();
    
    // Reobserve elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach(element => {
        observer.observe(element);
    });
} 