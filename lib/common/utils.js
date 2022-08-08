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
                        stsToken: credentials === null || credentials === void 0 ? void 0 : credentials.SecurityToken,
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
                        region: application.RegionId,
                        console: "https://sae.console.aliyun.com/#/AppList/AppDetail?appId=" + appId + "&regionId=" + application.RegionId + "&namespaceId=" + application.NamespaceId,
                        namespace: {
                            id: appConfig.NamespaceId,
                            name: namespace.NamespaceName,
                        },
                        vpcConfig: {
                            vpcId: appConfig.VpcId,
                            vSwitchId: appConfig.VSwitchId,
                            securityGroupId: appConfig.SecurityGroupId,
                        },
                        application: {
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
                region: applicationObject.region,
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
                    appId: applicationObject.AppId,
                    appName: applicationObject.name,
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
function handleEnv(inputs, application, credentials, resource) {
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
                    resource.namespaceId = namespace.id;
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
function handleCode(region, application, credentials, resource) {
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
                    resource.oss = {
                        bucket: codePackage.bucket.name,
                        region: codePackage.bucket.region,
                        file: tempObject,
                    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsOERBQWdEO0FBQ2hELElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUM5QiwwQ0FBcUI7QUFDckIsb0RBQThCO0FBRTlCLG1DQUF3QztBQUN4QyxpREFBNkQ7QUFDN0Qsd0RBQThCO0FBRTlCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7QUFHL0IsU0FBZSxVQUFVLENBQUMsV0FBZ0IsRUFBRSxXQUFnRSxFQUFFLE1BQWMsRUFBRSxJQUFZOzs7Ozs7b0JBQ2hJLFNBQVMsR0FBZTt3QkFDMUIsV0FBVyxFQUFFLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxXQUFXO3dCQUNyQyxlQUFlLEVBQUUsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLGVBQWU7d0JBQzdDLGFBQWEsRUFBRSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsYUFBYTt3QkFDekMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSTt3QkFDL0IsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTTt3QkFDakMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO3dCQUN0QixNQUFNLEVBQUUsTUFBTTt3QkFDZCxJQUFJLEVBQUUsSUFBSTtxQkFDYixDQUFDO29CQUNGLHFCQUFNLHFCQUFHLENBQUMsU0FBUyxDQUFDLEVBQUE7O29CQUFwQixTQUFvQixDQUFDOzs7OztDQUN4QjtBQUVEOzs7O0dBSUc7QUFDSCxTQUFzQixXQUFXLENBQUMsR0FBUSxFQUFFLEtBQWE7Ozs7O3dCQUN4QyxxQkFBTSxnQkFBTSxDQUFD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