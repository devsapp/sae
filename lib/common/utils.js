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
exports.setDefault = exports.handleCode = exports.handleEnv = exports.output = exports.infoRes = exports.getStatusByOrderId = exports.checkStatus = exports.deleteOssFile = void 0;
var core = __importStar(require("@serverless-devs/core"));
var oss_service_1 = __importDefault(require("./oss.service"));
var OSS = require('ali-oss');
var fs_1 = __importDefault(require("fs"));
var client_1 = __importDefault(require("./client"));
var client_2 = require("./client");
function uploadFile(credentials, codePackage, object, type) {
    return __awaiter(this, void 0, void 0, function () {
        var ossConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ossConfig = {
                        accessKeyId: credentials.AccessKeyID,
                        accessKeySecret: credentials.AccessKeySecret,
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
function deleteFile(credentials, name, region, fileName) {
    return __awaiter(this, void 0, void 0, function () {
        var client, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new OSS({
                        region: "oss-" + region,
                        accessKeyId: credentials.AccessKeyID,
                        accessKeySecret: credentials.AccessKeySecret,
                        bucket: name,
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
function deleteOssFile(region, application, credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var codePackage, AccountID, fileName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    codePackage = application.code.package;
                    AccountID = credentials.AccountID;
                    return [4 /*yield*/, getPackageStruct(codePackage, region, AccountID)];
                case 1:
                    codePackage = _a.sent();
                    if (codePackage.path.startsWith("http://") || codePackage.path.startsWith("https://")) {
                        return [2 /*return*/, 0];
                    }
                    fileName = "sae-" + application.name + "-" + codePackage.path;
                    return [4 /*yield*/, deleteFile(credentials, codePackage.bucket.name, codePackage.bucket.region, fileName)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteOssFile = deleteOssFile;
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
                    if (slbConfig["Data"]['InternetIp']) {
                        result.slb.InternetIp = slbConfig["Data"]['InternetIp'];
                    }
                    if (slbConfig["Data"]['IntranetSlbId']) {
                        result.slb.IntranetSlbId = slbConfig["Data"]['IntranetSlbId'];
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
            if (slbConfig["Data"]['InternetIp']) {
                result.slb.InternetIp = slbConfig["Data"]['InternetIp'];
            }
            if (slbConfig["Data"]['IntranetSlbId']) {
                result.slb.IntranetSlbId = slbConfig["Data"]['IntranetSlbId'];
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
                    return [4 /*yield*/, client_2.vpcAvailable(vpcConfig.vpcId, region, credentials.AccessKeyID, credentials.AccessKeySecret)];
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
        var key, Key;
        return __generator(this, function (_a) {
            applicationObject.Cpu = applicationObject.cpu ? applicationObject.cpu : 500;
            applicationObject.Memory = applicationObject.memory ? applicationObject.memory : 1024;
            applicationObject.Replicas = applicationObject.Replicas ? applicationObject.replicas : 1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsOERBQWdEO0FBQ2hELElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUM5QiwwQ0FBcUI7QUFDckIsb0RBQThCO0FBRTlCLG1DQUF3QztBQUV4QyxTQUFlLFVBQVUsQ0FBQyxXQUF3RCxFQUFFLFdBQWdFLEVBQUUsTUFBYyxFQUFFLElBQVk7Ozs7OztvQkFDeEssU0FBUyxHQUFlO3dCQUMxQixXQUFXLEVBQUUsV0FBVyxDQUFDLFdBQVc7d0JBQ3BDLGVBQWUsRUFBRSxXQUFXLENBQUMsZUFBZTt3QkFDNUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSTt3QkFDL0IsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTTt3QkFDakMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO3dCQUN0QixNQUFNLEVBQUUsTUFBTTt3QkFDZCxJQUFJLEVBQUUsSUFBSTtxQkFDYixDQUFDO29CQUNGLHFCQUFNLHFCQUFHLENBQUMsU0FBUyxDQUFDLEVBQUE7O29CQUFwQixTQUFvQixDQUFDOzs7OztDQUN4QjtBQUVELFNBQWUsVUFBVSxDQUFDLFdBQXdELEVBQUUsSUFBWSxFQUFFLE1BQWMsRUFBRSxRQUFnQjs7Ozs7O29CQUN4SCxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUM7d0JBQ25CLE1BQU0sRUFBRSxTQUFPLE1BQVE7d0JBQ3ZCLFdBQVcsRUFBRSxXQUFXLENBQUMsV0FBVzt3QkFDcEMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxlQUFlO3dCQUM1QyxNQUFNLEVBQUUsSUFBSTtxQkFDZixDQUFDLENBQUM7Ozs7b0JBRUMscUJBQU0s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