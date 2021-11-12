let btn = document.querySelector('#get-fact');
let factContainer = document.querySelector('#fact');

function getCatFact() {
    return fetch('https://catfact.ninja/fact')
        .then(response => response.json()); // if only return --> singleliner possible
}

btn.addEventListener('click', (e) => {
    getCatFact()
        .then(factResponse => {
            return `... ${factResponse.fact}`
            // imagine heavy text transformation here ... 
        })
        .then(formattedFact => {
            factContainer.innerHTML = formattedFact;
        })
        .catch(error => {
            console.error(error);
        });
});
