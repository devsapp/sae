export declare const configInquire: {
    type: string;
    name: string;
    message: string;
    choices: {
        name: string;
    }[];
}[];
export declare const cpuLimit: number[];
export declare const memoryLimit: Map<number, number[]>;
export declare const globalParams: {
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    }[];
};
export declare const globalDescribe: {
    header: string;
    content: {
        desc: string;
    }[];
};
export declare const regionDescribe: {
    name: string;
    description: string;
    defaultOption: boolean;
    type: BooleanConstructor;
};
export declare const applicationNameDescribe: {
    name: string;
    description: string;
    type: StringConstructor;
};
export declare const eventFormat: {
    header: string;
    content: string;
};
