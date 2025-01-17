import { MJOptions } from "../interfaces";
export declare const sleep: (ms: number) => Promise<void>;
export declare const random: (min: number, max: number) => number;
export declare const nextNonce: () => string;
export declare const formatOptions: (components: any) => MJOptions[];
