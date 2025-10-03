import {
	generateRandomEmail,
	generateRandomPassword,
	generateTestObjects,
} from "../helper/generator";
import type { ApiWorld } from "../types/cucumber";
import type { Payload } from "./payload.types";

const positiveRegisterEmail = {
	email: generateRandomEmail(),
	password: generateRandomPassword(),
};

export const payloads: Record<string, Payload> = {
	registerEmail: {
		positive: positiveRegisterEmail,
		negative: generateTestObjects({}, positiveRegisterEmail),
	},
	loginEmail: {
		positive: {
			phone: (world: ApiWorld) => world.savedPayload["phoneFromRegister"],
			password: (world: ApiWorld) => world.savedPayload["passwordFromRegister"],
		},
		negative: generateTestObjects({}, positiveRegisterEmail),
	},
	loginEmailInvalidPass: {
		positive: {
			phone: (world: ApiWorld) => world.savedPayload["phoneFromRegister"],
			password: "asdf",
		},
		negative: [],
	},
};
