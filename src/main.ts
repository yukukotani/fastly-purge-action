import * as core from "@actions/core";
import * as Fastly from "fastly";

async function run(): Promise<void> {
  try {
    const apiToken = core.getInput("api-token", { required: true });
    const serviceId = core.getInput("service-id", { required: true });
    const soft = core.getBooleanInput("soft");
    const target = core.getInput("target", { required: true });
    const keys = core.getMultilineInput("keys", { required: true });

    if (target !== "surrogate-key") {
      throw new Error("Invalid target: " + target);
    }

    Fastly.ApiClient.instance.authenticate(apiToken);

    const purgeApi = new Fastly.PurgeApi();

    await purgeApi.bulkPurgeTag({
      service_id: serviceId,
      fastly_soft_purge: soft ? 0 : 1,
      purge_response: { surrogate_keys: keys },
    });
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
