export type PositivePayload = {
	[key: string]: PositivePayload | string | number | boolean | undefined;
};

export type Payload = {
	positive: PositivePayload;
	negative: Record<string, unknown>[];
};
