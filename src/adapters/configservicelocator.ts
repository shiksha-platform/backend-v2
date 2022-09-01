import { ConfigDto } from "src/configs/dto/config.dto";

export interface IServicelocator {
  createConfig(request: any, configDto: ConfigDto);
  getConfig(request: any);
  createModuleConfigs(request: any, configAllData: [Object]);
}
