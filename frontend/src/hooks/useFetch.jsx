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
        .then(res => { 
            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            } else {
                return res;
            }
        })
        .catch(error => {
            console.error('Fetch error', error)
            throw error
        }) 
    }

    return fetchData;
}