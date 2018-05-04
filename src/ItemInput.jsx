import React from 'react';
import './ItemInput.css';

function ItemInput({ addItem }) {
    function submit(ev) {
        ev.preventDefault();
        addItem(ev.target.item.value);
        ev.target.item.value = '';
    };
    return (
        <form class="ItemInput" onSubmit={ submit }>
            <input name="item" placeholder="Add todo item" />
        </form>
    )
};

export default ItemInput;
