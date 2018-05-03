/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let resultArray = [];

    for (let i = 0; i < array.length; i++) {
        resultArray.push(fn(array[i], i, array));
    }

    return resultArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let prevVal = initial ? initial : array[0];
    let i = initial ? 0 : 1;
    for (i; i < array.length; i++) {
        prevVal = fn(prevVal, array[i], i, array);
    }
    return prevVal;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let resultArray = [];

    for (let i = 0; i < Object.keys(obj).length; i++) {
        resultArray.push(Object.keys(obj)[i].toUpperCase())
    }

    return resultArray;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let result = [];

    if (from < 0) {
        from = array.length + from;
    }

    if (to < 0) {
        to = array.length + to;
    }

    if (to > array.length) {
        to = array.length;
    }

    if (to < 0) {
        return [];
    }

    if (from < 0 && array.length + from < 0) {
        from = 0;
    }

    if (from !== undefined && to !== undefined && from >= 0 && to >= 0) {
        for (let i = from; i < to; i++) {
            result.push(array[i]);
        }

        return result;
    } else if (from !== undefined && to === undefined) {
        for (let i = from; i < array.length; i++) {
            result.push(array[i]);
        }
        return result;
    }

    else if (from === undefined && to === undefined) {
        return array;
    }
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(obj, prop, value) {
            obj[prop] = value * value;
            return true;
        }
    });
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
