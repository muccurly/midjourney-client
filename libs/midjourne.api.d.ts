import { DiscordImage, MJConfig } from "./interfaces";
import { Command } from "./command";
export declare class MidjourneyApi extends Command {
    config: MJConfig;
    private apiQueue;
    UpId: number;
    constructor(config: MJConfig);
    protected safeIteractions(payload: any): Promise<number>;
    protected interactions(payload: any, callback?: (result: number) => void): Promise<number | undefined>;
    ImagineApi(prompt: string, nonce?: string): Promise<number>;
    VariationApi({ index, msgId, hash, nonce, flags, }: {
        index: 1 | 2 | 3 | 4;
        msgId: string;
        hash: string;
        nonce?: string;
        flags?: number;
    }): Promise<number>;
    UpscaleApi({ index, msgId, hash, nonce, flags, }: {
        index: 1 | 2 | 3 | 4;
        msgId: string;
        hash: string;
        nonce?: string;
        flags: number;
    }): Promise<number>;
    RerollApi({ msgId, hash, nonce, flags, }: {
        msgId: string;
        hash: string;
        nonce?: string;
        flags: number;
    }): Promise<number>;
    CustomApi({ msgId: msgId, customId, flags, nonce, }: {
        msgId: string;
        customId: string;
        flags: number;
        nonce?: string;
    }): Promise<number>;
    InfoApi(nonce?: string): Promise<number>;
    SettingsApi(nonce?: string): Promise<number>;
    FastApi(nonce?: string): Promise<number>;
    RelaxApi(nonce?: string): Promise<number>;
    /**
     *
     * @param fileUrl http or local file path
     * @returns
     */
    UploadImage(fileUrl: string): Promise<DiscordImage>;
    /**
     * prepare an attachement to upload an image.
     */
    private attachments;
    private uploadImage;
    DescribeApi(image: DiscordImage, nonce?: string): Promise<number>;
    SaveIdApi(idname: string, image: DiscordImage, nonce?: string): Promise<number>;
    SwapFaceApi(image: DiscordImage, nonce?: string): Promise<number>;
}
