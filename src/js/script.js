// Функция создает container и row и размещает его в секцию с классом blog-main
function createBootstrapContainer() {
  const blogMain = document.querySelector(".blog-main");        // Находим элемент с классом "blog-main"

  if (blogMain) {                                               // Проверка есть ли элемент
    const container = document.createElement("div");            // Создаем div
    container.className = "container";                          // С классом container

    const row = document.createElement("div");                  // Создаем div
    row.className = "row row_custom-spacing";                   // С классом row и доп. классом row_custom-spacing для кастомных padding у колонок
    row.setAttribute( 'id', 'blog-items' );                     // Добавляем id для последующего вывода карточек blog-item

    container.appendChild(row);                                 // Размещаем row в container                          

    blogMain.appendChild(container);                            // Размещаем container в section.blog-main
  } else {                                                      // Иначе
    console.error("Элемент с классом 'blog-main' не найден.");  // Сообщаем об ошибке
  }
}
createBootstrapContainer();

// Запишим в перменную элемент, куда будем выводить колонки с карточками новостей
const containerBlogItems = document.getElementById("blog-items");

// Функция добавляет созданный элемент в колонку и выводит в контейнер, принимает 2 параметра соответственно
function addBlogItemToContainer(container, blogItem) {
  const columnDiv = document.createElement("div");        // Создаем колонку
  columnDiv.className = "col-xl-4 col-md-6";
  columnDiv.innerHTML = blogItem;                         // В колонку выводим карточку новости
  container.appendChild(columnDiv);                       // Колонку размещаем в контейнер
}

// Функция-шаблонизатор, которая возвращает готовую верстку. Принимает объект параметров.
function getTemplate( object ) {
  return `
  <div class="blog-item blog-item_transition-default blog-item_hover-green-links" id="blog-item-${object.id}">
    <a href="" class="blog-item__img-link">
        <img src="${object.src}" alt="${object.fullTitle}" class="blog-item__img">
    </a>
    <div class="blog-item__content">
        <div class="blog-item__main">
            <a href="" class="blog-item__title-link">
                <p class="blog-item__title" data-toggle="tooltip" data-placement="top" data-original-title="${object.fullTitle}">${object.sliceTitle}</p>
            </a>
            <a href="" class="blog-item__info blog-item__info_grey-color">
                <p class="blog-item__date">${object.date}</p>
            </a>
            <p class="blog-item__description">
              ${object.description}
            </p>
        </div>
        <div class="blog-item__bottom d-flex align-items-center justify-content-between">
            <a href="" class="blog-item__info blog-item__info_grey-color">
                <p class="blog-item__author blog-item__author_no-spacing-bottom">${object.author}</p>
            </a>
            <a class="btn-ui btn-ui_like" data-vote-status="${object.voteStatus}"></a>
        </div>
    </div>
  </div>
  `;  
}



// Поулчаем json по api
const apiUrl = 'https://dev.mykgproxy.webprofy.ru/upload/frontend/data.json';

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

fetch(apiUrl, options)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    
    // Перебераем массив
    data.forEach((item) => {
      // 1. Работаем с полями, фиксим баги
      // 2. Создаем dom-element вызывая функцию getTemplate
      // 3. Выводим картчоку новости в верстку через вызов функции addBlogItemToContainer


      // Работаем с полем name
      let name = item.name;                                                         // записываем в переменную имя заголовка
      name = name.toLowerCase();                                                    // Преобразуем весь текст в нижний регистр

      // Была идея написать логику для проверки первой буквы, является ли она символом впринципе, но решил в рамках тестового ограничиться тем, что пофиксил только 1 символ, который фактически встречается в объектах.   
      if (name.charAt(0) === '«') {                                                 // проверяем, если первая буква "«"
        name = name.charAt(0) + name.charAt(1).toUpperCase() + name.slice(2);       // то делаем заглавной вторую букву, все остальные в нижнем регистре
      } else {                                                                      // если нет
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();          // то делаем заглавной 1 букву, все остальные в нижнем регистре
      }
      const sliceName = name.length > 30 ? name.slice(0, 40) + '...' : name;        // Обрезаем текст на 20 символов и добавляем "..."
      

      // Работаем с полем imgUrl
      let imgUrl = item.imgUrl || 'https://dummyimage.com/423x269';        // записываем в переменную ключ с URL картинки
                                                                           // Так как в некоторых объектах отсутствуют ключи с картинками, то будем выводить подменную картинку.
      if (imgUrl.startsWith("hhttps://")) {                                // Проверяем и исправляем опечатку типа "hhtps://"
        imgUrl = imgUrl.replace("hhttps://", "https://");
      }
      

      // Работаем с полем date
      const date = item.date || 'Нет данных';                               // записываем в переменную дату
                                                                            // так как ключа date нет в одном из объектов, ипользуем оператор или
      const formattedDate = date.replace(/-/g, '.');                        // заменим '-' на '.' что бы соответсвовало макету


      // Работаем с полем text ( описание )
      const text = item.text;                                                         // записываем в переменную текст описания
      const sliceText = text.length > 100 ? text.slice(0, 160) + '...' : text;        // Обрезаем текст, если он превышает 100 символов, и добавляем ...


      // Записываем в переменную author
      const author = item.author;                                    // записываем в переменную имя автора


      // Записываем в переменную id
      const id = item.id;                                            // записываем в переменную имя автора


      // Работаем с полем voteStatus
      let voteStatus = item.voteStatus;                              // записываем в переменную значение ключа voteStatus
      if( voteStatus === false ){                                    // если оно false
        voteStatus = false                                           // установим значение false
      }else if( voteStatus === true ){                               // если true
        voteStatus = true                                            // установим значение true
      }else{                                                         // иначе ( отсутствует ключ )
        voteStatus = false                                           // установим значение false
      }

      // Создаем dom-element
      const newBlogItem = getTemplate({
        src: imgUrl,            // url
        fullTitle: name,        // полное имя заголовка
        sliceTitle: sliceName,  // сокращенное имя заголовка
        date: formattedDate,    // дата
        description: sliceText, // описание
        author: author,         // автор
        id: id,                 // id
        voteStatus: voteStatus  // voteStatus
      })

      addBlogItemToContainer(containerBlogItems, newBlogItem); // Размещаем в контейнер
    });

    //  инициализация tooltip в boostrap 4
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  })

  .catch(error => {
    console.error(`Произошла ошибка: ${error}`);
  });




//  Добавление класса active к btn-ui_like ( вместо перебора циклом решил использовать всплытие )
const wrapperBlogMain = document.querySelector('.blog-main');               // родитель для добавления прослушивателя
function clickToBtnUiLikeAddActive(e) {                                     // функция вызывается
  const elementTarget = e.target;                                           // при клике на target элемент
  if (elementTarget.classList.contains('btn-ui_like')) {                    // с классом btn-ui_like
    if( elementTarget.classList.contains('active') ){                       // если есть класс active
        elementTarget.classList.remove('active');                           // удаляем класс active
        elementTarget.setAttribute( 'data-vote-status', false )             // data-vote-status ставим в false
    }else{                                                                  // если нет
        elementTarget.classList.add('active');                              // добавляем класс active
        elementTarget.setAttribute( 'data-vote-status', true )              // data-vote-status ставим в true
    }
  }
  

}
wrapperBlogMain.addEventListener('click', clickToBtnUiLikeAddActive);       // вешаем прослушиватель на wrapperBlogMain
