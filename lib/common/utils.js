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
        var result, codePackage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = {
                        namespace: {
                            id: application.NamespaceId,
                            name: application.NamespaceName,
                        },
                        vpcConfig: {
                            vpcId: application.VpcId,
                            vSwitchId: application.VSwitchId,
                            securityGroupId: application.SecurityGroupId,
                        },
                        application: {
                            name: application.name,
                            console: "https://sae.console.aliyun.com/#/AppList/AppDetail?appId=" + application.NamespaceId + "&regionId=" + application.region + "&namespaceId=" + application.NamespaceId,
                        },
                        slb: {}
                    };
                    if (!application.code.image) return [3 /*break*/, 1];
                    if (application.code.type === 'php') {
                        result.application.packageType = 'IMAGE_PHP_7_3';
                    }
                    else {
                        result.application.packageType = 'Image';
                    }
                    result.application.imageUrl = application.code.image;
                    return [3 /*break*/, 3];
                case 1:
                    if (!application.code.package) return [3 /*break*/, 3];
                    codePackage = application.code.package;
                    return [4 /*yield*/, getPackageStruct(codePackage, application.region, null)];
                case 2:
                    codePackage = _a.sent();
                    if (codePackage.path.endsWith('.war')) {
                        result.application.packageType = 'War';
                    }
                    else if (codePackage.path.endsWith('.jar')) {
                        result.application.packageType = 'FatJar';
                    }
                    else if (codePackage.path.endsWith('.zip')) {
                        result.application.packageType = 'PhpZip';
                    }
                    result.application.packageUrl = codePackage.path;
                    _a.label = 3;
                case 3:
                    result.application.cpu = application.Cpu;
                    result.application.memory = application.Memory;
                    result.application.replicas = application.Replicas;
                    result.slb = application.slb;
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
                    console: "https://sae.console.aliyun.com/#/AppList/AppDetail?appId=" + applicationObject.NamespaceId + "&regionId=" + applicationObject.region + "&namespaceId=" + applicationObject.NamespaceId,
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
                    if (!application.AutoConfig) {
                        if (namespace.id) {
                            application.NamespaceId = namespace.id;
                        }
                        if (vpcConfig) {
                            application.VpcId = vpcConfig.vpcId;
                            application.VSwitchId = vpcConfig.vSwitchId;
                            application.SecurityGroupId = vpcConfig.securityGroupId;
                        }
                    }
                    application.AppName = application.name;
                    application.AppDescription = application.decription;
                    application.NamespaceName = namespace.name;
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