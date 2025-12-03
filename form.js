document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('whatsapp-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const tel = document.getElementById('tel').value;
        const mensagem = document.getElementById('mensagem').value; // Captura a mensagem

        const seuNumero = "5512981032151"; 

        // Monta o texto incluindo a mensagem do cliente
        const texto = `*Olá! Vim pelo site MS WebWork.*%0A%0A` +
                      `*Nome:* ${nome}%0A` +
                      `*Email:* ${email}%0A` +
                      `*WhatsApp:* ${tel}%0A%0A` +
                      `*Mensagem:*%0A${mensagem}`; // Adiciona a mensagem aqui

        const linkWhatsApp = `https://wa.me/${seuNumero}?text=${texto}`;
        
        window.open(linkWhatsApp, '_blank');
    });
});