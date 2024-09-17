import {axiosInstance} from "../axiosInstance.ts";
import {CreateLessonRequest} from "./dtos/requests/createLessonRequest.ts";

export class LessonService {
    static async createLesson(lessonRequest: CreateLessonRequest): Promise<void> {
        await axiosInstance.post('lesson', lessonRequest);
    }
}