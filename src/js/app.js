let data;

$(document).ready(async () => {
    console.log("ready");

    const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=bO7sqj5RuAEEQBmj8SHbUoj6oCwuXkcHu5Gn0Uypo9EF0C6rMtFwZINjWawshVz79JBUcxZ7wcKWHuOfPtF7SiaOkNTDnepNm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnL2aCzGGbYWew4wpPOdnfhxg8uQ0gCM8I85FsfC4jFMx-KyBVxX2Exn5d8GLoGotr0IxwkG2qpi7b4OgDD4BpripBpXShFAtwg&lib=MX2LE1D8o4yhou4Tu3dQyOCANBs6THuFY';

    try {
        const response = await fetch(url);
        const responseData = await response.json();
        
        // Utilisez responseData.data au lieu de responseData
        data = responseData.data;

        // Vérifiez que la réponse contient des objets
        if (data && data.length > 0) {
            // Sélectionnez un objet aléatoire
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomObject = data[randomIndex];

            // Afficher toutes les informations dans la console (à des fins de test)
            console.log('Citation aléatoire :', randomObject.Citation);
            console.log('URLImage :', randomObject.URLImage);
            console.log('Auteur :', randomObject.Auteur);
            console.log('Description :', randomObject.Description);

            // Afficher toutes les informations dans le conteneur HTML
            $('#contenu').html(
                `<div class="flex flex-col justify-center items-center">
               
                
                    <img src="${randomObject.URLImage}" alt="Auteur" class="w-56 h-56 rounded-full">
                    <div class="w-full mt-12"> 
                    <h1 class="text-2xl font-bold text-gray-900">${randomObject.Citation}</h1>
                    <p class="bg-blue-500 text-white p-4">${randomObject.Auteur}</p>
                    <p class="description text-center ml-3 text-gray-600">${randomObject.Description}</p>
                </div>`
            );
        } else {
            console.error('La réponse du fichier JSON ne contient pas d\'objets.');
        }
    } catch (error) {
        console.error('Erreur lors de la requête fetch :', error);
    }
});
