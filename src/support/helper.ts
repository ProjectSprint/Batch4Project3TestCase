import type { Resolvable } from "../payloads/payload.types";
import type { ApiWorld } from "../types/cucumber";

export function resolvePayload<T>(obj: Resolvable<T>, world: ApiWorld): T {
	if (typeof obj === "function") {
		// call with world injected
		return (obj as (world: ApiWorld) => T)(world);
	}
	if (Array.isArray(obj)) {
		return obj.map((item) => resolvePayload(item, world)) as T;
	}
	if (obj && typeof obj === "object") {
		return Object.fromEntries(
			Object.entries(obj).map(([k, v]) => [
				k,
				resolvePayload(v as Resolvable<unknown>, world),
			]),
		) as T;
	}
	return obj as T;
}
