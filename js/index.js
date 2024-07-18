// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const inputMaxWeight = document.querySelector('.maxweight__input'); //input значения фильтрации по весу макс
const inputMinWeight = document.querySelector('.minweight__input'); //input значения фильтрации по весу мин

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "красный", "weight": 35},
  {"kind": "Личи", "color": "оранжевый", "weight": 17},
  {"kind": "Карамбола", "color": "зеленый", "weight": 28},
  {"kind": "Тамаринд", "color": "синий", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
//список цветов
const colors = {
фиолетовый: '#ce33ff',
зеленый: '#26da1d',
желтый:  '#d5e818',
черный: '#000000',
красный: '#d11515',
оранжевый: '#fa6306',
синий: '#1527d8'
};
/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {

while (fruitsList.firstChild) {
  fruitsList.removeChild(fruitsList.firstChild);
}

for (let i = 0; i < fruits.length; i++) {
  const li = document.createElement('li');
  li.classList.add('fruit__item');
  li.style.background = colors[fruits[i].color];

  const fruitInfo = document.createElement('div');
  fruitInfo.classList.add('fruit__info');
  fruitInfo.innerHTML = `
    <div>index: ${i}</div>
    <div>kind: ${fruits[i].kind}</div>
    <div>color: ${fruits[i].color}</div>
    <div>weight (кг): ${fruits[i].weight}</div>
  `;

  li.appendChild(fruitInfo);
  fruitsList.appendChild(li);
}
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let tempFruits = [...fruits];
  let result = [];
  while (tempFruits.length > 0) {
    const randomIndex = getRandomInt(0, tempFruits.length - 1);
    result.push(tempFruits[randomIndex]);
    tempFruits.splice(randomIndex, 1);
  }
  if (JSON.stringify(fruits) === JSON.stringify(result)) {
    modalFailSort();
  }
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let minInputWeight = parseInt(inputMinWeight.value);
  let maxInputWeight = parseInt(inputMaxWeight.value);
  let filteredFruits =  fruits.filter((item) => {
    if(isNaN(minInputWeight) || minInputWeight < 0 || minInputWeight > maxInputWeight) {
      minInputWeight = 0;
    };
    if(isNaN(maxInputWeight) || maxInputWeight < 0 ) {
      maxInputWeight = 1000;
    };
    return item.weight > minInputWeight && item.weight < maxInputWeight;
  });
  fruits = filteredFruits;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
  inputMaxWeight.value = '';
  inputMinWeight.value = '';
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  if(a.color > b.color) return -1;
  if(a.color < b.color) return 1;
  return 0;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    const n = arr.length;
   for (let i = 0; i < n-1; i++) { 
       for (let j = 0; j < n-1-i; j++) { 
           if (comparation(arr[j], arr[j+1]) < 0) { 
               let temp = arr[j+1]; 
               arr[j+1] = arr[j]; 
               arr[j] = temp; 
        }
      }
    }

    return fruits = arr;
  },

  quickSort(arr, comparation) {
    if (arr.length <= 1) {
      return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
      if (i === Math.floor(arr.length / 2)) continue;
      if (comparation(arr[i], pivot) <= 0) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    
    return fruits = [
      ...sortAPI.quickSort(right, comparation),
      pivot,
      ...sortAPI.quickSort(left, comparation)
    ];
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${((end - start)/ 1000).toFixed(10)} s`;
  }
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  sortKind = sortKind === 'bubbleSort' ? 'quickSort' : 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';
  // Добавил timeout,т.к. в задании должна появляться 'sorting...',а сортировка слишком быстрая чтоб заметить эту надпись
  setTimeout(() => {
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
}, 1000);
});

/*** ДОБАВИТЬ ФРУКТ ***/

weightInput.addEventListener('input', () => {
  weightInput.value = weightInput.value.replace(/\D/g, '');
});
colorInput.addEventListener('input', () => {
  colorInput.value = colorInput.value.replace(/[^a-zA-Zа-яА-Я]/g, '');
});

addActionButton.addEventListener('click', () => {
  let fruitKind = kindInput.value;
  let fruitColor = colorInput.value.trim().toLowerCase();
  let fruitWeight = weightInput.value;
  if (fruitColor === '' || fruitKind === '' || fruitWeight === '') {
    modalFailFruitAdd();
  } else {
    if(!colors.hasOwnProperty(fruitColor)) {
      fruitColor = 'черный';
    } 
    fruits.push({
    kind: fruitKind,
    color: fruitColor,
    weight: fruitWeight
  })}
  display();
  kindInput.value = '';
  colorInput.value = '';
  weightInput.value = '';
});