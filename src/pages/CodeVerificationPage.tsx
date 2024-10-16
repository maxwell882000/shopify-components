import {Box, Button, Heading, HStack, PinInput, PinInputField, VStack} from "@chakra-ui/react";
import {useState} from "react";

const CodeVerificationPage = () => {
    const [verificationCode, setVerificationCode] = useState<string>("");

    const handleSubmit = () => {
        console.log('Verification Code:', verificationCode);
    };

    return (
        <Box
            p={5}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgColor="gray.50" // Light background for contrast
        >
            <Heading mb={6} textAlign="center" fontSize="2xl">
                Enter Verification Code
            </Heading>
            <VStack spacing={4}>
                <HStack spacing={4}>
                    <PinInput otp onComplete={setVerificationCode}>
                        <PinInputField/>
                        <PinInputField/>
                        <PinInputField/>
                        <PinInputField/>
                        <PinInputField/>
                        <PinInputField/>
                    </PinInput>
                </HStack>
                <Button
                    mt={4}
                    colorScheme="blue"
                    onClick={handleSubmit}
                    width="full" // Full width button for better UX
                >
                    Submit
                </Button>
            </VStack>
        </Box>
    );
};

export default CodeVerificationPage;
