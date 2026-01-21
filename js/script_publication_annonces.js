        // ==================== VARIABLES ====================
        let currentStep = 1;
        const totalSteps = 5;
        let selectedType = '';
        let uploadedImages = [];

        // ==================== NAVIGATION ====================
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        const progressLine = document.getElementById('progressLine');

        // Navigation entre les étapes
        nextBtn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    updateStep();
                }
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateStep();
            }
        });

        // Mise à jour de l'étape
        function updateStep() {
            // Cacher toutes les sections
            document.querySelectorAll('.form-section').forEach(section => {
                section.classList.remove('active');
            });

            // Afficher la section courante
            document.querySelector(`[data-section="${currentStep}"]`).classList.add('active');

            // Mettre à jour les indicateurs de progression
            document.querySelectorAll('.step').forEach((step, index) => {
                const stepNum = index + 1;
                step.classList.remove('active', 'completed');
                
                if (stepNum < currentStep) {
                    step.classList.add('completed');
                    step.querySelector('.step-circle').textContent = '✓';
                } else if (stepNum === currentStep) {
                    step.classList.add('active');
                    step.querySelector('.step-circle').textContent = stepNum;
                } else {
                    step.querySelector('.step-circle').textContent = stepNum;
                }
            });

            // Mettre à jour la ligne de progression
            const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
            progressLine.style.width = progress + '%';

            // Gestion des boutons
            prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-block';
            nextBtn.style.display = currentStep === totalSteps ? 'none' : 'inline-block';
            submitBtn.style.display = currentStep === totalSteps ? 'inline-block' : 'none';

            // Mise à jour du récapitulatif à l'étape 5
            if (currentStep === 5) {
                updateSummary();
            }

            // Scroll vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // ============== VALIDATION =================
        function validateStep(step) {
            switch(step) {
                case 1:
                    if (!selectedType) {
                        alert('⚠️ Veuillez sélectionner un type de bien');
                        return false;
                    }
                    const transactionType = document.getElementById('transactionType').value;
                    if (!transactionType) {
                        alert('⚠️ Veuillez sélectionner le type de transaction');
                        return false;
                    }
                    return true;

                case 2:
                    const title = document.querySelector('[data-section="2"] input[type="text"]').value;
                    const price = document.querySelector('[data-section="2"] input[type="number"]').value;
                    const description = document.querySelector('[data-section="2"] textarea').value;
                    
                    if (!title || !price || !description) {
                        alert('⚠️ Veuillez remplir tous les champs obligatoires');
                        return false;
                    }
                    if (description.length < 50) {
                        alert('⚠️ La description doit contenir au moins 50 caractères');
                        return false;
                    }
                    return true;

                case 3:
                    if (uploadedImages.length < 3) {
                        alert('⚠️ Veuillez ajouter au moins 3 photos');
                        return false;
                    }
                    return true;

                case 4:
                    const ville = document.querySelector('[data-section="4"] select').value;
                    const quartier = document.querySelector('[data-section="4"] input[type="text"]').value;
                    
                    if (!ville || !quartier) {
                        alert('⚠️ Veuillez remplir la ville et le quartier');
                        return false;
                    }
                    return true;

                default:
                    return true;
            }
        }

        // =============== TYPE SELECTION ================
        document.querySelectorAll('.type-card').forEach(card => {
            card.addEventListener('click', function() {
                document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                selectedType = this.getAttribute('data-type');
            });
        });

        // ================= IMAGE UPLOAD =================
        const fileInput = document.getElementById('fileInput');
        const imagePreview = document.getElementById('imagePreview');

        fileInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            
            files.forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(event) {
                        uploadedImages.push(event.target.result);
                        
                        const previewItem = document.createElement('div');
                        previewItem.className = 'preview-item';
                        previewItem.innerHTML = `
                            <img src="${event.target.result}" alt="Preview">
                            <button type="button" class="remove-image" onclick="removeImage(${uploadedImages.length - 1})">×</button>
                        `;
                        
                        imagePreview.appendChild(previewItem);
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
        });

        function removeImage(index) {
            uploadedImages.splice(index, 1);
            const previewItems = imagePreview.querySelectorAll('.preview-item');
            if (previewItems[index]) {
                previewItems[index].remove();
            }
        }

        // =============== MAP INTERACTION ==============
        const mapSelector = document.getElementById('mapSelector');
        const coordinates = document.getElementById('coordinates');
        let selectedLat = 6.3654;
        let selectedLng = 2.4183;

        mapSelector.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Simulation de conversion en coordonnées GPS
            selectedLat = (6.3654 + (Math.random() - 0.5) * 0.1).toFixed(4);
            selectedLng = (2.4183 + (Math.random() - 0.5) * 0.1).toFixed(4);
            
            coordinates.textContent = `📍 Lat: ${selectedLat}, Lng: ${selectedLng}`;
            
            // Effet visuel
            this.style.background = 'linear-gradient(135deg, rgba(79, 124, 246, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)';
            setTimeout(() => {
                this.style.background = 'linear-gradient(135deg, #E8F0FF 0%, #D4E4FF 100%)';
            }, 200);
        });

        // ============ SUMMARY UPDATE ================
        function updateSummary() {
            // Type de bien
            const typeCard = document.querySelector('.type-card.selected');
            if (typeCard) {
                const typeName = typeCard.querySelector('.type-name').textContent;
                document.getElementById('summaryType').textContent = typeName;
            }

            // Type de transaction
            const transaction = document.getElementById('transactionType');
            document.getElementById('summaryTransaction').textContent =
                transaction.options[transaction.selectedIndex].text;

            // Prix
            const price = document.querySelector('[data-section="2"] input[type="number"]').value;
            if (price) {
                document.getElementById('summaryPrice').textContent =
                    new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
            }

            // Nombre de photos
            document.getElementById('summaryPhotos').textContent = uploadedImages.length;
        }

        // ==================== FORM SUBMISSION ====================
        document.getElementById('publishForm').addEventListener('submit', function(e) {
            e.preventDefault();

            // Animation de chargement
            submitBtn.innerHTML = '⏳ Publication en cours...';
            submitBtn.disabled = true;

            // Simulation d'envoi (remplacer par un vrai appel API)
            setTimeout(() => {
                alert('🎉 Félicitations !\n\nVotre annonce a été publiée avec succès.\n\nElle sera visible après validation par notre équipe (généralement sous 24h).\n\nVous recevrez une notification par email.');
                
                // Redirection vers la page d'accueil
                window.location.href = 'Page_acceuil.html';
            }, 2000);
        });

        // ============= KEYBOARD NAVIGATION ==============
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                const activeElement = document.activeElement;
                if (activeElement.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    if (currentStep < totalSteps && nextBtn.style.display !== 'none') {
                        nextBtn.click();
                    }
                }
            }
        });

        // ==================== AUTO-SAVE (optionnel) ==================== 
        setInterval(() => {
            const formData = {
                step: currentStep,
                type: selectedType,
                images: uploadedImages.length
            };
            localStorage.setItem('publishForm', JSON.stringify(formData));
        }, 5000);

        // Restaurer les données au chargement
        window.addEventListener('load', () => {
            const savedData = localStorage.getItem('publishForm');
            if (savedData) {
                const data = JSON.parse(savedData);
                console.log('Données sauvegardées trouvées:', data);
                // Vous pouvez restaurer les données ici si nécessaire
            }
        });

        // =============== ANIMATIONS ===============
        // Animation d'apparition des cartes de type
        document.querySelectorAll('.type-card').forEach((card, index) => {
            card.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s both`;
        });

        // Animation des checkbox
        document.querySelectorAll('.checkbox-item').forEach((item, index) => {
            item.style.animation = `fadeIn 0.3s ease-out ${index * 0.05}s both`;
        });