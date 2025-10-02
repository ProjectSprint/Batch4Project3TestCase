import type { Resolvable } from "../payloads/payload.types";

export function resolvePayload<T>(obj: Resolvable<T>): T {
	if (typeof obj === "function") {
		// call with no args, but you could extend to pass world
		return (obj as () => T)();
	}
	if (Array.isArray(obj)) {
		return obj.map((item) => resolvePayload(item)) as T;
	}
	if (obj && typeof obj === "object") {
		return Object.fromEntries(
			Object.entries(obj).map(([k, v]) => [
				k,
				resolvePayload(v as Resolvable<unknown>),
			]),
		) as T;
	}
	return obj as T;
}
