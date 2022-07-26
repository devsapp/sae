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
                    case 0:
                        console.log(inputs);
                        return [4 /*yield*/, core.load('devsapp/2db')];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgxLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4MS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBOEM7QUFFOUMsYUFBYTtBQUNiLCtDQUErQztBQUMvQyxhQUFhO0FBQ2IsOENBQWdEO0FBRWhELHFFQUF1RDtBQUN2RCxJQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7QUFDN0MsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFCLElBQU0sT0FBTyxHQUFHLFVBQU8sTUFBTTs7Ozs7Z0JBQ25CLFdBQVcsR0FBaUYsTUFBTSxZQUF2RixFQUFFLGVBQWUsR0FBZ0UsTUFBTSxnQkFBdEUsRUFBRSxLQUE4RCxNQUFNLFdBQWpELEVBQW5CLFVBQVUsbUJBQUcsTUFBTSxLQUFBLEVBQUUsT0FBTyxHQUFrQyxNQUFNLFFBQXhDLEVBQUUsT0FBTyxHQUF5QixNQUFNLFFBQS9CLEVBQUUsS0FBdUIsTUFBTSxPQUFWLEVBQW5CLE1BQU0sbUJBQUMsWUFBWSxLQUFBLENBQVc7Z0JBQ3JHLE1BQU0sR0FBRyxJQUFJLG9CQUFTLENBQUM7b0JBQzNCLFdBQVcsRUFBRSxXQUFXO29CQUN4QixlQUFlLEVBQUUsZUFBZTtvQkFDaEMsUUFBUSxFQUFFLGlCQUFlLE1BQU0sa0JBQWU7b0JBQzlDLFVBQVUsRUFBRSxZQUFZO2lCQUN6QixDQUFDLENBQUM7Z0JBQ0csSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDWixPQUFPLEdBQUc7b0JBQ2QsY0FBYyxFQUFFLGtCQUFrQjtpQkFDbkMsQ0FBQztnQkFDSSxhQUFhLEdBQUc7b0JBQ3BCLE9BQU8sRUFBRSxLQUFLO2lCQUNmLENBQUM7Z0JBRWtCLHFCQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFB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