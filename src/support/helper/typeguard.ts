import { schemaRegistry } from "../payloads/schemaRegistry";

export function isSchemaKey(key: string): key is keyof typeof schemaRegistry {
	return key in schemaRegistry;
}
