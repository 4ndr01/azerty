import {type} from "@testing-library/user-event/dist/type";

function api(){
    const gif=()=>{
        return fetch("https://api.giphy.com/v1/gifs/random?api_key=6zJeJK6LkD3iWofObDkLjlMisicGNhF2&tag=&rating=g")
            .then((response) => response.json())
            .then((data) => {
                return data.data.images.original.url

            }
            )

    }
    return {gif}
}

export default api;
