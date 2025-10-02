import assert from "node:assert";
import { Given, Then } from "@cucumber/cucumber";
import get from "lodash.get";
import z from "zod";
import { isSchemaAvailable, schemaRegistry } from "../schemas";
import type { ApiWorld } from "../types/cucumber";

Given("{word} exists", function (this: ApiWorld, name: string) {
	const inSavedPayload = this.savedPayload[name];

	if (inSavedPayload === undefined) {
		throw new Error(`Expected '${name}' to exist in tokens or savedPayload`);
	}
});

Then(
	"the response body matches the {word} schema",
	async function (this: ApiWorld, schemaName: string) {
		if (!this.lastResponse) {
			throw new Error("No response found in World");
		}

		if (!isSchemaAvailable(schemaName)) {
			throw new Error(`Schema ${schemaName} not found in World`);
		}

		const schema = schemaRegistry[schemaName];
		if (!schema) {
			throw new Error(`Schema '${schemaName}' not found in SchemaRegistry`);
		}

		const body = await this.lastResponse.clone().json();
		const result = schema.safeParse(body);

		if (!result.success) {
			throw new Error(
				`Response body does not match schema '${schemaName}':\n` +
					JSON.stringify(z.treeifyError(result.error), null, 2),
			);
		}

		this.jsonBody = result.data;
	},
);

Then(
	"the response should be {int}",
	async function (this: ApiWorld, status: number) {
		if (!this.lastResponse) {
			throw new Error("No response found in World");
		}
		assert.strictEqual(this.lastResponse.status, status);
	},
);

Then(
	"the violation responses should be {int}",
	function (this: ApiWorld, expectedStatus: number) {
		if (!this.violationResponses || this.violationResponses.length === 0) {
			throw new Error("No violation responses found in World");
		}

		for (const { status } of this.violationResponses) {
			assert.strictEqual(
				status,
				expectedStatus,
				`Expected status ${expectedStatus}, but got ${status}`,
			);
		}
	},
);

Then(
	"{string} value is equal to {string}",
	function (this: ApiWorld, path: string, expected: string) {
		if (!this.jsonBody)
			throw new Error("jsonBody is empty. Did you validate schema first?");

		const actual = get(this.jsonBody, path);

		assert.strictEqual(
			actual,
			expected,
			`Expected value at path '${path}' to equal '${expected}', but got '${actual}'`,
		);
	},
);
