const boxContainer = document.querySelector('#boxContainer')
const gridSize = document.querySelector('#gridSize') 
let color = document.querySelector('#colorPicker')
const reset = document.querySelector('#reset')
const rainbow = document.querySelector('#rainbow')
const toggleGrid = document.querySelector('#toggleGrid')
toggleGrid.checked = true
let mouseDown;
let boxes;


function createGrid() {
    const gridSizeInfo = document.querySelector('#gridSizeInfo')
    gridSizeInfo.textContent = gridSize.value

    const boxSize = (500 / gridSize.value)
    for (let i = 0; i < (gridSize.value * gridSize.value); i++) {
    const box = document.createElement('div');
    box.classList.add('box')
    if (toggleGrid.checked == true) box.classList.add('border')
    box.setAttribute('style', `width: ${boxSize}px; height: ${boxSize}px; background-color: white`)
    boxContainer.appendChild(box);
    }
    boxes = document.querySelectorAll('.box')
}

function removeBox() {
    while(boxContainer.firstChild) {
        boxContainer.removeChild(boxContainer.firstChild)
    }
}

function colorBox(selected) {
    document.body.onmousedown = () => mouseDown = true
    document.body.onmouseup = () => mouseDown = false
    selected.addEventListener('mousedown', () => {
        if (rainbow.checked == true) selected.style.backgroundColor = getRandomColor()
        else selected.style.backgroundColor = color.value
    })
    selected.addEventListener('mouseenter', () => {
        if (mouseDown == true) {
            if (rainbow.checked == true) selected.style.backgroundColor = getRandomColor()
            else selected.style.backgroundColor = color.value
        }
    })
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

//Remove current grid and create new one when grid size is changed
function updateGrid() {
    removeBox() 
    createGrid()
    boxes.forEach(colorBox)
}

toggleGrid.oninput = () => {
    boxes.forEach((box) => {
        if (toggleGrid.checked == true) {
            box.classList.add('border')
        }
        else box.classList.remove('border')
    })
}



createGrid()
boxes.forEach(colorBox)
reset.onclick = () => updateGrid()
gridSize.oninput = () => updateGrid()