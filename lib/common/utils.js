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
exports.setDefault = exports.handleCode = exports.handleEnv = exports.output = exports.checkStatus = exports.uploadFile = void 0;
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
function output(application, slbConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            result = {
                "namespace": application.namespace,
                "application": {
                    appId: application.appId,
                    name: application.name
                },
                "Console": "https://sae.console.aliyun.com/#/AppList/AppDetail?appId=" + application.appId + "&regionId=" + application.region + "&namespaceId=" + application.namespace.id
            };
            if (slbConfig["Data"]['InternetIp']) {
                result['slb'] = {
                    InternetIp: slbConfig["Data"]['InternetIp']
                };
            }
            if (slbConfig["Data"]['IntranetSlbId']) {
                result['slb'] = result['slb'] ? result['slb'] : {};
                result['slb']['IntranetSlbId'] = slbConfig["Data"]['InternetIp'];
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
        var AccountID, tempObject, applictionObject, code, image, codePackage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    AccountID = credentials.AccountID;
                    tempObject = "sae-" + application.name;
                    applictionObject = JSON.parse(JSON.stringify(application));
                    delete applictionObject.code;
                    // 对code进行处理
                    if (!application.code) {
                        throw new core.CatchableError("未指定部署的代码");
                    }
                    code = application.code;
                    image = code.image;
                    codePackage = code.package;
                    if (!image) return [3 /*break*/, 1];
                    if (code.type === 'php') {
                        applictionObject.PackageType = 'IMAGE_PHP_7_3';
                    }
                    else {
                        applictionObject.PackageType = 'Image';
                    }
                    applictionObject.ImageUrl = image;
                    return [3 /*break*/, 10];
                case 1:
                    if (!codePackage) return [3 /*break*/, 9];
                    return [4 /*yield*/, getPackageStruct(codePackage, region, AccountID)];
                case 2:
                    codePackage = _a.sent();
                    if (!(codePackage.path.endsWith('.war') || codePackage.path.endsWith('.jar') || codePackage.path.endsWith('.zip'))) return [3 /*break*/, 7];
                    if (codePackage.path.endsWith('.war')) {
                        tempObject = tempObject + '.war';
                        applictionObject.PackageType = 'War';
                        applictionObject.WebContainer = 'apache-tomcat-8.5.42';
                        applictionObject.Jdk = 'Open JDK 8';
                        applictionObject.PackageVersion = '	1.0.0';
                    }
                    else if (codePackage.path.endsWith('.jar')) {
                        tempObject = tempObject + '.jar';
                        applictionObject.PackageType = 'FatJar';
                        applictionObject.Jdk = 'Open JDK 8';
                        applictionObject.PackageVersion = '	1.0.0';
                    }
                    else if (codePackage.path.endsWith('.zip')) {
                        tempObject = tempObject + '.zip';
                        applictionObject.PackageType = 'PhpZip';
                        applictionObject.PhpArmsConfigLocation = '/usr/local/etc/php/conf.d/arms.ini';
                        applictionObject.Php = 'PHP-FPM 7.3';
                    }
                    return [4 /*yield*/, fs_1.default.existsSync(codePackage.path)];
                case 3:
                    if (!_a.sent()) return [3 /*break*/, 5];
                    return [4 /*yield*/, uploadFile(credentials, codePackage, tempObject, 'upload')];
                case 4:
                    _a.sent();
                    applictionObject.PackageUrl = "https://" + codePackage.bucket.name + ".oss-" + codePackage.bucket.region + ".aliyuncs.com/" + tempObject;
                    return [3 /*break*/, 6];
                case 5:
                    if (codePackage.path.startsWith("http://") || codePackage.path.startsWith("https://")) {
                        applictionObject.PackageUrl = codePackage.path;
                    }
                    else {
                        throw new core.CatchableError("未能成功找到文件，请确定package的路径正确");
                    }
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7: throw new core.CatchableError("未能找到代码文件，请确定参数传递正确");
                case 8: return [3 /*break*/, 10];
                case 9: throw new core.CatchableError("未能找到iamge/package，请确定参数传递正确");
                case 10: return [2 /*return*/, applictionObject];
            }
        });
    });
}
exports.handleCode = handleCode;
function setDefault(applictionObject) {
    return __awaiter(this, void 0, void 0, function () {
        var key, Key;
        return __generator(this, function (_a) {
            applictionObject.Cpu = applictionObject.cpu ? applictionObject.cpu : 500;
            applictionObject.Memory = applictionObject.memory ? applictionObject.memory : 1024;
            applictionObject.Replicas = applictionObject.Replicas ? applictionObject.replicas : 1;
            // 参数命名方式修改
            for (key in applictionObject) {
                if (/^[a-z].*$/.test(key)) {
                    Key = key.replace(key[0], key[0].toUpperCase());
                    applictionObject[Key] = applictionObject[key];
                }
            }
            return [2 /*return*/];
        });
    });
}
exports.setDefault = setDefault;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsOERBQWdEO0FBQ2hELDBDQUFxQjtBQUVyQixvREFBOEI7QUFFOUIsbUNBQXdDO0FBRXhDLFNBQXNCLFVBQVUsQ0FBQyxXQUF3RCxFQUFFLFdBQWdFLEVBQUUsTUFBYyxFQUFFLElBQVk7Ozs7OztvQkFDL0ssU0FBUyxHQUFlO3dCQUMxQixXQUFXLEVBQUUsV0FBVyxDQUFDLFdBQVc7d0JBQ3BDLGVBQWUsRUFBRSxXQUFXLENBQUMsZUFBZTt3QkFDNUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSTt3QkFDL0IsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTTt3QkFDakMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO3dCQUN0QixNQUFNLEVBQUUsTUFBTTt3QkFDZCxJQUFJLEVBQUUsSUFBSTtxQkFDYixDQUFDO29CQUNGLHFCQUFNLHFCQUFHLENBQUMsU0FBUyxDQUFDLEVBQUE7O29CQUFwQixTQUFvQixDQUFDOzs7OztDQUN4QjtBQVhELGdDQVdDO0FBRUQsU0FBc0IsV0FBVyxDQUFDLEtBQUssRUFBRSxNQUFNOzs7Ozs7b0JBQ3ZDLE1BQU0sR0FBRyxJQUFJLENBQUE7Ozt5QkFDVixNQUFNOzs7O29CQUVjLHFCQUFNLGdCQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBQTs7b0JBQW5FLFVBQVUsR0FBRyxTQUFzRDtvQkFDbkUsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtvQkFDbEUsSUFB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