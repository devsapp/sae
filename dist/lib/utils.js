"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startPlan = exports.stopPlan = exports.removePlan = exports.promptForConfirmOrDetails = exports.handlerRmInputs = exports.handlerInfoInputs = exports.handlerStopInputs = exports.handlerStartInputs = exports.parseCommand = exports.setDefault = exports.handleCode = exports.handleEnv = exports.output = exports.infoRes = exports.getStatusByOrderId = exports.checkStatus = exports.file2delete = exports.needBindSlb = void 0;
var core = __importStar(require("@serverless-devs/core"));
var oss_service_1 = __importDefault(require("./oss.service"));
var client_1 = __importStar(require("./client"));
var constant_1 = require("./help/constant");
var tty_table_1 = __importDefault(require("tty-table"));
var inquirer = core.inquirer, fse = core.fse, lodash = core.lodash;
/**
 * 判断是否需要重新绑定slb
 * @param slb 本地slb
 * @param appId appid
 */
function needBindSlb(slb, appId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, remoteIntranet, remoteInternet, localInternet, localIntranet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.default.saeClient.getSLB(appId)];
                case 1:
                    data = _a.sent();
                    remoteIntranet = data['Data']['Intranet'];
                    remoteInternet = data['Data']['Internet'];
                    localInternet = slb.Internet ? slb.Internet : [];
                    localIntranet = slb.Intranet ? slb.Intranet : [];
                    if (remoteIntranet.length === 0 && remoteInternet.length === 0) {
                        return [2 /*return*/, true];
                    }
                    if ((remoteInternet.length === 0 && localInternet.length > 0) || (remoteInternet.length > 0 && localInternet.length === 0)) {
                        return [2 /*return*/, true];
                    }
                    if ((remoteIntranet.length === 0 && localIntranet.length > 0) || (remoteIntranet.length > 0 && localIntranet.length === 0)) {
                        return [2 /*return*/, true];
                    }
                    if (localIntranet.length > 0 && remoteIntranet[0]['TargetPort'] !== localIntranet[0]['targetPort']) {
                        return [2 /*return*/, true];
                    }
                    if (localInternet.length > 0 && remoteInternet[0]['TargetPort'] !== localInternet[0]['targetPort']) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
exports.needBindSlb = needBindSlb;
function file2delete(region, application, credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var packageUrl, AccountID, bucketName, filename, fileAddr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    packageUrl = application.code.packageUrl;
                    if (!packageUrl) {
                        return [2 /*return*/, {}];
                    }
                    AccountID = credentials.AccountID;
                    if (packageUrl.startsWith("http://") || packageUrl.startsWith("https://")) {
                        return [2 /*return*/, {}];
                    }
                    return [4 /*yield*/, oss_service_1.default.getBucketName(application.code.ossConfig, region, AccountID)];
                case 1:
                    bucketName = _a.sent();
                    filename = application.appName;
                    if (packageUrl.endsWith('.war')) {
                        filename = filename + '.war';
                    }
                    else if (packageUrl.endsWith('.jar')) {
                        filename = filename + '.jar';
                    }
                    else if (packageUrl.endsWith('.zip')) {
                        filename = filename + '.zip';
                    }
                    fileAddr = "https://" + bucketName + ".oss-" + region + ".aliyuncs.com/" + filename;
                    return [2 /*return*/, { filename: filename, bucketName: bucketName, fileAddr: fileAddr }];
            }
        });
    });
}
exports.file2delete = file2delete;
function checkStatus(appId, coType) {
    return __awaiter(this, void 0, void 0, function () {
        var status, tempResult, tempStatus, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    status = true;
                    _a.label = 1;
                case 1:
                    if (!status) return [3 /*break*/, 7];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, client_1.default.saeClient.listChangeOrders(appId, coType)];
                case 3:
                    tempResult = _a.sent();
                    tempStatus = tempResult['Data']['ChangeOrderList'][0].Status;
                    if (tempStatus === 2) {
                        status = false;
                    }
                    else if (tempStatus === 0) {
                        status = true;
                    }
                    else if (tempStatus === 1) {
                        status = true;
                    }
                    else if (tempStatus === 3) {
                        throw new core.CatchableError('应用状态为：执行失败');
                    }
                    else if (tempStatus === 6) {
                        throw new core.CatchableError('应用状态为：终止');
                    }
                    else if (tempStatus === 10) {
                        throw new core.CatchableError('应用状态为：系统异常执行失败');
                    }
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    throw e_1;
                case 5: 
                // 等待1s
                return [4 /*yield*/, new Promise(function (f) { return setTimeout(f, 1000); })];
                case 6:
                    // 等待1s
                    _a.sent();
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.checkStatus = checkStatus;
function getStatusByOrderId(orderId) {
    return __awaiter(this, void 0, void 0, function () {
        var status, tempResult, tempStatus, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    status = true;
                    _a.label = 1;
                case 1:
                    if (!status) return [3 /*break*/, 7];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, client_1.default.saeClient.describeChangeOrder(orderId)];
                case 3:
                    tempResult = _a.sent();
                    tempStatus = tempResult['Data'].Status;
                    if (tempStatus === 2) {
                        status = false;
                    }
                    else if (tempStatus === 0) {
                        status = true;
                    }
                    else if (tempStatus === 1) {
                        status = true;
                    }
                    else if (tempStatus === 3) {
                        throw new core.CatchableError('应用状态为：执行失败');
                    }
                    else if (tempStatus === 6) {
                        throw new core.CatchableError('应用状态为：终止');
                    }
                    else if (tempStatus === 10) {
                        throw new core.CatchableError('应用状态为：系统异常执行失败');
                    }
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    throw e_2;
                case 5: 
                // 等待1s
                return [4 /*yield*/, new Promise(function (f) { return setTimeout(f, 1000); })];
                case 6:
                    // 等待1s
                    _a.sent();
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getStatusByOrderId = getStatusByOrderId;
function infoRes(application) {
    return __awaiter(this, void 0, void 0, function () {
        var appId, slbConfig, data1, appConfig, data2, namespace, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appId = application.AppId;
                    return [4 /*yield*/, client_1.default.saeClient.getSLB(appId)];
                case 1:
                    slbConfig = _a.sent();
                    return [4 /*yield*/, client_1.default.saeClient.describeApplicationConfig(appId)];
                case 2:
                    data1 = _a.sent();
                    appConfig = data1['Data'];
                    return [4 /*yield*/, client_1.default.saeClient.describeNamespace(appConfig.NamespaceId)];
                case 3:
                    data2 = _a.sent();
                    namespace = data2['Data'];
                    result = {
                        console: "https://sae.console.aliyun.com/#/AppList/AppDetail?appId=" + appId + "&regionId=" + application.RegionId + "&namespaceId=" + application.NamespaceId,
                        application: {
                            region: application.RegionId,
                            namespaceId: appConfig.NamespaceId,
                            namespaceName: namespace.NamespaceName,
                            vpcId: appConfig.VpcId,
                            vSwitchId: appConfig.VSwitchId,
                            securityGroupId: appConfig.SecurityGroupId,
                            appId: application.AppId,
                            appName: application.AppName,
                            packageType: application.PackageType,
                            imageUrl: application.ImageUrl,
                            packageUrl: application.PackageUrl,
                            cpu: application.Cpu,
                            memory: application.Memory,
                            replicas: application.Replicas,
                            scaleRuleEnabled: application.ScaleRuleEnabled,
                            instances: application.Instances,
                            appDescription: application.AppDescription,
                            runningInstances: application.RunningInstances,
                            appDeletingStatus: application.AppDeletingStatus,
                        },
                        slb: {}
                    };
                    if (slbConfig['Data']['InternetIp']) {
                        result.slb.InternetIp = slbConfig['Data']['InternetIp'] + ':' + String(slbConfig['Data']['Internet'][0]['Port']);
                    }
                    if (slbConfig['Data']['IntranetIp']) {
                        result.slb.IntranetIp = slbConfig['Data']['IntranetIp'] + ':' + String(slbConfig['Data']['Intranet'][0]['Port']);
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.infoRes = infoRes;
function output(applicationObject, slbConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            result = {
                console: "https://sae.console.aliyun.com/#/AppList/AppDetail?appId=" + applicationObject.AppId + "&regionId=" + applicationObject.Region + "&namespaceId=" + applicationObject.NamespaceId,
                application: {
                    region: applicationObject.Region,
                    namespaceId: applicationObject.NamespaceId,
                    namespaceName: applicationObject.NamespaceName,
                    vpcId: applicationObject.VpcId,
                    vSwitchId: applicationObject.VSwitchId,
                    securityGroupId: applicationObject.SecurityGroupId,
                    appId: applicationObject.AppId,
                    appName: applicationObject.AppName,
                    packageType: applicationObject.PackageType,
                },
                slb: {}
            };
            if (applicationObject.ImageUrl) {
                result.application.imageUrl = applicationObject.ImageUrl;
            }
            if (applicationObject.PackageUrl) {
                result.application.packageUrl = applicationObject.PackageUrl;
            }
            result.application.cpu = applicationObject.Cpu;
            result.application.memory = applicationObject.Memory;
            result.application.replicas = applicationObject.Replicas;
            if (slbConfig['Data']['InternetIp']) {
                result.slb.InternetIp = slbConfig['Data']['InternetIp'];
                result.slb.InternetPort = slbConfig['Data']['Internet'][0]['Port'];
                result.accessLink = result.slb.InternetIp + ':' + String(result.slb.InternetPort);
            }
            if (slbConfig['Data']['IntranetIp']) {
                result.slb.IntranetIp = slbConfig['Data']['IntranetIp'];
                result.slb.IntranetPort = slbConfig['Data']['Intranet'][0]['Port'];
                result.accessLink = result.slb.IntranetIp + ':' + String(result.slb.IntranetPort);
            }
            return [2 /*return*/, result];
        });
    });
}
exports.output = output;
function handleEnv(application, credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var region, namespaceId, vpcId, vpcAvail, defaultNamespace, defaultNamespace, slb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    region = application.region, namespaceId = application.namespaceId, vpcId = application.vpcId;
                    application.autoConfig = false;
                    if (!vpcId) return [3 /*break*/, 2];
                    return [4 /*yield*/, client_1.vpcAvailable(vpcId, region, credentials)];
                case 1:
                    vpcAvail = _a.sent();
                    if (!vpcAvail) {
                        throw new core.CatchableError('vpc配置不可用');
                    }
                    _a.label = 2;
                case 2:
                    if (!(!namespaceId && !vpcId)) return [3 /*break*/, 4];
                    // 自动配置
                    application.autoConfig = true;
                    return [4 /*yield*/, client_1.default.saeClient.getNamespace()];
                case 3:
                    defaultNamespace = _a.sent();
                    application.namespaceId = defaultNamespace.NamespaceId;
                    application.vpcId = defaultNamespace.VpcId;
                    application.vSwitchId = defaultNamespace.VSwitchId;
                    application.securityGroupId = defaultNamespace.SecurityGroupId;
                    return [3 /*break*/, 8];
                case 4:
                    if (!(!namespaceId && vpcId)) return [3 /*break*/, 7];
                    return [4 /*yield*/, client_1.default.saeClient.getNamespace()];
                case 5:
                    defaultNamespace = _a.sent();
                    application.namespaceId = defaultNamespace.NamespaceId;
                    return [4 /*yield*/, client_1.default.saeClient.updateNamespaceVpc(application.namespaceId, vpcId)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    if (namespaceId && !vpcId) {
                        throw new core.CatchableError("The specified parameter 'vpcConfig' is invalid.");
                    }
                    _a.label = 8;
                case 8:
                    // slb
                    if (!application.port) {
                        throw new core.CatchableError("port 为必填项.");
                    }
                    slb = {
                        Internet: [{ "port": 80, "targetPort": application.port, "protocol": "HTTP" }]
                    };
                    return [2 /*return*/, { slb: slb }];
            }
        });
    });
}
exports.handleEnv = handleEnv;
function handleCode(application, credentials, configPath) {
    return __awaiter(this, void 0, void 0, function () {
        var AccountID, region, code, appName, applicationObject, bucketName, filename, ossClient;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    AccountID = credentials.AccountID;
                    region = application.region, code = application.code, appName = application.appName;
                    applicationObject = lodash.cloneDeep(application);
                    delete applicationObject.code;
                    // 对code进行处理
                    if (!code) {
                        throw new core.CatchableError("未指定部署的代码");
                    }
                    applicationObject.packageType = code.packageType;
                    if (!code.imageUrl) return [3 /*break*/, 1];
                    applicationObject.imageUrl = code.imageUrl;
                    return [3 /*break*/, 10];
                case 1:
                    if (!code.packageUrl) return [3 /*break*/, 9];
                    return [4 /*yield*/, oss_service_1.default.getBucketName(code.ossConfig, region, AccountID)];
                case 2:
                    bucketName = _a.sent();
                    if (!(code.packageUrl.endsWith('.war') || code.packageUrl.endsWith('.jar') || code.packageUrl.endsWith('.zip'))) return [3 /*break*/, 7];
                    filename = appName;
                    if (code.packageUrl.endsWith('.war')) {
                        filename = filename + '.war';
                        applicationObject.WebContainer = 'apache-tomcat-8.5.42';
                        applicationObject.Jdk = 'Open JDK 8';
                        applicationObject.packageVersion = code.packageVersion;
                    }
                    else if (code.packageUrl.endsWith('.jar')) {
                        filename = filename + '.jar';
                        applicationObject.Jdk = 'Open JDK 8';
                        applicationObject.packageVersion = code.packageVersion;
                    }
                    else if (code.packageUrl.endsWith('.zip')) {
                        filename = filename + '.zip';
                        applicationObject.PhpArmsConfigLocation = '/usr/local/etc/php/conf.d/arms.ini';
                        applicationObject.Php = 'PHP-FPM 7.3';
                    }
                    return [4 /*yield*/, fse.existsSync(code.packageUrl)];
                case 3:
                    if (!_a.sent()) return [3 /*break*/, 5];
                    ossClient = new oss_service_1.default({ bucket: bucketName, region: region, credentials: credentials });
                    return [4 /*yield*/, ossClient.upload({ file: code.packageUrl, object: filename, type: 'upload' }, { configPath: configPath, appName: appName })];
                case 4:
                    _a.sent();
                    applicationObject.PackageUrl = "https://" + bucketName + ".oss-" + region + ".aliyuncs.com/" + filename;
                    return [3 /*break*/, 6];
                case 5:
                    if (code.packageUrl.startsWith("http://") || code.packageUrl.startsWith("https://")) {
                        applicationObject.PackageUrl = code.packageUrl;
                    }
                    else {
                        throw new core.CatchableError("未能成功找到文件，请确定package的路径正确");
                    }
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7: throw new core.CatchableError("未能找到代码文件，请确定参数传递正确");
                case 8: return [3 /*break*/, 10];
                case 9: throw new core.CatchableError("未能找到iamge/package，请确定参数传递正确");
                case 10: return [2 /*return*/, applicationObject];
            }
        });
    });
}
exports.handleCode = handleCode;
function setDefault(applicationObject) {
    return __awaiter(this, void 0, void 0, function () {
        var arr, key, Key;
        return __generator(this, function (_a) {
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
                if (constant_1.cpuLimit.indexOf(applicationObject.cpu) === -1) {
                    throw new core.CatchableError('cpu仅支持以下固定规格：500、1000、2000、4000、8000、16000、32000');
                }
                applicationObject.Cpu = applicationObject.cpu;
            }
            else {
                applicationObject.Cpu = 500;
            }
            if (applicationObject.memory) {
                arr = constant_1.memoryLimit.get(applicationObject.Cpu);
                if (arr.indexOf(applicationObject.memory) === -1) {
                    throw new core.CatchableError("cpu\u53D6\u503C\u4E3A" + applicationObject.Cpu + "\u65F6\uFF0Cmemory\u4EC5\u652F\u6301\u4EE5\u4E0B\u56FA\u5B9A\u89C4\u683C\uFF1A" + arr);
                }
                applicationObject.Memory = applicationObject.memory;
            }
            else {
                applicationObject.Memory = constant_1.memoryLimit.get(applicationObject.Cpu)[0];
            }
            if (applicationObject.replicas) {
                if (Number.isInteger(applicationObject.replicas) && applicationObject.replicas > 0) {
                    applicationObject.Replicas = applicationObject.replicas;
                }
                else {
                    throw new core.CatchableError('replicas的值需要是正整数');
                }
            }
            else {
                applicationObject.Replicas = 1;
            }
            // 参数命名方式修改
            for (key in applicationObject) {
                if (/^[a-z].*$/.test(key)) {
                    Key = key.replace(key[0], key[0].toUpperCase());
                    applicationObject[Key] = applicationObject[key];
                    delete (applicationObject[key]);
                }
            }
            return [2 /*return*/];
        });
    });
}
exports.setDefault = setDefault;
function parseCommand(args) {
    return __awaiter(this, void 0, void 0, function () {
        var comParse, data, isHelp, useLocal, useRemote;
        return __generator(this, function (_a) {
            comParse = core.commandParse({ args: args });
            data = comParse === null || comParse === void 0 ? void 0 : comParse.data;
            if (!data) {
                return [2 /*return*/, {}];
            }
            isHelp = data.h || data.help;
            useLocal = data['use-local'];
            useRemote = data['use-remote'];
            return [2 /*return*/, { isHelp: isHelp, useLocal: useLocal, useRemote: useRemote }];
        });
    });
}
exports.parseCommand = parseCommand;
function handlerStartInputs(args) {
    return __awaiter(this, void 0, void 0, function () {
        var comParse, data, isHelp, assumeYes;
        return __generator(this, function (_a) {
            comParse = core.commandParse({ args: args });
            data = comParse === null || comParse === void 0 ? void 0 : comParse.data;
            if (!data) {
                return [2 /*return*/, {}];
            }
            isHelp = data.h || data.help;
            assumeYes = data.y || data['assume-yes'];
            return [2 /*return*/, { isHelp: isHelp, assumeYes: assumeYes }];
        });
    });
}
exports.handlerStartInputs = handlerStartInputs;
function handlerStopInputs(args) {
    return __awaiter(this, void 0, void 0, function () {
        var comParse, data, isHelp, assumeYes;
        return __generator(this, function (_a) {
            comParse = core.commandParse({ args: args });
            data = comParse === null || comParse === void 0 ? void 0 : comParse.data;
            if (!data) {
                return [2 /*return*/, {}];
            }
            isHelp = data.h || data.help;
            assumeYes = data.y || data['assume-yes'];
            return [2 /*return*/, { isHelp: isHelp, assumeYes: assumeYes }];
        });
    });
}
exports.handlerStopInputs = handlerStopInputs;
function handlerInfoInputs(args) {
    return __awaiter(this, void 0, void 0, function () {
        var comParse, data, isHelp, outputFile;
        return __generator(this, function (_a) {
            comParse = core.commandParse({ args: args });
            data = comParse === null || comParse === void 0 ? void 0 : comParse.data;
            if (!data) {
                return [2 /*return*/, {}];
            }
            isHelp = data.h || data.help;
            outputFile = data['output'];
            return [2 /*return*/, { isHelp: isHelp, outputFile: outputFile }];
        });
    });
}
exports.handlerInfoInputs = handlerInfoInputs;
function handlerRmInputs(args) {
    return __awaiter(this, void 0, void 0, function () {
        var comParse, data, isHelp, assumeYes;
        return __generator(this, function (_a) {
            comParse = core.commandParse({ args: args });
            data = comParse === null || comParse === void 0 ? void 0 : comParse.data;
            if (!data) {
                return [2 /*return*/, {}];
            }
            isHelp = data.h || data.help;
            assumeYes = data.y || data['assume-yes'];
            return [2 /*return*/, { isHelp: isHelp, assumeYes: assumeYes }];
        });
    });
}
exports.handlerRmInputs = handlerRmInputs;
function promptForConfirmOrDetails(message) {
    return __awaiter(this, void 0, void 0, function () {
        var answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer.prompt([
                        {
                            type: 'list',
                            name: 'prompt',
                            message: message,
                            choices: ['yes', 'no'],
                        },
                    ])];
                case 1:
                    answers = _a.sent();
                    return [2 /*return*/, answers.prompt === 'yes'];
            }
        });
    });
}
exports.promptForConfirmOrDetails = promptForConfirmOrDetails;
// 没有子资源：能够被删除，不作处理。 返回undefined
// 存在子资源选择 no：一定不能被删除，需要退出程序。 返回quit
// 存在子资源选择 yes：需要强制删除所有资源，需要向下传递 assumeYes。  返回assumeYes
function removePlan(application, file) {
    return __awaiter(this, void 0, void 0, function () {
        var header, data, slb, header2, data2, header3, data3, assumeYes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Need to delete the resource in the " + application.RegionId + " area:");
                    header = [{
                            value: "appName",
                            headerColor: "cyan",
                            color: "white",
                            align: "left",
                            width: 40
                        },
                        {
                            value: "description",
                            headerColor: "cyan",
                            color: "white",
                            align: "left",
                            width: 40
                        },
                        {
                            value: "runningInstances",
                            headerColor: "cyan",
                            color: "white",
                            align: "left",
                            width: 40
                        }
                    ];
                    data = [{
                            appName: application.AppName,
                            description: application.AppDescription,
                            runningInstances: application.RunningInstances
                        }
                    ];
                    console.log('\r\napplication:');
                    console.log(tty_table_1.default(header, data).render());
                    return [4 /*yield*/, client_1.default.saeClient.getSLB(application.AppId)];
                case 1:
                    slb = _a.sent();
                    header2 = [{
                            value: "InternetIp",
                            headerColor: "cyan",
                            color: "white",
                            align: "left",
                            width: 40
                        },
                        {
                            value: "IntranetIp",
                            headerColor: "cyan",
                            color: "white",
                            align: "left",
                            width: 40
                        }
                    ];
                    data2 = [{
                            InternetIp: slb['Data']['InternetIp'] ? slb['Data']['InternetIp'] : '',
                            IntranetIp: slb['Data']['IntranetIp'] ? slb['Data']['IntranetIp'] : ''
                        }
                    ];
                    console.log('\r\nslb:');
                    console.log(tty_table_1.default(header2, data2).render());
                    if (file === null || file === void 0 ? void 0 : file.filename) {
                        header3 = [{
                                value: "filename",
                                headerColor: "cyan",
                                color: "white",
                                align: "left",
                                width: 40
                            },
                            {
                                value: "bucketName",
                                headerColor: "cyan",
                                color: "white",
                                align: "left",
                                width: 40
                            },
                            {
                                value: "fileAddr",
                                headerColor: "cyan",
                                color: "white",
                                align: "left",
                                width: 40
                            }
                        ];
                        data3 = [{
                                filename: file.filename,
                                bucketName: file.bucketName,
                                fileAddr: file.fileAddr,
                            }
                        ];
                        console.log('\r\noss:');
                        console.log(tty_table_1.default(header3, data3).render());
                    }
                    return [4 /*yield*/, promptForConfirmOrDetails('Are you sure you want to delete these resources?')];
                case 2:
                    assumeYes = _a.sent();
                    return [2 /*return*/, assumeYes ? 'assumeYes' : 'quit'];
            }
        });
    });
}
exports.removePlan = removePlan;
function stopPlan() {
    return __awaiter(this, void 0, void 0, function () {
        var assumeYes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, promptForConfirmOrDetails('停止应用后，系统将物理删除该应用下所有的实例，业务会中断，资源计费也会停止。但会保存应用的基本配置信息，负载均衡设备信息，方便后续启动应用时秒级拉起应用。（停止再启动应用后实例ip会变）。请确认是否真的要停止应用？')];
                case 1:
                    assumeYes = _a.sent();
                    return [2 /*return*/, assumeYes ? 'assumeYes' : 'quit'];
            }
        });
    });
}
exports.stopPlan = stopPlan;
function startPlan() {
    return __awaiter(this, void 0, void 0, function () {
        var assumeYes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, promptForConfirmOrDetails('启动应用后，系统将根据停止应用前保存的快照配置信息，秒级恢复应用。恢复之后开始进行资源计费，请确认是否真的要启动应用？')];
                case 1:
                    assumeYes = _a.sent();
                    return [2 /*return*/, assumeYes ? 'assumeYes' : 'quit'];
            }
        });
    });
}
exports.startPlan = startPlan;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsOERBQWdDO0FBQ2hDLGlEQUFnRDtBQUVoRCw0Q0FBd0Q7QUFDeEQsd0RBQThCO0FBRXRCLElBQUEsUUFBUSxHQUFrQixJQUFJLFNBQXRCLEVBQUUsR0FBRyxHQUFhLElBQUksSUFBakIsRUFBRSxNQUFNLEdBQUssSUFBSSxPQUFULENBQVU7QUFFdkM7Ozs7R0FJRztBQUNILFNBQXNCLFdBQVcsQ0FBQyxHQUFRLEVBQUUsS0FBYTs7Ozs7d0JBQ3hDLHFCQUFNLGdCQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBQTs7b0JBQTNDLElBQUksR0FBRyxTQUFvQztvQkFDM0MsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDMUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDMUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDakQsYUFBYSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDdkQsSUFBSSxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTt3QkFDNUQsc0JBQU8sSUFBSSxFQUFDO3FCQUNmO29CQUNELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxhQUFhLENB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