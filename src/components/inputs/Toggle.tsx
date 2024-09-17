import {FormControl, FormLabel, Switch} from "@chakra-ui/react";

interface Props {
    label: string;
    onChange: (value: boolean) => void;
}

function Toggle({label, onChange}: Props) {
    return <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor='email-alerts' mb='0'>
            {label}
        </FormLabel>
        <Switch id='email-alerts' onChange={(e) => {
            onChange(e.target.checked);
        }}/>
    </FormControl>
}

export default Toggle
