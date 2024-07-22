import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Listing = () => {
    const [listing, setListing] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const getListing = async () => {
            const resp = await fetch(`/api/listing/${id}`);
            const listingResp = await resp.json();
            setListing(listingResp);
        };

        getListing();
    }, [id]);

    if (!Object.keys(listing).length) return <div />;

    return (
        <div>
            <h1>{listing.title}</h1>
            <p>{listing.description}</p>
            <p>
                <Link to="/">Go back</Link>
            </p>
        </div>
    );
};

export default Listing;