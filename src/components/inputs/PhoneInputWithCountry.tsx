import {CountrySelector, usePhoneInput} from "react-international-phone";
import {Button, FormLabel, Input} from "@chakra-ui/react";

interface ChakraPhoneProps {
    value: string;
    onChange: (phone: string) => void;
}

const PhoneInputWithCountry = ({value, onChange}: ChakraPhoneProps) => {
    const phoneInput = usePhoneInput({
        defaultCountry: 'us',
        value,
        onChange: (data) => {
            onChange(data.phone);
        },
    });
    return (
        <div className={"w-full"}>
            <FormLabel>Phone Number</FormLabel>
            <div className={"flex items-center !w-full"}>
                <CountrySelector
                    selectedCountry={phoneInput.country.iso2}
                    onSelect={(country) => phoneInput.setCountry(country.iso2)}
                    renderButtonWrapper={({children, rootProps}) => (
                        <Button {...rootProps} variant="outline" px="4px" mr="8px">
                            {children}
                        </Button>
                    )}
                />
                <Input
                    placeholder="Phone number"
                    type="tel"
                    color="primary"
                    className={"!w-full"}
                    value={phoneInput.inputValue}
                    onChange={phoneInput.handlePhoneValueChange}
                    width={200}
                    ref={phoneInput.inputRef}
                />
            </div>
        </div>


    );
};

export default PhoneInputWithCountry;
