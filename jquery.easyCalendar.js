/*
 easyCalendar jQuery Plugin
 easyCalendar это выпадающий календарь для полей ввода. Простой и легкий в использовании.
 Версия 1.0, 29 марта, 2017
 by brainygen

 The MIT License (MIT)

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function($) {
	"use strict";
	
	var easyCalendar = {
	
		options: {},

		/**
		 * Метод проверки в какую область экрана нажал пользователь
		 * Если вне области календаря, закрываем его.
		 * @params event
		 *
		 */
		_checkClick: function(e){
		
			if ($('.' + easyCalendar.options.prefix)) {
				if (!easyCalendar._isChild(e.target,$('.' + easyCalendar.options.prefix)[0])) {
					easyCalendar._close();	
				}
			}
			
		},

		/**
		 * Проверяем, является ли элемент контейнером календаря
		 * @params target, container
		 */
		_isChild: function(target, container){
		
			while(target){
				if (target == container)
					return true;
				target = target.parentNode;
			}
			
			return false;
			
		},

		/**
		 * Метод закрывает календарь
		 */
		_close: function() {
		
			$('.' + easyCalendar.options.prefix).removeClass(easyCalendar.options.prefix + '__show')
				.removeClass(easyCalendar.options.prefix + '__rendered');
				
			$('body').off('click.' + easyCalendar.options.prefix);
			$(window).off('keyup.' + easyCalendar.options.prefix);
			
			easyCalendar.options.element = '';
			
			easyCalendar.options.onClose();
		
		},

		/**
		 * Метод показывает календарь
		 * @params elem
		 */
		_show: function(elem){

			if (easyCalendar.options.element == elem) {
				return false;
			}
		
			if (typeof(calendarInited) != 'undefined') {
				clearTimeout(calendarInited);
			}
			
			var calendarInited,
				top = $(elem).outerHeight() + $(elem).offset().top,
				left = $(elem).offset().left;

		
			easyCalendar.options.element = elem;

			$('.' + easyCalendar.options.prefix).removeClass(easyCalendar.options.prefix + '__show');
			
			var current_date_array = elem.value.split(easyCalendar.options.sep),
				is_date = true;
			
			for(var k=0;k<current_date_array.length;k++){
				if (isNaN(current_date_array[k]))
					is_date = false;
			}
			
			if (is_date&(current_date_array.length==3)){
			
				easyCalendar.options.month_state = current_date_array[1]-1;
				easyCalendar.options.year_state = current_date_array[2];
				easyCalendar._render(current_date_array[1]-1,current_date_array[2]);
				
			} else {
			
				easyCalendar._render((new Date).getMonth(),(new Date).getFullYear());
				
			}

			$('.' + easyCalendar.options.prefix).addClass(easyCalendar.options.prefix + '__rendered')
				.addClass('calendar__show')
				.css('left', (left+1) + 'px')
				.css('top', (top+15) + 'px');
				
			easyCalendar.options.onShow();

			$('body').off('click.' + easyCalendar.options.prefix).on('click.' + easyCalendar.options.prefix, easyCalendar._checkClick);
			
			$(window).off('keyup.' + easyCalendar.options.prefix).on('keyup.' + easyCalendar.options.prefix, function (event) {
			
				if (event.keyCode === 27) {
					easyCalendar._close();
				}
				
				if (event.keyCode === 37) {
					easyCalendar._month_prev();
				}
				
				if (event.keyCode === 39) {
					easyCalendar._month_next();
				}
				
			});
			
		},

		/**
		 * Добавляем class при наведении на дату
		 * @params event
		 */
		_over: function(e){
		
			$(this).addClass(easyCalendar.options.prefix + '__item-hover');
			
		},

		/**
		 * Удаляем class при наведении на дату
		 * @params event
		 */
		_out: function(e){
		
			$(this).removeClass(easyCalendar.options.prefix + '__item-hover');
			
		},

		/**
		 * При клике на дату
		 * @params event
		 */
		_click: function(e){
		
			easyCalendar.options.element.value = $(this).attr('data-date');
			easyCalendar.options.onSelect(easyCalendar.options.element);
			easyCalendar._close();
				
		},

		/**
		 * Подставляем в инициализированный шаблон календаря значения дней и вешаем необходимые обработчики.
		 * @params month, year
		 */
		_render: function(month, year) {

			var render_date = new Date(),
				start_day = 0;
				
			render_date.setDate(1);
			render_date.setFullYear(year);
			render_date.setMonth(month);
			start_day = render_date.getDay();
			
			if(start_day==0) start_day=6; else start_day--;
			
			$('.' + easyCalendar.options.prefix + '__year').html(easyCalendar.options.month_name[month] + ' ' + year);
			
			var day_item = '',
				i = 0,
				month_type = ((year%4)==0)?easyCalendar.options.month_day_leap:easyCalendar.options.month_day;
			
			
			for(var i=1; i<=42; i++) {
			
				day_item = $('.' + easyCalendar.options.prefix + '__day-' + i);

				day_item.removeClass(easyCalendar.options.prefix + '__item-current').removeClass(easyCalendar.options.prefix + '__item-today');

				if ((i >= (start_day -(-1)))&&(i<=start_day-(-month_type[month]))) {
					
					if(i==36) $('.' + easyCalendar.options.prefix + '__last-tr').show();
				
					var get_date = new Date(year, month, (i-start_day));

					day_item.off('mouseover').on('mouseover', easyCalendar._over);
					day_item.off('mouseout').on('mouseout', easyCalendar._out);
					day_item.off('click').on('click', easyCalendar._click);
					
					if (easyCalendar.options.month == month && easyCalendar.options.day == (i-start_day) && easyCalendar.options.year == year) {
						day_item.addClass(easyCalendar.options.prefix + '__item-today');
					}
					
					if(get_date.getDay() == 6 || get_date.getDay() == 0) {
						day_item.addClass(easyCalendar.options.prefix + '__day-free');
					}
					
					day_item.html(i-start_day);
					day_item.attr('data-date', easyCalendar._parse_date(i-start_day,month-(-1),year));
					day_item.css('cursor', 'pointer');
					
				} else {
				
					if(i == 36){
						$('.' + easyCalendar.options.prefix + '__last-tr').hide();
						break;
					}
					
					day_item.html('')
						.off('mouseover')
						.off('mouseout')
						.off('click')
						.css('cursor', 'default')
						.attr('data-date', '')
				}
			}

			if (easyCalendar.options.element) {
			
				if (easyCalendar.options.element.value) {
				
					$('[data-date="'+easyCalendar.options.element.value+'"]').addClass(easyCalendar.options.prefix + '__item-current');
					
				}
				
			}
			
		},

		/**
		 * Метод переключения следующего месяца
		 */
		_month_next: function(){
		
			easyCalendar.options.month_state+=1;
			
			if (easyCalendar.options.month_state>=12){
				easyCalendar.options.month_state=0;
				easyCalendar.options.year_state++;
			}
			
			easyCalendar._render(easyCalendar.options.month_state,easyCalendar.options.year_state);
			
		},

		/**
		 * Метод переключения предыдущего месяца
		 */
		_month_prev: function(){
		
			easyCalendar.options.month_state-=1;
			
			if (easyCalendar.options.month_state<0){
				easyCalendar.options.month_state=11;
				easyCalendar.options.year_state--;
			}
			
			easyCalendar._render(easyCalendar.options.month_state,easyCalendar.options.year_state);
			
		},

		/**
		 * Метод парсинга с учетом разделителя
		 * @params day, month, year
		 */
		_parse_date: function(day, month, year){
		
			var d_null = '', m_null = '';
			if (day<10) d_null = '0';
			if (month<10) m_null = '0';

			return d_null + day + easyCalendar.options.sep + m_null + month + easyCalendar.options.sep + year;
			
		},

		/**
		 * Метод инициализации календаря
		 * @params element, options
		 */
		init: function(element, options) {

			easyCalendar.options = options;
			
			var template = '<div class="' + easyCalendar.options.prefix + ' ' + easyCalendar.options.prefix + '__animation"><div class="' + easyCalendar.options.prefix + '__tail"></div><table>' +
				'<tr><td class="' + easyCalendar.options.prev_btn_class + '"><div class="' + easyCalendar.options.prefix + '__prev"></div></td><td colspan="5" class="' + easyCalendar.options.prefix + '__year"></td><td align="right" class="' + easyCalendar.options.next_btn_class + '"><div class="' + easyCalendar.options.prefix + '__next"></div></td></tr>' +
				'<tr><td class="' + easyCalendar.options.prefix + '__week">' + easyCalendar.options.week_name[0] + '</td><td class="' + easyCalendar.options.prefix + '__week">' + easyCalendar.options.week_name[1] + '</td><td class="' + easyCalendar.options.prefix + '__week">' + easyCalendar.options.week_name[2] + '</td><td class="' + easyCalendar.options.prefix + '__week">' + easyCalendar.options.week_name[3] + '</td><td class="' + easyCalendar.options.prefix + '__week">' + easyCalendar.options.week_name[4] + '</td><td class="' + easyCalendar.options.prefix + '__week ' + easyCalendar.options.prefix + '__week-free">' + easyCalendar.options.week_name[5] + '</td><td class="' + easyCalendar.options.prefix + '__week ' + easyCalendar.options.prefix + '__week-free">' + easyCalendar.options.week_name[6] + '</td></tr>';
				
			var num = 0;
				
			for (var tr = 1; tr <= 6; tr++) {
			
				if (tr == 6) {
					template += '<tr class="' + easyCalendar.options.prefix + '__last-tr">';
				} else {
					template += '<tr>';
				}
				
				for(var td=1; td<=7; td++) {
					num = 7 * (tr-1) - (-td);
					template += '<td class="' + easyCalendar.options.prefix + '__day ' + easyCalendar.options.prefix + '__day-' + num + '">&nbsp;</td>';
				}
				
				template += '</tr>';
				
			}

			template += '</table></div>';
			
			$('body').append(template);
			
			$('.' + easyCalendar.options.prev_btn_class)
				.off('click')
				.on('click', function(e) 
				{
					e.cancelBubble = true;
					easyCalendar._month_prev();
					return false;
				}
			);
			
			$('.' + easyCalendar.options.next_btn_class)
				.off('click')
				.on('click', function(e) 
					{
						e.cancelBubble = true;
						easyCalendar._month_next();
						return false;
					}
			);

			easyCalendar._render(easyCalendar.options.month_state,easyCalendar.options.year_state);
			
			easyCalendar.options.onInit();
		
			return element.each(function() {
			
				$(this)
					.off('click')
					.on('click', function(e) {
						e.cancelBubble = true;
						easyCalendar._show(this);
						return false;
					});
					 
			});
			
			
		}
		
	}
	
	jQuery.fn.easyCalendar = function(options){
	
		return easyCalendar.init(this, $.extend({}, $.fn.easyCalendar.defaults, options, typeof options === 'object' && options));
		
	};
	
	$.fn.easyCalendar.defaults = {
	
		'sep': '/',
		'prefix': 'calendar',
		'day': (new Date).getDate(),
		'month': (new Date).getMonth(),
		'year': (new Date).getFullYear(),
		'day_state': (new Date).getDate(),
		'month_state': (new Date).getMonth(),
		'year_state': (new Date).getFullYear(),
		'element': null,
		'prev_btn_class' : 'js__calendar-prev',
		'prev_btn_class' : 'js__calendar-next',
		'month_name': ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		'month_day': ['31','28','31','30','31','30','31','31','30','31','30','31'],
		'month_day_leap': ['31','29','31','30','31','30','31','31','30','31','30','31'],
		'week_name' : ['пн','вт','ср','чт','пт','сб','вс'],
		'onShow': function () {},
		'onClose': function () {},
		'onSelect': function () {},
		'onInit': function () {}
		
	};	

})(jQuery);
