const sortModalClose = document.querySelector('#close-fail-sort-btn'); // закрытие модального окна
const colorModalClose = document.querySelector('#close-colors-sort-btn'); // закрытие модального окна
const fruitAddModalClose = document.querySelector('#close-fail-fruit-add-btn');// закрытие модального окна

// открытие и закрытие окна при ошибке сортировки
function modalFailSort () {
    document.querySelector('.modal.fail-sort').classList.add('open');
  };
sortModalClose.addEventListener('click', () => {
    document.querySelector('.modal.fail-sort').classList.remove('open');
  });
document.querySelector('.modal .modal__box.fail-sort').addEventListener('click', (event) => {
    event._isClickWithInModal = true;
  });
document.querySelector('.modal.fail-sort').addEventListener('click', (event) => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
  });

// открытие и закрытие окна просмотра доступных цветов
document.querySelector('.show__colors').addEventListener('click', () => {
    document.querySelector('.modal.show-colors').classList.add('open')
});
colorModalClose.addEventListener('click', () => {
    document.querySelector('.modal.show-colors').classList.remove('open');
  });
document.querySelector('.modal.show-colors').addEventListener('click', (event) => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
  });
  document.querySelector('.modal .modal__box.show-colors').addEventListener('click', (event) => {
    event._isClickWithInModal = true;
  });

  // открытие и закрытие окна при ошибке добавления нового фрукта
function modalFailFruitAdd () {
    document.querySelector('.modal.fail-fruit-add').classList.add('open');
  };
fruitAddModalClose.addEventListener('click', () => {
    document.querySelector('.modal.fail-fruit-add').classList.remove('open');
  });
document.querySelector('.modal .modal__box.fail-fruit-add').addEventListener('click', (event) => {
    event._isClickWithInModal = true;
  });
document.querySelector('.modal.fail-fruit-add').addEventListener('click', (event) => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
  }); 