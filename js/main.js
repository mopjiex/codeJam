const body = document.querySelector('body');
let movesCount = 0;
let resultCount = 1;

const main = document.createElement('main');
main.classList.add('main');
body.append(main);

const content = document.createElement('section');
content.classList.add('content');
main.append(content);

const container = document.createElement('div');
container.classList.add('container');
content.append(container);

const contentButtons = document.createElement('div');
contentButtons.classList.add('content__buttons');
container.append(contentButtons)

const start = document.createElement('button');
const stop = document.createElement('button');
const reload = document.createElement('button');

start.classList.add('content__btn');
stop.classList.add('content__btn');
reload.classList.add('content__btn');

start.classList.add('start');
stop.classList.add('stop');
reload.classList.add('reload');

start.textContent = 'Start';
stop.textContent = 'Stop';
reload.textContent = 'Reload';

contentButtons.append(start, stop, reload)

const contentMoverAndTime = document.createElement('div');
contentMoverAndTime.classList.add('content__mover-and-time');
container.append(contentMoverAndTime);

const contentMoves = document.createElement('p');
const contentTime = document.createElement('p');
contentMoves.classList.add('content__moves');
contentTime.classList.add('content__time');
contentMoves.innerHTML = `Moves: `;
const moves = document.createElement('span');
moves.classList.add('content__moves__span');
moves.textContent = 0;
contentMoves.append(moves);
const min = document.createElement('span');
const sec = document.createElement('span');
min.classList.add('min');
sec.classList.add('sec');
contentTime.textContent = 'Time '
min.textContent = '00';
sec.textContent = ' : 00';

contentTime.append(min, sec);

contentMoverAndTime.append(contentMoves, contentTime)

const contentField = document.createElement('div');
contentField.classList.add('content__field');
container.append(contentField);

const field = document.createElement('div');
field.classList.add('field');
contentField.append(field);

const fieldButtons = document.createElement('div');
fieldButtons.classList.add('field__buttons');
container.append(fieldButtons);

const btn3x3 = document.createElement('button');
const btn4x4 = document.createElement('button');
const btn5x5 = document.createElement('button');
const btn6x6 = document.createElement('button');
const btn7x7 = document.createElement('button');
const btn8x8 = document.createElement('button');

btn3x3.classList.add('field__btn');
btn4x4.classList.add('field__btn');
btn5x5.classList.add('field__btn');
btn6x6.classList.add('field__btn');
btn7x7.classList.add('field__btn');
btn8x8.classList.add('field__btn');

btn3x3.classList.add('btn3x3');
btn4x4.classList.add('btn4x4');
btn5x5.classList.add('btn5x5');
btn6x6.classList.add('btn6x6');
btn7x7.classList.add('btn7x7');
btn8x8.classList.add('btn7x7');

btn3x3.textContent = '3x3';
btn4x4.textContent = '4x4';
btn5x5.textContent = '5x5';
btn6x6.textContent = '6x6';
btn7x7.textContent = '7x7';
btn8x8.textContent = '8x8';

fieldButtons.append(btn3x3, btn4x4, btn5x5, btn6x6, btn7x7, btn8x8)

let empty = {
    value: 0,
    top: 0,
    left: 0,
};

let cells = [];
cells.push(empty);

start.addEventListener('click', () => {
    clearInterval(interval);
    interval = setInterval(startTimer, 1000);
})

stop.addEventListener('click', () => {
    clearInterval(interval);
    
})

let minute = 00,
    second = 00,
    interval;

function startTimer() {
    second++;
    if(second <= 9) {
        sec.innerHTML = ' : ' + '0' + second;
    }
    if(second > 9) {
        sec.innerHTML = ' : ' + second;
    }
    
    if(second >= 60) {
        minute++;
        if(minute <= 9) {
            min.innerHTML = '0' + minute;
        }
        if(minute > 9) {
            min.innerHTML = minute;
        }
        second = 0;
        sec.innerHTML = ' : ' + '0' + second;
        
    }
}   

function deleteItem() {
    let deleteElement = document.querySelectorAll('.cell');
    for(let i = 0; i < deleteElement.length; i++) {
        deleteElement[i].remove();
    }
}

function move(index, cellSize, fieldSize) {
    const cell = cells[index];

    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    if(leftDiff + topDiff > 1) {
        return;
    }

    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    const emptyLeft = empty.left;
    const emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;

    const isFinished = cells.every(cell => {
        return cell.value == cell.top * fieldSize + cell.left;
    });

    if(isFinished) {
        console.log(1)
        movesCount = -1;
    }
    movesCount++;
    moves.innerHTML = movesCount;
}

function grid(cellSize, screenSize, cellCount, fieldSize, fontSize) {
    field.style.width = `${screenSize}px`;
    field.style.height = `${screenSize}px`;

    const numbers = [...Array(cellCount).keys()]
    .sort(()=> Math.random() - 0.5);

    for(let i = 1; i <= cellCount; i++) {
        const cell = document.createElement('div');
        const value = numbers[i - 1] + 1;
        cell.className = 'cell';
        cell.innerHTML = value;

        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        cell.style.fontSize = `${fontSize}px`;

        const left = i % fieldSize;
        const top = (i - left) / fieldSize;
    
        cells.push({
            value: value,
            left: left,
            top: top,
            element: cell,
        });
    
        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;
    
        field.append(cell);
    
        cell.addEventListener('click', ()=> {
            move(i, cellSize, fieldSize);
        })
    }
}   

grid(75, 300, 15, 4, 40)

btn3x3.addEventListener('click', () => {
    empty = {
        value: 0,
        top: 0,
        left: 0,
    };
    
    cells = [];
    cells.push(empty);

    deleteItem();
    movesCount = 0;
    moves.innerHTML = 0;
    minute = 00;
    second = 00;
    min.innerHTML = '00';
    sec.innerHTML = ' : 00';
    clearInterval(interval);
    grid(100, 300, 8, 3, 50)
})

btn4x4.addEventListener('click', () => {
    empty = {
        value: 0,
        top: 0,
        left: 0,
    };
    
    cells = [];
    cells.push(empty);

    deleteItem();
    movesCount = 0;
    moves.innerHTML = 0;
    minute = 00;
    second = 00;
    min.innerHTML = '00';
    sec.innerHTML = ' : 00';
    clearInterval(interval);
    grid(75, 300, 15, 4, 40)
})

btn5x5.addEventListener('click', () => {
    empty = {
        value: 0,
        top: 0,
        left: 0,
    };
    
    cells = [];
    cells.push(empty);

    deleteItem();
    movesCount = 0;
    moves.innerHTML = 0;
    minute = 00;
    second = 00;
    min.innerHTML = '00';
    sec.innerHTML = ' : 00';
    clearInterval(interval);
    grid(60, 300, 24, 5, 30)
})

btn6x6.addEventListener('click', () => {
    empty = {
        value: 0,
        top: 0,
        left: 0,
    };
    
    cells = [];
    cells.push(empty);

    deleteItem();
    movesCount = 0;
    moves.innerHTML = 0;
    minute = 00;
    second = 00;
    min.innerHTML = '00';
    sec.innerHTML = ' : 00';
    clearInterval(interval);
    grid(50, 300, 35, 6, 25)
})

btn7x7.addEventListener('click', () => {
    empty = {
        value: 0,
        top: 0,
        left: 0,
    };
    
    cells = [];
    cells.push(empty);

    deleteItem();
    movesCount = 0;
    moves.innerHTML = 0;
    minute = 00;
    second = 00;
    min.innerHTML = '00';
    sec.innerHTML = ' : 00';
    clearInterval(interval);
    grid(43, 300, 48, 7, 20)
})

btn8x8.addEventListener('click', () => {
    empty = {
        value: 0,
        top: 0,
        left: 0,
    };
    
    cells = [];
    cells.push(empty);

    deleteItem();
    movesCount = 0;
    moves.innerHTML = 0;
    minute = 00;
    second = 00;
    min.innerHTML = '00';
    sec.innerHTML = ' : 00';
    clearInterval(interval);
    grid(37.5, 300, 63, 8, 15)
})


reload.addEventListener('click', () => {
    empty = {
        value: 0,
        top: 0,
        left: 0,
    };
    
    cells = [];
    cells.push(empty);
    movesCount = 0;
    minute = 00;
    second = 00;
    moves.innerHTML = 0;
    min.innerHTML = '00';
    sec.innerHTML = ' : 00';
    clearInterval(interval);
    deleteItem();
    grid(75, 300, 15, 4, 40)
})