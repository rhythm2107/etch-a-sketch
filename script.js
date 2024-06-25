function createGrid(gridSize) {
    const container = document.querySelector('.grid-container')
    container.innerHTML = ''

    const itemWidth = 100 / gridSize
    const itemHeight = 100 / gridSize

    for (let i = 0; i < gridSize * gridSize; i++) {
        const item = document.createElement('div');
        item.classList.add('grid-item');
        item.style.setProperty('--item-width', `${itemWidth}%`)
        item.style.setProperty('--item-height', `${itemHeight}%`)
        container.appendChild(item)

       
    }
}

function clearGrid() {
    const container = document.querySelector('.grid-container')
    const slider = document.getElementById('myRange')
    
    createGrid(slider.value)
}

const clearGridButton = document.getElementById('clear-grid')
clearGridButton.addEventListener('click', function() {
    clearGrid()
})

createGrid(25)

const slider = document.getElementById('myRange')
const gridSizeElements = document.querySelectorAll('.grid-size')

slider.addEventListener('input', function() {
    gridSizeElements.forEach(function(element) {
        element.textContent = slider.value
        createGrid(slider.value)
    })
})

const gridContainer = document.querySelector('.grid-container');
let mouseIsDown = false;

gridContainer.addEventListener('mousedown', function(event) {
    event.preventDefault()
    mouseIsDown = true;
    if (event.target.classList.contains('grid-item')) {
        event.target.style.backgroundColor = selectedColor;
    }
});

gridContainer.addEventListener('mouseup', function() {
    mouseIsDown = false;
});

gridContainer.addEventListener('mouseover', function(event) {
    if (mouseIsDown && event.target.classList.contains('grid-item')) {
        event.target.style.backgroundColor = selectedColor;
    }
});


const colorPicker = document.getElementById('colorPicker')
let selectedColor = '#ff0000'

colorPicker.addEventListener('change', function() {
    selectedColor = this.value;
    console.log("Selected color:", selectedColor)
})

function rgbToHex(r, g, b) {
    return "#" + ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const rgbColor = rgbToHex(r, g, b)
    console.log(rgbColor)
    return rgbColor
}

let rainbowMode = 'Off'
rainbow = document.getElementById('rainbow')


rainbow.addEventListener('click', function() {
    if (rainbowMode === 'Off') {
        rainbowMode = 'On';
        this.classList.remove('button-off');
        this.classList.add('button-on');
    } else {
        rainbowMode = 'Off';
        this.classList.remove('button-on');
        this.classList.add('button-off');
    }
});