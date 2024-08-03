/** @format */

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FieldValues } from "react-hook-form";
import { useRef } from "react";
import * as yup from "yup";

/*********************************************************
 *
 *  Custom hooks for hook forms
 *
 ********************************************************/
// hook for single field
enum ValidationType {
  required = "required",
  minLength = "min_length",
  enter = "enter",
  character = "character",
  confirmPassword = "confirm_password",
  equalLength = "equal_length",
  greaterTime = "greater_time",
  email = "email",
  url = "url",
  alphabetic = "alphabetic",
  alphanumeric = "alphanumeric",
  space = "space",
  phone = "phone",
  cnic = "cnic",
  password = "password",
  select = "select",
  max_characters = "max_characters",
  required_select = "required_select",
  number = "number",
  userName = "userName",
  alreadyInUse = "alreadyInUse",
  confirm_password_match = "confirm_password_match",
  new_old_password_match = "new_old_password_match",
  otp = "otp",
  emailMobile = "emailMobile",
  date = "date",
  age = "age",
}

const Regex = {
  alphabets: /^[a-zA-Z ]+$/,
  alphanumeric: /^[a-zA-Z0-9 ]+$/,
  phoneRegExp: /^[0-9]{10}$/,
  cnic: /^[0-9]{13}$/,
  space: /^\S*$/,
  lowerCase: /^(?=.*[a-z])/,
  upperCase: /^(?=.*[A-Z])/,
  numeric: /^(?=.*[0-9])/,
  special: /^(?=.*[!@#$%^&*-_+=~;:/|])/,
  url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
  email: /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/gi,
  date: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  age: /^(?!0$|00$|0\d$|1\d\d$|200$)[1-9]\d{0,2}$/,
};

const strings = (type: ValidationType, label: string): string => {
  const validation: { [key in ValidationType]: string } = {
    space: `Enter a valid ${label}`,
    enter: "Please enter",
    cnic: `Enter a valid ${label}`,
    select: "Select",
    max_characters: "Max characters",
    required: `Please enter ${label}`,
    min_length: `Must have ${label} characters or longer`,
    greater_time: `End time must be greater than Start time`,
    equal_length: `Must be ${label} characters`,
    required_select: `Please select ${label}`,
    email: `Please enter valid email address`,
    number: `Enter a valid ${label}`,
    userName: `Enter a valid ${label}`,
    alreadyInUse: `${label} already in use`,
    url: `Enter a valid url`,
    password: `Enter ${label} of at least 8 characters with at least 1 uppercase, 1 lowercase, 1 number and 1 special character`,
    alphanumeric: `Enter a valid ${label}`,
    alphabetic: `Enter a valid ${label}`,
    confirm_password_match: `Password and confirm password should be same`,
    new_old_password_match: "Old and new password should not be same",
    otp: "Enter the 4 digit code",
    phone: "Enter a valid mobile number",
    emailMobile: "Enter a valid email address or mobile number",
    character: `Must have 1 ${label} character`,
    confirm_password: "Passwords must match",
    date: "Please enter valid date",
    age: "Please enter valid age",
  };

  return `${validation[type]}`;
};

const displayMsg = (label: string, type?: ValidationType): string => {
  const _type: ValidationType = type ?? ValidationType.required;
  return strings(_type, label);
};

export const Validation = {
  required: (
    title: string,
    isAlphanumeric: any = false,
    type: ValidationType = ValidationType.required,
    valueType: "string" | "object" | "array" = "string"
  ): yup.Schema<any> => {
    if (valueType === "object") {
      return yup[valueType]()
        .nullable()
        .required(displayMsg(title, type) as any);
    } else if (valueType === "array") {
      return yup.array().min(1, displayMsg(title, type));
    }
    if (isAlphanumeric === null) {
      return yup[valueType]()
        .nullable()
        .trim?.()
        .required(displayMsg(title, type));
    }

    if (isAlphanumeric) {
      return yup[valueType]()
        .nullable()
        .trim?.()
        .required(displayMsg(title, type))
        .matches(
          Regex.alphanumeric,
          displayMsg(title, ValidationType.alphanumeric)
        );
    }
    return yup[valueType]()
      .nullable()
      .trim?.()
      .required(displayMsg(title, type))
      .matches(Regex.alphabets, displayMsg(title, ValidationType.alphabetic));
  },

  requiredWithoutTrim: (
    title: string,
    type: ValidationType = ValidationType.required,
    valueType: "string" | "object" | "array" = "string"
  ) => {
    if (valueType === "object") {
      return yup[valueType]().nullable().required(displayMsg(title, type));
    } else if (valueType === "array") {
      return yup.array().min(1, displayMsg(title, type));
    }

    return yup[valueType]().nullable().required(displayMsg(title, type));
  },

  notRequired: () => yup.string().notRequired(),

  email: (title: string) =>
    yup
      .string()
      .required(displayMsg(title))
      .email(displayMsg(title, ValidationType.email))
      .matches(Regex.email, displayMsg(title, ValidationType.email)),

  alphanumeric: (title: string) =>
    yup
      .string()
      .required(displayMsg(title))
      .trim()
      .matches(
        Regex.alphanumeric,
        displayMsg(title, ValidationType.alphanumeric)
      ),

  phone: (title: string) =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(
        Regex.phoneRegExp,
        displayMsg("lowerCase", ValidationType.phone)
      ),

  cnic: (title: string) =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(Regex.cnic, displayMsg(title, ValidationType.cnic)),

  notSamePassword: (title: string, password: string) =>
    yup
      .string()
      .required(displayMsg(title))
      .notOneOf([password], displayMsg(title, ValidationType.confirmPassword)),

  password: (title: string) =>
    yup
      .string()
      .required(displayMsg(`${title}`, ValidationType.password))
      .matches(/^(?=.{8,})/, displayMsg(`${title}`, ValidationType.password))
      .matches(Regex.lowerCase, displayMsg(`${title}`, ValidationType.password))
      .matches(Regex.upperCase, displayMsg(`${title}`, ValidationType.password))
      .matches(Regex.numeric, displayMsg(`${title}`, ValidationType.password))
      .matches(Regex.special, displayMsg(`${title}`, ValidationType.password)),

  loginPassword: (title: string) =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(/^(?=.{8,})/, displayMsg("password"))
      .matches(Regex.lowerCase, displayMsg("password"))
      .matches(Regex.upperCase, displayMsg("password"))
      .matches(Regex.numeric, displayMsg("password"))
      .matches(Regex.special, displayMsg("password")),

  passwordMatch: (matchFieldName: string, label: string) =>
    yup
      .string()
      .required(displayMsg(label))
      .test(
        "match",
        displayMsg("", ValidationType.confirmPassword),
        function (val) {
          return val === this.parent?.[matchFieldName] ?? "";
        }
      ),
  checkFieldEmpty: (checkFieldName: string, label: string) =>
    yup
      .string()
      .nullable()
      .test("checkField", displayMsg(label), function (val) {
        const checkFieldValue = this.parent?.[checkFieldName] ?? "";
        console.log(
          "condition",
          checkFieldValue !== "" || (val as string) !== ""
        );
        return checkFieldValue !== "" || (val as string) !== "";
      }),

  length: (title: string, _length: number) =>
    yup
      .string()
      .required(displayMsg(title))
      .test(
        "len",
        displayMsg(_length.toString(), ValidationType.equalLength),
        (val) => {
          const valueLength = (val as string)?.length ?? 0;
          return valueLength === _length;
        }
      ),

  webUrl: (title: string, req: boolean) =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(Regex.url, displayMsg(title, ValidationType.url)),

  optionalwebUrl: (title: string, req: boolean) =>
    yup
      .string()
      .nullable()
      .notRequired()
      .when("website_url", {
        is: (website_url: string) => website_url !== "",
        then: () => Validation.webUrl("Website Url", req),
      }),

  number: (title: string) =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(Regex.numeric, displayMsg(title, ValidationType.number)),

  age: (title: string) =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(Regex.age, displayMsg(title, ValidationType.age)),

  date: (title: string) =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(Regex.date, displayMsg(title, ValidationType.date))
      .test({
        name: "isLessThanOrEqualCurrentDate",
        message: displayMsg(
          "date that should be less than or equal to the current date"
        ),
        test: (value) => {
          const inputDate = new Date(value);
          const currentDate = new Date();
          return inputDate <= currentDate;
        },
      }),
};

export const useHookField = <TFieldValues extends FieldValues>(
  formObj: ReturnType<typeof useForm>,
  name: string
) => {
  const { control, formState } = formObj;
  const { errors } = formState;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const error = errors?.[name]?.message ?? undefined;

  return {
    forwardRef: inputRef,
    control,
    name,
    error,
  };
};

// hook for form
type AsyncDefaultValues<T> = Promise<Partial<T>>;
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type AnyObject = Record<string, any>;
export const useHookForm = <
  TFieldValues extends FieldValues & yup.AnyObject,
  ContextType extends AnyObject = AnyObject
>(
  inputs: string[],
  defaultValues?:
    | DeepPartial<TFieldValues>
    | AsyncDefaultValues<TFieldValues>
    | undefined,
  resolver?: yup.ObjectSchema<TFieldValues, ContextType>
) => {
  const resolverOptions = resolver ? { resolver: yupResolver(resolver) } : {};
  const formObj = useForm<TFieldValues>({
    ...resolverOptions,
    defaultValues: defaultValues as any,
  }) as any;

  const hookInputs = [formObj];
  for (let i = 0; i < inputs.length; i++) {
    hookInputs.push(useHookField(formObj, inputs[i]));
  }

  return hookInputs;
};

/*********************************************************
 *
 *  Validation schema with respect to app
 *
 ********************************************************/
export const ValidationSchema = {
  signUp: yup.object().shape({
    full_name: Validation.alphanumeric("full name").max(30),
    email: Validation.email("email").max(30),
    phone_number: Validation.phone("number").max(15),
    password: Validation.password("password"),
    confirmpassword: Validation.passwordMatch("password", "confirm password"),
  }),
  logIn: yup.object().shape({
    email: Validation.email("email"),
    password: Validation.loginPassword("password"),
  }),
  forgotPass: yup.object().shape({
    email: Validation.email("email"),
  }),
  resetPass: yup.object().shape({
    new_password: Validation.password("Password"),
    confirm_new_password: Validation.passwordMatch(
      "new_password",
      "Confirm Password"
    ),
  }),
  editProfile: yup.object().shape({
    full_name: Validation.alphanumeric("full name").max(30),
    email: Validation.email("email").max(30),
    phone_number: Validation.phone("number").max(15),
  }),
  changePassword: yup.object().shape({
    old_password: Validation.password("current password"),
    new_password: Validation.password("new password"),
    confirm_password: Validation.passwordMatch(
      "new_password",
      "confirm password"
    ),
  }),
  comment: yup.object().shape({
    comment: Validation.required("Comment", null),
  }),
  juniorPass: yup.object().shape({
    password: Validation.password("password"),
  }),
  juniorSignUp: yup.object().shape({
    full_name: Validation.alphanumeric("full name").max(30),
    dob: Validation.date("date of birth"),
  }),
  createGroup: yup.object().shape({
    title: Validation.alphanumeric("Title").max(30),
    deadline: Validation.required("Date", null),
    total_amount: Validation.required("Total amount", null),
    groupGiftLink: Validation.notRequired(),
  }),
  confirmPass: yup.object().shape({
    password: Validation.password("password"),
  }),
  createEvent: yup.object().shape({
    title: Validation.alphanumeric("event title").max(100),
    event_type: Validation.required(
      "event type",
      null,
      ValidationType.required_select
    ),
    date: Validation.required(
      "event date",
      null,
      ValidationType.required_select
    ),
  }),
  createCustomEvent: yup.object().shape({
    title: Validation.alphanumeric("event title").max(100),
    event_type: Validation.required(
      "event type",
      null,
      ValidationType.required_select
    ),
    date: Validation.notRequired(),
  }),
  url: yup.object().shape({
    url: Validation.webUrl("url", true),
  }),
  editContact: yup.object().shape({
    fullname: Validation.required("full name", null),
    dob: Validation.required("Date of birth", null),
    interests: Validation.notRequired(),
    relations: Validation.notRequired(),
    gender: Validation.notRequired(),
  }),
  addContact: yup.object().shape({
    fullname: Validation.alphanumeric("full name").max(30),
    dob: Validation.required(
      "Date of birth",
      null,
      ValidationType.required_select
    ),
    interests: Validation.notRequired(),
    relations: Validation.notRequired(),
    gender: Validation.notRequired(),
  }),
  createNewGroup: yup.object().shape({
    groupname: Validation.alphanumeric("group name").max(30),
  }),
  editGroup: yup.object().shape({
    fullname: Validation.required("full name", null),
    // eventType: Validation.required(
    //   "event type",
    //   null,
    //   ValidationType.required_select
    // ),
    eventType: Validation.notRequired(),
  }),
  referralLink: yup.object().shape({
    referralLinkField: Validation.notRequired(),
  }),
  giftRecommendation: yup.object().shape({
    gender: Validation.required("Gender"),
    age: Validation.age("Age"),
    interests: Validation.notRequired(),
  }),
};

export default { ValidationSchema, useHookField, useHookForm };
