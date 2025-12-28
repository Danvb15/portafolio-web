// Datos de proyectos
const projects = [
    {
        id: 1,
        title: "game retro",
        description: "Plataforma de comercio electrónico completa con carrito, pagos y panel administrativo.",
        category: "game",
        image: "🐍💻",
        tags: ["python","pygame"],
        demo: "https://danvb15.itch.io/juego-retro",
        code: "https://danvb15.itch.io/juego-retro",
        details: "Desarrollé un juego indie retro utilizando Python y Pygame. Implementé mecánicas clásicas de plataformas, niveles desafiantes y un sistema de puntuación. El juego cuenta con gráficos pixel art y música chiptune para una experiencia nostálgica."
    },
    {
        id: 2,
        title: "App web de ventas con acceso directo a whatsapp",
        description: "Aplicación móvil para gestionar citas y servicios en barberías.",
        category: "web",
        image: "💈",
        tags: ["html", "css", "javascript"],
        demo: "https://danvb15.github.io/pagina-cliente/",
        code: "https://github.com/Danvb15/pagina-cliente",
        details: "Sistema de gestión financiera personal con visualización de datos en tiempo real. Implementé gráficos interactivos, categorización automática de gastos y exportación de reportes en PDF."
    },
    {
        id: 3,
        title: "pagina web de restaurante",
        description: "pagina web de restaurante con menu interactivo y sistema de reservas.",
        category: "web",
        image: "🍽️",
        tags: ["html", "css", "javascript"],
        demo: "https://danvb15.github.io/restaurant-page/",
        code: "https://github.com/Danvb15/restaurant-page",
        details: "Red social especializada para desarrolladores con funcionalidades como compartir código, comentar proyectos y chat en tiempo real. Implementé sistema de autenticación y notificaciones push."
    },
    {
        id: 4,
        title: "App de Delivery de Comida",
        description: "Aplicación móvil para pedir comida con seguimiento en tiempo real.",
        category: "mobile",
        image: "🍔",
        tags: ["html", "css", "javascript"],
        demo: "https://danvb15.github.io/fast-food/",
        code: "https://github.com/Danvb15/fast-food",
        details: "Aplicación web progresiva (PWA) para pedidos de comida. Incluye menú interactivo, sistema de pagos y seguimiento en tiempo real del pedido. Optimizada para rendimiento y experiencia de usuario."
    },
    {
        id: 5,
        title: "calculadora de gastos",
        description: "dashboard personal de finanzas y gastos.",
        category: "dashboard",
        image: "💹💰",
        tags: ["Chart.js, Font Awesome, HTML5, CSS3, JavaScript"],
        demo: "https://danvb15.github.io/calculadora-de-gastos/",
        code: "https://github.com/Danvb15/calculadora-de-gastos",
        details: "Dashboard empresarial con visualización de datos complejos. Implementé gráficos interactivos, exportación de reportes y sistema de alertas basado en umbrales configurables."
    },
    {
        id: 6,
        title: "ferreteria online",
        description: "Plataforma de marketplace para productos de ferretería.",
        category: "web",
        image: "🔧",
        tags: ["html", "css", "javascript"],
        demo: "https://danvb15.github.io/ferreteria/",
        code: "https://github.com/Danvb15/ferreteria",
        details: "Marketplace completo con sistema de reservas, pagos seguros, calendario integrado y sistema de reseñas. Optimizado para SEO y rendimiento."
    }
];

// Estado de la aplicación
let currentFilter = 'all';
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const projectsGrid = document.getElementById('projectsGrid');
const projectModal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const contactForm = document.getElementById('contactForm');
const filterButtons = document.querySelectorAll('.filter-btn');
const statNumbers = document.querySelectorAll('.stat-number');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar proyectos
    loadProjects();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Iniciar animaciones de estadísticas
    initStatsAnimation();
    
    // Iniciar animaciones de habilidades
    initSkillsAnimation();
});

// Configurar event listeners
function setupEventListeners() {
    // Menú móvil
    menuToggle.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Filtros de proyectos
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            setActiveFilter(button, filter);
        });
    });
    
    // Cerrar modal
    document.querySelector('.close-modal').addEventListener('click', () => {
        projectModal.classList.remove('active');
    });
    
    // Cerrar modal al hacer clic fuera
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
        }
    });
    
    // Formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Menú móvil
function toggleMenu() {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Cargar proyectos
function loadProjects() {
    const filteredProjects = currentFilter === 'all' 
        ? projects 
        : projects.filter(project => project.category === currentFilter);
    
    projectsGrid.innerHTML = '';
    
    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category);
        projectCard.innerHTML = `
            <div class="project-image">
                ${project.image}
            </div>
            <div class="project-info">
                <span class="project-category">${getCategoryName(project.category)}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <button class="btn btn-primary view-project" data-id="${project.id}">
                        Ver Detalles
                    </button>
                    <a href="${project.code}" target="_blank" class="btn btn-secondary">
                        <i class="fab fa-github"></i> Código
                    </a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
    
    // Agregar event listeners a los botones de proyectos
    document.querySelectorAll('.view-project').forEach(button => {
        button.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-id'));
            openProjectModal(projectId);
        });
    });
}

// Obtener nombre de categoría
function getCategoryName(category) {
    const categories = {
        'web': 'Web',
        'mobile': 'Móvil',
        'ecommerce': 'E-commerce',
        'dashboard': 'Dashboard'
    };
    return categories[category] || category;
}

// Establecer filtro activo
function setActiveFilter(clickedButton, filter) {
    // Remover clase active de todos los botones
    filterButtons.forEach(button => button.classList.remove('active'));
    
    // Agregar clase active al botón clickeado
    clickedButton.classList.add('active');
    
    // Actualizar filtro actual y recargar proyectos
    currentFilter = filter;
    loadProjects();
}

// Abrir modal de proyecto
function openProjectModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    modalBody.innerHTML = `
        <div class="modal-project">
            <div class="modal-header">
                <span class="project-category">${getCategoryName(project.category)}</span>
                <h2>${project.title}</h2>
            </div>
            <div class="modal-image">
                ${project.image}
            </div>
            <div class="modal-content">
                <div class="modal-description">
                    <h3>Descripción</h3>
                    <p>${project.details}</p>
                </div>
                <div class="modal-technologies">
                    <h3>Tecnologías</h3>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="modal-links">
                    <a href="${project.demo}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i> Ver Demo
                    </a>
                    <a href="${project.code}" target="_blank" class="btn btn-secondary">
                        <i class="fab fa-github"></i> Ver Código
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Aplicar estilos al modal
    const style = document.createElement('style');
    style.textContent = `
        .modal-project {
            padding: 20px;
        }
        
        .modal-header {
            margin-bottom: 30px;
        }
        
        .modal-header h2 {
            font-size: 2rem;
            margin-top: 10px;
            color: var(--dark);
        }
        
        .modal-image {
            height: 300px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: var(--border-radius);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 8rem;
            margin-bottom: 30px;
            color: white;
        }
        
        .modal-content h3 {
            font-size: 1.5rem;
            margin: 25px 0 15px;
            color: var(--dark);
        }
        
        .modal-description p {
            line-height: 1.8;
            color: var(--gray);
            margin-bottom: 20px;
        }
        
        .modal-links {
            display: flex;
            gap: 15px;
            margin-top: 30px;
            flex-wrap: wrap;
        }
    `;
    
    // Remover estilos anteriores
    const oldStyle = document.querySelector('#modal-styles');
    if (oldStyle) oldStyle.remove();
    
    style.id = 'modal-styles';
    document.head.appendChild(style);
    
    // Mostrar modal
    projectModal.classList.add('active');
}

// Formulario de contacto
function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validación básica
    if (!name || !email || !subject || !message) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor ingresa un email válido', 'error');
        return;
    }
    
    // Simular envío
    showNotification('Enviando mensaje...', 'info');
    
    setTimeout(() => {
        // Resetear formulario
        contactForm.reset();
        
        // Mostrar confirmación
        showNotification('¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
        
        // En un caso real, aquí enviarías los datos a un servidor
        console.log('Mensaje de contacto:', { name, email, subject, message });
    }, 1500);
}

// Animación de estadísticas
function initStatsAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    animateCounter(stat, target);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.about-stats'));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Dividir en 50 pasos
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 30);
}

// Animación de habilidades
function initSkillsAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillProgressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = `${width}%`;
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(document.querySelector('.skills'));
}

// Mostrar notificaciones
function showNotification(message, type) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos para la notificación
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 25px;
            border-radius: var(--border-radius);
            color: white;
            font-weight: 600;
            z-index: 3000;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
            box-shadow: var(--shadow);
            max-width: 400px;
        }
        
        .notification.success {
            background-color: #4CAF50;
        }
        
        .notification.error {
            background-color: #f44336;
        }
        
        .notification.info {
            background-color: var(--primary);
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Remover notificación después de 3 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
            document.head.removeChild(style);
        }
    }, 3000);
}

// Efecto de escritura en el título (opcional)
function initTypewriter() {
    const titleElement = document.querySelector('.hero-text .title');
    if (!titleElement) return;
    
    const text = titleElement.textContent;
    titleElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            titleElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Iniciar cuando la sección hero sea visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setTimeout(typeWriter, 500);
            observer.unobserve(entries[0].target);
        }
    });
    
    observer.observe(document.querySelector('.hero'));
}

// Inicializar efecto de escritura cuando la página cargue
window.addEventListener('load', initTypewriter);