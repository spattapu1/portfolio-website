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

    // Handle experience section company selection
    setupExperienceTabs();

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

        return `
            <div class="content-item">
                <div class="project-header">
                    <h3>${project.title}</h3>
                    <div class="header-icons">${headerIcons.join('')}</div>
                </div>
                <p class="project-description">${project.description}</p>
                ${technologiesHTML}
                <div class="project-footer">
                    <span class="project-year-small">${project.year}</span>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = projectsHTML;
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