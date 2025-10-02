import { Then } from "@cucumber/cucumber";
import get from "lodash.get";
import type { ApiWorld } from "../types/cucumber";

Then(
	"save the {string} value to be a token named {word}",
	async function (this: ApiWorld, path: string, tokenName: string) {
		if (!this.lastResponse) {
			throw new Error("No lastResponse available to extract value from");
		}

		const data = await this.lastResponse.clone().json(); // clone in case JSON is already read later
		const value = get(data, path);

		if (!value) {
			throw new Error(
				`Could not find value at path '${path}' in response body`,
			);
		}

		this.tokens[tokenName] = value;
	},
);

Then(
	" save the {string} value as {word}",
	function (this: ApiWorld, path: string, name: string) {
		if (!this.jsonBody) {
			throw new Error("No JSON body available to save from");
		}

		const value = get(this.jsonBody, path);
		if (value === undefined) {
			throw new Error(
				`Could not find value at path '${path}' in response body`,
			);
		}

		this.savedPayload[name] = value;
	},
);
