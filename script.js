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

function extractRgbAndConvertToHex(rgbString) {
    // Extract the numerical values from the RGB string
    const [r, g, b] = rgbString.match(/\d+/g).map(Number);
    // Convert these RGB values to hex
    return rgbToHex(r, g, b);
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

function getEraserColor() {
    whiteColor = rgbToHex(255, 255, 255)
    return whiteColor
}

function getCurrentColor(target) {
    let color;

    if (rainbowModeActive) {
        return generateRandomColorHSL();  // Use a random HSL color if Rainbow Mode is active
    } else if (eraserModeActive) {
        return getEraserColor();  // Return white color for eraser
    } else if (lighterModeActive) {
        color = getComputedStyle(target).backgroundColor; // Get the current color from the element
        return lightenColor(rgbToHsl(color), 4); // Lighten the color
    } else if (shaderModeActive) {
        color = getComputedStyle(target).backgroundColor; // Get the current color from the element
        return darkenColor(rgbToHsl(color), 4); // Darken the color
    } else if (colorGrabActive) {
        color = getComputedStyle(target).backgroundColor;
        return colorGrab(color)
    }
    
    else {
        return colorPicker.value;  // Use the selected color if Rainbow Mode is inactive
    }
}



// Button Event Listeners

// Clear Grid Button
const clearGridButton = document.getElementById('clear-grid')
clearGridButton.addEventListener('click', function () {
    clearGrid()
})

// Event Listeners for grid color-changing
const colorPicker = document.getElementById('colorPicker')
const gridContainer = document.querySelector('.grid-container');
let mouseIsDown = false;

gridContainer.addEventListener('mousedown', function (event) {
    event.preventDefault()
    mouseIsDown = true;
    if (event.target.classList.contains('grid-item')) {
        event.target.style.backgroundColor = getCurrentColor(event.target);
    }
});

gridContainer.addEventListener('mouseup', function () {
    mouseIsDown = false;
});

gridContainer.addEventListener('mouseover', function (event) {
    if (mouseIsDown && event.target.classList.contains('grid-item')) {
        event.target.style.backgroundColor = getCurrentColor(event.target);
    }
});

// Slider
const slider = document.getElementById('myRange')
const gridSizeElements = document.querySelectorAll('.grid-size')

slider.addEventListener('input', function () {
    gridSizeElements.forEach(function (element) {
        element.textContent = slider.value
        createGrid(slider.value)
    })
})

//


// Function to deactivate all modes
function deactivateAllModes(currentId) {
    // Each if condition checks if the mode should be deactivated
    if (rainbowModeActive && currentId !== 'rainbow') {
        rainbowModeActive = false;
        document.getElementById('rainbow').classList.remove('button-on');
        document.getElementById('rainbow').classList.add('button-off');
    }
    if (eraserModeActive && currentId !== 'eraser') {
        eraserModeActive = false;
        document.getElementById('eraser').classList.remove('button-on');
        document.getElementById('eraser').classList.add('button-off');
    }
    if (lighterModeActive && currentId !== 'lighter') {
        lighterModeActive = false;
        document.getElementById('lighter').classList.remove('button-on');
        document.getElementById('lighter').classList.add('button-off');
    }
    if (shaderModeActive && currentId !== 'shader') {
        shaderModeActive = false;
        document.getElementById('shader').classList.remove('button-on');
        document.getElementById('shader').classList.add('button-off');
    }
    if (colorGrabActive && currentId !== 'color-grabber') {
        colorGrabActive = false;
        document.getElementById('color-grabber').classList.remove('button-on');
        document.getElementById('color-grabber').classList.add('button-off');
    }
}

// Function to toggle a specific mode
function toggleMode(setModeFunction, elementId) {
    const isActive = setModeFunction(); // Toggle and get the new state
    deactivateAllModes(elementId); // Deactivate all other modes except the current one

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

function setColorGrabMode() {
    colorGrabActive = !colorGrabActive;
    return colorGrabActive;
}

// Event listeners for each button mode
let rainbowModeActive = false
let eraserModeActive = false
let lighterModeActive = false
let shaderModeActive = false
let colorGrabActive = false

document.getElementById('rainbow').addEventListener('click', () => toggleMode(setRainbowMode, 'rainbow'))
document.getElementById('eraser').addEventListener('click', () => toggleMode(setEraserMode, 'eraser'))
document.getElementById('lighter').addEventListener('click', () => toggleMode(setLighterMode, 'lighter'))
document.getElementById('shader').addEventListener('click', () => toggleMode(setShaderMode, 'shader'))
document.getElementById('color-grabber').addEventListener('click', () => toggleMode(setColorGrabMode, 'color-grabber'))

// Functions for Lighten/Darken
function lightenColor(hsl, amount) {
    let [hue, saturation, lightness] = hsl.match(/\d+/g);
    lightness = Math.min(100, parseInt(lightness) + amount);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function darkenColor(hsl, amount) {
    let [hue, saturation, lightness] = hsl.match(/\d+/g);
    lightness = Math.max(0, parseInt(lightness) - amount);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function rgbToHsl(rgb) {
    // Grab the RGB values and convert them to the range 0-1
    let [r, g, b] = rgb.match(/\d+/g).map(Number).map(v => v / 255);
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function colorGrab(color) {
    let colorPicker = document.getElementById('colorPicker')
    let hexColor = extractRgbAndConvertToHex(color)
    colorPicker.value = hexColor
    deactivateAllModes('all')
}

createGrid(25)