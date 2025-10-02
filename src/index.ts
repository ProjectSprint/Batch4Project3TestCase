import { setDefaultTimeout } from "@cucumber/cucumber";

// Increase default timeout if needed (useful for API calls)
setDefaultTimeout(10 * 1000);

export * from "./step_def/request.steps";
export * from "./step_def/token.step";
export * from "./step_def/validation.step";
export * from "./types/cucumber";
