const { z } = require("zod");

// creating an object schema 

const signupSchema = z.object({
    username: z
        .string({ required_error: "Name is Required" }).trim()
        .min(3, { message: "Name must be atleast of 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),
    email: z
        .string({ required_error: "Email is address" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters" })
        .max(255, { message: "Email must not be more than 255 characters" }),
    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be at least of 10 characters" })
        .max(11, { message: "Phone must not be more than 10 characters" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(7, { message: "Password must be at least of 6 characters " })
        .max(1024, { message: "Password can't be greater than 1024 characters" })
})


const loginSchema = z.object({
    email : z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters" })
        .max(255, { message: "Email must not be more than 255 characters" }),
    password : z
        .string({ required_error: "Password is required" })
        .trim()
        .min(7, { message: "Password must be at least of 6 characters " })
        .max(1024, { message: "Password can't be greater than 1024 characters" })
})

const userUpdateSchema = z.object({
    username: z
        .string({ required_error: "Name is Required" }).trim()
        .min(3, { message: "Name must be atleast of 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),
    email: z
        .string({ required_error: "Email is address" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters" })
        .max(255, { message: "Email must not be more than 255 characters" }),
    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be at least of 10 characters" })
        .max(11, { message: "Phone must not be more than 10 characters" }),
    isAdmin: z
        .boolean({ required_error: "Admin status is required" })
        .optional()
})

module.exports = {signupSchema, loginSchema, userUpdateSchema};