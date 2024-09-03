import arrow_back from "bundle-text:../../../svg/arrow_back_purple.svg";
import arrow_forward from "bundle-text:../../../svg/arrow_forward_purple.svg";

const { eachDayOfInterval, startOfMonth, endOfMonth, addMonths } = require("date-fns");

export function calendar() {
   const body = document.querySelector('body');
   let newMonth = addMonths(new Date(2024, 7, 1), 0);

   body.append(createCalendar())

   function createCalendar(date = new Date()) {
      const calendar = document.createElement('div');
      calendar.classList.add('calendar');

      const calendarData = getCalendarData(newMonth);

      const header = createCalendarHeader(date);
      const weekDays = createCalendarWeekDays();
      const grid = createCalendarGrid(calendarData);
      const footer = createCalendarFooter();

      calendar.append(header, weekDays, grid, footer);

      return calendar;
   }

   function getCalendarData(date=new Date()) {
      console.log(date)
      const prevMonth = addMonths(date, -1);
      const nextMonth = addMonths(date, 1);

      const allDaysOfPrevMonth = getDaysOfMonth(prevMonth);
      const allDaysOfNextMonth = getDaysOfMonth(nextMonth);
      const allDaysOfCurrentMonth = getDaysOfMonth(date);
      
      const numberOfDaysBeforeCurrent = getDaysBeforeCurrentMonth(allDaysOfCurrentMonth[0]);
      const numberOfDaysAfterCurrent = getDaysAfterCurrentMonth(numberOfDaysBeforeCurrent + allDaysOfCurrentMonth.length);

      const prevDays = allDaysOfPrevMonth.splice(allDaysOfPrevMonth.length - numberOfDaysBeforeCurrent);
      console.log('Grid days before: ' + prevDays);
      const nextDays = allDaysOfNextMonth.splice(0, numberOfDaysAfterCurrent);
      console.log('Grid days after: ' + nextDays);

      const calendarDays = prevDays.concat(allDaysOfCurrentMonth, nextDays);

      const calendarData = {
         currentMonth: date.getMonth(),
         days: calendarDays
      }

      return calendarData;
   }

   function createCalendarHeader(date=new Date()) {
      const header = document.createElement('div');
      header.classList.add('calendar__header');

      const prevMonthButton = document.createElement('button');
      prevMonthButton.id = 'calendarPrevMonth';
      prevMonthButton.classList.add('calendar__header-button', 'arrow-back-button');
      prevMonthButton.innerHTML = arrow_back;

      const nextMonthButton = document.createElement('button');
      nextMonthButton.id = 'calendarNextMonth';
      nextMonthButton.classList.add('calendar__header-button', 'arrow-forward-button');
      nextMonthButton.innerHTML = arrow_forward;

      const monthIndex = date.getMonth();
      const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
      const month = months[monthIndex];
      const year = date.getFullYear();

      const headerMonthAndYear = document.createElement('div');
      headerMonthAndYear.classList.add('calendar__month-and-year');
      headerMonthAndYear.textContent = month + " " + year;

      header.append(prevMonthButton, headerMonthAndYear, nextMonthButton);

      return header;
   }

   function createCalendarWeekDays() {
      let daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
      const calendarWeekDays = document.createElement('div');
      calendarWeekDays.classList.add('calendar__week-days');
      for (let i = 0; i < 7; i++) {
         const day = document.createElement('div');
         day.classList.add('calendar__week-day');
         day.textContent = daysOfWeek[i];
         calendarWeekDays.append(day);
      }
      return calendarWeekDays;
   }

   function createCalendarGrid(calendarData) {
      let grid = document.createElement('div');
      grid.classList.add('calendar__grid');
      
      for (let i = 0; i < 6; i++) {
         let currentWeek = calendarData.days.splice(0, 7);
         grid.append(createGridRow(i, currentWeek, calendarData.currentMonth))
      }
      console.log(grid);
      return grid;
   }

   function createCalendarFooter() {
      const footer = document.createElement('div');
      footer.classList.add('calendar__footer');

      const clearButton = document.createElement('button');
      clearButton.classList.add('calendar__clear', 'borderless-button');
      clearButton.textContent = 'Очистить';

      const applyButton = document.createElement('button');
      applyButton.classList.add('calendar__apply', 'borderless-button');
      applyButton.textContent = 'Применить';

      footer.append(clearButton, applyButton);

      return footer;
   }

   function getDaysBeforeCurrentMonth(firstDayOfMonth) {
      let result = (firstDayOfMonth.getDay() || 7) - 1;
      if (result == 0) result = 7;
      console.log('Days before: ' + result)
      return result;
   }

   function getDaysOfMonth(date=new Date()) {
      const start = startOfMonth(date);
      const end = endOfMonth(date);
      const monthDays = eachDayOfInterval({
         start: start,
         end: end
       })
      return monthDays;
   }

   function getDaysAfterCurrentMonth(numberOfDaysMonthBeforeAndCurrentMonth) {
      const result = 42 - numberOfDaysMonthBeforeAndCurrentMonth;
      console.log('Days after: '+ result)
      return result;
   }

   function createGridRow(rowIndex, currentRow, currentMonth) {
      let gridRow = document.createElement('div');
      gridRow.classList.add('calendar__grid-row');
      for (let i = 0; i < 7; i++) {
         gridRow.append(createGridCell(7 * rowIndex + i, currentRow[i], currentMonth));
      }
      return gridRow;
   }

   function createGridCell(cellIndex, day, currentMonth) {
      let gridDiv = document.createElement('div');
      gridDiv.classList.add('calendar__grid-cell');
      gridDiv.dataset.cell = cellIndex;
      if (day.getMonth() == currentMonth) {
         gridDiv.classList.add('calendar__grid-cell_current-month');
      } else {
         gridDiv.classList.add('calendar__grid-cell_not-current-month');
      }
      gridDiv.textContent = day.getDate();
      return gridDiv;
   }

}