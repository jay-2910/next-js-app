import axios from "axios";

const random_number = process.env.NEXT_PUBLIC_NEXTBACK_KEY;
const backUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function getHomeSlider() {
    try {
        const response = await axios.get(`${backUrl}/slider`, {
            headers: {
                'random_number': random_number
            }
        });
        return response.data.slider;
    } catch (error) {
        console.error("Error fetching slider data:", error);
        return [];
    }
}
export async function getMenu() {
    try {
        const response = await axios.get(`${backUrl}/menus`, {
            headers: {
                'random_number': random_number
            }
        });
        return response.data.menus;
    } catch (error) {
        console.error("Error fetching menu:", error);
        return [];
    }
}

export async function getSettings() {    
    try {
        const response = await axios.get(`${backUrl}/settings`, {
            headers: {
                'random_number': random_number
            }
        });
        return response.data.settings;
    } catch (error) {
        console.error("Error fetching settings data:", error);
        return [];
    }
}

export async function getPages() {
    try {
        const response = await axios.get(`${backUrl}/pages`, {
            headers: {
                'random_number': random_number
            }
        });
        return response.data.pages;
    } catch (error) {
        console.error("Error fetching pages data:", error);
        return [];
    }
}

export async function getBlocks() {    
    try {
        const response = await axios.get(`${backUrl}/blocks`, {
            headers: {
                'random_number': random_number
            }
        });
        return response.data.blocks;
    } catch (error) {
        console.error("Error fetching blocks data:", error);
        return [];
    }
}

export async function getEvents() {
    try {
        const response = await axios.get(`${backUrl}/event`, {
            headers: {
                'random_number': random_number
            }
        });
        return response.data.events;
    } catch (error) {
        console.error("Error fetching events data:", error);
        return [];
    }
}

export async function getBlogs() {
    try {
        const response = await axios.get(`${backUrl}/blog/posts`, {
            headers: {
                'random_number': random_number
            }
        });
        return response.data.blogs;
    } catch (error) {
        console.error("Error fetching blogs data:", error);
        return [];
    }
}
export async function getNews() {
    try {
        const response = await axios.get(`${backUrl}/news`, {        
            headers: {
                'random_number': random_number
            }
        });
        return response.data.news;
    } catch (error) {
        console.error("Error fetching news data:", error);
        return [];
    }
}