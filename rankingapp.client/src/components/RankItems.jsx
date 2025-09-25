import { useState, useEffect } from 'react';
import { MovieImgs } from './Image.jsx';
import RankingGrid from './RankingGrid.jsx';

const RankItems = () => {
    const [items, setItems] = useState([]);
    const dataType = 1;

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
        ev.preventDefault();
        const targetElement = ev.target.closest(".rank_cell");
        if (!targetElement || targetElement.childNodes.length > 0) return;
        if (targetElement.childNodes.length === 0) {
            var data = parseInt(ev.dataTransfer.getData("text").substring(5));
            const transformedCollection = items.map(item => (item.id === parseInt(data)) ? 
                {...item, ranking: parseInt(targetElement.id.substring(5))}: {...item, ranking: item.ranking});
            setItems(transformedCollection);
        }
    }
    // function drop(ev) {
    // ev.preventDefault();

    // const targetCell = ev.target.closest(".rank_cell");
    // if (!targetCell || targetCell.childNodes.length > 0) return;

    // const data = parseInt(ev.dataTransfer.getData("text").substring(5));
    // const newRank = parseInt(targetCell.id.substring(5));

    // const transformedCollection = items.map(item =>
    //     item.id === data
    //         ? { ...item, ranking: newRank }
    //         : item
    // );

    // setItems(transformedCollection);
    // }

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
            <RankingGrid items={items} images={MovieImgs} drag={drag} allowDrop={allowDrop} drop={drop}/>
            <div className = "items_not_ranked">
        {            
                (items.length > 0) ? items.map(item =>
                    <div className="unranked_cell" key={item.id}>
                        <img id={`item_${item.id}`} src={MovieImgs.find(o => o.id === item.id)?.image} alt={item.title} 
                        style = {{cursor: "pointer"}} draggable = {true} onDragStart={drag}/>
                        <h3>{item.title}</h3> 
                    </div>) : <div>Loading...</div>
        }
            </div>
        </main>
    )
}

export default RankItems;