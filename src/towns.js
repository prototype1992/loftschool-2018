/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем,
 что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
import {loadAndSortTowns} from './index';

function loadTowns() {
    return loadAndSortTowns();
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();
    if (full.indexOf(chunk) + 1) {
        return true;
    }
    return false;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

/*failed*/
const failedBlock = homeworkContainer.querySelector('#failed');
const failedBtn = homeworkContainer.querySelector('#failed-btn');

// создаем массив для городов
let cities = [];

function loadTownsResolve(data) {
    // добавляем города в массив
    cities = data;
    // показываем блок с поиском
    filterBlock.style.display = 'block';
    // скрываем блок загрузка...
    loadingBlock.style.display = 'none';
}

function loadTownsReject() {
    // скрываем блок с поиском
    filterBlock.style.display = 'none';
    // показываем блок ошибки
    failedBlock.style.display = 'block';
}

// загружаем города
loadTowns()
    .then(
        data => {
            loadTownsResolve();
        }
    )
    .catch(
        error => {
            loadTownsReject();
        }
    );

failedBtn.addEventListener('click', () => {
    loadTowns()
        .then(
            data => {
                loadTownsResolve();
            }
        )
        .catch(
            error => {
                loadTownsReject();
            }
        );
});

filterInput.addEventListener('keyup', event => {
    // получаем значение введенное в поле поиска
    let value = event.target.value;

    // очищаем блок в который вставятся данные
    filterResult.innerHTML = '';

    // перебираем массив городов если value не пуст
    if (value) {
        for (let city of cities) {
            if (isMatching(city.name, value)) {
                filterResult.innerHTML += `<p>${city.name}</p>`;
            }
        }
    } else {
        filterResult.innerHTML = '';
    }
});

export {
    loadTowns,
    isMatching
};
