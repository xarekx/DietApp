import { getCookie } from "../utils/getCookie";

export const useFetch = (url, method, body = null) => {
    const csrftoken = getCookie('csrftoken');
    const headers = {
        "Content-Type": "application/json",
        'X-CSRFToken': csrftoken
    }
    
    const requestOptions = {
        method,
        headers,
        credentials: 'include'
    };
    
    if (body) {
        requestOptions.body = JSON.stringify(body);
    }

    const fetchData = () => {
      return fetch(url, requestOptions)
        .then(response => { 
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            } else {
                return response;
            }
        })
        .catch(error => {
            console.error('Fetch error', error)
            throw error
        }) 
    }

    return fetchData;
}