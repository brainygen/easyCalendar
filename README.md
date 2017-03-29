easyCalendar это выпадающий календарь для полей ввода. Простой и легкий в использовании.

## Установка
Вставьте код между тегами head
```html
<head>
  <link rel="stylesheet" href="easyCalendar.min.css">
  <script src="easyCalendar.min.js"></script>
</head>
```

## Пример использования
- Инициализируем календарь без параметров. Всё по умолчанию.
```javascript
<script type="application/javascript">
    $(document).ready(function () {
        $('.easyCalendar').easyCalendar();
    });
</script>
```
- Инициализируем календарь с параметрами
  - Название дней недели на английском языке
  - Разделитель у даты будет **/**
```javascript
<script type="application/javascript">
    $(document).ready(function () {
        $('.easyCalendar').easyCalendar({
          'week_name' : ['Mo','Tu','We','Th','Fr','Sa','Su'],
          'sep' : '/'
        });
    });
</script>
```

## Параметры
- **sep** `[string]`
  - Разделитель между датой, месяцем, годом. По умолчанию формат 29-03-2017
- **prefix** `[string]`
  - Название селектора класса. По умолчанию easyCalendar
- **week_name** `[object]`
  - Название дней недели. По умолчанию ['пн','вт','ср','чт','пт','сб','вс']
  
## События  
- **onShow** `[function]`
  - Срабатывает когда календарь открыли
- **onClose** `[function]`
  - Срабатывает когда календарь закрыли
- **onSelect** `[function]`
  - Срабатывает выбрали день
- **onInit** `[function]`
  - Срабатывает когда календарь инициализировался на странице
  
## Зависимости
- [jQuery](https://jquery.com/)
