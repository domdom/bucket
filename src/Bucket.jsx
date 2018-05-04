import React from 'react';
import Item from './Item';
import './Bucket.css';


function Bucket({ name, items, buckets, fooItem }) {
    return (
        <table class="Bucket">
            <thead>
                <tr><th colSpan="2">{ name }</th></tr>
            </thead>
            <tbody>
                {
                    items.map((item, index) =>
                        <Item
                            key={ item.id }
                            buckets={ buckets }
                            barItem={ nBI => fooItem(index, nBI) }
                            { ...item }/>
                    )
                }
            </tbody>
        </table>
    )
};

export default Bucket;
