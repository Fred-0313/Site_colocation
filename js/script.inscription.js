// ==================== SWITCH FORMS ====================
    function switchForm(formName) {
      const forms = document.querySelectorAll(".form-container");
      forms.forEach((form) => form.classList.remove("active"));

      if (formName === "login") {
        document.getElementById("loginForm").classList.add("active");
      } else if (formName === "register") {
        document.getElementById("registerForm").classList.add("active");
      } else if (formName === "forgot") {
        document.getElementById("forgotPasswordForm").classList.add("active");
      }
    }

    function showForgotPassword() {
      switchForm("forgot");
    }

    // ==================== PASSWORD TOGGLE ====================
    function togglePassword(inputId) {
      const input = document.getElementById(inputId);
      const btn = input.nextElementSibling;

      if (input.type === "password") {
        input.type = "text";
        btn.textContent = "🙈";
      } else {
        input.type = "password";
        btn.textContent = "👁️";
      }
    }

    // ==================== LOGIN ====================
    function handleLogin(e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const btn = document.getElementById("loginBtn");

      // Validation
      if (!validateEmail(email)) {
        showError("loginEmail", "Email invalide");
        return false;
      }

      if (password.length < 6) {
        showError("loginPassword", "Mot de passe trop court");
        return false;
      }

      // Loading state
      btn.disabled = true;
      btn.innerHTML = 'Connexion en cours<span class="spinner"></span>';

      // Simulation d'appel API
      setTimeout(() => {
        // Succès
        document.getElementById("loginSuccess").classList.add("show");

        setTimeout(() => {
          // Redirection
          window.location.href = "dashboard.html";
        }, 1500);
      }, 1500);

      return false;
    }

    // ==================== REGISTER ====================
    function handleRegister(e) {
      e.preventDefault();

      const name = document.getElementById("registerName").value;
      const email = document.getElementById("registerEmail").value;
      const phone = document.getElementById("registerPhone").value;
      const password = document.getElementById("registerPassword").value;
      const passwordConfirm = document.getElementById(
        "registerPasswordConfirm"
      ).value;
      const terms = document.getElementById("acceptTerms").checked;
      const btn = document.getElementById("registerBtn");

      // Validation
      if (name.length < 3) {
        showError("registerName", "Nom trop court");
        return false;
      }

      if (!validateEmail(email)) {
        showError("registerEmail", "Email invalide");
        return false;
      }

      if (!validatePhone(phone)) {
        showError("registerPhone", "Numéro de téléphone invalide");
        return false;
      }

      if (password.length < 8) {
        showError(
          "registerPassword",
          "Le mot de passe doit contenir au moins 8 caractères"
        );
        return false;
      }

      if (password !== passwordConfirm) {
        showError(
          "registerPasswordConfirm",
          "Les mots de passe ne correspondent pas"
        );
        return false;
      }

      if (!terms) {
        alert("Vous devez accepter les conditions d'utilisation");
        return false;
      }

      // Loading state
      btn.disabled = true;
      btn.innerHTML = 'Création du compte<span class="spinner"></span>';

      // Simulation d'appel API
      setTimeout(() => {
        // Succès
        document.getElementById("registerSuccess").classList.add("show");

        setTimeout(() => {
          switchForm("login");
          btn.disabled = false;
          btn.innerHTML = "Créer mon compte";
        }, 2000);
      }, 1500);

      return false;
    }

    // ==================== FORGOT PASSWORD ====================
    function handleForgotPassword(e) {
      e.preventDefault();

      const email = document.getElementById("forgotEmail").value;
      const btn = document.getElementById("forgotBtn");

      if (!validateEmail(email)) {
        alert("Email invalide");
        return false;
      }

      // Loading state
      btn.disabled = true;
      btn.innerHTML = 'Envoi en cours<span class="spinner"></span>';

      // Simulation d'appel API
      setTimeout(() => {
        document.getElementById("forgotSuccess").classList.add("show");
        btn.disabled = false;
        btn.innerHTML = "Envoyer le lien de réinitialisation";
      }, 1500);

      return false;
    }

    // ==================== SOCIAL LOGIN ====================
    function socialLogin(provider) {
      alert(
        `🔐 Connexion avec ${provider}...\n\n(Fonction à implémenter avec OAuth)`
      );
      // Ici, implémenter l'authentification OAuth
    }

    // ==================== VALIDATION HELPERS ====================
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    function validatePhone(phone) {
      const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      return re.test(phone.replace(/\s/g, ""));
    }

    function showError(inputId, message) {
      const input = document.getElementById(inputId);
      const errorElement = document.getElementById(inputId + "Error");

      input.classList.add("error");
      errorElement.textContent = message;
      errorElement.classList.add("show");

      // Retirer l'erreur après 3 secondes
      setTimeout(() => {
        input.classList.remove("error");
        errorElement.classList.remove("show");
      }, 3000);
    }

    // ==================== REAL-TIME VALIDATION ====================
    // Validation du mot de passe en temps réel
    document
      .getElementById("registerPassword")
      ?.addEventListener("input", function () {
        const confirmInput = document.getElementById(
          "registerPasswordConfirm"
        );
        if (confirmInput.value && this.value !== confirmInput.value) {
          showError(
            "registerPasswordConfirm",
            "Les mots de passe ne correspondent pas"
          );
        }
      });

    document
      .getElementById("registerPasswordConfirm")
      ?.addEventListener("input", function () {
        const passwordInput = document.getElementById("registerPassword");
        if (this.value !== passwordInput.value) {
          showError(
            "registerPasswordConfirm",
            "Les mots de passe ne correspondent pas"
          );
        } else {
          const errorElement = document.getElementById(
            "registerPasswordConfirmError"
          );
          errorElement.classList.remove("show");
          this.classList.remove("error");
        }
      });