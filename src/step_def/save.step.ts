import { Then } from "@cucumber/cucumber";
import get from "lodash.get";
import type { ApiWorld } from "../types/cucumber";

Then(
	"save the {string} value as {word}",
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
