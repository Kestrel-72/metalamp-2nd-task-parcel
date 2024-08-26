import { rangeSlider } from "./blocks/form-elements/buttons/range-slider/range-slider";
import { expandableCheckboxList } from "./blocks/form-elements/expandable-checkbox-list/expandable-checkbox-list";
import { likeButton } from "./blocks/form-elements/buttons/like-button/like-button";
import datepicker from "./blocks/form-elements/date-picker/datepicker";

// rangeSlider();
// expandableCheckboxList();
// likeButton();
let datepicker = new datepicker('#datepicker', {
   ranged: true,
   inline: true,
   weekStart: 1,
   i18n: {
		weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
	}
});