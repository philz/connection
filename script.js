document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.getElementById('gridContainer');

    // Create 16 boxes dynamically
    for (let i = 1; i <= 16; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.textContent = i;

        // Add drag and drop event listeners
        box.draggable = true;
        box.addEventListener('dragstart', dragStart);
        box.addEventListener('dragover', dragOver);
        box.addEventListener('dragenter', dragEnter);
        box.addEventListener('dragleave', dragLeave);
        box.addEventListener('drop', drop);

        gridContainer.appendChild(box);
    }

    // Drag and drop functions
    let draggedBox;

    function dragStart(e) {
        draggedBox = e.target;
        setTimeout(() => (e.target.style.opacity = '0.5'), 0);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        e.target.classList.add('hovered');
    }

    function dragLeave(e) {
        e.target.classList.remove('hovered');
    }

    function drop(e) {
        e.preventDefault();
        e.target.classList.remove('hovered');

        // Swap the positions of the dragged and target elements
        const draggedIndex = Array.from(gridContainer.children).indexOf(draggedBox);
        const targetIndex = Array.from(gridContainer.children).indexOf(e.target);

        if (draggedIndex !== -1 && targetIndex !== -1) {
            gridContainer.insertBefore(draggedBox, e.target);
            draggedBox.style.opacity = '1';
        }
    }

    const wordInput = document.getElementById('wordInput');

    wordInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            updateBoxText();
        }
    });

    function updateBoxText() {
        const words = wordInput.value.split(' ');

        // Update the text content of each box with uppercase words
        const boxes = Array.from(document.querySelectorAll('.box'));
        for (let i = 0; i < Math.min(boxes.length, words.length); i++) {
            boxes[i].textContent = words[i].toUpperCase();
        }
    }
});
