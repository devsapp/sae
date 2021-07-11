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
            var status, tempResult, tempStatus, e_1;
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
                        tempStatus = tempResult['Data']['ChangeOrderList'][0].Status;
                        if (tempStatus == 2) {
                            status = false;
                        }
                        else if (tempStatus == 0) {
                            status = true;
                        }
                        else if (tempStatus == 1) {
                            status = true;
                        }
                        else if (tempStatus == 3) {
                            throw Error('应用状态为：执行失败');
                        }
                        else if (tempStatus == 6) {
                            throw Error('应用状态为：终止');
                        }
                        else if (tempStatus == 10) {
                            throw Error('应用状态为：系统异常执行失败');
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        if (e_1.message.includes('应用状态为')) {
                            throw e_1;
                        }
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SaeComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var todb, AppId, _a, Region, Namespace, Application, SLB, credentials, AccountID, AccessKeyID, AccessKeySecret, vm, createNamespaceUriPath, e_2, privateStatus, tempObject, createApplicationUriPath, updateApplicationUriPath, applictionObject, code, image, codePackage, codeBucket, listApplicationResult_1, e_3, listApplicationResult, result, bindSLBUriPath, slbConfig;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, core.load('devsapp/2db')];
                    case 1:
                        todb = _b.sent();
                        return [4 /*yield*/, todb.addHistory(inputs)];
                    case 2:
                        _b.sent();
                        _a = inputs.props, Region = _a.Region, Namespace = _a.Namespace, Application = _a.Application, SLB = _a.SLB;
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 3:
                        credentials = _b.sent();
                        AccountID = credentials.AccountID, AccessKeyID = credentials.AccessKeyID, AccessKeySecret = credentials.AccessKeySecret;
                        vm = core_1.spinner('开始部署');
                        if (!Namespace) return [3 /*break*/, 10];
                        vm.text = "\u90E8\u7F72Namespace: " + (Namespace.NamespaceName || Namespace.NamespaceId);
                        createNamespaceUriPath = "/pop/v1/paas/namespace";
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 10]);
                        return [4 /*yield*/, request({
                                AccessKeyID: AccessKeyID,
                                AccessKeySecret: AccessKeySecret,
                                httpMethod: "POST",
                                uriPath: createNamespaceUriPath,
                                queries: Namespace,
                                Region: Region,
                            })];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 6:
                        e_2 = _b.sent();
                        if (!e_2.message.includes('The specified namespace ID already exists')) return [3 /*break*/, 8];
                        return [4 /*yield*/, request({
                                AccessKeyID: AccessKeyID,
                                AccessKeySecret: AccessKeySecret,
                                httpMethod: "PUT",
                                uriPath: createNamespaceUriPath,
                                queries: Namespace,
                                Region: Region,
                            })];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 8: throw e_2;
                    case 9: return [3 /*break*/, 10];
                    case 10:
                        privateStatus = false;
                        tempObject = stringRandom(16);
                        if (!Application) return [3 /*break*/, 34];
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
                        if (!image) return [3 /*break*/, 11];
                        applictionObject.PackageType = 'Image';
                        applictionObject.ImageUrl = image;
                        return [3 /*break*/, 24];
                    case 11:
                        if (!codePackage) return [3 /*break*/, 23];
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
                            codePackage.Bucket = codeBucket;
                        }
                        if (!codePackage.Path.endsWith('.war')) return [3 /*break*/, 16];
                        tempObject = tempObject + '.war';
                        applictionObject.PackageType = 'War';
                        applictionObject.Jdk = 'Open JDK 8';
                        applictionObject.WebContainer = 'apache-tomcat-8.5.42';
                        return [4 /*yield*/, fse.existsSync(codePackage.Path)];
                    case 12:
                        if (!_b.sent()) return [3 /*break*/, 14];
                        vm.text = "\u4E0A\u4F20\u4EE3\u7801\uFF1A" + codePackage.Bucket.Region + " / " + codePackage.Bucket.Name + " / " + tempObject;
                        return [4 /*yield*/, this.uploadFile(credentials, codePackage.Bucket.Name, codePackage.Bucket.Region, codePackage.Path, tempObject, 'upload')];
                    case 13:
                        _b.sent();
                        privateStatus = true;
                        applictionObject.PackageUrl = "https://" + codePackage.Bucket.Name + ".oss-" + codePackage.Bucket.Region + ".aliyuncs.com/" + tempObject;
                        return [3 /*break*/, 15];
                    case 14:
                        if (codePackage.Path.startsWith("http://") || codePackage.Path.startsWith("https://")) {
                            applictionObject.PackageUrl = codePackage.Path;
                        }
                        else {
                            throw Error("未能成功找到.war类型的文件，请确定package的路径正确");
                        }
                        _b.label = 15;
                    case 15: return [3 /*break*/, 22];
                    case 16:
                        if (!codePackage.Path.endsWith('.jar')) return [3 /*break*/, 21];
                        tempObject = tempObject + '.jar';
                        applictionObject.PackageType = 'FatJar';
                        applictionObject.Jdk = 'Open JDK 8';
                        return [4 /*yield*/, fse.existsSync(codePackage.Path)];
                    case 17:
                        if (!_b.sent()) return [3 /*break*/, 19];
                        vm.text = "\u4E0A\u4F20\u4EE3\u7801\uFF1A" + codePackage.Bucket.Region + " / " + codePackage.Bucket.Name + " / " + tempObject;
                        return [4 /*yield*/, this.uploadFile(credentials, codePackage.Bucket.Name, codePackage.Bucket.Region, codePackage.Path, tempObject, 'upload')];
                    case 18:
                        _b.sent();
                        privateStatus = true;
                        applictionObject.PackageUrl = "https://" + codePackage.Bucket.Name + ".oss-" + codePackage.Bucket.Region + ".aliyuncs.com/" + tempObject;
                        return [3 /*break*/, 20];
                    case 19:
                        if (codePackage.Path.startsWith("http://") || codePackage.Path.startsWith("https://")) {
                            applictionObject.PackageUrl = codePackage.Path;
                        }
                        else {
                            throw Error("未能成功找到.jar类型的文件，请确定package的路径正确");
                        }
                        _b.label = 20;
                    case 20: return [3 /*break*/, 22];
                    case 21: throw Error("未能找到package，请确定参数传递正确");
                    case 22: return [3 /*break*/, 24];
                    case 23: throw Error("未能找到iamge/package，请确定参数传递正确");
                    case 24:
                        _b.trys.push([24, 27, , 28]);
                        vm.text = "\u5C1D\u8BD5\u521B\u5EFA\u5E94\u7528 ...";
                        return [4 /*yield*/, request({
                                AccessKeyID: AccessKeyID,
                                AccessKeySecret: AccessKeySecret,
                                httpMethod: "POST",
                                uriPath: createApplicationUriPath,
                                queries: applictionObject,
                                Region: Region,
                            })];
                    case 25:
                        _b.sent();
                        return [4 /*yield*/, request({
                                AccessKeyID: AccessKeyID,
                                AccessKeySecret: AccessKeySecret,
                                httpMethod: "GET",
                                uriPath: "/pop/v1/sam/app/listApplications",
                                queries: { FieldType: 'appName', FieldValue: Application.AppName },
                                Region: Region,
                            })];
                    case 26:
                        listApplicationResult_1 = _b.sent();
                        AppId = listApplicationResult_1['Data']['Applications'][0]['AppId'];
                        return [3 /*break*/, 28];
                    case 27:
                        e_3 = _b.sent();
                        if (e_3.message.includes('AppName is exsited')) {
                            vm.text = "\u5E94\u7528\u5DF2\u5B58\u5728\uFF0C\u5373\u5C06\u8FDB\u884C\u66F4\u65B0 ...";
                        }
                        else {
                            throw e_3;
                        }
                        return [3 /*break*/, 28];
                    case 28:
                        vm.text = "\u5E94\u7528\u90E8\u7F72\u4E2D ...";
                        return [4 /*yield*/, request({
                                AccessKeyID: AccessKeyID,
                                AccessKeySecret: AccessKeySecret,
                                httpMethod: "GET",
                                uriPath: "/pop/v1/sam/app/listApplications",
                                queries: { FieldType: 'appName', FieldValue: Application.AppName },
                                Region: Region,
                            })];
                    case 29:
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
                    case 30:
                        _b.sent();
                        if (!privateStatus) return [3 /*break*/, 32];
                        return [4 /*yield*/, this.uploadFile(credentials, codePackage.Bucket.Name, codePackage.Bucket.Region, codePackage.Path, tempObject, 'upload')];
                    case 31:
                        _b.sent();
                        _b.label = 32;
                    case 32:
                        // 检查应用部署状态
                        vm.text = "\u68C0\u67E5\u90E8\u7F72\u72B6\u6001 ...";
                        return [4 /*yield*/, this.checkStatus(AccessKeyID, AccessKeySecret, AppId, 'CoDeploy', Region)];
                    case 33:
                        _b.sent();
                        _b.label = 34;
                    case 34:
                        result = {
                            "Namespace": Namespace,
                            "Application": {
                                AppId: AppId,
                                AppName: Application.AppName
                            },
                            "Console": "https://sae.console.aliyun.com/#/AppList/AppDetail?appId=" + AppId + "&regionId=" + Region + "&namespaceId=" + Namespace.NamespaceId
                        };
                        if (!SLB) return [3 /*break*/, 38];
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
                    case 35:
                        _b.sent();
                        // 检查应用部署状态
                        vm.text = "\u68C0\u67E5SLB\u7ED1\u5B9A\u72B6\u6001 ...";
                        return [4 /*yield*/, this.checkStatus(AccessKeyID, AccessKeySecret, AppId, 'CoBindSlb', Region)
                            // 获取SLB信息
                        ];
                    case 36:
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
                    case 37:
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
                        _b.label = 38;
                    case 38:
                        vm.stop();
                        inputs.props = {
                            report_content: {
                                sae: [
                                    {
                                        region: Region,
                                        namespace: Namespace.NamespaceId,
                                        appid: AppId
                                    }
                                ]
                            }
                        };
                        return [4 /*yield*/, todb.addSource(inputs)];
                    case 39:
                        _b.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return SaeComponent;
}());
exports.default = SaeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBRTlDLGFBQWE7QUFDYiwrQ0FBK0M7QUFDL0MsYUFBYTtBQUNiLDhDQUFnRDtBQUVoRCxxRUFBdUQ7QUFDdkQsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQzdDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQixJQUFNLE9BQU8sR0FBRyxVQUFPLE1BQU07Ozs7O2dCQUNuQixXQUFXLEdBQWlGLE1BQU0sWUFBdkYsRUFBRSxlQUFlLEdBQWdFLE1BQU0sZ0JBQXRFLEVBQUUsS0FBOEQsTUFBTSxXQUFqRCxFQUFuQixVQUFVLG1CQUFHLE1BQU0sS0FBQSxFQUFFLE9BQU8sR0FBa0MsTUFBTSxRQUF4QyxFQUFFLE9BQU8sR0FBeUIsTUFBTSxRQUEvQixFQUFFLEtBQXVCLE1BQU0sT0FBVixFQUFuQixNQUFNLG1CQUFDLFlBQVksS0FBQSxDQUFXO2dCQUNyRyxNQUFNLEdBQUcsSUFBSSxvQkFBUyxDQUFDO29CQUMzQixXQUFXLEVBQUUsV0FBVztvQkFDeEIsZUFBZSxFQUFFLGVBQWU7b0JBQ2hDLFFBQVEsRUFBRSxpQkFBZSxNQUFNLGtCQUFlO29CQUM5QyxVQUFVLEVBQUUsWUFBWTtpQkFDekIsQ0FBQyxDQUFDO2dCQUNHLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ1osT0FBTyxHQUFHO29CQUNkLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ25DLENBQUM7Z0JBQ0ksYUFBYSxHQUFHO29CQUNwQixPQUFPLEVBQUUsS0FBSztpQkFDZixDQUFDO2dCQUVrQixxQkFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUs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