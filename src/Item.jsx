import React from 'react';
import './Item.css';


function Item({ text, buckets, barItem, deleteItem }) {
    function action(index) {
        switch (index) {
            case '-2': break;
            case '-1': deleteItem(index); break;
            default: barItem(index); break;
        }
    }
    return (
        <tr class="Item">
            <td>{ text }</td>
            <td>
                <select onChange={ ev => action(ev.target.value) }>
                    <option key={-2} value="-2">-</option>
                    <option key={-1} value="-1">Delete</option>
                    {
                        buckets.map((bucket, index) =>
                            <option key={ index } value={ index }>{ bucket }</option>
                        )
                    }
                </select>
            </td>
        </tr>
    )
};

export default Item;
