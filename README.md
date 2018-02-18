**EasyCalendar jQuery Plugin**
- EasyCalendar - это выпадающий календарь для полей ввода.
- Демоверсию можно посмотреть здесь <a href="https://brainygen.github.io/easyCalendar/">https://brainygen.github.io/easyCalendar</a>

## Установка
Вставьте код между тегами head
```html
<head>
  <link rel="stylesheet" href="easyCalendar.css">
  <script src="easyCalendar.js"></script>
</head>
```

## Пример использования
- Инициализируем календарь с параметрами по умолчанию
```javascript
<script type="application/javascript">
    $(document).ready(function () {
        var easyCalendar = $('.easyCalendar').easyCalendar();
    });
</script>
```
- Инициализируем календарь с другими параметрами
  - Название дней недели на английском языке
```javascript
<script type="application/javascript">
    $(document).ready(function () {
        var easyCalendar = $('.easyCalendar').easyCalendar({
          'week_name' : ['Mo','Tu','We','Th','Fr','Sa','Su']
        });
    });
</script>
```

## Параметры
- **sep** `[string]`
  - Разделитель между датой, месяцем, годом. По умолчанию формат 29/03/2017
- **prefix** `[string]`
  - Название селектора класса. По умолчанию easyCalendar
- **week_name** `[array]`
  - Название дней недели
- **month_name** `[array]`
  - Название месяцев
  
## События  
- **onShow** `[function]`
  - Срабатывает когда календарь открыли
- **onClose** `[function]`
  - Срабатывает когда календарь закрыли
- **onSelect** `[function]`
  - Срабатывает когда выбрали день
- **onInit** `[function]`
  - Срабатывает когда календарь инициализировался на странице

## Методы API
- **prev_month()**
  - Переключение на предыдущий месяц
- **next_month()**
  - Переключение на следующий месяц
- **close()**
  - Закрыть окно с выбором даты

## Зависимости
- [jQuery](https://jquery.com/)

## Лицензия
EasyCalendar is licensed under the MIT license. (http://opensource.org/licenses/MIT)
