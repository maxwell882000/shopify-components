import {FormControl, FormLabel, Switch} from "@chakra-ui/react";

interface Props {
    label: string;
}

function Toggle({label}: Props) {
    return <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor='email-alerts' mb='0'>
            {label}
        </FormLabel>
        <Switch id='email-alerts'/>
    </FormControl>
}

export default Toggle
