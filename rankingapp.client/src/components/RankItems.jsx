import { useState, useEffect } from 'react';

const RankItems = () => {
    const [items, setItems] = useState([]);
    const dataType = 1;

    const loadItems = async () => {
        try {
            await new Promise(r => setTimeout(r, 1000));
            const response = await fetch(`item/${dataType}`);
            if (!response.ok)
                throw new Error(response.status);
            const data = await response.json();
            setItems(data);
        }
        catch (error) {
            console.error("Slow server startup: " + error);
        }
    }
    useEffect(() => {
        loadItems();
    }, []);

    return (
        <main>{
            (items != null) ? items.map(item => <h3 key={item.id}>{item.title }</h3>):<div>Loading...</div>
        }
        </main>
    )
}

export default RankItems;