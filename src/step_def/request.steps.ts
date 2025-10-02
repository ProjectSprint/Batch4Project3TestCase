import { When } from "@cucumber/cucumber";
import { payloads } from "../payloads";
import { resolvePayload } from "../support/helper";
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
When("I use {word} payload", function (this: ApiWorld, payloadName: string) {
	const payload = payloads[payloadName];
	if (!payload) throw new Error(`Payload '${payloadName}' not found`);

	const resolved = resolvePayload(payload.positive);

	this.request.options.headers["Content-Type"] = "application/json";
	this.request.options.body = JSON.stringify(resolved);
});

// Add violations
When(
	"I inject {word} violations",
	async function (this: ApiWorld, entity: string) {
		const payload = payloads[entity];
		if (!payload) throw new Error(`Violation '${entity}' not found`);
		this.invalidPayloads = payload.negative;
	},
);

// Send single request
When("send", async function (this: ApiWorld) {
	if (!this.request.url) {
		throw new Error(`Request url not found`);
	}

	this.lastResponse = await fetch(this.request.url, this.request.options);
	this.jsonBody = (await this.lastResponse
		?.clone()
		.json()
		.catch(() => undefined)) as Record<string, unknown> | undefined;
});

When("send violations", async function (this: ApiWorld) {
	if (!this.request.url) {
		throw new Error(`Request url not found`);
	}
	if (!this.invalidPayloads || this.invalidPayloads.length === 0) {
		throw new Error(
			"No invalid payloads found. Did you call 'I inject ... violations'?",
		);
	}

	this.violationResponses = []; // reset before running

	for (const payload of this.invalidPayloads) {
		const response = await fetch(this.request.url, {
			...this.request.options,
			body: JSON.stringify(payload),
		});

		const body = (await response
			.clone()
			.json()
			.catch(() => undefined)) as Record<string, unknown> | undefined;

		this.violationResponses.push({
			status: response.status,
			body,
		});
	}

	// Only set lastResponse/jsonBody if we got at least one violation response
	if (this.violationResponses.length > 0) {
		const last = this.violationResponses[this.violationResponses.length - 1];
		if (!last) {
			this.lastResponse = undefined;
			this.jsonBody = undefined;
			return;
		}

		// Construct synthetic Response for backward compatibility
		this.lastResponse = new Response(JSON.stringify(last.body ?? {}), {
			status: last.status,
			headers: { "Content-Type": "application/json" },
		});

		this.jsonBody = last.body;
	} else {
		this.lastResponse = undefined;
		this.jsonBody = undefined;
	}
});
