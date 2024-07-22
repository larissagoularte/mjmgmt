import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Listings = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const getListings = async () => {
            const resp = await fetch('/api/listings');
            const listingsResp = await resp.json();
            setListings(listingsResp);
        };

        getListings();
    }, []);

    return (
        <div>
            <h1>Listings</h1>
            {listings.map(listing => (
                <div key={listing.id}>
                    <h2>
                        <Link to={`/listings/${listing.id}`}>{listing.title}</Link>
                    </h2>
                </div>
            ))}
        </div>
    )
}

export default Listings