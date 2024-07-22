import listings from './listing/data'

export function onRequestGet() {
    return Response.json(listings)
}