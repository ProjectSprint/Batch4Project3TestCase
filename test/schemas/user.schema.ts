import { z } from "zod";

export const UserSchema = z.object({
	id: z.string(),
	email: z.email(),
	age: z.number().int().min(18),
});
