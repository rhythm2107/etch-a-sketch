function createGrid(gridSize) {
    const container = document.querySelector('.grid-container')
    container.innerHTML = ''

    const itemWidth = 100 / gridSize
    const itemHeight = 100 / gridSize

    for (let i = 0; i < gridSize * gridSize; i++) {
        const item = document.createElement('div');
        item.classList.add('grid-item');
        item.style.setProperty('--item-width', `${itemWidth}vw`)
        item.style.setProperty('--item-height', `${itemHeight}vh`)
        container.appendChild(item)

        item.addEventListener('mouseover', () => {
            item.style.backgroundColor = 'red';
        })
    }
}

createGrid(100)