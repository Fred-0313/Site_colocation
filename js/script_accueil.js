      // ========================================
      // ANIMATION DES COMPTEURS DE STATISTIQUES
      // ========================================
      
      /**
       * Anime un compteur de 0 jusqu'à sa valeur cible
       * @param {HTMLElement} element - L'élément DOM contenant le nombre
       */
      function animateCounter(element) {
        // Récupère la valeur cible depuis l'attribut data-target
        const target = parseInt(element.getAttribute("data-target"));
        const duration = 2000; // Durée de l'animation en ms
        const step = target / (duration / 16); // Incrément par frame (60fps)
        let current = 0;

        // Intervalle qui s'exécute toutes les 16ms (~60fps)
        const timer = setInterval(() => {
          current += step;
          
          // Si on atteint ou dépasse la cible
          if (current >= target) {
            element.textContent = target.toLocaleString(); // Affiche avec séparateurs de milliers
            clearInterval(timer); // Arrête l'animation
          } else {
            element.textContent = Math.floor(current).toLocaleString();
          }
        }, 16);
      }

      // ========================================
      // OBSERVER POUR DÉCLENCHER L'ANIMATION AU SCROLL
      // ========================================
      
      /**
       * Observer d'intersection: détecte quand un élément devient visible
       * Lance l'animation des compteurs une seule fois
       */
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // Si la section devient visible
          if (entry.isIntersecting) {
            // Anime tous les compteurs de la section
            const counters = entry.target.querySelectorAll(".stat-number");
            counters.forEach((counter) => animateCounter(counter));
            
            // Arrête d'observer pour ne pas réanimer
            observer.unobserve(entry.target);
          }
        });
      });

      // Cible la section stats et commence à l'observer
      const statsSection = document.querySelector(".stats");
      if (statsSection) {
        observer.observe(statsSection);
      }

      // ========================================
      // GESTION DES ONGLETS DE CATÉGORIES
      // ========================================
      
      /**
       * Gère le clic sur les onglets de catégories
       * Active visuellement l'onglet cliqué
       */
      document.querySelectorAll(".tab").forEach((tab) => {
        tab.addEventListener("click", function () {
          // Retire la classe active de tous les onglets
          document
            .querySelectorAll(".tab")
            .forEach((t) => t.classList.remove("active"));
          
          // Ajoute la classe active à l'onglet cliqué
          this.classList.add("active");
          
          // Log pour debug (à remplacer par un vrai filtre)
          console.log("Catégorie sélectionnée:", this.textContent.trim());
        });
      });

      // ========================================
      // GESTION DU FORMULAIRE DE RECHERCHE
      // ========================================
      
      /**
       * Intercepte la soumission du formulaire de recherche
       * Empêche le rechargement de page et affiche les critères
       */
      document.querySelector(".search-form").addEventListener("submit", (e) => {
        e.preventDefault(); // Empêche le comportement par défaut
        
        // Récupère les valeurs des champs
        const location = document.getElementById("searchLocation").value;
        const type = document.getElementById("searchType").value;
        const budget = document.getElementById("searchBudget")?.value; // Optional chaining car ce champ n'existe pas dans le HTML

        // Log pour debug
        console.log("Recherche:", { location, type, budget });
        
        // Affiche une alerte (à remplacer par une vraie recherche)
        alert(
          `🔍 Recherche lancée !\nLieu: ${location || "Tout le Bénin"}\nType: ${
            type || "Tous"
          }\nBudget: ${budget || "Non spécifié"}`
        );
      });

      // ========================================
      // GESTION DES BOUTONS FAVORIS (CŒURS)
      // ========================================
      
      /**
       * Toggle le statut favori d'une annonce
       * Change entre cœur vide ♡ et cœur plein ♥
       */
      document.querySelectorAll(".favorite-btn").forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation(); // Empêche le clic de se propager à la carte
          
          // Toggle entre cœur vide et plein
          this.textContent = this.textContent === "♡" ? "♥" : "♡";
          
          // Change la couleur (rouge si favori, noir sinon)
          this.style.color = this.textContent === "♥" ? "#EF4444" : "#000";
        });
      });

      // ========================================
      // GESTION DES CLICS SUR LES CARTES D'ANNONCES
      // ========================================
      
      /**
       * Redirige vers la page de détails d'une annonce
       * (actuellement une alerte, à remplacer par une vraie navigation)
       */
      document.querySelectorAll(".property-card").forEach((card) => {
        card.addEventListener("click", function () {
          // Récupère le titre de l'annonce
          const title = this.querySelector(".property-title").textContent;
          
          console.log("Bien sélectionné:", title);
          
          // Alerte temporaire (à remplacer par: window.location.href = `/annonce/${id}`)
          alert(
            `📋 Détails du bien:\n${title}\n\n(Page de détails en construction)`
          );
        });
      });

      // ========================================
      // SMOOTH SCROLL POUR LES ANCRES
      // ========================================
      
      /**
       * Ajoute un défilement fluide pour tous les liens d'ancre (#)
       */
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault(); // Empêche le saut brusque
          
          // Trouve l'élément cible
          const target = document.querySelector(this.getAttribute("href"));
          
          if (target) {
            // Défile vers l'élément avec animation
            target.scrollIntoView({ behavior: "smooth" });
          }
        });
      });

      // ========================================
      // ANIMATION D'APPARITION AU SCROLL
      // ========================================
      
      /**
       * Observer pour animer les éléments quand ils deviennent visibles
       * Effet de fondu et glissement vertical
       */
      const animateOnScroll = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Quand l'élément entre dans le viewport
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }
          });
        },
        { threshold: 0.1 } // Se déclenche quand 10% de l'élément est visible
      );

      // Applique l'animation aux cartes
      document
        .querySelectorAll(".property-card, .feature-card, .testimonial-card")
        .forEach((el) => {
          // État initial (invisible et décalé vers le bas)
          el.style.opacity = "0";
          el.style.transform = "translateY(30px)";
          el.style.transition = "all 0.6s ease-out";
          
          // Commence à observer l'élément
          animateOnScroll.observe(el);
        });
        // ========================================
// GESTION DU MENU BURGER MOBILE
// ========================================

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Toggle du menu au clic
menuToggle.addEventListener('click', function() {
  this.classList.toggle('active');
  navLinks.classList.toggle('mobile-active');
  
  // Bloque le scroll du body quand menu ouvert
  document.body.style.overflow = navLinks.classList.contains('mobile-active') 
    ? 'hidden' 
    : 'auto';
});

// Ferme le menu si on clique sur un lien
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function() {
    if (window.innerWidth <= 1024) {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('mobile-active');
      document.body.style.overflow = 'auto';
    }
  });
});

// Ferme le menu si on redimensionne vers desktop
window.addEventListener('resize', function() {
  if (window.innerWidth > 1024) {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('mobile-active');
    document.body.style.overflow = 'auto';
  }
});
