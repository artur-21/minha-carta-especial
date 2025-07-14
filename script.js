// Data de referência: 16 de maio de 2024
const startDate = new Date('2024-05-16T00:00:00');

// Elementos do DOM
const envelopeContainer = document.getElementById('envelope-container');
const letterContainer = document.getElementById('letter-container');
const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');
const photoModal = document.getElementById('photo-modal');
const modalImage = document.getElementById('modal-image');

// Estado da música
let musicPlaying = false;

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Configurar evento de clique no envelope
    envelopeContainer.addEventListener('click', openLetter);
    
    // Configurar controle de música
    musicToggle.addEventListener('click', toggleMusic);
    
    // Iniciar contador
    updateCounter();
    setInterval(updateCounter, 1000);
    
    // Configurar modal de fotos
    setupPhotoModal();
});

// Função para abrir a carta
function openLetter() {
    // Adicionar classe de animação ao envelope
    const envelope = document.querySelector('.envelope');
    envelope.classList.add('envelope-opening');
    
    // Aguardar animação e mostrar carta
    setTimeout(() => {
        envelopeContainer.style.display = 'none';
        letterContainer.classList.remove('hidden');
        
        // Tentar tocar música automaticamente
        tryAutoplayMusic();
    }, 800);
}

// Função para tentar tocar música automaticamente
function tryAutoplayMusic() {
    // Nota: Muitos navegadores bloqueiam autoplay de áudio
    // Esta função tenta tocar, mas pode falhar devido às políticas do navegador
    backgroundMusic.play().then(() => {
        musicPlaying = true;
        updateMusicButton();
    }).catch(() => {
        // Autoplay falhou, usuário precisará clicar no botão
        console.log('Autoplay bloqueado pelo navegador');
    });
}

// Função para alternar música
function toggleMusic() {
    if (musicPlaying) {
        backgroundMusic.pause();
        musicPlaying = false;
    } else {
        backgroundMusic.play().then(() => {
            musicPlaying = true;
        }).catch((error) => {
            console.log('Erro ao tocar música:', error);
        });
    }
    updateMusicButton();
}

// Função para atualizar botão de música
function updateMusicButton() {
    if (musicPlaying) {
        musicToggle.innerHTML = '⏸️';
        musicToggle.title = 'Pausar música';
    } else {
        musicToggle.innerHTML = '🎵';
        musicToggle.title = 'Tocar música';
    }
}

// Função para atualizar contador em tempo real
function updateCounter() {
    const now = new Date();
    const difference = now - startDate;
    
    // Calcular tempo decorrido
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Atualizar elementos na página
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Função para configurar modal de fotos
function setupPhotoModal() {
    // Fechar modal ao clicar fora da imagem
    photoModal.addEventListener('click', function(e) {
        if (e.target === photoModal) {
            closeModal();
        }
    });
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !photoModal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// Função para abrir modal com foto
function openModal(imageSrc) {
    modalImage.src = imageSrc;
    photoModal.classList.remove('hidden');
    
    // Prevenir scroll do body quando modal está aberto
    document.body.style.overflow = 'hidden';
}

// Função para fechar modal
function closeModal() {
    photoModal.classList.add('hidden');
    modalImage.src = '';
    
    // Restaurar scroll do body
    document.body.style.overflow = 'auto';
}

// Função para adicionar efeitos de hover nas fotos
document.addEventListener('DOMContentLoaded', function() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Função para adicionar efeito de digitação ao texto (opcional)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Função para adicionar partículas de coração (efeito especial)
function createHeartParticles() {
    const heartsContainer = document.createElement('div');
    heartsContainer.style.position = 'fixed';
    heartsContainer.style.top = '0';
    heartsContainer.style.left = '0';
    heartsContainer.style.width = '100%';
    heartsContainer.style.height = '100%';
    heartsContainer.style.pointerEvents = 'none';
    heartsContainer.style.zIndex = '999';
    document.body.appendChild(heartsContainer);
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.opacity = '0.8';
            heart.style.animation = `floatUp ${3 + Math.random() * 2}s ease-out forwards`;
            
            heartsContainer.appendChild(heart);
            
            // Remover coração após animação
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 5000);
        }, i * 200);
    }
    
    // Remover container após todas as animações
    setTimeout(() => {
        if (heartsContainer.parentNode) {
            heartsContainer.parentNode.removeChild(heartsContainer);
        }
    }, 6000);
}

// Adicionar CSS para animação dos corações
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Ativar efeito de corações quando a carta for aberta
function openLetter() {
    // Código existente...
    const envelope = document.querySelector('.envelope');
    envelope.classList.add('envelope-opening');
    
    setTimeout(() => {
        envelopeContainer.style.display = 'none';
        letterContainer.classList.remove('hidden');
        
        // Efeito de corações
        createHeartParticles();
        
        // Tentar tocar música automaticamente
        tryAutoplayMusic();
    }, 800);
}

// Adicionar efeito de brilho ao passar mouse sobre elementos importantes
document.addEventListener('DOMContentLoaded', function() {
    const importantElements = document.querySelectorAll('.bible-verse, .signature, .counter-section');
    
    importantElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.5)';
            this.style.transition = 'box-shadow 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});

// Função para detectar se é dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamentos para mobile
if (isMobile()) {
    // Reduzir efeitos de hover em dispositivos móveis
    document.addEventListener('DOMContentLoaded', function() {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .photo-item:hover {
                    transform: none !important;
                }
                .envelope-container:hover {
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    });
}

