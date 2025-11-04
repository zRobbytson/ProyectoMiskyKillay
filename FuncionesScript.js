/* ========================================
   MISKY KILLAY - JAVASCRIPT
   Repostería Artesanal
======================================== */

// ===== ESPERAR A QUE EL DOM ESTÉ LISTO =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENÚ HAMBURGUESA =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú al hacer click en hamburguesa
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ===== SCROLL SUAVE PARA ENLACES =====
    // Ya está manejado por CSS con scroll-behavior: smooth
    // Pero podemos agregar un offset para el navbar fijo
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== NAVBAR CON SOMBRA AL HACER SCROLL =====
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Agregar clase cuando se hace scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ===== ANIMACIÓN DE APARICIÓN DE ELEMENTOS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar tarjetas de productos
    const productoCards = document.querySelectorAll('.producto-card');
    productoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observar tarjetas de contacto
    const contactoCards = document.querySelectorAll('.contacto-card');
    contactoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // ===== PLACEHOLDER PARA IMÁGENES =====
    // Si una imagen no carga, mostrar un placeholder con color
    const productImages = document.querySelectorAll('.producto-image img');
    
    productImages.forEach(img => {
        img.addEventListener('error', function() {
            // Crear un placeholder con el nombre del producto
            const card = this.closest('.producto-card');
            const productoNombre = card.querySelector('.producto-nombre').textContent;
            const imageContainer = this.parentElement;
            
            // Ocultar la imagen rota
            this.style.display = 'none';
            
            // Crear un div placeholder
            const placeholder = document.createElement('div');
            placeholder.style.width = '100%';
            placeholder.style.height = '100%';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.background = 'linear-gradient(135deg, #B8C5E0 0%, #E6E8F5 100%)';
            placeholder.style.color = '#2C3E5F';
            placeholder.style.fontSize = '3rem';
            placeholder.innerHTML = '🧁';
            
            imageContainer.appendChild(placeholder);
        });
    });

    // ===== EFECTO PARALLAX SUAVE EN HERO =====
    const heroSection = document.querySelector('.hero');
    const decorativeElements = document.querySelector('.decorative-elements');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        if (heroSection && scrollPosition < window.innerHeight) {
            decorativeElements.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });

    // ===== CONTADOR DE PRODUCTOS =====
    const contarProductos = function() {
        const totalProductos = document.querySelectorAll('.producto-card').length;
        console.log(`Total de productos disponibles: ${totalProductos}`);
    };
    contarProductos();

    // ===== BOTÓN SCROLL TO TOP (OPCIONAL) =====
    // Crear botón para volver arriba
    const createScrollTopButton = function() {
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.innerHTML = '↑';
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #4A5F8C;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 998;
            box-shadow: 0 4px 15px rgba(74, 95, 140, 0.3);
        `;

        document.body.appendChild(scrollTopBtn);

        // Mostrar/ocultar según scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
            }
        });

        // Click para volver arriba
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effect
        scrollTopBtn.addEventListener('mouseenter', function() {
            this.style.background = '#2C3E5F';
            this.style.transform = 'translateY(-5px)';
        });

        scrollTopBtn.addEventListener('mouseleave', function() {
            this.style.background = '#4A5F8C';
            this.style.transform = 'translateY(0)';
        });
    };

    // Descomentar la siguiente línea si quieres el botón scroll to top
    //createScrollTopButton();

    // ===== PRELOADER (OPCIONAL) =====
    // Animación de carga inicial
    const showPreloader = function() {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #E6E8F5;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        preloader.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 1rem; animation: bounce 1s infinite;">🧁</div>
                <p style="color: #2C3E5F; font-size: 1.2rem; font-weight: 600;">Cargando Misky Killay...</p>
            </div>
        `;

        // Agregar animación bounce
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);

        document.body.insertBefore(preloader, document.body.firstChild);

        // Ocultar después de cargar
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 500);
        });
    };

    // Descomentar la siguiente línea si quieres el preloader
    showPreloader();

    // ===== VALIDACIÓN Y TRACKING (OPCIONAL) =====
    // Tracking de clicks en botones de WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Click en WhatsApp - Usuario interesado en hacer pedido');
            // Aquí podrías agregar Google Analytics o Facebook Pixel
        });
    });

    // Tracking de clicks en redes sociales
    const socialLinks = document.querySelectorAll('.social-link, .contacto-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.textContent.trim();
            console.log(`Click en red social: ${platform}`);
        });
    });

    // ===== EFECTO DE CURSOR PERSONALIZADO (OPCIONAL) =====
    // Solo en desktop
    if (window.innerWidth > 768) {
        const createCustomCursor = function() {
            const cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            cursor.style.cssText = `
                width: 20px;
                height: 20px;
                border: 2px solid #C9A961;
                border-radius: 50%;
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.2s ease;
                display: none;
            `;
            document.body.appendChild(cursor);

            document.addEventListener('mousemove', (e) => {
                cursor.style.display = 'block';
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });

            // Efecto en links y botones
            const interactiveElements = document.querySelectorAll('a, button, .producto-card');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(1.5)';
                    cursor.style.background = 'rgba(201, 169, 97, 0.2)';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                    cursor.style.background = 'transparent';
                });
            });
        };
        // Descomentar si quieres cursor personalizado
        //createCustomCursor();
    }

    // ===== MENSAJE DE CONSOLA =====
    console.log('%c🧁 Misky Killay - Dulce Néctar de la Luna Andina 🌙', 
                'color: #C9A961; font-size: 20px; font-weight: bold;');
    console.log('%cPágina web cargada correctamente ✨', 
                'color: #4A5F8C; font-size: 14px;');

    // ===== ACTUALIZACIÓN DE AÑO EN FOOTER =====
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.innerHTML = `&copy; ${currentYear} Misky Killay. Todos los derechos reservados.`;
    }

}); // Fin de DOMContentLoaded