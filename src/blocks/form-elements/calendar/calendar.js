import { da } from "date-fns/locale";

const { eachDayOfInterval, startOfMonth, endOfMonth, addMonths } = require("date-fns");

export function calendar() {
   let daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
   let newMonth = addMonths(new Date(2024, 7, 1), 0);
   const calendarData = getCalendarData(newMonth);
   createCalendarGrid(calendarData);

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

   function createCalendarGrid(calendarData) {
      let grid = document.createElement('div.calendar__grid');
      
      for (let i = 0; i < 6; i++) {
         let currentWeek = calendarData.days.splice(0, 7);
         grid.append(createGridRow(i, currentWeek, calendarData.currentMonth))
      }

      console.log(grid);
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
      let gridRow = document.createElement('div.calendar__grid-row');
      for (let i = 0; i < 7; i++) {
         gridRow.append(createGridCell(7 * rowIndex + i, currentRow[i], currentMonth));
      }
      return gridRow;
   }

   function createGridCell(cellIndex, day, currentMonth) {
      let gridDiv = document.createElement('div.calendar__grid-cell');
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