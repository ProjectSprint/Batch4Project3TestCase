import { object, z } from "zod";

export const ItemSchema = z.object({
	data: z.array(object({
		itemId: z.string(),
		name: z.string(),
		productCategory: z.enum([
			"Beverage",
			"Food",
			"Snack",
			"Condiments",
			"Additions"
		]),
		price: z.int().min(1),
		imageUrl: z.url(),
		createdAt: z.iso.datetime(),
	})),
	meta: z.object({
		limit: z.int().min(1),
		offset: z.int(),
		total: z.int(),
	}),
});

export const PostItemSchema = z.object({
	itemId: z.string(),
	name: z.string(),
	productCategory: z.enum([
		"Beverage",
		"Food",
		"Snack",
		"Condiments",
		"Additions"
	]),
	price: z.int().min(1),
	imageUrl: z.url(),
})