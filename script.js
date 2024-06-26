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

function rgbToHex(r, g, b) {
    return "#" + ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
}

function getRandomColor() {

    let colors = [0, 0, 0]
    let zeroIndex = Math.floor(Math.random() * 3)

    for (let i = 0; i < 3; i++) {
        if (i !== zeroIndex) {
            colors[i] = Math.floor(Math.random() * 176) + 80
        }
    }

    const rgbColor = rgbToHex(colors[0], colors[1], colors[2])
    console.log(rgbColor)
    return rgbColor
}

function generateRandomColorHSL() {
    let hue = Math.floor(Math.random() * 360); // Random hue from 0 to 360 degrees.
    let saturation = 100; // Full saturation for vibrant color.
    let lightnessOptions = [50, 65, 80]; // Different lightness values to pick from.
    let lightness = lightnessOptions[Math.floor(Math.random() * lightnessOptions.length)]; // Pick a random lightness.

    return `hsl(${hue}deg, ${saturation}%, ${lightness}%)`;
}

function getCurrentColor() {
    if (rainbowModeActive) {
        return generateRandomColorHSL();  // Use a random color if Rainbow Mode is active
    } else {
        return colorPicker.value;  // Use the selected color if Rainbow Mode is inactive
    }
}


// Button Event Listeners

// Clear Grid Button
const clearGridButton = document.getElementById('clear-grid')
clearGridButton.addEventListener('click', function() {
    clearGrid()
})

// Event Listeners for grid color-changing
const colorPicker = document.getElementById('colorPicker')
const gridContainer = document.querySelector('.grid-container');
let mouseIsDown = false;

gridContainer.addEventListener('mousedown', function(event) {
    event.preventDefault()
    mouseIsDown = true;
    if (event.target.classList.contains('grid-item')) {
        event.target.style.backgroundColor = getCurrentColor();
    }
});

gridContainer.addEventListener('mouseup', function() {
    mouseIsDown = false;
});

gridContainer.addEventListener('mouseover', function(event) {
    if (mouseIsDown && event.target.classList.contains('grid-item')) {
        event.target.style.backgroundColor = getCurrentColor();
    }
});

// Slider
const slider = document.getElementById('myRange')
const gridSizeElements = document.querySelectorAll('.grid-size')

slider.addEventListener('input', function() {
    gridSizeElements.forEach(function(element) {
        element.textContent = slider.value
        createGrid(slider.value)
    })
})

//
let rainbowModeActive = false
let eraserModeActive = false
let lighterModeActive = false
let shaderModeActive = false

// Function to deactivate all modes
function deactivateAllModes() {
    if (rainbowModeActive) {
        rainbowModeActive = false;
        document.getElementById('rainbow').classList.remove('button-on');
        document.getElementById('rainbow').classList.add('button-off');
    }
    if (eraserModeActive) {
        eraserModeActive = false;
        document.getElementById('eraser').classList.remove('button-on');
        document.getElementById('eraser').classList.add('button-off');
    }
    if (lighterModeActive) {
        lighterModeActive = false;
        document.getElementById('lighter').classList.remove('button-on');
        document.getElementById('lighter').classList.add('button-off');
    }
    if (shaderModeActive) {
        shaderModeActive = false;
        document.getElementById('shader').classList.remove('button-on');
        document.getElementById('shader').classList.add('button-off');
    }
}

// Function to toggle a specific mode
function toggleMode(setModeFunction, elementId) {
    deactivateAllModes();
    setModeFunction();

    const element = document.getElementById(elementId);
    if (isActive) {
        element.classList.add('button-on');
        element.classList.remove('button-off');
    } else {
        element.classList.remove('button-on');
        element.classList.add('button-off');
    }
}

function toggleMode(setModeFunction, elementId) {
    const isActive = setModeFunction(); // Toggle and get the new state
    deactivateAllModes(); // Deactivate all modes
    setModeFunction(isActive); // Restore the toggled mode's state

    const element = document.getElementById(elementId);
    if (isActive) {
        element.classList.add('button-on');
        element.classList.remove('button-off');
    } else {
        element.classList.remove('button-on');
        element.classList.add('button-off');
    }
}


// Functions for toggling buttons
function setRainbowMode() {
    rainbowModeActive = !rainbowModeActive;
    return rainbowModeActive;
}

function setEraserMode() {
    eraserModeActive = !eraserModeActive;
    return eraserModeActive;
}

function setLighterMode() {
    lighterModeActive = !lighterModeActive;
    return lighterModeActive;
}

function setShaderMode() {
    shaderModeActive = !shaderModeActive;
    return shaderModeActive;
}


// Event listeners for each button mode
document.getElementById('rainbow').addEventListener('click', () => toggleMode(setRainbowMode, 'rainbow'))
document.getElementById('eraser').addEventListener('click', () => toggleMode(setEraserMode, 'eraser'))
document.getElementById('lighter').addEventListener('click', () => toggleMode(setLighterMode, 'lighter'))
document.getElementById('shader').addEventListener('click', () => toggleMode(setShaderMode, 'shader'))





createGrid(25)