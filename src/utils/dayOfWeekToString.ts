import { DayOfWeek } from "../infrastructure/axios/services/event/dtos/dayOfWeek.ts";

export const DayOfWeekToString = {
  [DayOfWeek.Monday]: "Понедельник",
  [DayOfWeek.Tuesday]: "Вторник",
  [DayOfWeek.Wednesday]: "Cреда",
  [DayOfWeek.Thursday]: "Четверг",
  [DayOfWeek.Friday]: "Пятница",
  [DayOfWeek.Saturday]: "Суббота",
  [DayOfWeek.Sunday]: "Воскресенье",
};
