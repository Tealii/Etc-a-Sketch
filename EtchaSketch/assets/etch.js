    //Declaring Inputs and making them equal each other
    let inputX = document.getElementById('x');
    let inputY = document.getElementById('y');
    inputX.addEventListener('input', () => inputY.value = inputX.value);
    inputY.addEventListener('input', () => inputX.value = inputY.value);
    //

    window.onload = makeGrid(16);

    let chosenMedium = ['black', 'dshader', 'lshader', 'random', 'eraser', 'clear'];
    document.querySelector('#createNew').addEventListener('click', () => {
        removeElements('cell');
        let dimension = inputX.value;
        chosenMedium = 'black';
        makeGrid(dimension);
    }); 

    //Declaring some of our buttons for use!
    document.querySelector("#black").addEventListener('click', (e) => chosenMedium = 'black');
    document.querySelector("#dshader").addEventListener('click', (e) => chosenMedium = 'dshader');
    document.querySelector("#lshader").addEventListener('click', (e) => chosenMedium = 'lshader');
    document.querySelector("#random").addEventListener('click', (e) => chosenMedium = 'random');
    document.querySelector("#eraser").addEventListener('click', (e) => chosenMedium = 'eraser');
    //

    function makeGrid(dimension){

        const canvas = document.querySelector('#canvas');
        const canvasWidth = canvas.offsetWidth;
        let cellSize = canvasWidth / dimension;

        //loop that makes our divs.
        for(let x = 1; x <= dimension * dimension; x++){
            const makeCell = document.createElement('div');
            makeCell.classList.add('cell');
            canvas.appendChild(makeCell);
        }; 
        //
        //how divs should be appended
        canvas.style.gridTemplateRows = `repeat(${dimension}, ${cellSize}px [row-start])`; 
        canvas.style.gridTemplateColumns = `repeat(${dimension}, ${cellSize}px [col-start])`;
        //
        
        let cells = document.querySelectorAll('div.cell'); 

        //forEach so each cell is affected
        cells.forEach(cell => { 
            cell.setAttribute('style', 'opacity:0');
            cell.style.backgroundColor = 'rgb(16,16,16)';
            document.querySelector("#clear").addEventListener('click', (e) => {
                cell.style.removeProperty('background-color');
                cell.style.removeProperty('opacity');
                cell.setAttribute('style', 'opacity:0');
                cell.style.backgroundColor = 'rgb(16,16,16)';
            });
            cell.addEventListener('mouseover', (e) => {
                switch(chosenMedium){
                    case 'black':
                        cell.style.backgroundColor = 'rgb(0,0,0)';
                        cell.style.opacity = 1;
                        break;
                    case 'dshader':
                        let darkShader = cell.style.opacity;
                        cell.style.opacity = (Number(darkShader) + 0.1);
                        break;
                    case 'lshader':
                        let lightShader = cell.style.opacity;
                         cell.style.opacity = (Number(lightShader) - 0.1);
                        break;
                    case 'random':
                        let r = Math.floor(Math.random()*256);
                        let g = Math.floor(Math.random()*256);
                        let b = Math.floor(Math.random()*256);
                        let randomColor = `rgb(${r}, ${g}, ${b})`;
                        cell.style.backgroundColor = randomColor;
                        cell.style.opacity = 1;
                        break;
                    case 'eraser':
                        cell.style.backgroundColor = '';
                        break;
                };
            });  
        });
    };

    function removeElements(className) { 
        let elements = document.getElementsByClassName(className);
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        };
    }; 