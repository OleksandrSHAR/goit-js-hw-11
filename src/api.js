import axios from 'axios';

const BASE_URL = "https://pixabay.com/api/";

export async function searchImg(getValue,page) {
    const parameters = new URLSearchParams({
        key: "38419998-1aa433a5d57de567849c42890",
        q:getValue,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page:`${page}`
    })
    const { data } = await axios.get(`${BASE_URL}?${parameters}`);
    return data;
}
