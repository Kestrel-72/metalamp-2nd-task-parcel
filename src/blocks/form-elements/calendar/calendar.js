import { da } from "date-fns/locale";

const { eachDayOfInterval, startOfMonth, endOfMonth, addMonths } = require("date-fns");

export function calendar() {
   let daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
   let newMonth = addMonths(new Date(2024, 7, 1), 2);
   createGrid(newMonth);

   function createGrid(date=new Date()) {
      console.log(date)
      let grid = document.createElement('div.calendar__grid');

      let daysOfCurrentMonth = getDaysOfCurrentMonth(date);
      let daysBeforeCurrentMonth = getDaysBeforeCurrentMonth(daysOfCurrentMonth[0]);
      let daysAfterCurrentMonth = getDaysAfterCurrentMonth(daysBeforeCurrentMonth + daysOfCurrentMonth.length)
      let numberOfCells = getNumberOfCells(daysBeforeCurrentMonth, daysOfCurrentMonth.length, daysAfterCurrentMonth);
      let numberOfRows = Math.floor(numberOfCells / 7);
      console.log('Number of rows:' + numberOfRows);
      for (let i = 0; i < numberOfRows; i++) {
         grid.append(createGridRow(i));
      }
      console.log(grid);

   }

   function getDaysBeforeCurrentMonth(firstDayOfMonth) {
      let result = (firstDayOfMonth.getDay() || 7) - 1;
      console.log('Days before current month: ' + result)
      return result;
   }

   function getDaysOfCurrentMonth(date=new Date()) {
      const start = startOfMonth(date);
      const end = endOfMonth(date);
      const monthDays = eachDayOfInterval({
         start: start,
         end: end
       })
      return monthDays;
   }

   function getDaysAfterCurrentMonth(numberOfDaysMonthBeforeAndCurrentMonth) {
      return 7 - (numberOfDaysMonthBeforeAndCurrentMonth % 7);
   }

   function getNumberOfCells(daysBeforeCurrentMonth, daysOfCurrentMonth, daysAfterCurrentMonth) {
      let result = daysBeforeCurrentMonth + daysOfCurrentMonth + daysAfterCurrentMonth;
      console.log('Перед добавлением: ' + result)
      if (result < 42) {
         result = result + 7;
      }
      console.log('После добавления: ' + result)
      return result;
   }

   function createGridRow(rowIndex) {
      let gridRow = document.createElement('div.calendar__grid-row');
      for (let i = 0; i < 7; i++) {
         gridRow.append(createGridCell(7 * rowIndex + i));
      }
      return gridRow;
   }

   function createGridCell(cellIndex) {
      let gridDiv = document.createElement('div.calendar__grid-cell');
      gridDiv.dataset.cell = cellIndex;
      return gridDiv;
   }

}