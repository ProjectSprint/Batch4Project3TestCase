import type z from "zod";
import { AuthSchema } from "./auth.schema";
import { UserSchema } from "./user.schema";
import { MerchantIdSchema } from "./merchant/merchantId.schema";
import { MerchantSchema, PostMerchantSchema } from "./merchant/merchant.schema";
import { ItemIdSchema } from "./merchant/itemId.schema";
import { ItemSchema, PostItemSchema } from "./merchant/item.schema";

// biome-ignore lint/suspicious/noExplicitAny: we can't determine what ObjectSchema output will be
type ObjectSchema = z.ZodType<Record<string, unknown>, any, any>;
type SchemaRegistry = Record<string, ObjectSchema>;

export const schemaRegistry: SchemaRegistry = {
	itemId: ItemIdSchema,
	postItemSchema: PostItemSchema,
	item: ItemSchema,
	merchantId: MerchantIdSchema,
	postMerchantSchema: PostMerchantSchema,
  merchant: MerchantSchema,
	user: UserSchema,
	auth: AuthSchema,
};

export function isSchemaAvailable(
	key: string,
): key is keyof typeof schemaRegistry {
	return key in schemaRegistry;
}
