import PhoneInputWithCountry from "../components/inputs/PhoneInputWithCountry.tsx";
import {Button, Container, Heading, VStack, Text, Flex} from "@chakra-ui/react";
import {CreateLessonRequest} from "../infrastructure/axios/services/dtos/requests/createLessonRequest.ts";
import {useState} from "react";
import {LessonService} from "../infrastructure/axios/services/LessonService.ts";
import {ToastContainer} from "react-toastify";
import {successNotification} from "../utils/notifications/successNotification.ts";

const PhoneLoginPage = () => {
    const [lessonDto, setLessonDto] = useState<CreateLessonRequest>({phone: "", isCallNow: false, lessonSchedules: []});
    const [isLoading, setIsLoading] = useState(false);
    return <form className={"flex flex-col justify-center items-center m-auto w-[400px]"}>
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

            <Button isLoading={isLoading} onClick={async () => {
                setIsLoading(true);
                try {
                    await LessonService.createLesson(lessonDto);
                    successNotification("Soon we will call you !");
                } catch (e) {
                }
                setIsLoading(false);
            }} className={"w-full"} colorScheme='blue' size='md'>
                Start Lessons
            </Button>

        </Flex>
    </form>
}

export default PhoneLoginPage
