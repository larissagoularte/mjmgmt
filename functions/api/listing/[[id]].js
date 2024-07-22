import listings from './data'

export function onRequestGet(context) {
    const id = context.params.id

    if (!id) {
        return new Response('Not found', { status: 404 })
    }

    const listing = listings.find(listing => listing.id === Number(id))

    if (!listing) {
        return new Response('Not found', { status: 404 })
    }

    return Response.json(listing)
}