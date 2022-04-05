export class ConfigService {
    static _config: any = {};

    /**
     * set config
     * @param config the external config
     */
    static setConfig = (config: any) => {
        ConfigService._config = config;
    };

    /**
     * get config
     * @returns the config
     */
    static getConfig() {
        return { ...ConfigService._config };
    }
}