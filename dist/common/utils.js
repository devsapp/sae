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
exports.removePlan = exports.promptForConfirmOrDetails = exports.handlerRmInputs = exports.handlerInfoInputs = exports.parseCommand = exports.setDefault = exports.handleCode = exports.handleEnv = exports.output = exports.infoRes = exports.getStatusByOrderId = exports.checkStatus = exports.file2delete = exports.deleteFile = exports.needBindSlb = void 0;
var core = __importStar(require("@serverless-devs/core"));
var oss_service_1 = __importDefault(require("./oss.service"));
var OSS = require('ali-oss');
var fs_1 = __importDefault(require("fs"));
var client_1 = __importDefault(require("./client"));
var client_2 = require("./client");
var constant_1 = require("../lib/help/constant");
var tty_table_1 = __importDefault(require("tty-table"));
var inquirer = core.inquirer;
function uploadFile(credentials, bucketName, region, packageUrl, object, type) {
    return __awaiter(this, void 0, void 0, function () {
        var ossConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ossConfig = {
                        accessKeyId: credentials === null || credentials === void 0 ? void 0 : credentials.AccessKeyID,
                        accessKeySecret: credentials === null || credentials === void 0 ? void 0 : credentials.AccessKeySecret,
                        securityToken: credentials === null || credentials === void 0 ? void 0 : credentials.SecurityToken,
                        bucket: bucketName,
                        region: region,
                        file: packageUrl,
                        object: object,
                        type: type,
                    };
                    return [4 /*yield*/, oss_service_1.default(ossConfig)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
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
function deleteFile(credentials, region, bucketName, filename) {
    return __awaiter(this, void 0, void 0, function () {
        var client, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new OSS({
                        region: "oss-" + region,
                        accessKeyId: credentials === null || credentials === void 0 ? void 0 : credentials.AccessKeyID,
                        accessKeySecret: credentials === null || credentials === void 0 ? void 0 : credentials.AccessKeySecret,
                        stsToken: credentials === null || credentials === void 0 ? void 0 : credentials.SecurityToken,
                        bucket: bucketName,
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.delete(filename)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteFile = deleteFile;
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
                    return [4 /*yield*/, getBucketName(application.code.ossConfig, region, AccountID)];
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
exports.checkStatus = checkStatus;
function getStatusByOrderId(orderId) {
    return __awaiter(this, void 0, void 0, function () {
        var status, tempResult, tempStatus, e_3;
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
                    e_3 = _a.sent();
                    throw e_3;
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
                    return [4 /*yield*/, client_2.vpcAvailable(vpcId, region, credentials)];
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
                    return [4 /*yield*/, client_1.default.saeClient.updateNamespaceVpc(namespaceId, vpcId)];
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
function getBucketName(ossConfig, region, AccountID) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!ossConfig || ossConfig === 'auto') {
                return [2 /*return*/, "sae-packages-" + region + "-" + AccountID];
            }
            else {
                return [2 /*return*/, ossConfig];
            }
            return [2 /*return*/];
        });
    });
}
function handleCode(application, credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var AccountID, region, applicationObject, code, bucketName, filename;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    AccountID = credentials.AccountID;
                    region = application.region;
                    applicationObject = JSON.parse(JSON.stringify(application));
                    delete applicationObject.code;
                    // 对code进行处理
                    if (!application.code) {
                        throw new core.CatchableError("未指定部署的代码");
                    }
                    code = application.code;
                    applicationObject.packageType = code.packageType;
                    if (!code.imageUrl) return [3 /*break*/, 1];
                    applicationObject.imageUrl = code.imageUrl;
                    return [3 /*break*/, 10];
                case 1:
                    if (!code.packageUrl) return [3 /*break*/, 9];
                    return [4 /*yield*/, getBucketName(code.ossConfig, region, AccountID)];
                case 2:
                    bucketName = _a.sent();
                    if (!(code.packageUrl.endsWith('.war') || code.packageUrl.endsWith('.jar') || code.packageUrl.endsWith('.zip'))) return [3 /*break*/, 7];
                    filename = application.appName;
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
                    return [4 /*yield*/, fs_1.default.existsSync(code.packageUrl)];
                case 3:
                    if (!_a.sent()) return [3 /*break*/, 5];
                    return [4 /*yield*/, uploadFile(credentials, bucketName, region, code.packageUrl, filename, 'upload')];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsOERBQWdEO0FBQ2hELElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUM5QiwwQ0FBcUI7QUFDckIsb0RBQThCO0FBRTlCLG1DQUF3QztBQUN4QyxpREFBNkQ7QUFDN0Qsd0RBQThCO0FBRTlCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7QUFHL0IsU0FBZSxVQUFVLENBQUMsV0FBZ0IsRUFBRSxVQUFrQixFQUFFLE1BQWMsRUFBRSxVQUFrQixFQUFFLE1BQWMsRUFBRSxJQUFZOzs7Ozs7b0JBQ3RILFNBQVMsR0FBZTt3QkFDMUIsV0FBVyxFQUFFLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxXQUFXO3dCQUNyQyxlQUFlLEVBQUUsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLGVBQWU7d0JBQzdDLGFBQWEsRUFBRSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsYUFBYTt3QkFDekMsTUFBTSxFQUFFLFVBQVU7d0JBQ2xCLE1BQU0sRUFBRSxNQUFNO3dCQUNkLElBQUksRUFBRSxVQUFVO3dCQUNoQixNQUFNLEVBQUUsTUFBTTt3QkFDZCxJQUFJLEVBQUUsSUFBSTtxQkFDYixDQUFDO29CQUNGLHFCQUFNLHFCQUFHLENBQUMsU0FBUyxDQUFDLEVBQUE7O29CQUFwQixTQUFvQixDQUFDOzs7OztDQUN4QjtBQUVEOzs7O0dBSUc7QUFDSCxTQUFzQixXQUFXLENBQUMsR0FBUSxFQUFFLEtBQWE7Ozs7O3dCQUN4QyxxQkFBTSxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFD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