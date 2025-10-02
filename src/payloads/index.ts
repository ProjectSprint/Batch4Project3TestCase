import {
	generateRandomEmail,
	generateRandomPassword,
	generateRandomPhoneNumber,
	generateTestObjects,
} from "../helper/generator";
import type { ApiWorld } from "../types/cucumber";
import type { Payload } from "./payload.types";

const positiveRegisterPhone = {
	phone: generateRandomPhoneNumber({ addPlusPrefix: true }),
	password: generateRandomPassword(),
};
const positiveRegisterEmail = {
	email: generateRandomEmail(),
	password: generateRandomPassword(),
};

export const payloads: Record<string, Payload> = {
	registerPhone: {
		positive: positiveRegisterPhone,
		negative: generateTestObjects({}, positiveRegisterPhone),
	},
	registerEmail: {
		positive: positiveRegisterEmail,
		negative: generateTestObjects({}, positiveRegisterEmail),
	},
	loginPhone: {
		positive: {
			email: (world: ApiWorld) => world.savedPayload["emailFromRegister"],
			password: (world: ApiWorld) => world.savedPayload["passwordFromRegister"],
		},
		negative: generateTestObjects({}, positiveRegisterPhone),
	},
	loginEmail: {
		positive: {
			phone: (world: ApiWorld) => world.savedPayload["phoneFromRegister"],
			password: (world: ApiWorld) => world.savedPayload["passwordFromRegister"],
		},
		negative: generateTestObjects({}, positiveRegisterEmail),
	},
};
