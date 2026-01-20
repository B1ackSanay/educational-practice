// Инициализация Яндекс.Карты после загрузки API
ymaps.ready(init);

function init() {
  // Массив с данными адресов (координаты и названия)
  const addresses = [
    {
      name: 'ул. Гвардейцев, 18, Нижний Новгород',
      coords: [56.2354, 43.8543] // Координаты первого адреса
    },
    {
      name: 'Московское шоссе, 1, Нижний Новгород',
      coords: [56.3140, 43.9923] // Координаты второго адреса
    },
    {
      name: 'Кремль, 1А, Нижний Новгород',
      coords: [56.3281, 44.0020] // Координаты третьего адреса
    }
  ];

  // Создаем карту с начальными настройками
  const map = new ymaps.Map('map', {
    center: addresses[0].coords, // Начальный центр карты - первый адрес
    zoom: 15, // Начальный масштаб
    controls: ['zoomControl', 'fullscreenControl'] // Элементы управления
  });

  // Создаем метки для всех адресов
  const placemarks = addresses.map((address, index) => {
    return new ymaps.Placemark(
      address.coords, // Координаты метки
      {
        balloonContent: address.name // Текст во всплывающем окне
      }, 
      {
        preset: 'islands#blueDotIcon' // Стиль метки
      }
    );
  });

  // Добавляем первую метку на карту (начальное состояние)
  map.geoObjects.add(placemarks[0]);

  // Находим все кнопки переключения адресов
  const buttons = document.querySelectorAll('.map-control-btn');
  
  // Добавляем обработчики событий для каждой кнопки
  buttons.forEach((button, index) => {
    button.addEventListener('click', function() {
      // Убираем активный класс со всех кнопок
      buttons.forEach(btn => btn.classList.remove('active'));
      
      // Добавляем активный класс текущей кнопке
      this.classList.add('active');
      
      // Убираем все метки с карты
      map.geoObjects.removeAll();
      
      // Добавляем выбранную метку
      map.geoObjects.add(placemarks[index]);
      
      // Перемещаем карту к выбранному адресу с анимацией
      map.setCenter(addresses[index].coords, 15);
    });
  });
}