import { genModule } from "@proxtx/combine/combine.js";
import { genCombine } from "@proxtx/combine-rest/request.js";
import config from "@proxtx/config";
import fs from "fs/promises";

export class Trigger {
  constructor(triggerConfig, folder) {
    this.folder = folder;
    this.config = triggerConfig;

    (async () => {
      this.api = await genCombine(
        config.unifyGuiAPI.url + "/",
        "public/api.js",
        genModule
      );

      this.html = await fs.readFile(this.folder + "index.html", "utf8");
      this.handler = await fs.readFile(this.folder + "handler.js", "utf8");
    })();
  }

  getSelectionGui = async () => {
    let apps = await this.api.getApps(config.unifyGuiAPI.pwd);
    for (let app in apps) {
      apps[app] = (
        await this.api.getDefinitions(config.unifyGuiAPI.pwd, app)
      ).methods;
    }
    return {
      html: this.html,
      handler: this.handler,
      data: { apps },
    };
  };

  triggers = async (data) => {
    let definitions = (
      await this.api.getDefinitions(config.unifyGuiAPI.pwd, data.app)
    ).methods;
    for (let method in definitions) {
      definitions[method] = true;
    }

    return definitions[data.method];
  };
}
