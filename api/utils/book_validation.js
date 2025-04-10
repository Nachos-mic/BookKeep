"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSchema = void 0;
const zod_1 = require("zod");
exports.bookSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: "Nazwa książki jest wymagana.",
        invalid_type_error: "Nazwa książki musi być tekstem."
    })
        .min(3, "Nazwa książki musi składać się z co najmniej 3 znaków.")
        .max(100, "Nazwa książki nie może zawierać więcej niż 30 znaków."),
    author: zod_1.z
        .string({
        required_error: "Autor jest wymagany.",
        invalid_type_error: "Autor musi być tekstem."
    })
        .min(3, "Imię autora musi zawierać co najmniej 3 znaki.")
        .max(100, "Imię autora nie może przekraczać 30 znaków."),
    is_read: zod_1.z
        .boolean({
        required_error: "Status przeczytania jest wymagany.",
        invalid_type_error: "Status przeczytania musi być typu boolean."
    }),
    genre: zod_1.z
        .string({
        required_error: "Gatunek książki jest wymagany.",
        invalid_type_error: "Gatunek musi być tekstem."
    })
        .min(3, "Gatunek musi zawierać co najmniej 3 znaki.")
        .max(50, "Gatunek nie może zawierać więcej niż 30 znaków."),
    rating: zod_1.z
        .number({
        required_error: "Ocena książki jest wymagana.",
        invalid_type_error: "Ocena musi być liczbą."
    })
        .min(0, "Ocena nie może być mniejsza niż 0.")
        .max(10, "Ocena nie może być większa niż 10.")
});
exports.default = exports.bookSchema;
