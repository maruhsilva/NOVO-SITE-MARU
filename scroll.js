// Inicializar ScrollReveal (Mantendo o que você já tinha, mas ajustado)
window.sr = ScrollReveal({ reset: true });

sr.reveal('.home-content', { duration: 2000, origin: 'top', distance: '50px' });
sr.reveal('.descricao-content', { duration: 2000, delay: 200 });
sr.reveal('.galeria-projetos', { duration: 2000 });
sr.reveal('.glass-form', { duration: 2000, origin: 'right', distance: '50px' });

// --- Lógica do Carrossel (SWIPER JS) ---
var swiper = new Swiper(".mySwiper", {
    // Configuração Padrão (Mobile First) - Efeito 3D
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    initialSlide: 1, // Começa no slide do meio (Mais Popular)
    coverflowEffect: {
        rotate: 20, // Reduzi um pouco a rotação para ficar mais clean
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false, // Removi as sombras que escurecem os laterais
    },
    
    // Paginação
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    // A mágica acontece aqui nos Breakpoints
    breakpoints: {
        // Celular (mantém o coverflow acima)
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        // Tablet
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        // PC / Desktop - MUDANÇA IMPORTANTE
        1024: {
            effect: "slide", // Desliga o 3D e vira um slide normal lateral
            centeredSlides: false, // Não força o centro
            slidesPerView: 3, // Mostra os 3 lado a lado
            spaceBetween: 40,
            grabCursor: false, // Tira a "mãozinha" de arrastar no PC se preferir
        }
    }  
});

/* --- Menu Mobile Funcional --- */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a'); // Seleciona os links

// 1. Abrir / Fechar ao clicar no ícone
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Troca o ícone: Se tem 'active', vira X. Se não, vira Barras.
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark'); // Ícone de fechar do FontAwesome
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// 2. Fechar o menu automaticamente ao clicar em um link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Fecha o menu
        navLinks.classList.remove('active');
        
        // Volta o ícone para "Barras"
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

/* --- Fechar ao clicar fora (Click Outside) --- */
document.addEventListener('click', (event) => {
    // Verifica se o menu está aberto
    const isMenuOpen = navLinks.classList.contains('active');
    
    // Verifica se o clique foi DENTRO do menu
    const clickedInsideMenu = navLinks.contains(event.target);
    
    // Verifica se o clique foi no BOTÃO (para não dar conflito com o toggle)
    const clickedOnToggle = menuToggle.contains(event.target);

    // Lógica: Se está aberto E o clique NÃO foi no menu E NEM no botão...
    if (isMenuOpen && !clickedInsideMenu && !clickedOnToggle) {
        
        // Fecha o menu
        navLinks.classList.remove('active');
        
        // Reseta o ícone para "Barras"
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

/* --- Navegação que aparece ao rolar (Sticky Reveal) --- */
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    // Pega a altura da janela (que é a altura da section Home 100vh)
    const homeHeight = window.innerHeight;
    
    // Pega o quanto o usuário já rolou
    const scrollPosition = window.scrollY;

    // Se rolou mais que 80% da altura da home, mostra a nav
    // (Usei 0.8 para a nav aparecer um pouquinho antes de chegar em Projetos)
    if (scrollPosition > homeHeight * 0.8) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
        // Fecha o menu mobile se o usuário voltar para o topo (opcional, mas recomendado)
        document.querySelector('.nav-links').classList.remove('active');
        const icon = document.querySelector('.menu-toggle i');
        if(icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }
});