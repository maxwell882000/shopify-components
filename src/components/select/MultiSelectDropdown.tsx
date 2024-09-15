import React, {useState} from 'react';
import {
    Box,
    Checkbox,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
    useDisclosure,
    Tag,
    TagCloseButton,
    TagLabel
} from '@chakra-ui/react';
import {MultiSelect, Option} from "chakra-multiselect";

const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    const format = (hour: number, minute: number) => {
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const hourIn12 = hour % 12 === 0 ? 12 : hour % 12;
        const minuteString = minute === 0 ? '00' : minute;
        return `${hourIn12}:${minuteString} ${suffix}`;
    };

    for (let hour = 0; hour < 24; hour++) {
        slots.push(format(hour, 0));
    }

    return slots;
};

const timeSlots = generateTimeSlots();

const MultiSelectDropdown: React.FC = () => {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [dayTimes, setDayTimes] = useState<Record<string, string[]>>({});
    const [currentDay, setCurrentDay] = useState<string | null>(null);
    const [modalTimes, setModalTimes] = useState<string[]>([]);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setCurrentDay(value);
        if (dayTimes && dayTimes[value] && dayTimes[value].length > 0) {
            setModalTimes(dayTimes[value]);
        } else {
            setModalTimes([]);
        }
        onOpen();
    };

    const handleTimeChange = (options: Option[]) => {
        setModalTimes(options.map(e => e.value.toString()));
    };

    const handleSave = () => {
        if (currentDay) {
            setSelectedDays(prev => modalTimes.length > 0 ? [...prev, currentDay] : [...prev.filter(e => e != currentDay)]);
            setModalTimes(dayTimes[currentDay] || []);
            setDayTimes(prev => ({
                ...prev,
                [currentDay]: modalTimes
            }));
        }
        onClose();
    };

    const handleRemoveTime = (day: string, time: string) => {
        setDayTimes(prev => {
            const updatedTimes = (prev[day] || []).filter(t => t !== time);
            if (updatedTimes.length === 0) {
                setSelectedDays(prevDays => prevDays.filter(d => d !== day));
                const {[day]: _, ...rest} = prev;
                return rest;
            }
            return {...prev, [day]: updatedTimes};
        });
    };

    return (
        <Box p={5} borderWidth={1} borderRadius="md">
            <FormControl>
                <FormLabel>Select Days of the Week</FormLabel>
                <Box>
                    {daysOfWeek.map(day => (
                        <Box key={day} mb={2}>
                            <Checkbox
                                value={day}
                                isChecked={selectedDays.includes(day)}
                                onChange={handleDayChange}
                            >
                                {day}
                            </Checkbox>
                            {dayTimes[day] && dayTimes[day].length > 0 && (
                                <Box mt={2}>
                                    {dayTimes[day].map(time => (
                                        <Tag key={`${day}-${time}`} m={1} size="md" variant="solid" colorScheme="blue">
                                            <TagLabel>{time}</TagLabel>
                                            <TagCloseButton onClick={() => handleRemoveTime(day, time)}/>
                                        </Tag>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>
            </FormControl>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Select Times for {currentDay}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <FormControl>
                            <MultiSelect

                                options={timeSlots.map(slot => ({
                                        label: slot,
                                        value: slot
                                    }
                                ))}
                                value={modalTimes.map(slot => ({
                                        label: slot,
                                        value: slot
                                    }
                                ))}
                                label='Select Times'
                                // @ts-ignore
                                onChange={handleTimeChange}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default MultiSelectDropdown;
