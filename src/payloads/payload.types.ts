import type { ApiWorld } from "../types/cucumber";

export type Resolvable<T> = T | ((world: ApiWorld) => T);

export type PositivePayload = {
	[key: string]: Resolvable<
		PositivePayload | string | number | boolean | undefined
	>;
};

export type Payload = {
	positive: PositivePayload;
	negative: Record<string, unknown>[];
};
