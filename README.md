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
```javascript
<script type="application/javascript">
    $(document).ready(function () {
        $('.easyCalendar').easyCalendar();
    });
</script>
```

## Параметры
- **sep**
- Разделитель между датой, месяцем, годом (по умолчанию формат 29-03-2017)
```js
  <script type="application/javascript">
      $(document).ready(function () {
          $('.easyCalendar').easyCalendar({
            sep: '/'
          });
      });
  </script>
```

## Зависимости
- [jQuery](https://jquery.com/)
