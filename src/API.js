var API = {
    get (url) {
        return fetch((url), {
            method: 'GET'
        })
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

module.exports = API;