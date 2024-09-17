import PhoneInputWithCountry from "../components/inputs/PhoneInputWithCountry.tsx";
import MultiSelectDropdown from "../components/select/MultiSelectDropdown.tsx";
import {Button, Container, Heading, VStack, Text, Flex} from "@chakra-ui/react";
import Toggle from "../components/inputs/Toggle.tsx";
import {CreateLessonRequest} from "../infrastructure/axios/services/dtos/requests/createLessonRequest.ts";
import {useState} from "react";
import {LessonService} from "../infrastructure/axios/services/LessonService.ts";
import {ToastContainer} from "react-toastify";
import {successNotification} from "../utils/notifications/successNotification.ts";
// import {useState} from "react";
// import {CreateLessonRequest} from "../infrastructure/axios/services/dtos/requests/createLessonRequest.ts";

const ApplicationSubmitPage = () => {
    const [lessonDto, setLessonDto] = useState<CreateLessonRequest>({phone: "", isCallNow: false, lessonSchedules: []})
    return <form onSubmit={(e) => {
        e.preventDefault();
        LessonService.createLesson(lessonDto);
        successNotification("Your request accepted !");
    }} className={"flex flex-col justify-center items-center m-auto w-[520px]"}>
        <ToastContainer/>
        <Flex direction={"column"} className={"w-full space-y-6"}>
            <Container className={"text-center"} maxW="container.md" centerContent>
                <VStack spacing={1} align="center">
                    <Heading className={"font-bold"} as="h1">
                        Sign Up for a Free English Lesson via Phone Call
                    </Heading>
                    <Text className={"text-gray-500"} fontSize="md" textAlign="center">
                        Become a Fluent English Speaker with a personalized teacher focused on fixing your most
                        repeatable mistakes.
                    </Text>
                </VStack>
            </Container>

            <PhoneInputWithCountry value={""} onChange={(text) => {
                setLessonDto({...lessonDto, phone: text});
            }}/>
            <Toggle label={"Call now ?"} onChange={(value) => {
                setLessonDto({...lessonDto, isCallNow: value});
            }}/>
            <MultiSelectDropdown onChange={(value) => {
                console.log(value, "MultiSelectDropdown")
                setLessonDto({...lessonDto, lessonSchedules: value});
            }}/>
            <Button type={"submit"} className={"w-full"} colorScheme='blue' size='md'>
                Start Lessons
            </Button>
        </Flex>
    </form>
}

export default ApplicationSubmitPage
