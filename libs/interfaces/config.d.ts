import WebSocket from "isomorphic-ws";
export type FetchFn = typeof fetch;
export type WebSocketCl = typeof WebSocket;
export interface MJConfig {
    ChannelId: string;
    SalaiToken: string;
    Debug: boolean;
    Limit: number;
    MaxWait: number;
    SessionId: string;
    ServerId?: string;
    ApplicationId?: string;
    Ws?: boolean;
    HuggingFaceToken?: string;
    DiscordBaseUrl: string;
    WsBaseUrl: string;
    fetch: FetchFn;
    WebSocket: WebSocketCl;
}
export interface MJConfigParam {
    SalaiToken: string;
    ChannelId?: string;
    Debug?: boolean;
    Limit?: number;
    MaxWait?: number;
    Ws?: boolean;
    HuggingFaceToken?: string;
    ServerId?: string;
    ApplicationId?: string;
    SessionId?: string;
    DiscordBaseUrl?: string;
    WsBaseUrl?: string;
    fetch?: FetchFn;
    WebSocket?: WebSocketCl;
}
export declare const DefaultMJConfig: MJConfig;
