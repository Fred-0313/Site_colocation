        // ==================== PAGE NAVIGATION ====================
        function showPage(pageName) {
            // Cacher toutes les pages
            document.querySelectorAll('.page-content').forEach(page => {
                page.classList.remove('active');
            });

            // Désactiver tous les boutons
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Afficher la page sélectionnée
            document.getElementById(pageName).classList.add('active');

            // Activer le bouton correspondant
            const buttons = document.querySelectorAll('.tab-btn');
            if (pageName === 'contact') buttons[0].classList.add('active');
            if (pageName === 'faq') buttons[1].classList.add('active');
            if (pageName === 'cgu') buttons[2].classList.add('active');

            // Scroll vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // ==================== CONTACT FORM ====================
        function handleContactSubmit(e) {
            e.preventDefault();

            // Simuler l'envoi
            const btn = e.target.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.disabled = true;
            btn.innerHTML = '⏳ Envoi en cours...';

            setTimeout(() => {
                alert('✅ Message envoyé avec succès !\n\nNotre équipe vous répondra dans les 24h.');
                e.target.reset();
                btn.disabled = false;
                btn.innerHTML = originalText;
            }, 1500);

            return false;
        }

        // ==================== FAQ ====================
        function toggleFAQ(element) {
            const faqItem = element.parentElement;
            const isOpen = faqItem.classList.contains('open');

            // Fermer tous les autres
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('open');
            });

            // Ouvrir/fermer celui cliqué
            if (!isOpen) {
                faqItem.classList.add('open');
            }
        }

        function searchFAQ(query) {
            const items = document.querySelectorAll('.faq-item');
            const searchLower = query.toLowerCase();

            items.forEach(item => {
                const question = item.querySelector('.faq-question').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

                if (question.includes(searchLower) || answer.includes(searchLower) || query === '') {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        function filterFAQ(category) {
            const items = document.querySelectorAll('.faq-item');

            items.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // Scroll vers la liste
            document.getElementById('faqList').scrollIntoView({ behavior: 'smooth' });
        }

        // ==================== AUTO-OPEN FAQ FROM URL ====================
        window.addEventListener('load', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const page = urlParams.get('page');
            const faqId = urlParams.get('faq');

            if (page) {
                showPage(page);
            }

            if (faqId) {
                const faqItem = document.querySelector(`[data-faq-id="${faqId}"]`);
                if (faqItem) {
                    faqItem.classList.add('open');
                    faqItem.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });

        // ==================== SMOOTH SCROLL FOR CGU LINKS ====================
        document.querySelectorAll('.cgu-toc a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // Highlight effect
                    target.style.backgroundColor = 'rgba(79, 124, 246, 0.1)';
                    setTimeout(() => {
                        target.style.backgroundColor = '';
                    }, 2000);
                }
            });
        });

        // ==================== PRINT CGU ====================
        function printCGU() {
            window.print();
        }

        // ==================== COPY EMAIL ====================
        function copyEmail(email) {
            navigator.clipboard.writeText(email).then(() => {
                alert('📋 Email copié : ' + email);
            });
        }

        console.log('✅ Pages publiques initialisées');