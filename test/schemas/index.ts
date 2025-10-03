import type z from "zod";
import { AuthSchema } from "./auth.schema";
import { UserSchema } from "./user.schema";
import { MerchantSchema } from "./merchant.schema";
import { ItemSchema } from "./item.schema";

// biome-ignore lint/suspicious/noExplicitAny: we can't determine what ObjectSchema output will be
type ObjectSchema = z.ZodType<Record<string, unknown>, any, any>;
type SchemaRegistry = Record<string, ObjectSchema>;

export const schemaRegistry: SchemaRegistry = {
	item: ItemSchema,
  merchant: MerchantSchema,
	user: UserSchema,
	auth: AuthSchema,
};

export function isSchemaAvailable(
	key: string,
): key is keyof typeof schemaRegistry {
	return key in schemaRegistry;
}
