// const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// if (isIOS) {
//   // Affiche un message indiquant à l'utilisateur comment ajouter la PWA à l'écran d'accueil
//   const iosMessage = document.createElement('div');
//   iosMessage.innerHTML = '<p>Pour installer cette application sur votre écran d\'accueil, appuyez sur l\'icône de partage, puis sélectionnez "Ajouter à l\'écran d\'accueil".</p>';
//   document.body.appendChild(iosMessage);
// }




if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./services-worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  
  
  
  }// Vérifie si la PWA peut être installée et affiche le bouton d'installation si nécessaire
  window.addEventListener('load', () => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      document.querySelector('#install').style.display = 'none';
    } else {
      // Hide the installation button if the PWA is not installable
      document.querySelector('#install').style.display = 'none';
    }
  });
  let deferredPrompt; // Déclaration d'une variable globale pour stocker l'événement beforeinstallprompt
  
  // Écoute de l'événement beforeinstallprompt
  window.addEventListener('beforeinstallprompt', (event) => {
    // Empêche l'affichage par défaut de la boîte de dialogue d'installation
    event.preventDefault();
    // Stocke l'événement pour pouvoir l'utiliser ultérieurement
    deferredPrompt = event;
  
    // Affiche un bouton ou une indication visuelle pour l'utilisateur pour l'installation
    document.querySelector('#install').style.display = 'block';
  
    // Ajoute un gestionnaire d'événements au clic sur le bouton d'installation
    document.querySelector('#install').addEventListener('click', (e) => {
      // Affiche la boîte de dialogue d'installation
      deferredPrompt.prompt();
  
      // Attend la fin de l'installation
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA installée');
          // Cache le bouton d'installation une fois que la PWA est installée
          document.querySelector('#install').style.display = 'none';
        }
        deferredPrompt = null; // Réinitialise l'événement
      });
    });
  });

let data;

$(document).ready(async () => {
    console.log("ready");

    const url = 'https://script.google.com/macros/s/AKfycbzDGfA-JGZJOfdYqrpuGpxIxIIeRAhaOM4H6sGFL-4DykAI38xlKVH9kl_rY5XtSSMT/exec';
    console.log('ready');
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        
        data = responseData;
   $('#bouton').click(() => {
                $('#place').html(`
                    <div class=" flex flex-col text-center w-[15%]">
                        <img src="https://i.giphy.com/3o7bu3XilJ5BOiSGic.webp" alt="Loading...">
                    </div>
                `);
        setTimeout(() => {
            location.reload();
        }, 2000);
            });
        if (data && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomObject = data[randomIndex];

            console.log('Citation aléatoire :', randomObject.citation);
            console.log('Auteur :', randomObject.auteur);
            console.log('Source :', randomObject.source);
            console.log('Date :', randomObject.date);

            $('#contenu').html(
                `<div class="flex flex-col items-center" id="place">
                <div class="mb-8 text-xl">"</div>
                <h4 class="text-xl text-center font-bold m-8 leading-tight">${randomObject.citation}</h4>
                <div class="flex items-center">
                    <img src="${randomObject.date}" alt="${randomObject.auteur}" class="w-14 h-14 object-cover rounded-full mr-4">
                    <div class="text-left">
                        <p class="font-semibold text-sm">${randomObject.auteur}</p>
                        <p class="text-gray-400 text-xs">${randomObject.source}</p>
                    </div>
                </div>
            </div>`
            );

            
         

        } else {
            console.error('La réponse du fichier JSON ne contient pas d\'objets.');
        }
    } catch (error) {
        console.error('Erreur lors de la requête fetch :', error);
    }
});
