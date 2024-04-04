class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

// Definición de la clase Repository
class Repository {
    constructor() {
        this.activities = [];
        this.id = 0;
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(title, description, imgUrl) {
        this.id++;
        const activity = new Activity(this.id, title, description, imgUrl);
        this.activities.push(activity);
    }

    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
    }

    deleteAllActivities() {
        this.activities = [];
    }
}

// Instancia de Repository
const repository = new Repository();

// Función para crear una tarjeta HTML con un botón de eliminar
function createHTMLFromActivity(activity) {
    const { id, title, description, imgUrl } = activity;

    const activityDiv = document.createElement("div");
    activityDiv.className = "styleDiv";
    activityDiv.dataset.activityId = id;

    const titleElement = document.createElement("h3");
    titleElement.innerHTML = title;

    const descriptionElement = document.createElement("p");
    descriptionElement.innerHTML = description;

    const imgUrlElement = document.createElement("img");
    imgUrlElement.src = imgUrl;
    imgUrlElement.alt = title;
    imgUrlElement.width = 100;

    imgUrlElement.className = "imgPreview";

    // Botón de eliminar dentro de la tarjeta
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.className = "botMod"
    deleteButton.addEventListener("click", function(event) {
        event.stopPropagation();
        const cardId = event.currentTarget.parentElement.dataset.activityId;
        repository.deleteActivity(parseInt(cardId));
        renderActivities();
    });

    activityDiv.appendChild(titleElement);
    activityDiv.appendChild(descriptionElement);
    activityDiv.appendChild(imgUrlElement);
    activityDiv.appendChild(deleteButton);

    activityDiv.addEventListener("click", handleCardClick);

    return activityDiv;
}

// Función para renderizar todas las actividades
function renderActivities() {
    const container = document.getElementById("container");
    container.innerHTML = "";

    const activities = repository.getAllActivities();

    const htmlElements = activities.map((act) => createHTMLFromActivity(act));

    htmlElements.forEach((activityHtml) => container.appendChild(activityHtml));


    const deleteAllButton = document.getElementById("eliminarTodas");
    if (activities.length > 0) {
        deleteAllButton.style.display = "block";
    } else {
        deleteAllButton.style.display = "none";
    }
}


function handleCardClick(event) {
}


const deleteAllButton = document.getElementById("eliminarTodas");
deleteAllButton.addEventListener("click", function() {
    repository.deleteAllActivities();
    renderActivities();
});

const button = document.getElementById("add");

function handler() {
    const title = document.getElementById("titulo");
    const description = document.getElementById("descripcion");
    const imgUrl = document.getElementById("imagen");
    const valueTitle = title.value;
    const valueDescription = description.value;
    const valueImgUrl = imgUrl.value;

    if(!valueTitle || !valueDescription || !valueImgUrl) {
        alert("Debes completar todos los campos");
        return;
    }
    
    repository.createActivity(valueTitle, valueDescription, valueImgUrl);
    renderActivities();

    title.value = "";
    description.value = "";
    imgUrl.value = "";
}

button.addEventListener("click", handler);

const form = document.getElementById("form");

form.addEventListener("submit", function (event){
    event.preventDefault();
});