import { DiscordImage, MJConfig } from "./interfaces";
type CommandName = "imagine" | "describe" | "info" | "fast" | "relax" | "saveid" | "swapid" | "settings";
export declare class Command {
    config: MJConfig;
    constructor(config: MJConfig);
    private cache;
    cacheCommand(name: CommandName): Promise<any>;
    getCommand(name: CommandName): Promise<any>;
    imaginePayload(prompt: string, nonce?: string): Promise<{
        type: number;
        application_id: string | undefined;
        guild_id: string | undefined;
        channel_id: string;
        session_id: string;
        nonce: string | undefined;
        data: any;
    }>;
    infoPayload(nonce?: string): Promise<{
        type: number;
        application_id: string | undefined;
        guild_id: string | undefined;
        channel_id: string;
        session_id: string;
        nonce: string | undefined;
        data: any;
    }>;
    fastPayload(nonce?: string): Promise<{
        type: number;
        application_id: string | undefined;
        guild_id: string | undefined;
        channel_id: string;
        session_id: string;
        nonce: string | undefined;
        data: any;
    }>;
    relaxPayload(nonce?: string): Promise<{
        type: number;
        application_id: string | undefined;
        guild_id: string | undefined;
        channel_id: string;
        session_id: string;
        nonce: string | undefined;
        data: any;
    }>;
    settingsPayload(nonce?: string): Promise<{
        type: number;
        application_id: string | undefined;
        guild_id: string | undefined;
        channel_id: string;
        session_id: string;
        nonce: string | undefined;
        data: any;
    }>;
    swapFace(image: DiscordImage, nonce?: string): Promise<{
        type: number;
        application_id: string | undefined;
        guild_id: string | undefined;
        channel_id: string;
        session_id: string;
        nonce: string | undefined;
        data: any;
    }>;
    saveId(idname: string, image: DiscordImage, nonce?: string): Promise<{
        type: number;
        application_id: string | undefined;
        guild_id: string | undefined;
        channel_id: string;
        session_id: string;
        nonce: string | undefined;
        data: any;
    }>;
    describePayload(image: DiscordImage, nonce?: string): Promise<{
        type: number;
        application_id: string | undefined;
        guild_id: string | undefined;
        channel_id: string;
        session_id: string;
        nonce: string | undefined;
        data: any;
    }>;
    protected commandData(name: CommandName, options?: any[], attachments?: any[]): Promise<{
        version: any;
        id: any;
        name: any;
        type: any;
        options: any[];
        application_command: any;
        attachments: any[];
    }>;
    protected data2Paylod(data: any, nonce?: string): {
        type: number;
        application_id: string | undefined;
        guild_id: string | undefined;
        channel_id: string;
        session_id: string;
        nonce: string | undefined;
        data: any;
    };
}
export {};
