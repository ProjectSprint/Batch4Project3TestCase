import { When } from "@cucumber/cucumber";
import type { ApiWorld } from "../types/cucumber";

// Base preparation
When(
	"I prepare a {word} request to {string}",
	function (this: ApiWorld, method: string, endpoint: string) {
		this.request = {
			url: `${this.baseUrl}${endpoint}`,
			options: { method, headers: {} as Record<string, string> },
		};
	},
);

// Add token
When("I use {word} token", function (this: ApiWorld, tokenName: string) {
	const token = this.tokens[tokenName];
	if (!token) throw new Error(`Token '${tokenName}' not found`);
	this.request.options.headers["Authorization"] = `Bearer ${token}`;
});

// Add payload
When("I {word} payload", function (this: ApiWorld, payloadName: string) {
	const payload = getPayload(payloadName);
	this.request.options.headers["Content-Type"] = "application/json";
	this.request.options.body = JSON.stringify(payload);
});

// Add violations
When(
	"I inject {word} violations",
	async function (this: ApiWorld, entity: string) {
		const { schema, validTemplate } = schemaRegistry[entity];
		this.invalidPayloads = generateTestObjects(schema, validTemplate);
	},
);

// Actually send
When("send", async function (this: ApiWorld) {
	if (!this.request.url) {
		throw new Error(`Request url not found`);
	}
	if (this.invalidPayloads) {
		const responses: Response[] = [];
		for (const payload of this.invalidPayloads) {
			responses.push(
				await fetch(this.request.url, {
					...this.request.options,
					body: JSON.stringify(payload),
				}),
			);
		}
		this.lastResponse = responses[responses.length - 1];
	} else {
		this.lastResponse = await fetch(this.request.url, this.request.options);
	}

	this.jsonBody = (await this.lastResponse
		?.clone()
		.json()
		.catch(() => undefined)) as Record<string, unknown> | undefined;
});
