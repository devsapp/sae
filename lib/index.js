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
var core = __importStar(require("@serverless-devs/core"));
// @ts-ignore
var pop_core_1 = require("@alicloud/pop-core");
// @ts-ignore
var core_1 = require("@serverless-devs/core");
var oss_service_1 = __importDefault(require("./common/oss.service"));
var stringRandom = require('string-random');
var fse = require("fs");
var request = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var AccessKeyID, AccessKeySecret, _a, httpMethod, uriPath, queries, _b, region, client, body, headers, requestOption, requestData;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                AccessKeyID = params.AccessKeyID, AccessKeySecret = params.AccessKeySecret, _a = params.httpMethod, httpMethod = _a === void 0 ? 'POST' : _a, uriPath = params.uriPath, queries = params.queries, _b = params.region, region = _b === void 0 ? 'cn-beijing' : _b;
                client = new pop_core_1.ROAClient({
                    accessKeyId: AccessKeyID,
                    accessKeySecret: AccessKeySecret,
                    endpoint: "https://sae." + region + ".aliyuncs.com",
                    apiVersion: "2019-05-06",
                });
                body = "{}";
                headers = {
                    "Content-Type": "application/json",
                };
                requestOption = {
                    timeout: 60000,
                };
                return [4 /*yield*/, client.request(httpMethod, uriPath, queries, body, headers, requestOption)];
            case 1:
                requestData = _c.sent();
                return [2 /*return*/, requestData];
        }
    });
}); };
var SaeComponent = /** @class */ (function () {
    function SaeComponent() {
    }
    SaeComponent.prototype.uploadFile = function (credentials, bucket, region, file, object, type) {
        return __awaiter(this, void 0, void 0, function () {
            var ossConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ossConfig = {
                            accessKeyId: credentials.AccessKeyID,
                            accessKeySecret: credentials.AccessKeySecret,
                            bucket: bucket,
                            region: region,
                            file: file,
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
    };
    SaeComponent.prototype.checkStatus = function (AccessKeyID, AccessKeySecret, AppId, CoType, region) {
        return __awaiter(this, void 0, void 0, function () {
            var status, tempResult, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = true;
                        _a.label = 1;
                    case 1:
                        if (!status) return [3 /*break*/, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, request({
                                AccessKeyID: AccessKeyID,
                                AccessKeySecret: AccessKeySecret,
                                httpMethod: "GET",
                                uriPath: '/pop/v1/sam/changeorder/ListChangeOrders',
                                queries: { AppId: AppId, CoType: CoType, CurrentPage: 1, PageSize: 10, },
                                region: region,
                            })];
                    case 3:
                        tempResult = _a.sent();
                        status = tempResult['Data']['ChangeOrderList'][0].Status == 2 ? false : true;
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SaeComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var AppId, _a, Region, Namespace, Application, SLB, credentials, AccountID, AccessKeyID, AccessKeySecret, vm, createNamespaceUriPath, e_2, createApplicationUriPath, updateApplicationUriPath, applictionObject, code, image, codePackage, codeBucket, tempObject, listApplicationResult, e_3, listApplicationResult, result, bindSLBUriPath, slbConfig;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = inputs.props, Region = _a.Region, Namespace = _a.Namespace, Application = _a.Application, SLB = _a.SLB;
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _b.sent();
                        AccountID = credentials.AccountID, AccessKeyID = credentials.AccessKeyID, AccessKeySecret = credentials.AccessKeySecret;
                        vm = core_1.spinner('开始部署');
                        if (!Namespace) return [3 /*break*/, 8];
                        vm.text = "\u90E8\u7F72Namespace: " + (Namespace.NamespaceName || Namespace.NamespaceId);
                        createNamespaceUriPath = "/pop/v1/paas/namespace";
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 8]);
                        return [4 /*yield*/, request({
                                AccessKeyID: AccessKeyID,
                                AccessKeySecret: AccessKeySecret,
                                httpMethod: "POST",
                                uriPath: createNamespaceUriPath,
                                queries: Namespace,
                                Region: Region,
                            })];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 4:
                        e_2 = _b.sent();
                        if (!e_2.message.includes('The specified namespace ID already exists')) return [3 /*break*/, 6];
                        return [4 /*yield*/, request({
                                AccessKeyID: AccessKeyID,
                                AccessKeySecret: AccessKeySecret,
                                httpMethod: "PUT",
                                uriPath: createNamespaceUriPath,
                                queries: Namespace,
                                Region: Region,
                            })];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 6: throw e_2;
                    case 7: return [3 /*break*/, 8];
                    case 8:
                        if (!Application) return [3 /*break*/, 32];
                        vm.text = "\u90E8\u7F72Appliction: " + Application.AppName;
                        createApplicationUriPath = "/pop/v1/sam/app/createApplication";
                        updateApplicationUriPath = "/pop/v1/sam/app/deployApplication";
                        applictionObject = JSON.parse(JSON.stringify(Application));
                        delete applictionObject.Code;
                        if (Namespace.NamespaceId) {
                            applictionObject.NamespaceId = Namespace.NamespaceId;
                        }
                        // 对code进行处理
                        vm.text = "\u5904\u7406\u4EE3\u7801 ...";
                        code = Application.Code ? Application.Code : {};
                        image = code.Image;
                        codePackage = code.Package;
                        if (!image) return [3 /*break*/, 9];
                        applictionObject.PackageType = 'Image';
                        applictionObject.ImageUrl = image;
                        return [3 /*break*/, 22];
                    case 9:
                        if (!codePackage) return [3 /*break*/, 21];
                        if (typeof codePackage == 'string') {
                            codePackage = {
                                Path: codePackage,
                                Bucket: {
                                    Region: Region,
                                    Name: "sae-packages-" + Region + "-" + AccountID
                                }
                            };
                        }
                        else {
                            if (!codePackage.Path) {
                                throw Error("未能找到iamge/package，请确定参数传递正确");
                            }
                            codeBucket = codePackage.Bucket || {};
                            codeBucket.Region = codeBucket.Region || Region;
                            codeBucket.Name = codeBucket.Name || "sae-packages-" + Region + "-" + AccountID;
                        }
                        tempObject = stringRandom(16);
                        if (!codePackage.Path.endsWith('.war')) return [3 /*break*/, 14];
                        tempObject = tempObject + '.war';
                        applictionObject.PackageType = 'War';
                        applictionObject.Jdk = 'Open JDK 8';
                        applictionObject.WebContainer = 'apache-tomcat-8.5.42';
                        return [4 /*yield*/, fse.existsSync(codePackage.Path)];
                    case 10:
                        if (!_b.sent()) return [3 /*break*/, 12];
                        vm.text = "\u4E0A\u4F20\u4EE3\u7801\uFF1A" + codePackage.Bucket.Region + " / " + codePackage.Bucket.Name + " / " + tempObject;
                        return [4 /*yield*/, this.uploadFile(credentials, codePackage.Bucket.Name, codePackage.Bucket.Region, codePackage.Path, tempObject, 'upload')];
                    case 11:
                        _b.sent();
                        applictionObject.PackageUrl = "https://" + codePackage.Bucket.Name + ".oss-" + codePackage.Bucket.Region + ".aliyuncs.com/" + tempObject;
                        return [3 /*break*/, 13];
                    case 12:
                        if (codePackage.Path.startsWith("http://") || codePackage.Path.startsWith("https://")) {
                            applictionObject.PackageUrl = codePackage.Path;
                        }
                        else {
                            throw Error("未能成功找到.war类型的文件，请确定package的路径正确");
                        }
                        _b.label = 13;
                    case 13: return [3 /*break*/, 20];
                    case 14:
                        if (!codePackage.Path.endsWith('.jar')) return [3 /*break*/, 19];
                        tempObject = tempObject + '.jar';
                        applictionObject.PackageType = 'FatJar';
                        applictionObject.Jdk = 'Open JDK 8';
                        return [4 /*yield*/, fse.existsSync(codePackage.Path)];
                    case 15:
                        if (!_b.sent()) return [3 /*break*/, 17];
                        vm.text = "\u4E0A\u4F20\u4EE3\u7801\uFF1A" + codePackage.Bucket.Region + " / " + codePackage.Bucket.Name + " / " + tempObject;
                        return [4 /*yield*/, this.uploadFile(credentials, codePackage.Bucket.Name, codePackage.Bucket.Region, codePackage.Path, tempObject, 'upload')];
                    case 16:
                        _b.sent();
                        applictionObject.PackageUrl = "https://" + codePackage.Bucket.Name + ".oss-" + codePackage.Bucket.Region + ".aliyuncs.com/" + tempObject;
                        return [3 /*break*/, 18];
                    case 17:
                        if (codePackage.Path.startsWith("http://") || codePackage.Path.startsWith("https://")) {
                            applictionObject.PackageUrl = codePackage.Path;
                        }
                        else {
                            throw Error("未能成功找到.jar类型的文件，请确定package的路径正确");
                        }
                        _b.label = 18;
                    case 18: return [3 /*break*/, 20];
                    case 19: throw Error("未能找到package，请确定参数传递正确");
                    case 20: return [3 /*break*/, 22];
                    case 21: throw Error("未能找到iamge/package，请确定参数传递正确");
                    case 22:
                        _b.trys.push([22, 25, , 30]);
                        return [4 /*yield*/, request({
                                AccessKeyID: AccessKeyID,
                                AccessKeySecret: AccessKeySecret,
                                httpMethod: "POST",
                                uriPath: createApplicationUriPath,
                                queries: applictionObject,
                                Region: Region,
                            })];
                    case 23:
                        _b.sent();
                        return [4 /*yield*/, request({
                                AccessKeyID: AccessKeyID,
                                AccessKeySecret: AccessKeySecret,
                                httpMethod: "GET",
                                uriPath: "/pop/v1/sam/app/listApplications",
                                queries: { FieldType: 'appName', FieldValue: Application.AppName },
                                Region: Region,
                            })];
                    case 24:
                        listApplicationResult = _b.sent();
                        AppId = listApplicationResult['Data']['Applications'][0]['AppId'];
                        return [3 /*break*/, 30];
                    case 25:
                        e_3 = _b.sent();
                        if (!e_3.message.includes('AppName is exsited')) return [3 /*break*/, 28];
                        return [4 /*yield*/, request({
                                AccessKeyID: AccessKeyID,
                                AccessKeySecret: AccessKeySecret,
                                httpMethod: "GET",
                                uriPath: "/pop/v1/sam/app/listApplications",
                                queries: { FieldType: 'appName', FieldValue: Application.AppName },
                                Region: Region,
                            })];
                    case 26:
                        listApplicationResult = _b.sent();
                        applictionObject.AppId = listApplicationResult['Data']['Applications'][0]['AppId'];
                        AppId = applictionObject.AppId;
                        return [4 /*yield*/, request({
                                AccessKeyID: AccessKeyID,
                                AccessKeySecret: AccessKeySecret,
                                httpMethod: "POST",
                                uriPath: updateApplicationUriPath,
                                queries: applictionObject,
                                Region: Region,
                            })];
                    case 27:
                        _b.sent();
                        return [3 /*break*/, 29];
                    case 28: throw e_3;
                    case 29: return [3 /*break*/, 30];
                    case 30:
                        // 检查应用部署状态
                        vm.text = "\u68C0\u67E5\u90E8\u7F72\u72B6\u6001 ...";
                        return [4 /*yield*/, this.checkStatus(AccessKeyID, AccessKeySecret, AppId, 'CoDeploy', Region)];
                    case 31:
                        _b.sent();
                        _b.label = 32;
                    case 32:
                        result = {
                            "Namespace": Namespace,
                            "Application": {
                                AppId: AppId,
                                AppName: Application.AppName
                            },
                            "Console": "https://sae.console.aliyun.com/#/AppList/AppDetail?appId=" + AppId + "&regionId=" + Region + "&namespaceId=" + Namespace.NamespaceId
                        };
                        if (!SLB) return [3 /*break*/, 36];
                        vm.text = "\u90E8\u7F72SLB ... ";
                        bindSLBUriPath = "/pop/v1/sam/app/slb";
                        if (SLB.Internet && typeof SLB.Internet == 'object') {
                            SLB.Internet = JSON.stringify(SLB.Internet);
                        }
                        if (SLB.Intranet && typeof SLB.Intranet == 'object') {
                            SLB.Intranet = JSON.stringify(SLB.Intranet);
                        }
                        if (AppId) {
                            SLB.AppId = AppId;
                        }
                        return [4 /*yield*/, request({
                                AccessKeyID: AccessKeyID,
                                AccessKeySecret: AccessKeySecret,
                                httpMethod: "POST",
                                uriPath: bindSLBUriPath,
                                queries: SLB,
                                Region: Region,
                            })];
                    case 33:
                        _b.sent();
                        // 检查应用部署状态
                        vm.text = "\u68C0\u67E5SLB\u7ED1\u5B9A\u72B6\u6001 ...";
                        return [4 /*yield*/, this.checkStatus(AccessKeyID, AccessKeySecret, AppId, 'CoBindSlb', Region)
                            // 获取SLB信息
                        ];
                    case 34:
                        _b.sent();
                        // 获取SLB信息
                        vm.text = "\u83B7\u53D6SLB\u4FE1\u606F ... ";
                        return [4 /*yield*/, request({
                                AccessKeyID: AccessKeyID,
                                AccessKeySecret: AccessKeySecret,
                                httpMethod: "GET",
                                uriPath: '/pop/v1/sam/app/slb',
                                queries: { AppId: AppId },
                                Region: Region,
                            })];
                    case 35:
                        slbConfig = _b.sent();
                        if (slbConfig["Data"]['InternetIp']) {
                            result['SLB'] = {
                                InternetIp: slbConfig["Data"]['InternetIp']
                            };
                        }
                        if (slbConfig["Data"]['IntranetSlbId']) {
                            result['SLB'] = result['SLB'] ? result['SLB'] : {};
                            result['SLB']['IntranetSlbId'] = slbConfig["Data"]['InternetIp'];
                        }
                        _b.label = 36;
                    case 36:
                        vm.stop();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return SaeComponent;
}());
exports.default = SaeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBRTlDLGFBQWE7QUFDYiwrQ0FBK0M7QUFDL0MsYUFBYTtBQUNiLDhDQUFnRDtBQUVoRCxxRUFBdUQ7QUFDdkQsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQzdDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQixJQUFNLE9BQU8sR0FBRyxVQUFPLE1BQU07Ozs7O2dCQUNuQixXQUFXLEdBQWlGLE1BQU0sWUFBdkYsRUFBRSxlQUFlLEdBQWdFLE1BQU0sZ0JBQXRFLEVBQUUsS0FBOEQsTUFBTSxXQUFqRCxFQUFuQixVQUFVLG1CQUFHLE1BQU0sS0FBQSxFQUFFLE9BQU8sR0FBa0MsTUFBTSxRQUF4QyxFQUFFLE9BQU8sR0FBeUIsTUFBTSxRQUEvQixFQUFFLEtBQXVCLE1BQU0sT0FBVixFQUFuQixNQUFNLG1CQUFDLFlBQVksS0FBQSxDQUFXO2dCQUNyRyxNQUFNLEdBQUcsSUFBSSxvQkFBUyxDQUFDO29CQUMzQixXQUFXLEVBQUUsV0FBVztvQkFDeEIsZUFBZSxFQUFFLGVBQWU7b0JBQ2hDLFFBQVEsRUFBRSxpQkFBZSxNQUFNLGtCQUFlO29CQUM5QyxVQUFVLEVBQUUsWUFBWTtpQkFDekIsQ0FBQyxDQUFDO2dCQUNHLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ1osT0FBTyxHQUFHO29CQUNkLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ25DLENBQUM7Z0JBQ0ksYUFBYSxHQUFHO29CQUNwQixPQUFPLEVBQUUsS0FBSztpQkFDZixDQUFDO2dCQUNrQixxQkFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUs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