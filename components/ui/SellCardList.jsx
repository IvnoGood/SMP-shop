import Link from 'next/link';
import React from 'react';

import "@/components/css/SellCardList.css"

function SellCardList({ data }) {
    if (!data || data.length === 0) {
        return <p className="text-white">No items to display.</p>;
    }

    return (
        <ul className='listitems'>
            {data.map((data) => (
                <li className='SellCard' key={data.id}>
                    <img src={data.image_url} alt="image-descriptive" /* width={150} height={150} */ className='desc-image size-23' />
                    <h1 className='SellCardTitle mt-3'>{data.title}</h1>
                    <h2 className='SellCardDesc'>Quantity: {data.qte}</h2>
                    <p className='SellCardDesc'><Link href={"/profiles/" + data.username}>{data.username}</Link> - {data.price}</p>
                </li>
            ))}
        </ul>
    )
}

export default SellCardList;