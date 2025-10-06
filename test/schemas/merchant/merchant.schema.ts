import { object, z } from "zod";

export const MerchantSchema = z.object({
	data: z.array(object({
		merchantId: z.string(),
		name: z.string(),
		merchantCategory: z.enum([
			"SmallRestaurant",
			"MediumRestaurant", 
			"LargeRestaurant",
			"MerchandiseRestaurant",
			"BoothKiosk",
			"ConvenienceStore"
		]),
		imageUrl: z.url(),
		location: z.object({
			lat: z.float32(),
			long: z.float32(),
		}),
		createdAt: z.iso.datetime(),
	})),
	meta: z.object({
		limit: z.int().min(1),
		offset: z.int(),
		total: z.int(),
	}),
});

export const PostMerchantSchema = z.object({
	merchantId: z.string(),
	name: z.string(),
	merchantCategory: z.enum([
		"SmallRestaurant",
		"MediumRestaurant", 
		"LargeRestaurant",
		"MerchandiseRestaurant",
		"BoothKiosk",
		"ConvenienceStore"
	]),
	imageUrl: z.url(),
	location: z.object({
		lat: z.float32(),
		long: z.float32(),
	}),
})