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
exports.setDefault = exports.handleCode = exports.handleEnv = exports.checkStatus = exports.uploadFile = void 0;
var core = __importStar(require("@serverless-devs/core"));
var oss_service_1 = __importDefault(require("./oss.service"));
var fs_1 = __importDefault(require("fs"));
var string_random_1 = __importDefault(require("string-random"));
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
function handleCode(region, application, credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var AccountID, tempObject, applictionObject, code, image, codePackage, codeBucket;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    AccountID = credentials.AccountID;
                    tempObject = string_random_1.default(16);
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
                    applictionObject.PackageType = 'Image';
                    applictionObject.ImageUrl = image;
                    return [3 /*break*/, 9];
                case 1:
                    if (!codePackage) return [3 /*break*/, 8];
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
                    if (!(codePackage.path.endsWith('.war') || codePackage.path.endsWith('.jar'))) return [3 /*break*/, 6];
                    if (codePackage.path.endsWith('.war')) {
                        tempObject = tempObject + '.war';
                        applictionObject.PackageType = 'War';
                        applictionObject.WebContainer = 'apache-tomcat-8.5.42';
                    }
                    else if (codePackage.path.endsWith('.jar')) {
                        tempObject = tempObject + '.jar';
                        applictionObject.PackageType = 'FatJar';
                    }
                    applictionObject.Jdk = 'Open JDK 8';
                    applictionObject.PackageVersion = '	1.0.0';
                    return [4 /*yield*/, fs_1.default.existsSync(codePackage.path)];
                case 2:
                    if (!_a.sent()) return [3 /*break*/, 4];
                    return [4 /*yield*/, uploadFile(credentials, codePackage, tempObject, 'upload')];
                case 3:
                    _a.sent();
                    applictionObject.PackageUrl = "https://" + codePackage.bucket.name + ".oss-" + codePackage.bucket.region + ".aliyuncs.com/" + tempObject;
                    return [3 /*break*/, 5];
                case 4:
                    if (codePackage.path.startsWith("http://") || codePackage.path.startsWith("https://")) {
                        applictionObject.PackageUrl = codePackage.path;
                    }
                    else {
                        throw new core.CatchableError("未能成功找到文件，请确定package的路径正确");
                    }
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6: throw new core.CatchableError("未能找到war/jar文件，请确定参数传递正确");
                case 7: return [3 /*break*/, 9];
                case 8: throw new core.CatchableError("未能找到iamge/package，请确定参数传递正确");
                case 9: return [2 /*return*/, applictionObject];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFDOUMsOERBQWdEO0FBQ2hELDBDQUFxQjtBQUNyQixnRUFBeUM7QUFDekMsb0RBQThCO0FBRTlCLG1DQUF3QztBQUV4QyxTQUFzQixVQUFVLENBQUMsV0FBd0QsRUFBRSxXQUFnRSxFQUFFLE1BQWMsRUFBRSxJQUFZOzs7Ozs7b0JBQy9LLFNBQVMsR0FBZTt3QkFDMUIsV0FBVyxFQUFFLFdBQVcsQ0FBQyxXQUFXO3dCQUNwQyxlQUFlLEVBQUUsV0FBVyxDQUFDLGVBQWU7d0JBQzVDLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUk7d0JBQy9CLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU07d0JBQ2pDLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTt3QkFDdEIsTUFBTSxFQUFFLE1BQU07d0JBQ2QsSUFBSSxFQUFFLElBQUk7cUJBQ2IsQ0FBQztvQkFDRixxQkFBTSxxQkFBRyxDQUFDLFNBQVMsQ0FBQyxFQUFBOztvQkFBcEIsU0FBb0IsQ0FBQzs7Ozs7Q0FDeEI7QUFYRCxnQ0FXQztBQUVELFNBQXNCLFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTTs7Ozs7O29CQUN2QyxNQUFNLEdBQUcsSUFBSSxDQUFBOzs7eUJBQ1YsTUFBTTs7OztvQkFFYyxxQkFBTSxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUE7O29CQUFuRSxVQUFVLEdBQUcsU0FBc0Q7b0JBQ25FLFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENB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