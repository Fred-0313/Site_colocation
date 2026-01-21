// ==================== NAVIGATION ====================
        const navLinks = document.querySelectorAll('.nav-link');
        const contentSections = document.querySelectorAll('.content-section');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Retirer la classe active de tous les liens
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Ajouter la classe active au lien cliqué
                this.classList.add('active');
                
                // Masquer toutes les sections
                contentSections.forEach(section => section.classList.remove('active'));
                
                // Afficher la section correspondante
                const sectionId = this.getAttribute('data-section');
                document.getElementById(sectionId).classList.add('active');
                
                // Scroll vers le haut
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // ==================== MESSAGES ==================== 
        const messageItems = document.querySelectorAll('.message-item');
        
        messageItems.forEach(item => {
            item.addEventListener('click', function() {
                messageItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Simuler le chargement de la conversation
                console.log('Chargement de la conversation...');
            });
        });

        // Envoi de message
        document.querySelector('.send-btn').addEventListener('click', function() {
            const input = document.querySelector('.chat-input');
            const message = input.value.trim();
            
            if (message) {
                // Ajouter le message à la conversation
                const chatMessages = document.querySelector('.chat-messages');
                const newMessage = document.createElement('div');
                newMessage.className = 'chat-message sent';
                newMessage.innerHTML = `
                    <div class="chat-avatar">JD</div>
                    <div>
                        <div class="chat-bubble">${message}</div>
                        <p style="font-size: 0.75rem; color: var(--gray-text); margin-top: 0.3rem; text-align: right;">À l'instant</p>
                    </div>
                `;
                chatMessages.appendChild(newMessage);
                
                // Vider l'input
                input.value = '';
                
                // Scroll vers le bas
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        });

        // Envoyer avec Enter
        document.querySelector('.chat-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.querySelector('.send-btn').click();
            }
        });

        // ==================== FAVORITES ==================== 
        function removeFavorite(button) {
            if (confirm('Voulez-vous retirer ce bien de vos favoris ?')) {
                button.closest('.favorite-card').style.animation = 'fadeOut 0.3s';
                setTimeout(() => {
                    button.closest('.favorite-card').remove();
                }, 300);
            }
        }

        // ==================== PROPERTIES ACTIONS ==================== 
        function confirmDelete() {
            if (confirm('⚠️ Êtes-vous sûr de vouloir supprimer cette annonce ?\n\nCette action est irréversible.')) {
                alert('✅ Annonce supprimée avec succès !');
                // Ici, appeler l'API pour supprimer l'annonce
            }
        }

        // ==================== SETTINGS ==================== 
        function saveSettings(type) {
            let message = '';
            
            switch(type) {
                case 'info':
                    message = '✅ Informations personnelles mises à jour !';
                    break;
                case 'password':
                    message = '✅ Mot de passe changé avec succès !';
                    break;
                case 'notifications':
                    message = '✅ Préférences de notifications enregistrées !';
                    break;
            }
            
            alert(message);
            // Ici, appeler l'API pour sauvegarder les modifications
        }

        function deleteAccount() {
            const confirmation = prompt('⚠️ ATTENTION : Cette action est irréversible !\n\nTapez "SUPPRIMER" pour confirmer la suppression de votre compte :');
            
            if (confirmation === 'SUPPRIMER') {
                alert('❌ Votre compte a été supprimé.\n\nNous sommes désolés de vous voir partir.');
                // Ici, appeler l'API pour supprimer le compte
                window.location.href = 'index.html';
            } else if (confirmation) {
                alert('❌ Confirmation incorrecte. Suppression annulée.');
            }
        }

        // ==================== LOGOUT ==================== 
        function handleLogout() {
            if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
                alert('✅ Déconnexion réussie !');
                // Ici, supprimer le token et rediriger
                window.location.href = 'index.html';
            }
        }

        // ==================== SEARCH ==================== 
        document.querySelector('.search-input')?.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('.property-row');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });

        // ==================== ANIMATIONS ==================== 
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; transform: scale(1); }
                to { opacity: 0; transform: scale(0.9); }
            }
            
            .checkbox-item {
                display: flex;
                align-items: center;
                gap: 0.8rem;
            }
            
            .checkbox-item input[type="checkbox"] {
                width: 20px;
                height: 20px;
                cursor: pointer;
            }
            
            .checkbox-item label {
                cursor: pointer;
                font-weight: 500;
            }
        `;
        document.head.appendChild(style);

        // ==================== STATS ANIMATION ==================== 
        function animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // Animer les statistiques au chargement
        window.addEventListener('load', () => {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const value = parseInt(stat.textContent.replace(/,/g, ''));
                stat.textContent = '0';
                setTimeout(() => {
                    animateValue(stat, 0, value, 1000);
                }, index * 100);
            });
        });