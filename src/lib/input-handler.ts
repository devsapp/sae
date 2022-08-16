import * as core from '@serverless-devs/core';
import { cpuLimit, memoryLimit } from './help/constant';
const { lodash } = core;

export async function checkInputs(inputs: any) {
    let { application, slb } = inputs['props'];
    if (!application.port) {
        throw new core.CatchableError('port 为必填项.');
    }
    if (lodash.isEmpty(slb)) {
        throw new core.CatchableError('slb 为必填项.');
    }
    const { code } = application;
    if (lodash.isEmpty(code)) {
        throw new core.CatchableError("未指定部署的代码");
    }
}
export async function parseCommand(args: string) {
    // @ts-ignore
    const comParse: any = core.commandParse({ args });
    const data = comParse?.data
    if (lodash.isEmpty(data)) {
        return {};
    }
    const isHelp = data.h || data.help;
    const useLocal = data['use-local'];
    const useRemote = data['use-remote'];
    return { isHelp, useLocal, useRemote };
}

export async function handlerSyncInputs(args: string) {
    const comParse: any = core.commandParse({ args });
    const data = comParse?.data
    if (lodash.isEmpty(data)) {
        return {};
    }
    const isHelp = data.h || data.help;
    const appName = data['application-name'];
    return { isHelp, appName };
}

export async function handlerReScaleInputs(args: string) {
    const comParse: any = core.commandParse({ args });
    const data = comParse?.data;
    if (lodash.isEmpty(data)) {
        throw new core.CatchableError('未指定replicas参数')
    }
    const isHelp = data.h || data.help;
    const replicas = data.replicas;
    const appName = data['application-name'];
    if (!isHelp && !(Number.isInteger(replicas) && replicas > 0)) {
        throw new core.CatchableError('需要指定正确的replicas参数')
    }
    return { isHelp, replicas, appName };
}

export async function handlerStartInputs(args: string) {
    const comParse: any = core.commandParse({ args });
    const data = comParse?.data
    if (lodash.isEmpty(data)) {
        return {};
    }
    const isHelp = data.h || data.help;
    const assumeYes = data.y || data['assume-yes'];
    const appName = data['application-name'];
    return { isHelp, assumeYes, appName };
}

export async function handlerStopInputs(args: string) {
    const comParse: any = core.commandParse({ args });
    const data = comParse?.data
    if (lodash.isEmpty(data)) {
        return {};
    }
    const isHelp = data.h || data.help;
    const assumeYes = data.y || data['assume-yes'];
    const appName = data['application-name'];
    return { isHelp, assumeYes, appName };
}

export async function handlerInfoInputs(args: string) {
    // @ts-ignore
    const comParse: any = core.commandParse({ args });
    const data = comParse?.data
    if (lodash.isEmpty(data)) {
        return {};
    }
    const isHelp = data.h || data.help;
    const outputFile = data['output'];
    const appName = data['application-name'];
    return { isHelp, outputFile, appName };
}

export async function handlerRmInputs(args: string) {
    const comParse: any = core.commandParse({ args });
    const data = comParse?.data
    if (lodash.isEmpty(data)) {
        return {};
    }
    const isHelp = data.h || data.help;
    const assumeYes = data.y || data['assume-yes'];
    const appName = data['application-name'];
    return { isHelp, assumeYes, appName };
}


export async function setDefault(applicationObject: any) {
    // 检查参数合法性
    /**
     * CPU，单位为毫核，不能为0。目前仅支持以下固定规格：500、1000、2000、4000、8000、16000、32000
     * 内存，单位为MB，不能为0。与CPU为一一对应关系，目前仅支持以下固定规格：
            1024：对应CPU为500毫核和1000毫核。
            2048：对应CPU为500、1000毫核和2000毫核。
            4096：对应CPU为1000、2000毫核和4000毫核。
            8192：对应CPU为2000、4000毫核和8000毫核。
            12288：对应CPU为12000毫核。
            16384：对应CPU为4000、8000毫核和16000毫核。
            24576：对应CPU为12000毫核。
            32768：对应CPU为16000毫核。
            65536：对应CPU为8000、16000和32000毫核。
            131072：对应CPU为32000毫核。
        初始实例数：整数
     */
    if (applicationObject.cpu) {
        if (cpuLimit.indexOf(applicationObject.cpu) === -1) {
            throw new core.CatchableError('cpu仅支持以下固定规格：500、1000、2000、4000、8000、16000、32000');
        }
        applicationObject.Cpu = applicationObject.cpu;
    } else {
        applicationObject.Cpu = 500;
    }
    if (applicationObject.memory) {
        const arr = memoryLimit.get(applicationObject.Cpu);
        if (arr.indexOf(applicationObject.memory) === -1) {
            throw new core.CatchableError(`cpu取值为${applicationObject.Cpu}时，memory仅支持以下固定规格：${arr}`);
        }
        applicationObject.Memory = applicationObject.memory;
    } else {
        applicationObject.Memory = memoryLimit.get(applicationObject.Cpu)[0];
    }
    if (applicationObject.replicas) {
        if (Number.isInteger(applicationObject.replicas) && applicationObject.replicas > 0) {
            applicationObject.Replicas = applicationObject.replicas;
        } else {
            throw new core.CatchableError('replicas的值需要是正整数');
        }
    } else {
        applicationObject.Replicas = 1;
    }
    // 参数命名方式修改
    for (var key in applicationObject) {
        if (!applicationObject[key]) {
            delete (applicationObject[key]);
        } else if (/^[a-z].*$/.test(key)) {
            let Key = key.replace(key[0], key[0].toUpperCase());
            applicationObject[Key] = applicationObject[key];
            delete (applicationObject[key]);
        }
    }
}
