document.addEventListener('DOMContentLoaded', function () {
  const gridContainer = document.getElementById('gridContainer');

  // Create 16 boxes dynamically
  for (let i = 1; i <= 16; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.textContent = i;
    gridContainer.appendChild(box);
  }
  let selectedBox = null;

     // Click event handler for grid boxes
  gridContainer.addEventListener('click', function (e) {
    const clickedBox = e.target.closest('.box');

    if (clickedBox) {
      if (!selectedBox) {
        // First box clicked, highlight it
        selectedBox = clickedBox;
        selectedBox.classList.add('selected');
      } else {
        // Second box clicked, swap positions
        swapBoxes(selectedBox, clickedBox);
        clickedBox.classList.add('selected');
        let s = selectedBox;
        selectedBox = null;
        setTimeout(() => {
          s.classList.remove('selected');
          clickedBox.classList.remove('selected');
        }, 200);
      }
    }
  });

  function swapBoxes(box1, box2) {
    const box1text = box1.innerText;
    box1.innerText = box2.innerText;
    box2.innerText = box1text;
  }

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const day = currentDate.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  fetch(`data/${formattedDate}.json`)
    .then(response => response.json())
    .then( (data) => {
      const words = data.startingGroups.flatMap(x => x);
      const boxes = Array.from(document.querySelectorAll('.box'));
      for (let i = 0; i < Math.min(boxes.length, words.length); i++) {
        boxes[i].textContent = words[i].toUpperCase();
      }
    })
    .catch(error => console.error('Error fetching data:', error));
});
