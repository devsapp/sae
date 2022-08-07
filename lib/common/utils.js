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
function uploadFile(credentials, codePackage, object, type) {
    return __awaiter(this, void 0, void 0, function () {
        var ossConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ossConfig = {
                        accessKeyId: credentials === null || credentials === void 0 ? void 0 : credentials.AccessKeyID,
                        accessKeySecret: credentials === null || credentials === void 0 ? void 0 : credentials.AccessKeySecret,
                        securityToken: credentials === null || credentials === void 0 ? void 0 : credentials.SecurityToken,
                        bucket: codePackage.bucket.name,
                        region: codePackage.bucket.region,
                        file: codePackage.path,
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
function deleteFile(credentials, bucket, fileName) {
    return __awaiter(this, void 0, void 0, function () {
        var client, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new OSS({
                        region: "oss-" + bucket.region,
                        accessKeyId: credentials === null || credentials === void 0 ? void 0 : credentials.AccessKeyID,
                        accessKeySecret: credentials === null || credentials === void 0 ? void 0 : credentials.AccessKeySecret,
                        securityToken: credentials === null || credentials === void 0 ? void 0 : credentials.SecurityToken,
                        bucket: bucket.name,
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.delete(fileName)];
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
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var codePackage, AccountID, fileName, bucket, fileAddr;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    codePackage = (_a = application === null || application === void 0 ? void 0 : application.code) === null || _a === void 0 ? void 0 : _a.package;
                    if (!codePackage) {
                        return [2 /*return*/, {}];
                    }
                    AccountID = credentials.AccountID;
                    return [4 /*yield*/, getPackageStruct(codePackage, region, AccountID)];
                case 1:
                    codePackage = _b.sent();
                    if (codePackage.path.startsWith("http://") || codePackage.path.startsWith("https://")) {
                        return [2 /*return*/, {}];
                    }
                    fileName = "sae-" + application.name + "-" + codePackage.path;
                    bucket = codePackage.bucket;
                    fileAddr = "https://" + codePackage.bucket.name + ".oss-" + codePackage.bucket.region + ".aliyuncs.com/" + fileName;
                    return [2 /*return*/, { fileName: fileName, bucket: bucket, fileAddr: fileAddr }];
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
        var appId, slbConfig, data, appConfig, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appId = application.AppId;
                    return [4 /*yield*/, client_1.default.saeClient.getSLB(appId)];
                case 1:
                    slbConfig = _a.sent();
                    return [4 /*yield*/, client_1.default.saeClient.describeApplicationConfig(appId)];
                case 2:
                    data = _a.sent();
                    appConfig = data['Data'];
                    result = {
                        console: "https://sae.console.aliyun.com/#/AppList/AppDetail?appId=" + appId + "&regionId=" + application.RegionId + "&namespaceId=" + application.NamespaceId,
                        namespace: {
                            id: appConfig.NamespaceId,
                        },
                        vpcConfig: {
                            vpcId: appConfig.VpcId,
                            vSwitchId: appConfig.VSwitchId,
                            securityGroupId: appConfig.SecurityGroupId,
                        },
                        application: {
                            name: application.AppName,
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
                console: "https://sae.console.aliyun.com/#/AppList/AppDetail?appId=" + applicationObject.AppId + "&regionId=" + applicationObject.region + "&namespaceId=" + applicationObject.NamespaceId,
                namespace: {
                    id: applicationObject.NamespaceId,
                    name: applicationObject.NamespaceName,
                },
                vpcConfig: {
                    vpcId: applicationObject.VpcId,
                    vSwitchId: applicationObject.VSwitchId,
                    securityGroupId: applicationObject.SecurityGroupId,
                },
                application: {
                    id: applicationObject.AppId,
                    name: applicationObject.name,
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
function handleEnv(inputs, application, credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, region, namespace, vpcConfig, slb, autoConfig, vpcAvail, defaultNamespace, defaultNamespace, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = inputs.props, region = _a.region, namespace = _a.namespace, vpcConfig = _a.vpcConfig, slb = _a.slb;
                    autoConfig = false;
                    if (!vpcConfig) return [3 /*break*/, 2];
                    return [4 /*yield*/, client_2.vpcAvailable(vpcConfig.vpcId, region, credentials)];
                case 1:
                    vpcAvail = _b.sent();
                    if (!vpcAvail) {
                        throw new core.CatchableError('vpc配置不可用');
                    }
                    _b.label = 2;
                case 2:
                    if (!(!namespace && !vpcConfig)) return [3 /*break*/, 4];
                    // 自动配置
                    autoConfig = true;
                    return [4 /*yield*/, client_1.default.saeClient.getNamespace()];
                case 3:
                    defaultNamespace = _b.sent();
                    namespace = {
                        id: defaultNamespace.NamespaceId,
                        name: defaultNamespace.NamespaceName,
                    };
                    vpcConfig = {
                        vpcId: defaultNamespace.VpcId,
                        vSwitchId: defaultNamespace.VSwitchId,
                        securityGroupId: defaultNamespace.SecurityGroupId,
                    };
                    return [3 /*break*/, 14];
                case 4:
                    if (!(!namespace && vpcConfig)) return [3 /*break*/, 7];
                    return [4 /*yield*/, client_1.default.saeClient.getNamespace()];
                case 5:
                    defaultNamespace = _b.sent();
                    namespace = {
                        id: defaultNamespace.NamespaceId,
                        name: defaultNamespace.NamespaceName,
                    };
                    return [4 /*yield*/, client_1.default.saeClient.updateNamespaceVpc(namespace.id, vpcConfig.vpcId)];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 14];
                case 7:
                    if (!(namespace && !vpcConfig)) return [3 /*break*/, 8];
                    throw new core.CatchableError("The specified parameter 'vpcConfig' is invalid.");
                case 8:
                    _b.trys.push([8, 10, , 14]);
                    return [4 /*yield*/, client_1.default.saeClient.createNamespace(namespace)];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 14];
                case 10:
                    e_4 = _b.sent();
                    if (!e_4.message.includes('The specified namespace ID already exists')) return [3 /*break*/, 12];
                    // The specified namespace ID already exists
                    return [4 /*yield*/, client_1.default.saeClient.updateNamespace(namespace)];
                case 11:
                    // The specified namespace ID already exists
                    _b.sent();
                    return [3 /*break*/, 13];
                case 12: throw e_4;
                case 13: return [3 /*break*/, 14];
                case 14:
                    application.AutoConfig = autoConfig;
                    application.AppName = application.name;
                    application.AppDescription = application.decription;
                    application.NamespaceId = namespace.id;
                    application.NamespaceName = namespace.name;
                    application.VpcId = vpcConfig.vpcId;
                    application.VSwitchId = vpcConfig.vSwitchId;
                    application.SecurityGroupId = vpcConfig.securityGroupId;
                    application.region = region;
                    // slb
                    if (application.port) {
                        slb = {
                            Internet: [{ "port": 80, "targetPort": application.port, "protocol": "HTTP" }]
                        };
                    }
                    return [2 /*return*/, { namespace: namespace, slb: slb }];
            }
        });
    });
}
exports.handleEnv = handleEnv;
function getPackageStruct(codePackage, region, AccountID) {
    return __awaiter(this, void 0, void 0, function () {
        var codeBucket;
        return __generator(this, function (_a) {
            if (typeof codePackage == 'string') {
                codePackage = {
                    path: codePackage,
                    bucket: {
                        region: region,
                        name: "sae-packages-" + region + "-" + AccountID
                    }
                };
            }
            else {
                if (!codePackage.path) {
                    throw new core.CatchableError("未能找到iamge/package，请确定参数传递正确");
                }
                codeBucket = codePackage.bucket || {};
                codeBucket.region = codeBucket.region || region;
                codeBucket.name = codeBucket.name || "sae-packages-" + region + "-" + AccountID;
                codePackage.bucket = codeBucket;
            }
            return [2 /*return*/, codePackage];
        });
    });
}
function handleCode(region, application, credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var AccountID, applicationObject, code, image, codePackage, tempObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    AccountID = credentials.AccountID;
                    applicationObject = JSON.parse(JSON.stringify(application));
                    delete applicationObject.code;
                    // 对code进行处理
                    if (!application.code) {
                        throw new core.CatchableError("未指定部署的代码");
                    }
                    code = application.code;
                    image = code.image;
                    codePackage = code.package;
                    if (!image) return [3 /*break*/, 1];
                    if (code.type === 'php') {
                        applicationObject.PackageType = 'IMAGE_PHP_7_3';
                    }
                    else {
                        applicationObject.PackageType = 'Image';
                    }
                    applicationObject.ImageUrl = image;
                    return [3 /*break*/, 10];
                case 1:
                    if (!codePackage) return [3 /*break*/, 9];
                    return [4 /*yield*/, getPackageStruct(codePackage, region, AccountID)];
                case 2:
                    codePackage = _a.sent();
                    if (!(codePackage.path.endsWith('.war') || codePackage.path.endsWith('.jar') || codePackage.path.endsWith('.zip'))) return [3 /*break*/, 7];
                    tempObject = "sae-" + application.name + "-" + codePackage.path;
                    if (codePackage.path.endsWith('.war')) {
                        applicationObject.PackageType = 'War';
                        applicationObject.WebContainer = 'apache-tomcat-8.5.42';
                        applicationObject.Jdk = 'Open JDK 8';
                        // applicationObject.PackageVersion = '1.0.0';
                    }
                    else if (codePackage.path.endsWith('.jar')) {
                        applicationObject.PackageType = 'FatJar';
                        applicationObject.Jdk = 'Open JDK 8';
                        // applicationObject.PackageVersion = '1.0.0';
                    }
                    else if (codePackage.path.endsWith('.zip')) {
                        applicationObject.PackageType = 'PhpZip';
                        applicationObject.PhpArmsConfigLocation = '/usr/local/etc/php/conf.d/arms.ini';
                        applicationObject.Php = 'PHP-FPM 7.3';
                    }
                    return [4 /*yield*/, fs_1.default.existsSync(codePackage.path)];
                case 3:
                    if (!_a.sent()) return [3 /*break*/, 5];
                    return [4 /*yield*/, uploadFile(credentials, codePackage, tempObject, 'upload')];
                case 4:
                    _a.sent();
                    applicationObject.PackageUrl = "https://" + codePackage.bucket.name + ".oss-" + codePackage.bucket.region + ".aliyuncs.com/" + tempObject;
                    return [3 /*break*/, 6];
                case 5:
                    if (codePackage.path.startsWith("http://") || codePackage.path.startsWith("https://")) {
                        applicationObject.PackageUrl = codePackage.path;
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
            isHelp = (data === null || data === void 0 ? void 0 : data.h) || (data === null || data === void 0 ? void 0 : data.help);
            assumeYes = data.y || data['assume-yes'];
            console.log(data);
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
                    if (file === null || file === void 0 ? void 0 : file.fileName) {
                        header3 = [{
                                value: "fileName",
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
                                fileName: file.fileName,
                                bucketName: file.bucket.name,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsOERBQWdEO0FBQ2hELElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUM5QiwwQ0FBcUI7QUFDckIsb0RBQThCO0FBRTlCLG1DQUF3QztBQUN4QyxpREFBNkQ7QUFDN0Qsd0RBQThCO0FBQzlCLHNEQUFnQztBQUVoQyxTQUFlLFVBQVUsQ0FBQyxXQUFnQixFQUFFLFdBQWdFLEVBQUUsTUFBYyxFQUFFLElBQVk7Ozs7OztvQkFDaEksU0FBUyxHQUFlO3dCQUMxQixXQUFXLEVBQUUsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLFdBQVc7d0JBQ3JDLGVBQWUsRUFBRSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsZUFBZTt3QkFDN0MsYUFBYSxFQUFFLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxhQUFhO3dCQUN6QyxNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJO3dCQUMvQixNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNO3dCQUNqQyxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUk7d0JBQ3RCLE1BQU0sRUFBRSxNQUFNO3dCQUNkLElBQUksRUFBRSxJQUFJO3FCQUNiLENBQUM7b0JBQ0YscUJBQU0scUJBQUcsQ0FBQyxTQUFTLENBQUMsRUFBQTs7b0JBQXBCLFNBQW9CLENBQUM7Ozs7O0NBQ3hCO0FBRUQ7Ozs7R0FJRztBQUNILFNBQXNCLFdBQVcsQ0FBQyxHQUFRLEVBQUUsS0FBYTs7Ozs7d0JBQ3hDLHFCQUFNLGdCQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENB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