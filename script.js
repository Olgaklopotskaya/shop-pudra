const items = [{
        title: "Trussardi Donna",
        description: "Волнующая, женственная и утонченная туалетная вода.",
        tags: ["new"],
        price: 321.65,
        img: "./img/1.jpg",
    },
    {
        title: "Giorgio Armani Si Passione",
        description: "С освежающими нотками груши и сладкой смородиной, нотки с острым запахом розового перца.",
        tags: ["parfum"],
        price: 323.55,
        img: "./img/2.jpg",
    },
    {
        title: "Moschino Toy2",
        description: "Жизнерадостный, нежный, игривый, чувственный ароматю",
        tags: ["parfum"],
        price: 165.11,
        img: "./img/3.jpg",
    },
    {
        title: "Yves Saint Laurent Libre",
        description: " Сексуальный, свежий, цветочный. Аромат, находящийся на грани между прохладой и обжигающей чувственностью.",
        tags: ["parfum"],
        price: 336.80,
        img: "./img/4.jpg",
    },
    {
        title: "BB Creme Erborian",
        description: "BB-крем макияж-уход для лица с эффектом «детская кожа.",
        tags: ["new"],
        price: 98.75,
        img: "./img/5.jpg",
    },
    {
        title: "Gucci Flora Gorgeous",
        description: "Жизнерадостный цветочно-фруктовый характер аромата создается на основе цветка гардении и персика.",
        tags: ["parfum"],
        price: 200.77,
        img: "./img/6.jpg",
    },
    {
        title: "Vichy Liftactiv Specialist",
        description: "Сыворотка комплексного действия с витамином В3 против пигментации и морщин",
        tags: ["new"],
        price: 152.98,
        img: "./img/7.jpg",
    },
    {
        title: "Caudalie Vinosource-Hydra",
        description: "Освежающий крем с тающей текстурой увлажняет и успокаивает сухую и обезвоженную кожу. ",
        tags: ["cream"],
        price: 98.10,
        img: "./img/8.jpg",
    },
    {
        title: "Payot Nutricia",
        description: "Интенсивно питает сухую кожу, возвращая ей чувство комфорта.",
        tags: ["cream"],
        price: 150.70,
        img: "./img/9.jpg",
    },
    {
        title: "Payot Blue Techni",
        description: "Cыворотка борется с последствиями десинхронизации биоритмов кожи. ",
        tags: ["new"],
        price: 191.23,
        img: "./img/10.jpg",
    },
    {
        title: "Estee Lauder Idealist ",
        description: "Эта быстродействующая сыворотка сочетает в себе самые эффективные технологии восстановления текстуры кожи: поры мгновенно сужаются на 1/3. ",
        tags: ["serum"],
        price: 367.55,
        img: "./img/11.jpg",
    },
    {
        title: "Clinique Moisture Surge",
        description: "Интенсивно, увлажняющий крем корректирующий тон кожи,  SPF 30",
        tags: ["new"],
        price: 140.78,
        img: "./img/12.jpg",
    },
];
const cardsContainer = document.querySelector('#shop-items')
const templateShop = document.querySelector('#item-template');
const nothingFound = document.querySelector('#nothing-found');

function makeTemplateShop(shopItem) {
    // деструктурируем свойства об-та
    const { title, description, tags, price, img } = shopItem;
    // берем за основу шаблон товара
    const card = templateShop.content.cloneNode(true);
    // наполняем его инф из об-та
    card.querySelector('h1').textContent = title;
    card.querySelector('p').textContent = description;
    card.querySelector('.price').textContent = `${price}P`;
    card.querySelector('img').src = img;

    const tagsHolder = card.querySelector(".tags");
    // Отрисовываем теги для товара
    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });

    // возвразаем html
    return card;
}
//товары после применения поиска,которые мы будем показывать
let currentState = [...items]

//функция для отрисовки, в качестве параметров тов кот нужно отрисовать
function renderCards(arr) {
    //cброс текста 'ничего не найдено' после предыд поиска
    nothingFound.textContent = "";
    //чистим контейнер с товарами ,если там что-то было
    cardsContainer.innerHTML = '';
    //отрисовываем товары из переданного параметра arr
    arr.forEach((card) => {
        //вызываем makeTemplateShop для каждого товара
        //и подставляем в верстку
        cardsContainer.append(makeTemplateShop(card));
    });
    //если массив товаров пуст -отобразим текст
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}
// вызываем функцию для отрисовки передав туда currentState
renderCards(currentState);

//ф-ция для сортировки по алфавиту
function sotrByAlphabet(a, b) {
    //если title первого товара алфавитно > второго
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    //если они равны
    return 0;
}
//вызываем ф-цию и сортируем 
renderCards(currentState.sort((a, b) => sotrByAlphabet(a, b)));

const sortControl = document.querySelector("#sort")
    //обработчик события("change"- "изменение") выбор опции  из селекта
sortControl.addEventListener("change", (event) => {
    //опция ,что выбрал пользователь атрибут value
    const selectedOption = event.target.value;
    //в зависимости от сортировки
    switch (selectedOption) {
        case "expensive":
            {
                // Сначала дорогие
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                // Сначала дешевые
                currentState.sort((a, b) => a.price - b.price);
                break;
            }

        case "alphabet":
            {
                // По алфавиту
                currentState.sort((a, b) => sotrByAlphabet(a, b));
                break;
            }
    }
    // Массив упорядочили — осталось его отрисовать
    renderCards(currentState);
});
// Инпут для поиска
const searchInput = document.querySelector("#search-input");
// Кнопка
const searchButton = document.querySelector("#search-btn");

// Функция для поиска по товарам (сбрасывает фильтры)
function applySearch() {
    // Взяли значение инпута и trim() удаляет пробельные символы с начала и конца строки. 
    // Привели к нижнему регистру, чтобы написание не мешало поиску toLowerCase() возвращает значение строки, преобразованное в нижний регистр
    const searchString = searchInput.value.trim().toLowerCase();

    // Нашли все товары, в title которых есть searchString
    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    // Отсортировали их по алфавиту
    currentState.sort((a, b) => sotrByAlphabet(a, b));
    // Отрисовали результаты поиска
    renderCards(currentState);
    // По умолчанию сортировка "по алфавиту"
}

// Обработчик при клике на кнопку поиска
searchButton.addEventListener("click", applySearch);
// Обработчик события поиска при взаимодействии с инпутом
searchInput.addEventListener("search", applySearch);