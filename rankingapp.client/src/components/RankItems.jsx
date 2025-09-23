import { useState, useEffect } from 'react';
import { MovieImgs } from './Image.jsx';

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
        <main>
            <div className = "items_not_ranked">
        {            
                (items.length > 0) ? items.map(item =>
                    <div className="unranked_cell" key={item.id}>
                        <img id={`item_${item.id}`} src={MovieImgs.find(o => o.id === item.id)?.image} alt={item.title} />
                        <h3>{item.title}</h3> 
                    </div>) : <div>Loading...</div>
        }
            </div>
        </main>
    )
}

export default RankItems;