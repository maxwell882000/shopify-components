import { Rule } from "effector-forms";

export const rules = {
  required: (): Rule<any> => ({
    name: "required",
    errorText: "Обязательное поле",
    validator: (value) => Boolean(value),
  }),
  phone: (): Rule<string> => ({
    name: "phone",
    errorText: "Укажите номер в формате +998XXXXXXXXX",
    validator: (value) => {
      return /^\+998\d{9}$/.test(value);
    },
  }),
  email: (): Rule<string> => ({
    name: "email",
    validator: (value) => /\S+@\S+\.\S+/.test(value),
  }),
  minLength: (min: number): Rule<string> => ({
    name: "minLength",
    validator: (value) => value.length >= min,
  }),
  maxLength: (max: number): Rule<string> => ({
    name: "maxLength",
    validator: (value) => value.length <= max,
  }),
};
