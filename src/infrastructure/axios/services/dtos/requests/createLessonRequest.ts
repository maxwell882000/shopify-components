import {LessonScheduleDto} from "../../../../../dto/lesson/lessonScheduleDto.ts";

export interface CreateLessonRequest {
    phone: string; // Required
    lessonSchedules: LessonScheduleDto[]; // Required
    isCallNow?: boolean; // Optional, defaults to false
}