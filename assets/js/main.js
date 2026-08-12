//Funcion de icono de contacto en header 
function sendMail() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Inicialización de EmailJS con tu Public Key
(function () {
  emailjs.init("eGFEOpbKyzXnRq8Lo");
})();

// Control del envío del formulario
async function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const btnSubmit = document.getElementById('btnSubmit');

  // Verificación Honeypot Anti-Spam
  const botCheck = document.getElementById('honeypot').value;
  if (botCheck !== "") {
    showAlert('¡Mensaje enviado con éxito!', 'alert-success');
    form.reset();
    return;
  }

  // Feedback visual en el botón
  btnSubmit.disabled = true;
  btnSubmit.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...`;

  const serviceID = "service_b9gafiy";
  const templateID = "template_81wfh71";

  try {
    await emailjs.sendForm(serviceID, templateID, form);
    showAlert('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.', 'alert-success');
    form.reset();
  } catch (error) {
    showAlert('Ocurrió un problema al enviar el mensaje. Inténtalo de nuevo.', 'alert-danger');
    console.error('EmailJS Error:', error);
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.innerHTML = `<i class="bi bi-send me-2"></i>Enviar Mensaje`;
  }
}

function showAlert(message, typeClass) {
  const alertBox = document.getElementById('contactAlert');
  if (alertBox) {
    alertBox.className = `alert ${typeClass} text-center py-2 px-3 small rounded mb-3`;
    alertBox.textContent = message;
    alertBox.classList.remove('d-none');
  }
}

// 4. Función para abrir y cargar imágenes en el Modal
function openProjectModal(images, title) {
  document.getElementById('imageModalLabel').textContent = title || 'Vista Previa';

  const singleContainer = document.getElementById('singleImageContainer');
  const carouselContainer = document.getElementById('modalCarousel');
  const singleImg = document.getElementById('modalSingleImage');
  const carouselInner = document.getElementById('carouselInner');
  const carouselIndicators = document.getElementById('carouselIndicators');

  // Limpiar contenido previo
  carouselInner.innerHTML = '';
  carouselIndicators.innerHTML = '';

  if (images.length === 1) {
    singleImg.src = images[0];
    singleContainer.classList.remove('d-none');
    carouselContainer.classList.add('d-none');
  } else {
    singleContainer.classList.add('d-none');
    carouselContainer.classList.remove('d-none');

    images.forEach((src, index) => {
      const isActive = index === 0 ? 'active' : '';

      carouselIndicators.innerHTML += `
        <button type="button" data-bs-target="#modalCarousel" data-bs-slide-to="${index}" class="${isActive}" aria-current="${index === 0 ? 'true' : 'false'}"></button>
      `;

      carouselInner.innerHTML += `
        <div class="carousel-item ${isActive}">
          <img src="${src}" class="img-fluid rounded border border-secondary" alt="Preview ${index + 1}" style="max-height: 75vh; width: 100%; object-fit: contain;">
        </div>
      `;
    });

    const carouselElement = document.getElementById('modalCarousel');
    const carouselInstance = bootstrap.Carousel.getOrCreateInstance(carouselElement);
    carouselInstance.to(0);
  }
}

// 5. Función de filtrado para las tarjetas de proyectos
function filterProjects(category, button) {
  const filterBtns = document.querySelectorAll('.btn-filter');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  const items = document.querySelectorAll('.project-item');
  items.forEach(item => {
    const itemCategory = item.getAttribute('data-category');
    if (category === 'all' || itemCategory === category) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  });
}

// 6. Inicialización segura de eventos una vez cargado el DOM
document.addEventListener('DOMContentLoaded', () => {

  // Inicializar animaciones de AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false
    });
  }

  // Menú Navegación Móvil
  const mobileToggle = document.querySelector('.mobile-nav-toggle') || document.getElementById('mobileToggle');
  const header = document.getElementById('header');
  const overlay = document.querySelector('.mobile-nav-overlay');

  if (mobileToggle && header) {
    mobileToggle.addEventListener('click', function () {
      header.classList.toggle('header-show');
      document.body.classList.toggle('mobile-nav-active'); // Bloquea/Desbloquea el scroll de la página

      const icon = this.querySelector('i') || this;
      icon.classList.toggle('bi-list');
      icon.classList.toggle('bi-x');
    });

    // Cerrar el menú al hacer clic en un enlace
    document.querySelectorAll('#navbar a').forEach(navLink => {
      navLink.addEventListener('click', () => {
        if (header.classList.contains('header-show')) {
          header.classList.remove('header-show');
          const icon = mobileToggle.querySelector('i') || mobileToggle;
          icon.classList.add('bi-list');
          icon.classList.remove('bi-x');
        }
      });
    });

    // Cerrar al hacer clic en overlay
    if (overlay) {
      overlay.addEventListener('click', () => {
        header.classList.remove('header-show');
        const icon = mobileToggle.querySelector('i') || mobileToggle;
        icon.classList.add('bi-list');
        icon.classList.remove('bi-x');
      });
    }
  }
});
