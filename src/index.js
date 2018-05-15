import {sortFn} from './helpers';

/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise,
 который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), seconds * 1000)
    })
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise,
 который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns()
   .then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
    return new Promise((resolve, reject) => {
        // 1. Создаём новый объект XMLHttpRequest
        let xhr = new XMLHttpRequest();
        // 2. Конфигурируем его: GET-запрос на URL
        xhr.open('get', url);
        // 3. Отсылаем запрос
        xhr.send();

        xhr.addEventListener('load', function () {
            if (xhr.status === 200) {
                let cities = null;
                try {
                    cities = JSON.parse(this.response);
                } catch (e) {
                    throw new Error('Парсинг не удался')
                }

                resolve(cities.sort(sortFn));
            } else {
                reject(this.statusText);
            }
        });
    })
}

export {
    delayPromise,
    loadAndSortTowns
};
