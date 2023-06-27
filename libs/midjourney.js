"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Midjourney = void 0;
const interfaces_1 = require("./interfaces");
const midjourne_api_1 = require("./midjourne.api");
const midjourney_message_1 = require("./midjourney.message");
const utls_1 = require("./utls");
const ws_message_1 = require("./ws.message");
class Midjourney extends midjourney_message_1.MidjourneyMessage {
    config;
    wsClient;
    MJApi;
    constructor(defaults) {
        const { SalaiToken } = defaults;
        if (!SalaiToken) {
            throw new Error("SalaiToken are required");
        }
        super(defaults);
        this.config = {
            ...interfaces_1.DefaultMJConfig,
            ...defaults,
        };
        this.MJApi = new midjourne_api_1.MidjourneyApi(this.config);
    }
    async Connect() {
        if (!this.config.Ws) {
            return this;
        }
        if (this.wsClient)
            return this;
        return new Promise((resolve) => {
            this.wsClient = new ws_message_1.WsMessage(this.config, this.MJApi);
            this.wsClient.once("ready", () => {
                this.log(`ws ready`);
                resolve(this);
            });
        });
    }
    async init() {
        return this.Connect();
    }
    async Imagine(prompt, loading) {
        prompt = prompt.trim();
        if (!this.wsClient) {
            const seed = (0, utls_1.random)(1000000000, 9999999999);
            prompt = `[${seed}] ${prompt}`;
        }
        const nonce = (0, utls_1.nextNonce)();
        this.log(`Imagine`, prompt, "nonce", nonce);
        const httpStatus = await this.MJApi.ImagineApi(prompt, nonce);
        if (httpStatus !== 204) {
            throw new Error(`ImagineApi failed with status ${httpStatus}`);
        }
        if (this.wsClient) {
            return await this.wsClient.waitImageMessage(nonce, loading);
        }
        else {
            this.log(`await generate image`);
            const msg = await this.WaitMessage(prompt, loading);
            this.log(`image generated`, prompt, msg?.uri);
            return msg;
        }
    }
    async Settings() {
        const nonce = (0, utls_1.nextNonce)();
        const httpStatus = await this.MJApi.SettingsApi(nonce);
        if (httpStatus !== 204) {
            throw new Error(`ImagineApi failed with status ${httpStatus}`);
        }
        if (this.wsClient) {
            return this.wsClient.waitSettings();
        }
        return null;
    }
    async Reset() {
        const settings = await this.Settings();
        if (!settings) {
            throw new Error(`Settings not found`);
        }
        const reset = settings.options.find((o) => o.label === "Reset Settings");
        if (!reset) {
            throw new Error(`Reset Settings not found`);
        }
        const httpstatus = await this.MJApi.CustomApi({
            msgId: settings.id,
            customId: reset.custom,
            flags: settings.flags,
        });
        if (httpstatus !== 204) {
            throw new Error(`Reset failed with status ${httpstatus}`);
        }
    }
    async Info() {
        const nonce = (0, utls_1.nextNonce)();
        const httpStatus = await this.MJApi.InfoApi(nonce);
        if (httpStatus !== 204) {
            throw new Error(`ImagineApi failed with status ${httpStatus}`);
        }
        if (this.wsClient) {
            return this.wsClient.waitInfo();
        }
        return null;
    }
    async Fast() {
        const nonce = (0, utls_1.nextNonce)();
        const httpStatus = await this.MJApi.FastApi(nonce);
        if (httpStatus !== 204) {
            throw new Error(`FastApi failed with status ${httpStatus}`);
        }
        return null;
    }
    async Relax() {
        const nonce = (0, utls_1.nextNonce)();
        const httpStatus = await this.MJApi.RelaxApi(nonce);
        if (httpStatus !== 204) {
            throw new Error(`RelaxApi failed with status ${httpStatus}`);
        }
        return null;
    }
    async Describe(imgUri) {
        const nonce = (0, utls_1.nextNonce)();
        const DcImage = await this.MJApi.UploadImage(imgUri);
        this.log(`Describe`, DcImage, "nonce", nonce);
        const httpStatus = await this.MJApi.DescribeApi(DcImage, nonce);
        if (httpStatus !== 204) {
            throw new Error(`DescribeApi failed with status ${httpStatus}`);
        }
        if (this.wsClient) {
            return this.wsClient.waitDescribe(nonce);
        }
        return null;
    }
    async SwapFace(imgUri) {
        const nonce = (0, utls_1.nextNonce)();
        const DcImage = await this.MJApi.UploadImage(imgUri);
        this.log(`Describe`, DcImage, "nonce", nonce);
        const httpStatus = await this.MJApi.SwapFaceApi(DcImage, nonce);
        if (httpStatus !== 204) {
            throw new Error(`DescribeApi failed with status ${httpStatus}`);
        }
        if (this.wsClient) {
            return this.wsClient.waitDescribe(nonce);
        }
        return null;
    }
    async SaveId(idname, imgUri) {
        const nonce = (0, utls_1.nextNonce)();
        const DcImage = await this.MJApi.UploadImage(imgUri);
        this.log(`Describe`, DcImage, "nonce", nonce);
        const httpStatus = await this.MJApi.SaveIdApi(idname, DcImage, nonce);
        if (httpStatus !== 204) {
            throw new Error(`DescribeApi failed with status ${httpStatus}`);
        }
        if (this.wsClient) {
            return this.wsClient.waitDescribe(nonce);
        }
        return null;
    }
    async Variation({ index, msgId, hash, content, flags, loading, }) {
        const nonce = (0, utls_1.nextNonce)();
        const httpStatus = await this.MJApi.VariationApi({
            index,
            msgId,
            hash,
            flags,
            nonce,
        });
        if (httpStatus !== 204) {
            throw new Error(`VariationApi failed with status ${httpStatus}`);
        }
        if (this.wsClient) {
            return await this.wsClient.waitImageMessage(nonce, loading);
        }
        if (content === undefined || content === "") {
            throw new Error(`content is required`);
        }
        return await this.WaitMessage(content, loading);
    }
    async Upscale({ index, msgId, hash, content, flags, loading, }) {
        const nonce = (0, utls_1.nextNonce)();
        const httpStatus = await this.MJApi.UpscaleApi({
            index,
            msgId,
            hash,
            flags,
            nonce,
        });
        if (httpStatus !== 204) {
            throw new Error(`UpscaleApi failed with status ${httpStatus}`);
        }
        if (this.wsClient) {
            return await this.wsClient.waitImageMessage(nonce, loading);
        }
        if (content === undefined || content === "") {
            throw new Error(`content is required`);
        }
        return await this.WaitMessage(content, loading);
    }
    async Reroll({ msgId, hash, content, flags, loading, }) {
        const nonce = (0, utls_1.nextNonce)();
        const httpStatus = await this.MJApi.RerollApi({
            msgId,
            hash: hash,
            flags,
            nonce,
        });
        if (httpStatus !== 204) {
            throw new Error(`RerollApi failed with status ${httpStatus}`);
        }
        if (this.wsClient) {
            return await this.wsClient.waitImageMessage(nonce, loading);
        }
        if (content === undefined || content === "") {
            throw new Error(`content is required`);
        }
        return await this.WaitMessage(content, loading);
    }
    Close() {
        if (this.wsClient) {
            this.wsClient.close();
            this.wsClient = undefined;
        }
    }
}
exports.Midjourney = Midjourney;
//# sourceMappingURL=midjourney.js.map