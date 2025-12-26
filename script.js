// Simple interactive behavior: burger menu + fake EmailJS send (client-side mock)
document.addEventListener('DOMContentLoaded', function(){
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  if(burger) burger.addEventListener('click', ()=> {
    if(nav.style.display === 'block') nav.style.display = '';
    else nav.style.display = 'block';
  });
});

function sendEmail(e){
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  // Mock send: validate and show success
  const formData = new FormData(form);
  if(!formData.get('name') || !formData.get('email') || !formData.get('message')){
    msg.textContent = 'Por favor completa todos los campos.';
    return;
  }
  msg.textContent = 'Enviando...';
  setTimeout(()=> {
    msg.textContent = '¡Mensaje enviado! Te responderé pronto.';
    form.reset();
  }, 900);
}
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const serviceID = "service_738kgm9";
  const templateID = "template_5hmdrqd";

  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  emailjs.send(serviceID, templateID, params)
    .then(() => {
      document.getElementById("status").innerText = "Mensaje enviado correctamente 🎉";
      document.getElementById("contactForm").reset();
    })
    .catch((err) => {
      document.getElementById("status").innerText = "Error al enviar ❌";
      console.error("Error:", err);
    });
});
