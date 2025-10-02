import type { IWorldOptions } from "@cucumber/cucumber";
import { setWorldConstructor, World } from "@cucumber/cucumber";

type DraftRequest = {
	url?: string;
	options: {
		method?: string;
		headers: Record<string, string>;
		body?: string;
	};
};
type ViolationResult = {
	status: number;
	body?: Record<string, unknown>;
};

export class ApiWorld extends World {
	baseUrl: string;
	lastResponse?: Response;
	jsonBody?: Record<string, unknown>;
	tokens: Record<string, string>;

	request: DraftRequest;
	invalidPayloads?: unknown[];
	violationResponses: ViolationResult[];
	savedPayload: Record<string, unknown>; // <— NEW

	constructor(options: IWorldOptions) {
		super(options);
		this.baseUrl = process.env["API_URL"] || "https://example.com";
		this.tokens = {};
		this.request = { options: { headers: {} } };
		this.violationResponses = [];
		this.savedPayload = {}; // init empty
	}

	resetRequest() {
		this.request = { options: { headers: {} } };
		this.invalidPayloads = [];
		this.violationResponses = [];
		this.savedPayload = {};
	}
}

setWorldConstructor(ApiWorld);
