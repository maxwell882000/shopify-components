import {DayOfWeek} from "../common/dayOfWeek.ts";

export interface LessonScheduleDto {
    dayOfWeek: DayOfWeek;
    hour: number;
}