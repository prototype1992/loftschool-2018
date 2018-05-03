function slice(array, from = 0, to = array.length) {
    let resultArray = [];

    if (to < from) {
        return [];
    }

    if (from < 0) {
        console.log('---', from);
        console.log('---', array.length - Math.abs(from));
        from = Math.abs(from);

        for (let i = from; i < array.length; i++) {
            resultArray.push(array[i]);
        }

        return resultArray;
    }

    // if (from < 0 || to < 0) {
    //     from = array.length - Math.abs(from);
    //     to = array.length - Math.abs(to);
    //
    //     console.log('from', from);
    //     console.log('to', to);
    //
    //     for (let i = to; i < from; i++) {
    //         resultArray.push(array[i])
    //     }
    //
    //     return resultArray;
    // }

    console.log('array.length', array.length);
    console.log('from', from);
    console.log('to', to);

    for (let i = from; i < to; i++) {
        resultArray.push(array[i]);
    }

    return resultArray;
}

let arr = [1, 2, 3, 4, 5];

console.log(
    slice(arr, -2)
);
