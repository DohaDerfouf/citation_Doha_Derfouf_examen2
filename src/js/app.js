let data;

$(document).ready(async () => {
    console.log("ready");

    const url = 'https://script.google.com/macros/s/AKfycbzDGfA-JGZJOfdYqrpuGpxIxIIeRAhaOM4H6sGFL-4DykAI38xlKVH9kl_rY5XtSSMT/exec';
    console.log('ready');
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        
        data = responseData;

        if (data && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomObject = data[randomIndex];

            console.log('Citation aléatoire :', randomObject.citation);
            console.log('Auteur :', randomObject.auteur);
            console.log('Source :', randomObject.source);
            console.log('Date :', randomObject.date);

            $('#contenu').html(
                `<div class="flex flex-col items-center">
                <div class="mb-8">"</div>
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

            
            $('#bouton').click(() => {
                location.reload();
            });

        } else {
            console.error('La réponse du fichier JSON ne contient pas d\'objets.');
        }
    } catch (error) {
        console.error('Erreur lors de la requête fetch :', error);
    }
});
