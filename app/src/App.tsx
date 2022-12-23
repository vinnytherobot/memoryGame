import { useState } from 'react';

interface DataList {
  row: number;
  column: number;
}

function App() {
  const [grid, setGrid] = useState([
    [9, 1, 4, 4],
    [0, 3, 8, 9],
    [0, 1, 3, 8]
  ])

  const [points, setPoints] = useState(0);

  const [isReveled, setIsReveled] = useState(
    new Array(grid.length).fill("").map(() => new Array(grid[0].length).fill(false))
  );

  const [firstItem, setFirstItem] = useState<DataList>()

  function showNumber(row: number, column: number){
    if(isReveled[row][column]){
      return;
    }

    const clickedNumber = grid[row][column];
    const newIsReveled = [...isReveled];
    newIsReveled[row][column] = true;
    setIsReveled(newIsReveled)
    
    if(firstItem){

      const firstNumberChoosed = grid[firstItem.row][firstItem.column]
      if(firstNumberChoosed !== clickedNumber){

        setTimeout(() => {
          newIsReveled[firstItem.row][firstItem.column] = false;
          newIsReveled[row][column] = false;
          setIsReveled([...newIsReveled]);
        }, 1000)

      } else {
        setPoints(points + 1);
      }
      setFirstItem(undefined);
    } else {
      setFirstItem({row,column})
    }
  }

  return(
    <div className="App">
      <h1 className="points">{points === 6 ? "YOU WON" : `POINTS: ${points}`}</h1>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((number, columnIndex) => (
              <div className="card" key={columnIndex} onClick={() => showNumber(rowIndex, columnIndex)}>
                {isReveled[rowIndex][columnIndex] ? number : ""}
                </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
