import { setDefaultTimeout } from "@cucumber/cucumber";

// Increase default timeout if needed (useful for API calls)
setDefaultTimeout(10 * 1000);

export * from "./step_def/request.step";
export * from "./step_def/response.step";
export * from "./step_def/save.step";
export * from "./types/cucumber";
