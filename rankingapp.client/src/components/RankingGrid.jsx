

const RankingGrid = ({items, images, drag, allowDrop, drop}) => {
    const rankingGrid = [];
    const firstRow = [];
    const secondRow = [];
    const thirdRow = [];
    const lastRow = [];

    const pushCellMarkupToArr = (cellCollection, rankNumber, rowLabel) => {
      if (rankNumber > 0) {
        var item = items.find(o => o.ranking === rankNumber);
        cellCollection.push(<div id={`rank_${rankNumber}`} onDrop={drop} onDragOver={allowDrop} className="rank_cell">
          {(item != null) ? <img id={`item_${item.id}`} src={images.find(o => o.id === item.id)?.image} draggable={true} onDragStart={drag}/>
          : null}
        </div>);
      }
      else {
        cellCollection.push(<div className="row_label">
          <h4>{rowLabel}</h4>
        </div>)
      }
    };

    const createCellsForRows = () => {
      const MAX_ROWS = 4;
      for (var row = 1; row <= MAX_ROWS; row++) {
        var rankNum = 0;
        var currCollection = [];
        var label = "";
        const NUM_CELLS = 5;

        for (var c = 1; c <= NUM_CELLS; c++) {
          rankNum = (c === 1) ? 0 : (NUM_CELLS * (row - 1)) + (c - 1);

          if (row === 1) {
            currCollection = firstRow;
            label = "First Tier";
          }
          else if (row === 2) {
            currCollection = secondRow;
            label = "Second Tier";
          }
          else if (row === 3) {
            currCollection = thirdRow;
            label = "Third Tier";
          }
          else if (row === 4) {
            currCollection = lastRow;
            label = "Fourth Tier";
          }
          pushCellMarkupToArr(currCollection, rankNum, label);
        }
      }
    };

    const createRowsForGrid = () => {
        rankingGrid.push(<div className = "rank_row first_tier">{firstRow}</div>)
        rankingGrid.push(<div className = "rank_row second_tier">{secondRow}</div>)
        rankingGrid.push(<div className = "rank_row third_tier">{thirdRow}</div>)
        rankingGrid.push(<div className = "rank_row last_tier">{lastRow}</div>)

        return rankingGrid;
    };

    const createRankingGrid = () => {
        createCellsForRows();
        return createRowsForGrid();
    };

  return (
    <div className = "rankings">
        {createRankingGrid()}
    </div>
  )
}

export default RankingGrid