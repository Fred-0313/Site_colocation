        // Gestion du bouton favori
        document
            .querySelector(".property-actions .icon-btn")
            .addEventListener("click", function () {
                this.textContent = this.textContent === "♡" ? "♥" : "♡";
                this.style.color = this.textContent === "♥" ? "#EF4444" : "";
                alert(
                    this.textContent === "♥"
                        ? "❤️ Ajouté aux favoris !"
                        : "🤍 Retiré des favoris"
                );
            });

        // Gestion du formulaire de contact
        function handleContact(e) {
            e.preventDefault();
            alert(
                "✅ Message envoyé avec succès !\n\nLe propriétaire vous contactera bientôt."
            );
            return false;
        }

        // Gestion de la galerie
        document
            .querySelector(".view-all-photos")
            .addEventListener("click", function () {
                alert(
                    "📷 Ouverture de la galerie complète...\n(12 photos disponibles)"
                );
            });

        // Gestion du partage
        document
            .querySelectorAll(".icon-btn")[1]
            .addEventListener("click", function () {
                alert(
                    "🔗 Lien copié !\n\nVous pouvez maintenant partager cette annonce."
                );
            });