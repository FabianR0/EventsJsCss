const letra ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

function changeTextLetter(event) {
    let interation = 0;

    const iniText = event.target.innerText;

    clearInterval(interval);

    interval = setInterval(() => {
        event.target.innerText = iniText.split("").map((letter, index) => {
            if (index < interation) {
                return event.target.dataset.textValue[index];
            }
            return letra[Math.floor(Math.random() * 26)];
        }).join("");
    if (interation >= event.target.dataset.textValue.length) {
        clearInterval(interval);
    }
    interation += 1/10;
    },100);
}

const animTexts = document.querySelectorAll(".estatico");

animTexts.forEach((element) => {
    element.addEventListener("mouseover", () => {
        changeTextLetter(event);
    });
});

let elements = [];

const getContenido = async () => {
    const data = await fetch("./containt.json");
    elements = await data.json();
    filterItems('all');
};

const filterItems = (category) => {
    let elemento = document.querySelector("#elemento");
    elemento.innerHTML = '';

    const filteredData = category === 'all' ? elements : elements.filter(item => item.id === category);

    const totalIds = filteredData.length;
    elemento.innerHTML += `<p>Tamaño total de los IDs: ${totalIds}</p>`;
    
    filteredData.forEach(element => {
        elemento.innerHTML += `
        <div class="responsive" id="${element.id}">
            <img src="${element.imagen}" alt="" width="100px" height="100px" class="imagen">
            <div class="responsivo">
                <div class="responsive">
                    <h3 class="titulo">${element.titulo}</h3>
                    <p class="precio">${element.precio}</p>
                </div>
                <div class="responsive">
                    <p class="descrip">${element.descrip}</p>
                </div>
            </div>
        </div>
        `;
    });
    
};

getContenido();
