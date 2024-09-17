import React, {useEffect, useState} from 'react';
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
import {DayOfWeek} from "../../dto/common/dayOfWeek.ts";
import {LessonScheduleDto} from "../../dto/lesson/lessonScheduleDto.ts";


const daysOfWeek = [
    DayOfWeek.Monday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday, DayOfWeek.Saturday, DayOfWeek.Sunday
];

const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    const format = (hour: number, minute: number) => {
        const minuteString = minute === 0 ? '00' : minute.toString();
        const hourString = hour < 10 ? `0${hour}` : hour.toString(); // Add leading zero for hours < 10
        return `${hourString}:${minuteString}`;
    };

    for (let hour = 0; hour < 24; hour++) {
        slots.push(format(hour, 0));
    }

    return slots;
};

const timeSlots = generateTimeSlots();

const getEnumName = (enumObj: any, value: number): string => {
    return enumObj[value]; // Reverse mapping
}

const getEnumValue = (enumObj: any, value: string): DayOfWeek => {
    return enumObj[value]; // Reverse mapping
}

interface Props {
    onChange: (value: LessonScheduleDto[]) => void;
}

const MultiSelectDropdown = ({onChange}: Props) => {
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
    useEffect(() => {
        let result: LessonScheduleDto[] = []
        Object.keys(dayTimes).map((k: string) => {
            dayTimes[k].forEach(v => {
                result.push({
                    dayOfWeek: getEnumValue(DayOfWeek, k),
                    hour: parseInt(v.slice(0, 2))
                } as LessonScheduleDto)
            })
        })
        onChange(result);
    }, [dayTimes]);

    const handleSave = () => {
        if (currentDay) {
            setSelectedDays(prev => modalTimes.length > 0 ? [...prev, currentDay] : [...prev.filter(e => e != currentDay)]);
            setModalTimes(dayTimes[currentDay] || []);
            setDayTimes(prev => ({
                ...prev,
                [currentDay]: modalTimes
            }));

            console.log(dayTimes, selectedDays);
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
                    {daysOfWeek.map(d => getEnumName(DayOfWeek, d)).map(day => (
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
                                            <TagCloseButton
                                                onClick={() => handleRemoveTime(day, time)}/>
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
