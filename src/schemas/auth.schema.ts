import { z } from "zod";

export const AuthSchema = z.object({
	token: z.string().min(1),
});
