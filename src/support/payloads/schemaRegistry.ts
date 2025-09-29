import type z from "zod";
import { UserSchema } from "./userSchema";

// biome-ignore lint/suspicious/noExplicitAny: we can't determine what ObjectSchema output will be
type ObjectSchema = z.ZodType<Record<string, unknown>, any, any>;
type SchemaRegistry = Record<string, ObjectSchema>;

export const schemaRegistry: SchemaRegistry = {
	user: UserSchema,
};
