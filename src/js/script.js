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

// Функция создает blog-item с элементами внутри. Добавляет нужные классы. Размещает все элементы в нужном порядке.

function createBlogItem() {
  const blogItemDiv = document.createElement("div");                                              // Создаем карточку новости
  blogItemDiv.className = "blog-item blog-item_transition-default blog-item_hover-green-links"; 

  const contentDiv = document.createElement("div");                                               // Создаем элемент-обертку blog-item__content
  contentDiv.className = "blog-item__content";

  const imgLink = document.createElement("a");                    // Создаем a.blog-item__img-link - ссылку-обертку под картинку
  imgLink.setAttribute("href", "#");
  imgLink.className = "blog-item__img-link";

  const img = document.createElement("img");                      // Создаем картинку img.blog-item__img
  img.className = "blog-item__img";

  imgLink.appendChild(img);                                       // Размещаем картинку внутрь ссылки-обертки


  const mainDiv = document.createElement("div");                  // Создаем элемент-обертку blog-item__main
  mainDiv.className = "blog-item__main";

  const titleLink = document.createElement("a");                  // Создаем a.blog-item__title-link - ссылку обертку под заголовок
  titleLink.setAttribute("href", "#");
  titleLink.className = "blog-item__title-link";

  const titleP = document.createElement("p");                     // Создаем p.blog-item__title - параграф под вывод заголовка
  titleP.className = "blog-item__title";
  titleP.setAttribute("data-toggle", "tooltip");                  // Атрибут для инициализации tooltip от bootstrap
  titleP.setAttribute("data-placement", "top");                   // Атрибут для инициализации tooltip от bootstrap ( выводить tooltip сверху )

  titleLink.appendChild(titleP);                                  // Размещаем заголовок внутрь ссылки-обертки

  const dateLink = document.createElement("a");                   // Создаем a.blog-item__info - ссылку-обертку для даты
  dateLink.setAttribute("href", "#");
  dateLink.className = "blog-item__info blog-item__info_grey-color";

  const dateContent = document.createElement("p");                // Создаем p.blog-item__date - параграф под вывод даты
  dateContent.className = "blog-item__date";

  dateLink.appendChild(dateContent);                              // Размещаем дату внутрь ссылки-обертки

  const description = document.createElement("p");                // Создаем p.blog-item__description - для вывода краткого описания
  description.className = "blog-item__description";


  const bottomDiv = document.createElement("div");                                                // Создаем элемент-обертку blog-item__bottom дял вывода имени автора и кнопки лайк
  bottomDiv.className = "blog-item__bottom d-flex align-items-center justify-content-between";    // Используем классы bootstrap

  

  const authorLink = document.createElement("a");                                         // Создаем a.blog-item__info - ссылку-обертку для имени автора
  authorLink.setAttribute("href", "#");
  authorLink.className = "blog-item__info blog-item__info_grey-color";

  const authorContent = document.createElement("p");                                      // Создаем p.blog-item__author - параграф под вывод имени автора
  authorContent.className = "blog-item__author blog-item__author_no-spacing-bottom";

  authorLink.appendChild(authorContent);                                                  // Размещаем имя автора внутрь ссылки-обертки

  const likeButton = document.createElement("a");                                         // Создаем кнопку лайк
  likeButton.className = "btn-ui btn-ui_like";

  // Добавляем все созданные элементы в нужной последовательности

  // Иерархия ( что бы не потеряться потом ))) )

  // blogItemDiv -        div.blog-item
    // contentDiv -         div.blog-item__content
      // imgLink -            div.blog-item__img-link > img.blog-item__img
      // mainDiv -          div.blog-item__main
        // titleLink -        a.blog-item__title-link > p.blog-item__title
        // dateLink -         a.blog-item__info > p.blog-item__date
        // description -      p.blog-item__descrription
      // bottomDiv -        div.blog-item__bottom
        // authorLink -       a.blog-item__info > p.blog-item__author
        // likeButton -       a.btn-ui_like
  
  blogItemDiv.appendChild(imgLink);     // В карточку новости выводим div.blog-item__img-link > img.blog-item__img
  blogItemDiv.appendChild(contentDiv);  // В карточку новости выводим div.blog-item__content

  contentDiv.appendChild(mainDiv);      // В div.blog-item__content выводим div.blog-item__main
  mainDiv.appendChild(titleLink);       // В div.blog-item__main выводим a.blog-item__title-link > p.blog-item__title
  mainDiv.appendChild(dateLink);        // В div.blog-item__main выводим a.blog-item__info > p.blog-item__date
  mainDiv.appendChild(description);     // В div.blog-item__main выводим p.blog-item__descrription

  contentDiv.appendChild(bottomDiv);    // В div.blog-item__content выводим div.blog-item__bottom
  bottomDiv.appendChild(authorLink);    // В div.blog-item__bottom выводим a.blog-item__info > p.blog-item__author
  bottomDiv.appendChild(likeButton);    // В div.blog-item__bottom выводим a.btn-ui_like

  return blogItemDiv;
}

// Функция добавляет созданный элемент в колонку и выводит в контейнер, принимает 2 параметра соответственно
function addBlogItemToContainer(container, blogItem) {
  const columnDiv = document.createElement("div");        // Создаем колонку
  columnDiv.className = "col-xl-4 col-md-6";
  columnDiv.appendChild(blogItem);                        // В колонку выводим карточку новости
  container.appendChild(columnDiv);                       // Колонку размещаем в контейнер
}

// Запишим в перменную ранее созданный элемент, куда будем выводить колонки
const containerBlogItems = document.getElementById("blog-items");

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
    
    // Перебераем массив что бы создать столько карточек, сколько объектов в массиве
    data.forEach((item) => {
      const blogItem = createBlogItem();                    // Создаем карточку новости
    
      addBlogItemToContainer(containerBlogItems, blogItem); // Размещаем в контейнер
    });

    // Добавляем имя заголовка
    const titleElements = document.querySelectorAll('.blog-item__title');

    // перебор titleElements
    titleElements.forEach((titleElement, index) => {                            // перебор элементов с именем заголовка
      let name = data[index].name;                                              // записываем в переменную имя заголовка
      name = name.toLowerCase();                                                // Преобразуем весь текст в нижний регистр

      // Была идея написать логику для проверки первой буквы, является ли она символом впринципе, но решил в рамках тестового ограничиться тем, что пофиксил только 1 символ, который фактически встречается в объектах.   

      if (name.charAt(0) === '«') {                                                 // проверяем, если первая буква "«"
        name = name.charAt(0) + name.charAt(1).toUpperCase() + name.slice(2);       // то делаем заглавной вторую букву, все остальные в нижнем регистре
      } else {                                                                      // если нет
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();          // то делаем заглавной 1 букву, все остальные в нижнем регистре
      }
      const truncatedName = name.length > 30 ? name.slice(0, 40) + '...' : name;    // Обрезаем текст на 20 символов и добавляем "..."
      titleElement.textContent = truncatedName;                                     // выводим текст в верстке
      titleElement.setAttribute('data-original-title', name);                       // выводим текст в tooltip
    });

    // Добавляем изображение
    const imgElements = document.querySelectorAll('.blog-item__img');

    // перебор imgElements и доабвление ключа URL в атрибут src
    imgElements.forEach((imgElement, index) => {                           // перебор элементов с картинками
      let imgUrl = data[index].imgUrl || 'https://dummyimage.com/423x269'; // записываем в переменную ключ с URL картинки
                                                                           // Так как в некоторых объектах отсутствуют ключи с картинками, то будем выводить подменную картинку.
      if (imgUrl.startsWith("hhttps://")) {                                // Проверяем и исправляем опечатку типа "hhtps://"
        imgUrl = imgUrl.replace("hhttps://", "https://");
      }
      const name = data[index].name;                                       // записываем в переменную ключ с заголовком
      imgElement.setAttribute('src', imgUrl);
      imgElement.setAttribute('alt', name);
    });


    // Добавляем дату
    const dateElements = document.querySelectorAll('.blog-item__date');

    // перебор dateElements и вывод ключа date в DOM элемент
    dateElements.forEach((dateElement, index) => {                          // перебор элементов с датой
      const date = data[index].date || '20.20.2021';                        // записываем в переменную дату
                                                                            // так как ключа date нет в одном из объектов, ипользуем оператор или. Была идея написать логику, что если ключа date нет, то дописать дату на день раньше, чем в предыдущем объекте, но я решил в рамках тестового это не реализовывать ;)
      const formattedDate = date.replace(/-/g, '.');                        // заменим '-' на '.' что бы соответсвовало макету
      dateElement.textContent = formattedDate;
    });

    // Добавляем описание
    const descriptionElements = document.querySelectorAll('.blog-item__description');

    // перебор descriptionElements и вывод ключа text в DOM элемент
    descriptionElements.forEach((descriptionElement, index) => {                            // перебор элементов с описанием
      const text = data[index].text;                                                        // записываем в переменную текст описания
      const truncatedText = text.length > 100 ? text.slice(0, 160) + '...' : text;          // Обрезаем текст, если он превышает 100 символов, и добавляем троеточие
      descriptionElement.textContent = truncatedText;
    });

    // Добавляем имя автора
    const authorElements = document.querySelectorAll('.blog-item__author');

    // перебор authorElements и вывод ключа author в DOM элемент
    authorElements.forEach((authorElement, index) => {                                      // перебор элементов с именем автора
      const author = data[index].author;                                                    // записываем в переменную имя автора
      authorElement.textContent = author;
    });

    // Добавляем id каждой карточке ( на всякий, например для взаимодействия с лайком )
    const blogItemElements = document.querySelectorAll('.blog-item');

    // перебор blogItemElements и вывод ключа author в DOM элемент
    blogItemElements.forEach((blogItemElement, index) => {                                      // перебор элементов с именем автора
        const id = data[index].id;                                                    // записываем в переменную имя автора
        blogItemElement.setAttribute('id', 'blog-item-' + id);
      });

    // Проверяем значения ключа vote status
    const buttonsLike = document.querySelectorAll('.btn-ui_like');

    // перебор buttonsLike, устанавливаем true/false дата атрибуту элемента в зависимости от отсуттствия/наличия значения ключа
    buttonsLike.forEach((buttonLike, index) => {                                // перебор элементов с кнопочками like
        const voteStatus = data[index].voteStatus;                              // записываем в переменную значение ключа voteStatus
        if( voteStatus === false ){                                             // если оно false
            buttonLike.setAttribute( 'data-vote-status', false )                // установим data-vote-status в false
        }else if( voteStatus === true ){                                        // если true
            buttonLike.setAttribute( 'data-vote-status', true )                 // установим data-vote-status в true
        }else{                                                                  // иначе ( отсутствует ключ )
            buttonLike.setAttribute( 'data-vote-status', false )                // установим data-vote-status в false
        }
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
