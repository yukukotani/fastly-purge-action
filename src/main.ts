import * as core from "@actions/core";

async function run(): Promise<void> {
  try {
    const apiKey = core.getInput("api-key", { required: true });

    core.debug(apiKey);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
