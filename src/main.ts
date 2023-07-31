import * as core from "@actions/core";
import * as Fastly from "fastly";

const ACCEPTED_TARGETS = ["surrogate-key", "single-url"];

async function run(): Promise<void> {
  try {
    const apiToken = core.getInput("api-token", { required: true });
    const target = core.getInput("target", { required: true });
    const soft = core.getBooleanInput("soft");

    const serviceId = core.getInput("service-id", { required: target === "surrogate-key" });
    const keys = core.getInput("keys", { required: target === "surrogate-key" });
    const url = core.getInput("url", { required: target === "single-url" });

    const debug = core.getBooleanInput("debug");

    if (!ACCEPTED_TARGETS.includes(target)) {
      throw new Error("Invalid target: " + target);
    }

    Fastly.ApiClient.instance.authenticate(apiToken);

    const purgeApi = new Fastly.PurgeApi();

    let response: Fastly.PurgeResponse;

    if (target === "surrogate-key") {
      response = await purgeApi.bulkPurgeTag({
        service_id: serviceId,
        fastly_soft_purge: soft ? 1 : 0,
        purge_response: { surrogate_keys: keys },
      });
    } else {
      if (!url) {
        throw new Error("`single-url` target must include `url` input");
      }

      response = await purgeApi.purgeSingleUrl({
        cached_url: url,
        fastly_soft_purge: soft ? 1 : 0,
      });
    }

    console.log("Success to sent purge request: ", response)

    core.setOutput("response", response);

    if (debug) {
      try {
        console.log("response", JSON.stringify(response));
      } catch {
        console.log("response", String(response));
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error)
    } else {
      console.error(error);
      core.setFailed("Unknown error")
    }
  }
}

run();
