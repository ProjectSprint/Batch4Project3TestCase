export type TestObjectSchema = {
	notNull?: boolean;
	isUrl?: boolean;
	isEmail?: boolean;
	isPhoneNumber?: boolean;
	addPlusPrefixPhoneNumber?: boolean;
	type?: "string" | "string-param" | "number" | "boolean" | "object" | "array";
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
	enum?: readonly string[];
	items?: TestObjectSchema;
	properties?: Record<string, TestObjectSchema>;
};

export type GenerateTestObjectSchema = Record<string, TestObjectSchema>;

export type GenerateUrlParamFromObjSchema = Record<
	string,
	string | number | boolean
>;
