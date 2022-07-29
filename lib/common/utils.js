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
exports.setDefault = exports.handleCode = exports.handleEnv = exports.output = exports.infoRes = exports.checkStatus = exports.uploadFile = void 0;
var core = __importStar(require("@serverless-devs/core"));
var oss_service_1 = __importDefault(require("./oss.service"));
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
exports.uploadFile = uploadFile;
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
        var _a, region, namespace, vpcConfig, slb, autoConfig, vpcAvail, defaultNamespace, defaultNamespace, e_2;
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
                    e_2 = _b.sent();
                    if (!e_2.message.includes('The specified namespace ID already exists')) return [3 /*break*/, 12];
                    // The specified namespace ID already exists
                    return [4 /*yield*/, client_1.default.saeClient.updateNamespace(namespace)];
                case 11:
                    // The specified namespace ID already exists
                    _b.sent();
                    return [3 /*break*/, 13];
                case 12: throw e_2;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsOERBQWdEO0FBQ2hELDBDQUFxQjtBQUNyQixvREFBOEI7QUFFOUIsbUNBQXdDO0FBRXhDLFNBQXNCLFVBQVUsQ0FBQyxXQUF3RCxFQUFFLFdBQWdFLEVBQUUsTUFBYyxFQUFFLElBQVk7Ozs7OztvQkFDL0ssU0FBUyxHQUFlO3dCQUMxQixXQUFXLEVBQUUsV0FBVyxDQUFDLFdBQVc7d0JBQ3BDLGVBQWUsRUFBRSxXQUFXLENBQUMsZUFBZTt3QkFDNUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSTt3QkFDL0IsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTTt3QkFDakMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO3dCQUN0QixNQUFNLEVBQUUsTUFBTTt3QkFDZCxJQUFJLEVBQUUsSUFBSTtxQkFDYixDQUFDO29CQUNGLHFCQUFNLHFCQUFHLENBQUMsU0FBUyxDQUFDLEVBQUE7O29CQUFwQixTQUFvQixDQUFDOzs7OztDQUN4QjtBQVhELGdDQVdDO0FBRUQsU0FBc0IsV0FBVyxDQUFDLEtBQUssRUFBRSxNQUFNOzs7Ozs7b0JBQ3ZDLE1BQU0sR0FBRyxJQUFJLENBQUE7Ozt5QkFDVixNQUFNOzs7O29CQUVjLHFCQUFNLGdCQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBQTs7b0JBQW5FLFVBQVUsR0FBRyxTQUFzRDtvQkFDbkUsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtvQkFDbEUsSUFB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