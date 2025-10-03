import type {
	GenerateTestObjectSchema,
	GenerateUrlParamFromObjSchema,
	TestObjectSchema,
} from "./generator.types.ts";

export const MaxInt: number = 9007199254740991; // Maximum safe integer in JavaScript

export function generateRandomImageUrl(): string {
	return `http://${generateRandomDomain()}/image.jpg`;
}

export function generateRandomPhoneNumber(args: {
	addPlusPrefix: boolean;
}): string {
	const callingCodes: readonly string[] = [
		"1",
		"44",
		"49",
		"61",
		"81",
		"86",
		"93",
		"355",
		"213",
		"376",
		"244",
		"54",
		"374",
		"297",
		"61",
		"43",
		"994",
		"973",
		"880",
		"375",
		"32",
		"501",
		"229",
		"975",
		"591",
		"387",
		"267",
		"55",
		"673",
		"359",
		"226",
		"257",
		"855",
		"237",
		"238",
		"236",
		"235",
		"56",
		"86",
		"57",
		"269",
		"242",
		"243",
		"682",
		"506",
		"385",
		"53",
		"357",
		"420",
		"45",
		"253",
		"670",
		"593",
		"20",
		"503",
		"240",
		"291",
		"372",
		"251",
		"500",
		"298",
		"679",
		"358",
		"33",
		"689",
		"241",
		"220",
		"995",
		"49",
		"233",
		"350",
		"30",
		"299",
		"502",
		"224",
		"245",
		"592",
		"509",
		"504",
		"852",
		"36",
		"354",
		"91",
		"62",
		"98",
		"964",
		"353",
		"972",
		"39",
		"225",
		"81",
		"962",
		"7",
		"254",
		"686",
		"965",
		"996",
		"856",
		"371",
		"961",
		"266",
		"231",
		"218",
		"423",
		"370",
		"352",
		"853",
		"389",
		"261",
		"265",
		"60",
		"960",
		"223",
		"356",
		"692",
		"222",
		"230",
		"262",
		"52",
		"691",
		"373",
		"377",
		"976",
		"382",
		"212",
		"258",
		"95",
		"264",
		"674",
		"977",
		"31",
		"687",
		"64",
		"505",
		"227",
		"234",
		"683",
		"850",
		"47",
		"968",
		"92",
		"680",
		"507",
		"675",
		"595",
		"51",
		"63",
		"48",
		"351",
		"974",
		"40",
		"7",
		"250",
		"590",
		"685",
		"378",
		"239",
		"966",
		"221",
		"381",
		"248",
		"232",
		"65",
		"421",
		"386",
		"677",
		"252",
		"27",
		"82",
		"34",
		"94",
		"249",
		"597",
		"268",
		"46",
		"41",
		"963",
		"886",
		"992",
		"255",
		"66",
		"228",
		"690",
		"676",
		"216",
		"90",
		"993",
		"688",
		"256",
		"380",
		"971",
		"44",
		"598",
		"998",
		"678",
		"58",
		"84",
		"681",
		"967",
		"260",
		"263",
	];

	const callingCode =
		callingCodes[Math.floor(Math.random() * callingCodes.length)];
	const phoneNumber = Math.floor(Math.random() * 10000000)
		.toString()
		.padStart(8, "0");

	return args.addPlusPrefix
		? `+${callingCode}${phoneNumber}`
		: `${callingCode}${phoneNumber}`;
}

function generateRandomDomain(): string {
	const domain = generateRandomName().replace(/\s/g, "").toLowerCase();
	const tlds: readonly string[] = ["com", "net", "org", "io", "co", "xyz"];
	const tld = tlds[Math.floor(Math.random() * tlds.length)];
	return `${domain}.${tld}`;
}

export function generateRandomEmail(): string {
	const username = generateRandomUsername();
	const domain = generateRandomDomain();
	return `${username}@${domain}`;
}

export function generateRandomPassword(
	minLength: number = 5,
	maxLength: number = 15,
): string {
	if (minLength > maxLength) [minLength, maxLength] = [maxLength, minLength];

	const length =
		Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let password = "";

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		password += characters.charAt(randomIndex);
	}

	return password;
}

export function generateRandomWord(
	minLength: number,
	maxLength: number,
): string {
	if (minLength > maxLength)
		throw new Error("minLength cannot be greater than maxLength");
	if (minLength < 1 || maxLength < 1)
		throw new Error("Length parameters must be greater than 0");

	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	const length =
		Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

	let result = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters[randomIndex];
	}

	return result;
}

export function generateRandomUsername(): string {
	const prefixes: readonly string[] = [
		"An",
		"Ben",
		"Jon",
		"Xen",
		"Lor",
		"Mar",
		"Fel",
		"Cal",
		"Nor",
		"Zan",
		"Vin",
		"Hal",
		"Eli",
		"Oli",
		"Ray",
		"Sam",
		"Tim",
		"Ken",
		"Leo",
		"Kai",
	];
	const middles: readonly string[] = [
		"dra",
		"vi",
		"na",
		"lo",
		"ki",
		"ra",
		"li",
		"no",
		"mi",
		"ta",
		"ne",
		"ro",
		"sa",
		"mo",
		"ze",
		"fa",
		"de",
		"pe",
		"su",
		"re",
	];
	const suffixes: readonly string[] = [
		"son",
		"ton",
		"ly",
		"en",
		"er",
		"man",
		"den",
		"ren",
		"vin",
		"sen",
		"ler",
		"ter",
		"mon",
		"lin",
		"ker",
		"nor",
		"len",
		"tan",
		"ver",
		"mer",
	];

	let username = "";
	while (username.length < 5 || username.length > 15) {
		const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]!;
		const middle = middles[Math.floor(Math.random() * middles.length)]!;
		const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]!;
		username = prefix + middle + suffix + Math.floor(Math.random() * 10000);
	}
	return username;
}

export function generateRandomDate(
	from: string | number | Date,
	to: string | number | Date,
): string {
	const fromDate = new Date(from).getTime();
	const toDate = new Date(to).getTime();
	const randomDate = new Date(fromDate + Math.random() * (toDate - fromDate));
	return randomDate.toISOString();
}

export function generateRandomName(): string {
	const prefixes: readonly string[] = [
		"An",
		"Ben",
		"Jon",
		"Xen",
		"Lor",
		"Mar",
		"Fel",
		"Cal",
		"Nor",
		"Zan",
		"Vin",
		"Hal",
		"Eli",
		"Oli",
		"Ray",
		"Sam",
		"Tim",
		"Ken",
		"Leo",
		"Kai",
	];
	const middles: readonly string[] = [
		"dra",
		"vi",
		"na",
		"lo",
		"ki",
		"ra",
		"li",
		"no",
		"mi",
		"ta",
		"ne",
		"ro",
		"sa",
		"mo",
		"ze",
		"fa",
		"de",
		"pe",
		"su",
		"re",
	];
	const suffixes: readonly string[] = [
		"son",
		"ton",
		"ly",
		"en",
		"er",
		"man",
		"den",
		"ren",
		"vin",
		"sen",
		"ler",
		"ter",
		"mon",
		"lin",
		"ker",
		"nor",
		"len",
		"tan",
		"ver",
		"mer",
	];

	const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
	const middle = middles[Math.floor(Math.random() * middles.length)];
	const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

	return `${prefix} ${middle} ${suffix}`;
}

export function generateRandomDescription(maxLength: number = 20): string {
	const loremIpsum = "Lorem ipsum dolor sit amet...";
	return loremIpsum.length <= maxLength
		? loremIpsum
		: loremIpsum.substring(0, maxLength);
}

export function generateRandomNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateUrlParamFromObj(
	params: GenerateUrlParamFromObjSchema,
): string {
	return Object.entries(params)
		.map(
			([key, value]) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
		)
		.join("&");
}

export function clone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj)) as T;
}

export function combine<T extends object>(obj: T, objTruth: Partial<T>): T {
	return Object.assign({}, clone(obj), objTruth);
}

export function generateBoolFromPercentage(percentage: number): boolean {
	return Math.random() <= percentage;
}

// using `unknown[]` since k6 JSONValue is union of primitives/arrays/objects
export function generateTestObjects(
	schema: GenerateTestObjectSchema,
	validTemplate: object,
): Record<string, unknown>[] {
	if (
		validTemplate === null ||
		typeof validTemplate !== "object" ||
		Array.isArray(validTemplate)
	) {
		throw new Error("validTemplate must be an object");
	}

	const violations: Record<string, unknown>[] = [];

	function addViolation(path: string, violation: unknown): void {
		const testCase = clone(validTemplate) as Record<string, unknown>;
		if (
			testCase === null ||
			typeof testCase !== "object" ||
			Array.isArray(testCase)
		) {
			throw new Error("Invalid testCase after cloning");
		}

		const parts = path.split(".").filter(Boolean);
		let current: Record<string, unknown> = testCase as Record<string, unknown>;

		for (let i = 0; i < parts.length - 1; i++) {
			const part = parts[i];
			if (!part) throw new Error("Invalid path segment");

			const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);

			if (arrayMatch) {
				const [, arrayName, indexStr] = arrayMatch;
				if (!indexStr) throw new Error("indexStr not found");
				if (!arrayName) throw new Error("arrayName not found");

				const index = parseInt(indexStr, 10);
				const arr = current[arrayName];
				if (!Array.isArray(arr))
					throw new Error(`${arrayName} is not an array`);
				const nextObj = arr[index];
				if (
					nextObj === null ||
					typeof nextObj !== "object" ||
					Array.isArray(nextObj)
				) {
					throw new Error(`Invalid nested object at ${arrayName}[${index}]`);
				}
				current = nextObj as Record<string, unknown>;
			} else {
				const next = current[part];
				if (next === null || typeof next !== "object" || Array.isArray(next)) {
					throw new Error(`Invalid nested object at ${part}`);
				}
				current = next as Record<string, unknown>;
			}
		}

		const lastPart = parts[parts.length - 1];
		if (!lastPart) throw new Error("Invalid path");
		const arrayMatch = lastPart.match(/^(\w+)\[(\d+)\]$/);

		if (arrayMatch) {
			const [, arrayName, indexStr] = arrayMatch;
			if (!indexStr) throw new Error("indexStr not found");
			if (!arrayName) throw new Error("arrayName not found");

			const index = parseInt(indexStr, 10);
			if (!(arrayName in current))
				throw new Error(`Invalid path: ${arrayName} not found`);
			const arr = current[arrayName];
			if (!Array.isArray(arr)) throw new Error(`${arrayName} is not an array`);
			arr[index] = violation;
		} else {
			current[lastPart] = violation;
		}

		violations.push(testCase);
	}

	function generateDataTypeViolations(propPath: string, type: string): void {
		const dataTypes: Record<string, unknown[]> = {
			string: ["", 123, true, {}, []],
			"string-param": [123, true, {}, []],
			number: ["notANumber", true, {}, []],
			boolean: ["notABoolean", 123, {}, []],
			object: ["notAnObject", 123, true, []],
			array: ["notAnArray", 123, true, {}],
		};
		if (type in dataTypes)
			dataTypes[type]?.forEach((violation) => {
				addViolation(propPath, violation);
			});
	}

	function generateViolationsForProp(
		propPath: string,
		propRules: TestObjectSchema,
		parentValue: unknown,
	): void {
		if (!parentValue) parentValue = {};

		if (propRules.notNull) addViolation(propPath, null);
		if (propRules.isUrl) {
			addViolation(propPath, "notAUrl");
			addViolation(propPath, "http://incomplete");
		}
		if (propRules.isEmail) {
			addViolation(propPath, "notAnEmail");
			addViolation(propPath, "missingdomain.com");
		}
		if (propRules.isPhoneNumber) {
			addViolation(propPath, "notAPhoneNumber");
			addViolation(propPath, "1234567890");
		}
		if (propRules.addPlusPrefixPhoneNumber)
			addViolation(propPath, "1234567890");

		if (propRules.type) {
			generateDataTypeViolations(propPath, propRules.type);

			switch (propRules.type) {
				case "string":
				case "string-param":
					if (typeof propRules.minLength === "number")
						addViolation(propPath, "a".repeat(propRules.minLength - 1));
					if (typeof propRules.maxLength === "number")
						addViolation(propPath, "a".repeat(propRules.maxLength + 1));
					if (Array.isArray(propRules.enum))
						addViolation(propPath, "notAnEnumValue");
					break;
				case "number":
					if (typeof propRules.min === "number")
						addViolation(propPath, propRules.min - 1);
					if (typeof propRules.max === "number")
						addViolation(propPath, propRules.max + 1);
					break;
				case "array":
					if (propRules.items) {
						if (propRules.items.notNull) addViolation(`${propPath}[0]`, null);
						if (
							propRules.items.type === "object" &&
							propRules.items.properties
						) {
							Object.entries(propRules.items.properties).forEach(
								([nestedProp, nestedRules]) => {
									generateViolationsForProp(
										`${propPath}[0].${nestedProp}`,
										nestedRules,
										(parentValue as Record<string, unknown>[])[0]?.[nestedProp],
									);
								},
							);
						}
					}
					break;
				case "object":
					if (propRules.properties) {
						Object.entries(propRules.properties).forEach(
							([nestedProp, nestedRules]) => {
								generateViolationsForProp(
									`${propPath}.${nestedProp}`,
									nestedRules,
									(parentValue as Record<string, unknown>)[nestedProp],
								);
							},
						);
					}
					break;
			}
		}
	}

	Object.entries(schema).forEach(([prop, propRules]) => {
		generateViolationsForProp(
			prop,
			propRules,
			(validTemplate as Record<string, unknown>)[prop],
		);
	});

	return violations;
}

export function withProbability<T>(
	probability: number,
	fn: () => T,
): T | undefined {
	if (probability < 0 || probability > 1)
		throw new Error("Probability must be between 0 and 1");
	return Math.random() < probability ? fn() : undefined;
}
