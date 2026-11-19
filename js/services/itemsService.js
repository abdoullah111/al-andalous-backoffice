import { request } from "./api.js";

export async function getItems() {
    return await request("/items")
}
export async function getItemById(id) {
    return await request(`/items/${id}`)
}