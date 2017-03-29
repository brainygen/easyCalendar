easyCalendar это выпадающий календарь для полей ввода. Простой и легкий в использовании.

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
        $('.easyCalendar').easyCalendar();
    });
</script>
```
- Инициализируем календарь с собственными параметрами
  - Название дней недели на английском языке
  - Разделитель у даты **/**
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
  - Название дней недели
- **month_name** `[object]`
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
  
## Зависимости
- [jQuery](https://jquery.com/)
