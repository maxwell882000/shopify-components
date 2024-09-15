import PhoneInputWithCountry from "../components/inputs/PhoneInputWithCountry.tsx";
import MultiSelectDropdown from "../components/select/MultiSelectDropdown.tsx";
import {Button, Container, Heading, VStack, Text, Flex} from "@chakra-ui/react";
import Toggle from "../components/inputs/Toggle.tsx";

function ApplicationSubmitPage() {

    return <form className={"flex flex-col justify-center items-center m-auto w-[520px]"}>
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

            <PhoneInputWithCountry value={""} onChange={() => {
            }}/>
            <Toggle label={"Call now ?"}/>
            <MultiSelectDropdown/>
            <Button className={"w-full"} colorScheme='blue' size='md'>
                Start Lessons
            </Button>
        </Flex>
    </form>
}

export default ApplicationSubmitPage
