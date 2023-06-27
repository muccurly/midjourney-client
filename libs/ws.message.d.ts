import { MJConfig, MJMessage, LoadingHandler, WsEventMsg, MJInfo, MJSettings } from "./interfaces";
import { MidjourneyApi } from "./midjourne.api";
import WebSocket from "isomorphic-ws";
export declare class WsMessage {
    config: MJConfig;
    MJApi: MidjourneyApi;
    ws: WebSocket;
    MJBotId: string;
    private closed;
    private event;
    private waitMjEvents;
    private reconnectTime;
    private heartbeatInterval;
    constructor(config: MJConfig, MJApi: MidjourneyApi);
    private heartbeat;
    close(): void;
    private reconnect;
    private open;
    private auth;
    timeout(ms: number): Promise<unknown>;
    private messageCreate;
    private messageUpdate;
    private processingImage;
    private parseMessage;
    private verifyHuman;
    private EventError;
    private done;
    protected content2progress(content: string): string;
    content2prompt(content: string | undefined): string;
    private filterMessages;
    private getEventByContent;
    private getEventById;
    private updateMjEventIdByNonce;
    uriToHash(uri: string): string;
    protected log(...args: any[]): Promise<void>;
    emit(event: string, message: any): void;
    private emitImage;
    private emitDescribe;
    on(event: string, callback: (message: any) => void): void;
    once(event: string, callback: (message: any) => void): void;
    remove(event: string, callback: (message: any) => void): void;
    removeEvent(event: string): void;
    onceInfo(callback: (message: any) => void): void;
    onceSettings(callback: (message: any) => void): void;
    onceDescribe(nonce: string, callback: (data: any) => void): void;
    onceSwap(nonce: string, callback: (message: any) => void): void;
    removeInfo(callback: (message: any) => void): void;
    private removeWaitMjEvent;
    onceImage(nonce: string, callback: (data: WsEventMsg) => void): void;
    waitImageMessage(nonce: string, loading?: LoadingHandler): Promise<MJMessage | null>;
    waitDescribe(nonce: string): Promise<string[] | null>;
    waitInfo(): Promise<MJInfo | null>;
    waitSwap(nonce: string): Promise<any>;
    waitSettings(): Promise<MJSettings | null>;
    msg2Info(msg: string): MJInfo;
}
