import z from "zod";

export const MerchantIdSchema = z.object({
	merchantId: z.string()
})