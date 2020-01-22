export const fetchFromUri = (uri) => {
    return fetch(uri).then(response => {
        if (!response.ok)
            throw Error('Not Found');
        return response.text();
    }).then(text => {
        return text;
    }).catch(error => console.log(error.toString()));
}