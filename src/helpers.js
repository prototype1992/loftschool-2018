export function renderCookies(list, cookies) {
    let wrap = '';

    list.innerHTML = '';
    for (let item of cookies) {
        let result = item.split('=');
        wrap += `<tr>
            <td>${result[0]}</td>
            <td>${result[1]}</td>
            <td>
                <button class="cookie-delete" data-name="${result[0]}">Удалить</button>
            </td>
        <tr>`;
    }

    list.innerHTML = wrap;
}

export function deleteCookie(name) {
    document.cookie = `${name}=; expires=${new Date(0)}`;
}

// функция поиска подстроки в строке
export function isMatching(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();
    if (full.indexOf(chunk) + 1) {
        return true;
    } else {
        return false;
    }
}

// parse cookies
export function parseCookie() {
    return document.cookie.split('; ').reduce((prev, current) => {
        let [name, value] = current.split('=');
        prev[name] = value;
        return prev;
    }, {});
}
