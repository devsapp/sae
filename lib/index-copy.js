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
            var todb, AppId, _a, Region, Namespace, Application, SLB, credentials, AccountID, AccessKeyID, AccessKeySecret, vm, createNamespaceUriPath, e_2, privateStatus, tempObject, createApplicationUriPath, updateApplicationUriPath, applicationObject, code, image, codePackage, codeBucket, listApplicationResult_1, e_3, listApplicationResult, result, bindSLBUriPath, slbConfig;
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
                        applicationObject = JSON.parse(JSON.stringify(Application));
                        delete applicationObject.Code;
                        if (Namespace.NamespaceId) {
                            applicationObject.NamespaceId = Namespace.NamespaceId;
                        }
                        // 对code进行处理
                        vm.text = "\u5904\u7406\u4EE3\u7801 ...";
                        code = Application.Code ? Application.Code : {};
                        image = code.Image;
                        codePackage = code.Package;
                        if (!image) return [3 /*break*/, 11];
                        applicationObject.PackageType = 'Image';
                        applicationObject.ImageUrl = image;
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
                        applicationObject.PackageType = 'War';
                        applicationObject.Jdk = 'Open JDK 8';
                        applicationObject.WebContainer = 'apache-tomcat-8.5.42';
                        return [4 /*yield*/, fse.existsSync(codePackage.Path)];
                    case 12:
                        if (!_b.sent()) return [3 /*break*/, 14];
                        vm.text = "\u4E0A\u4F20\u4EE3\u7801\uFF1A" + codePackage.Bucket.Region + " / " + codePackage.Bucket.Name + " / " + tempObject;
                        return [4 /*yield*/, this.uploadFile(credentials, codePackage.Bucket.Name, codePackage.Bucket.Region, codePackage.Path, tempObject, 'upload')];
                    case 13:
                        _b.sent();
                        privateStatus = true;
                        applicationObject.PackageUrl = "https://" + codePackage.Bucket.Name + ".oss-" + codePackage.Bucket.Region + ".aliyuncs.com/" + tempObject;
                        return [3 /*break*/, 15];
                    case 14:
                        if (codePackage.Path.startsWith("http://") || codePackage.Path.startsWith("https://")) {
                            applicationObject.PackageUrl = codePackage.Path;
                        }
                        else {
                            throw Error("未能成功找到.war类型的文件，请确定package的路径正确");
                        }
                        _b.label = 15;
                    case 15: return [3 /*break*/, 22];
                    case 16:
                        if (!codePackage.Path.endsWith('.jar')) return [3 /*break*/, 21];
                        tempObject = tempObject + '.jar';
                        applicationObject.PackageType = 'FatJar';
                        applicationObject.Jdk = 'Open JDK 8';
                        return [4 /*yield*/, fse.existsSync(codePackage.Path)];
                    case 17:
                        if (!_b.sent()) return [3 /*break*/, 19];
                        vm.text = "\u4E0A\u4F20\u4EE3\u7801\uFF1A" + codePackage.Bucket.Region + " / " + codePackage.Bucket.Name + " / " + tempObject;
                        return [4 /*yield*/, this.uploadFile(credentials, codePackage.Bucket.Name, codePackage.Bucket.Region, codePackage.Path, tempObject, 'upload')];
                    case 18:
                        _b.sent();
                        privateStatus = true;
                        applicationObject.PackageUrl = "https://" + codePackage.Bucket.Name + ".oss-" + codePackage.Bucket.Region + ".aliyuncs.com/" + tempObject;
                        return [3 /*break*/, 20];
                    case 19:
                        if (codePackage.Path.startsWith("http://") || codePackage.Path.startsWith("https://")) {
                            applicationObject.PackageUrl = codePackage.Path;
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
                                queries: applicationObject,
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
                        applicationObject.AppId = listApplicationResult['Data']['Applications'][0]['AppId'];
                        AppId = applicationObject.AppId;
                        return [4 /*yield*/, request({
                                AccessKeyID: AccessKeyID,
                                AccessKeySecret: AccessKeySecret,
                                httpMethod: "POST",
                                uriPath: updateApplicationUriPath,
                                queries: applicationObject,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtY29weS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC1jb3B5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUE4QztBQUU5QyxhQUFhO0FBQ2IsK0NBQStDO0FBQy9DLGFBQWE7QUFDYiw4Q0FBZ0Q7QUFFaEQscUVBQXVEO0FBQ3ZELElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUM3QyxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUIsSUFBTSxPQUFPLEdBQUcsVUFBTyxNQUFNOzs7OztnQkFDbkIsV0FBVyxHQUFpRixNQUFNLFlBQXZGLEVBQUUsZUFBZSxHQUFnRSxNQUFNLGdCQUF0RSxFQUFFLEtBQThELE1BQU0sV0FBakQsRUFBbkIsVUFBVSxtQkFBRyxNQUFNLEtBQUEsRUFBRSxPQUFPLEdBQWtDLE1BQU0sUUFBeEMsRUFBRSxPQUFPLEdBQXlCLE1BQU0sUUFBL0IsRUFBRSxLQUF1QixNQUFNLE9BQVYsRUFBbkIsTUFBTSxtQkFBQyxZQUFZLEtBQUEsQ0FBVztnQkFDckcsTUFBTSxHQUFHLElBQUksb0JBQVMsQ0FBQztvQkFDM0IsV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLGVBQWUsRUFBRSxlQUFlO29CQUNoQyxRQUFRLEVBQUUsaUJBQWUsTUFBTSxrQkFBZTtvQkFDOUMsVUFBVSxFQUFFLFlBQVk7aUJBQ3pCLENBQUMsQ0FBQztnQkFDRyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNaLE9BQU8sR0FBRztvQkFDZCxjQUFjLEVBQUUsa0JBQWtCO2lCQUNuQyxDQUFDO2dCQUNJLGFBQWEsR0FBRztvQkFDcEIsT0FBTyxFQUFFLEtBQUs7aUJBQ2YsQ0FBQztnQkFFa0IscUJBQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUs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