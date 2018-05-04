import React, { Component } from 'react';
import Bucket from './Bucket';
import ItemInput from './ItemInput';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = this.loadStateFromStorage();
    }

    loadStateFromStorage() {
        const stateJson = window.localStorage.getItem('state');
        const state = stateJson !== null
            ? JSON.parse(stateJson)
            : {
                nextId: 0,
                buckets: [
                    { name: 'Inbox', items: [] },
                    { name: 'Today', items: [] },
                    { name: 'This Week', items: [] },
                    { name: 'This Month', items: [] },
                    { name: 'This Year', items: [] },
                    { name: 'Some Day', items: [] },
                    { name: 'Done', items: [] }
                ]
            };
        return state;
    }

    saveStateToStorage(update) {
        this.setState(state =>
            {
                const newState = update(state);
                const stateJson = JSON.stringify(newState);
                window.localStorage.setItem('state', stateJson);
                return newState;
            }
        );
    }

    addItem(item) {
        this.saveStateToStorage(
            ({ nextId, buckets: [{ items, ...bucket }, ...rest] }) => ({
                nextId: nextId+1,
                buckets: [
                    { items: [{ text: item, id: nextId }, ...items], ...bucket },
                    ...rest
                ]
            })
        );
    }

    moveItem(curBucketIndex, curItemIndex, newBucketIndex) {
        this.setState(({ buckets: [...buckets] }) => {
            const { items: [...curItems], ...curBucket } = buckets[curBucketIndex];
            const [item] = curItems.splice(curItemIndex, 1);
            const { items: [...newItems], ...newBucket } = buckets[newBucketIndex];
            newItems.unshift(item);
            buckets[curBucketIndex] = { items: curItems, ...curBucket };
            buckets[newBucketIndex] = { items: newItems, ...newBucket };
            return { buckets };
        });
    }

    render() {
        const { buckets } = this.state;
        const bucketNames = buckets.map(bucket => bucket.name);
        return (
            <div className="App">
                <ItemInput addItem={ this.addItem.bind(this) }/>
                {
                    buckets.map((bucket, index) =>
                        <Bucket
                            key={ index }
                            buckets={ bucketNames }
                            fooItem={ (cII, nBI) => this.moveItem(index, cII, nBI) }
                            { ...bucket } />
                    )
                }
            </div>
        );
    }
};

export default App;
