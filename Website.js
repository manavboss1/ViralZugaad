document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavbarScroll();
  initMobileMenu();
  initSectionVisibility();
  initThreeJSScene();
  initSunMoonParallax();
  initTiltEffect();
  initPortfolioTabs();
  initTestimonialSlider();
  initContactForm();
  initCardEffect();
});

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
 
  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
 
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
   
    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

// Section visibility based on scroll
function initSectionVisibility() {
  const sections = document.querySelectorAll('.section');
 
  function checkVisibility() {
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
     
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('visible');
      }
    });
  }
 
  // Check on load
  checkVisibility();
 
  // Check on scroll
  window.addEventListener('scroll', checkVisibility);
}

// Three.js scene for hero background
function initThreeJSScene() {
  const container = document.getElementById('heroScene');
  if (!container || !window.THREE) return;
 
  // Set up scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
 
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0xffffff, 0);
  container.appendChild(renderer.domElement);
 
  // Create objects with futuristic appearance
  // Sphere - Blue
  const geometry1 = new THREE.SphereGeometry(1.5, 32, 32);
  const material1 = new THREE.MeshPhongMaterial({
    color: 0x4158D0,
    transparent: true,
    opacity: 0.8,
    shininess: 100,
    wireframe: false,
  });
  const sphere = new THREE.Mesh(geometry1, material1);
  scene.add(sphere);
 
  // Torus - Pink
  const geometry2 = new THREE.TorusGeometry(1, 0.4, 16, 100);
  const material2 = new THREE.MeshPhongMaterial({
    color: 0xC850C0,
    transparent: true,
    opacity: 0.6,
    shininess: 100,
    wireframe: true,
  });
  const torus = new THREE.Mesh(geometry2, material2);
  torus.position.set(-3, 0, 0);
  scene.add(torus);
 
  // Icosahedron - Purple
  const geometry3 = new THREE.IcosahedronGeometry(1, 0);
  const material3 = new THREE.MeshPhongMaterial({
    color: 0xFFCC70,
    transparent: true,
    opacity: 0.7,
    shininess: 100,
    wireframe: false,
  });
  const icosahedron = new THREE.Mesh(geometry3, material3);
  icosahedron.position.set(3, 0, 0);
  scene.add(icosahedron);
 
  // Add floating particles for futuristic effect
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 500;
  const posArray = new Float32Array(particlesCount * 3);
 
  for(let i = 0; i < particlesCount * 3; i++) {
    // Random positions in a sphere
    posArray[i] = (Math.random() - 0.5) * 20;
  }
 
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
 
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    transparent: true,
    opacity: 0.8,
    color: 0xffffff,
    blending: THREE.AdditiveBlending
  });
 
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);
 
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
 
  const blueLight = new THREE.PointLight(0x4158D0, 1);
  blueLight.position.set(5, 5, 5);
  scene.add(blueLight);
 
  const pinkLight = new THREE.PointLight(0xC850C0, 1);
  pinkLight.position.set(-5, 0, 5);
  scene.add(pinkLight);
 
  const purpleLight = new THREE.PointLight(0xFFCC70, 0.8);
  purpleLight.position.set(0, -5, -5);
  scene.add(purpleLight);
 
  // Position camera
  camera.position.z = 8;
 
  // Animation
  let mouseX = 0;
  let mouseY = 0;
 
  // Add mouse movement effect
  const handleMouseMove = (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  };
 
  window.addEventListener('mousemove', handleMouseMove);
 
  const animate = function () {
    requestAnimationFrame(animate);
   
    // Rotate objects
    sphere.rotation.y += 0.005;
    torus.rotation.x += 0.01;
    torus.rotation.z += 0.005;
    icosahedron.rotation.z += 0.007;
    icosahedron.rotation.y += 0.003;
    particles.rotation.y += 0.001;
   
    // Respond to mouse movement
    sphere.position.x = mouseX * 0.5;
    sphere.position.y = mouseY * 0.5;
   
    torus.position.x = -3 + mouseX * 0.2;
    torus.position.y = mouseY * 0.2;
   
    icosahedron.position.x = 3 + mouseX * 0.3;
    icosahedron.position.y = mouseY * 0.3;
   
    renderer.render(scene, camera);
  };
 
  animate();
 
  // Handle resizing
  window.addEventListener('resize', () => {
    if (!container) return;
   
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// Sun/Moon parallax effect on scroll
function initSunMoonParallax() {
  const sunMoonParallax = document.getElementById('sunMoonParallax');
  if (!sunMoonParallax) return;
 
  // Create sun
  const sun = document.createElement('div');
  sun.classList.add('sun');
  sun.style.cssText = `
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,190,1) 0%, rgba(255,215,0,1) 50%, rgba(255,165,0,0) 100%);
    box-shadow: 0 0 80px 20px rgba(255,215,0,0.8);
    transition: all 0.1s ease-out;
    transform: scale(3);
  `;
  sunMoonParallax.appendChild(sun);
 
  // Create moon
  const moon = document.createElement('div');
  moon.classList.add('moon');
  moon.style.cssText = `
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(240,240,240,1) 0%, rgba(210,210,210,1) 100%);
    box-shadow: 0 0 40px 5px rgba(255,255,255,0.4);
    opacity: 0;
    transition: all 0.1s ease-out;
  `;
  sunMoonParallax.appendChild(moon);
 
  // Create moon craters
  const moonCrater1 = document.createElement('div');
  moonCrater1.style.cssText = `
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: rgba(200,200,200,1);
    top: 1px;
    left: 1.5px;
    opacity: 0;
    transition: all 0.1s ease-out;
  `;
  moon.appendChild(moonCrater1);
 
  const moonCrater2 = document.createElement('div');
  moonCrater2.style.cssText = `
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(200,200,200,1);
    top: 2.2px;
    left: -1px;
    opacity: 0;
    transition: all 0.1s ease-out;
  `;
  moon.appendChild(moonCrater2);
 
  // Create stars
  const stars1 = document.createElement('div');
  stars1.classList.add('stars');
  stars1.style.cssText = `
    position: absolute;
    inset: 0;
    opacity: 0;
    background-image: radial-gradient(white 1px, transparent 0);
    background-size: 50px 50px;
    background-position: 0 0;
  `;
  sunMoonParallax.appendChild(stars1);
 
  const stars2 = document.createElement('div');
  stars2.classList.add('stars');
  stars2.style.cssText = `
    position: absolute;
    inset: 0;
    opacity: 0;
    background-image: radial-gradient(white 1px, transparent 0);
    background-size: 80px 80px;
    background-position: 25px 25px;
  `;
  sunMoonParallax.appendChild(stars2);
 
  // Create clouds
  const cloud1 = document.createElement('div');
  cloud1.classList.add('cloud');
  cloud1.style.cssText = `
    position: absolute;
    left: 10%;
    top: 15%;
    width: 200px;
    height: 60px;
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.7);
    filter: blur(15px);
    transition: all 0.1s ease-out;
  `;
  sunMoonParallax.appendChild(cloud1);
 
  const cloud2 = document.createElement('div');
  cloud2.classList.add('cloud');
  cloud2.style.cssText = `
    position: absolute;
    right: 20%;
    top: 10%;
    width: 300px;
    height: 80px;
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.8);
    filter: blur(15px);
    transition: all 0.1s ease-out;
  `;
  sunMoonParallax.appendChild(cloud2);
 
  // Update function for parallax
  const updateParallax = () => {
    // Calculate scroll progress (0 to 1)
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(window.scrollY / scrollHeight, 1);
   
    // Update sky background color based on scroll progress
    sunMoonParallax.style.background = `linear-gradient(
      to bottom,
      rgba(135, 206, 250, ${1 - progress}) 0%,
      rgba(135, 180, 245, ${1 - progress * 0.9}) 20%,
      rgba(123, 104, 238, ${progress * 0.8}) 50%,
      rgba(72, 61, 139, ${progress * 0.9}) 80%,
      rgba(25, 25, 112, ${progress}) 100%
    )`;
   
    // Update sun position and opacity
    const sunYPosition = -10 + progress * 100; // Move from top to bottom
    const sunXPosition = 50 + progress * 20; // Slight horizontal movement
    const sunOpacity = 1 - progress * 1.2; // Fade out the sun
   
    sun.style.left = `${sunXPosition - 10}%`;
    sun.style.top = `${sunYPosition}%`;
    sun.style.opacity = sunOpacity;
   
    // Update moon position and opacity
    const moonYPosition = progress * 25; // Move from top as scroll progresses
    const moonXPosition = 20 - progress * 10; // Horizontal movement
    const moonOpacity = progress * 1.2; // Fade in the moon
   
    moon.style.right = `${moonXPosition}%`;
    moon.style.top = `${moonYPosition}%`;
    moon.style.opacity = moonOpacity;
    moon.childNodes.forEach(crater => {
      crater.style.opacity = moonOpacity;
    });
   
    // Update stars opacity
    const starsOpacity = Math.max(0, progress - 0.3) * 1.5;
    document.querySelectorAll('.stars').forEach(starsElement => {
      starsElement.style.opacity = starsOpacity;
    });
   
    // Update clouds
    cloud1.style.left = `${10 - progress * 30}%`;
    cloud1.style.opacity = Math.max(0, 0.9 - progress * 1.5);
    cloud1.style.transform = `scale(${1 + progress * 0.4})`;
   
    cloud2.style.right = `${20 - progress * 20}%`;
    cloud2.style.opacity = Math.max(0, 0.8 - progress * 1.5);
    cloud2.style.transform = `scale(${1 - progress * 0.3})`;
  };
 
  // Initial call
  updateParallax();
 
  // Add scroll event listener
  window.addEventListener('scroll', updateParallax);
}

// Card tilt effect
function initTiltEffect() {
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      scale: 1.03
    });
  }
}

// Portfolio tabs
function initPortfolioTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const caseStudyCards = document.querySelectorAll('.case-study-card');
 
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
     
      // Add active class to clicked button
      button.classList.add('active');
     
      // Get category
      const category = button.getAttribute('data-category');
     
      // Filter case studies
      caseStudyCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Testimonial slider
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
 
  if (!slides.length) return;
 
  let currentIndex = 0;
  let interval;
 
  const showSlide = (index) => {
    // Calculate the new index with wrap-around
    currentIndex = (index + slides.length) % slides.length;
   
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
   
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));
   
    // Show current slide and activate dot
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  };
 
  // Setup navigation
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
      resetInterval();
    });
   
    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
      resetInterval();
    });
  }
 
  // Setup dots navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetInterval();
    });
  });
 
  // Auto-rotate slides
  const startInterval = () => {
    interval = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 5000);
  };
 
  const resetInterval = () => {
    clearInterval(interval);
    startInterval();
  };
 
  // Initial setup
  startInterval();
}

// Contact form
function initContactForm() {
  const form = document.getElementById('contactForm');
 
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
     
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
     
      // Show success toast
      showToast('Message Sent!', 'We\'ll get back to you as soon as possible.', 'success');
     
      // Reset form
      form.reset();
    });
  }
}

// Card effect for hero section
function initCardEffect() {
  const card = document.querySelector('.card-3d');
  const heroSection = document.getElementById('hero');
 
  if (card && heroSection) {
    heroSection.addEventListener('mousemove', e => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
     
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
     
      const rotateY = (x - centerX) / 20;
      const rotateX = (centerY - y) / 20;
     
      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.05, 1.05, 1.05)
      `;
    });
   
    heroSection.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }
}

// Toast notification
function showToast(title, message, type = 'default') {
  const toastContainer = document.getElementById('toastContainer');
 
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
 
  toast.innerHTML = `
    <div class="toast-header">
      <div class="toast-title">${title}</div>
      <button class="toast-close">&times;</button>
    </div>
    <div class="toast-body">${message}</div>
  `;
 
  toastContainer.appendChild(toast);
 
  // Auto-dismiss after 5 seconds
  const dismissTimeout = setTimeout(() => {
    toast.remove();
  }, 5000);
 
  // Close button
  const closeButton = toast.querySelector('.toast-close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      clearTimeout(dismissTimeout);
      toast.remove();
    });
  }
}
