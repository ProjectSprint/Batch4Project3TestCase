export type Resolvable<T> = T | (() => T);

export type PositivePayload = {
	[key: string]: Resolvable<
		PositivePayload | string | number | boolean | undefined
	>;
};

export type Payload = {
	positive: PositivePayload;
	negative: Record<string, unknown>[];
};
