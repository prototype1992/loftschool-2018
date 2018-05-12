/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки.
 Разрешено пользоваться только тем, что встроено в браузер
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
 Функция должна создавать и возвращать новый div с классом draggable-div
 и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    function random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function randomColor() {
        return Math.floor(Math.random()*16777215).toString(16);
    }

    let newDiv = document.createElement('div');

    newDiv.classList.add('draggable-div');

    let randomHeight = random(40, 100) + 'px';

    newDiv.style.width = random(200, 300) + 'px';
    newDiv.style.height = randomHeight;

    newDiv.style.position = 'absolute';
    newDiv.style.top = random(10, 200)+'px';
    newDiv.style.left = random(10, 200)+'px';

    newDiv.style.backgroundColor = '#'+randomColor();
    newDiv.style.color = '#'+randomColor();
    newDiv.style.textAlign = 'center';
    newDiv.style.lineHeight = randomHeight;

    newDiv.textContent = 'Текст';

    newDiv.setAttribute('draggable', 'true');

    return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    function getCoords(elem) {
        let box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        }
    }

    target.addEventListener('mousedown', function (event) {
        let x = event.pageX - getCoords(target).left;
        let y = event.pageY - getCoords(target).top;

        function targetMove(event) {
            console.log(event);
            target.style.left = event.pageX - x + 'px';
            target.style.top = event.pageY - y + 'px';
        }

        targetMove(event);

        document.addEventListener('mousemove', targetMove);

        target.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', targetMove);
        });

        target.addEventListener('dragstart', event => event.preventDefault());
    })
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
