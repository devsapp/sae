"use strict";
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
var logger_1 = __importDefault(require("./common/logger"));
var lodash_1 = require("lodash");
// @ts-ignore
var pop_core_1 = require("@alicloud/pop-core");
// @ts-ignore
var core_1 = require("@serverless-devs/core");
var POLLINGTIME = 20;
var request = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var AccessKeyID, AccessKeySecret, _a, httpMethod, uriPath, queries, client, body, headers, requestOption, requestData;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                AccessKeyID = params.AccessKeyID, AccessKeySecret = params.AccessKeySecret, _a = params.httpMethod, httpMethod = _a === void 0 ? 'POST' : _a, uriPath = params.uriPath, queries = params.queries;
                client = new pop_core_1.ROAClient({
                    accessKeyId: AccessKeyID,
                    accessKeySecret: AccessKeySecret,
                    endpoint: "https://sae.cn-beijing.aliyuncs.com",
                    apiVersion: "2019-05-06",
                });
                body = "{}";
                headers = {
                    "Content-Type": "application/json",
                };
                requestOption = {};
                return [4 /*yield*/, client.request(httpMethod, uriPath, queries, body, headers, requestOption)];
            case 1:
                requestData = _b.sent();
                return [2 /*return*/, requestData];
        }
    });
}); };
var SaeComponent = /** @class */ (function () {
    function SaeComponent() {
    }
    SaeComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, region, appName, _b, packageType, imageUrl, _c, replicas, _d, cpu, _e, memory, _f, appDescription, _g, port, _h, targetPort, _j, AccessKeyID, AccessKeySecret, createAppUriPath, createAppAueries, times, createTimes, getSlbStatus, bindSLb, getChangeOrderStatus, vm, _k, Message, AppId;
            var _this = this;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _a = inputs.props, region = _a.region, appName = _a.appName, _b = _a.packageType, packageType = _b === void 0 ? 'Image' : _b, imageUrl = _a.imageUrl, _c = _a.replicas, replicas = _c === void 0 ? 1 : _c, _d = _a.cpu, cpu = _d === void 0 ? 500 : _d, _e = _a.memory, memory = _e === void 0 ? 1024 : _e, _f = _a.appDescription, appDescription = _f === void 0 ? 'saedemo' : _f, _g = _a.port, port = _g === void 0 ? 80 : _g, _h = _a.targetPort, targetPort = _h === void 0 ? 8080 : _h, _j = inputs.credentials, AccessKeyID = _j.AccessKeyID, AccessKeySecret = _j.AccessKeySecret;
                        createAppUriPath = "/pop/v1/sam/app/createApplication";
                        createAppAueries = {
                            RegionId: region,
                            AppName: appName,
                            PackageType: packageType,
                            Replicas: replicas,
                            NamespaceId: region,
                            AutoConfig: true,
                            Cpu: cpu,
                            Memory: memory,
                            Deploy: true,
                            AppDescription: appDescription
                        };
                        switch (packageType) {
                            case 'Image':
                                createAppAueries.ImageUrl = imageUrl;
                                break;
                            case 'War':
                                createAppAueries.PackageUrl = imageUrl;
                                createAppAueries.Jdk = 'Open JDK 8';
                                createAppAueries.WebContainer = 'apache-tomcat-8.5.42';
                                break;
                            case 'FatJar':
                                createAppAueries.PackageUrl = imageUrl;
                                createAppAueries.Jdk = 'Open JDK 8';
                                break;
                            default:
                                break;
                        }
                        times = 0;
                        createTimes = 0;
                        getSlbStatus = function (AppId) { return __awaiter(_this, void 0, void 0, function () {
                            var SlburiPath, SlbUriQueries, SlbData, ip, port;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        times++;
                                        if (times % POLLINGTIME > 0) {
                                            getSlbStatus(AppId);
                                            return [2 /*return*/];
                                        }
                                        SlburiPath = '/pop/v1/sam/app/slb';
                                        SlbUriQueries = {
                                            AppId: AppId,
                                        };
                                        return [4 /*yield*/, request({ AccessKeyID: AccessKeyID, AccessKeySecret: AccessKeySecret, httpMethod: "GET", uriPath: SlburiPath, queries: SlbUriQueries })];
                                    case 1:
                                        SlbData = _a.sent();
                                        ip = lodash_1.get(SlbData, 'Data.InternetIp');
                                        port = lodash_1.get(SlbData, 'Data.Internet[0].TargetPort');
                                        if (times < 100000) {
                                            if (ip && port) {
                                                vm.succeed('执行成功');
                                                logger_1.default.info(ip + ":" + port);
                                                logger_1.default.info("SAE\u5730\u5740\uFF1Ahttps://sae.console.aliyun.com/#/AppList/AppDetail?appId=" + AppId + "&regionId=" + region + "&namespaceId=" + region);
                                                return [2 /*return*/, ip + ":" + port];
                                            }
                                            else {
                                                getSlbStatus(AppId);
                                            }
                                        }
                                        else {
                                            vm.warn('执行失败');
                                            return [2 /*return*/, SlbData];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        bindSLb = function (AppId) { return __awaiter(_this, void 0, void 0, function () {
                            var bindSlbUriPath, bindSlbUriQueries, BindSlbData, slbData;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        bindSlbUriPath = '/pop/v1/sam/app/slb';
                                        bindSlbUriQueries = {
                                            AppId: AppId,
                                            "Internet": "[{\"port\":" + port + ",\"targetPort\":" + targetPort + ",\"protocol\":\"HTTP\"}]"
                                        };
                                        return [4 /*yield*/, request({ AccessKeyID: AccessKeyID, AccessKeySecret: AccessKeySecret, httpMethod: "POST", uriPath: bindSlbUriPath, queries: bindSlbUriQueries })];
                                    case 1:
                                        BindSlbData = _a.sent();
                                        if (!lodash_1.get(BindSlbData, 'Data.ChangeOrderId')) return [3 /*break*/, 3];
                                        logger_1.default.info(lodash_1.get(BindSlbData, 'Data.ChangeOrderId'));
                                        return [4 /*yield*/, getSlbStatus(AppId)];
                                    case 2:
                                        slbData = _a.sent();
                                        return [2 /*return*/, { http: slbData }];
                                    case 3:
                                        vm.warn('执行失败');
                                        return [2 /*return*/, BindSlbData];
                                }
                            });
                        }); };
                        getChangeOrderStatus = function (AppId) { return __awaiter(_this, void 0, void 0, function () {
                            var SlburiPath, SlbUriQueries, ChangeOrderList, status;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        createTimes++;
                                        if (createTimes % POLLINGTIME > 0) {
                                            getChangeOrderStatus(AppId);
                                            return [2 /*return*/];
                                        }
                                        SlburiPath = '/pop/v1/sam/changeorder/ListChangeOrders';
                                        SlbUriQueries = {
                                            CurrentPage: 1,
                                            PageSize: 10,
                                            CoType: 'CoDeploy',
                                            AppId: AppId,
                                        };
                                        return [4 /*yield*/, request({ AccessKeyID: AccessKeyID, AccessKeySecret: AccessKeySecret, httpMethod: "GET", uriPath: SlburiPath, queries: SlbUriQueries })];
                                    case 1:
                                        ChangeOrderList = (_a.sent()).Data.ChangeOrderList;
                                        status = lodash_1.get(ChangeOrderList, '[0].Status', 'null');
                                        if (createTimes < 100000) {
                                            if (status == 2) {
                                                vm.text = 'SLB绑定中';
                                                bindSLb(AppId);
                                            }
                                            else {
                                                getChangeOrderStatus(AppId);
                                            }
                                        }
                                        else {
                                            vm.warn('执行失败');
                                            return [2 /*return*/, ChangeOrderList];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        vm = core_1.spinner('开始部署');
                        return [4 /*yield*/, request({ AccessKeyID: AccessKeyID, AccessKeySecret: AccessKeySecret, httpMethod: "POST", uriPath: createAppUriPath, queries: createAppAueries })];
                    case 1:
                        _k = _l.sent(), Message = _k.Message, AppId = _k.Data.AppId;
                        if (!AppId) return [3 /*break*/, 3];
                        logger_1.default.info(AppId);
                        vm.text = '部署应用中';
                        return [4 /*yield*/, getChangeOrderStatus(AppId)];
                    case 2:
                        _l.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        vm.warn('执行失败');
                        logger_1.default.error(Message);
                        return [2 /*return*/, Message];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return SaeComponent;
}());
exports.default = SaeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBcUM7QUFFckMsaUNBQTZCO0FBQzdCLGFBQWE7QUFDYiwrQ0FBK0M7QUFDL0MsYUFBYTtBQUNiLDhDQUFnRDtBQUNoRCxJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdkIsSUFBTSxPQUFPLEdBQUcsVUFBTyxNQUFNOzs7OztnQkFDbkIsV0FBVyxHQUE2RCxNQUFNLFlBQW5FLEVBQUUsZUFBZSxHQUE0QyxNQUFNLGdCQUFsRCxFQUFFLEtBQTBDLE1BQU0sV0FBN0IsRUFBbkIsVUFBVSxtQkFBRyxNQUFNLEtBQUEsRUFBRSxPQUFPLEdBQWMsTUFBTSxRQUFwQixFQUFFLE9BQU8sR0FBSyxNQUFNLFFBQVgsQ0FBWTtnQkFDakYsTUFBTSxHQUFHLElBQUksb0JBQVMsQ0FBQztvQkFDM0IsV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLGVBQWUsRUFBRSxlQUFlO29CQUNoQyxRQUFRLEVBQUUscUNBQXFDO29CQUMvQyxVQUFVLEVBQUUsWUFBWTtpQkFDekIsQ0FBQyxDQUFDO2dCQUNHLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ1osT0FBTyxHQUFHO29CQUNkLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ25DLENBQUM7Z0JBQ0ksYUFBYSxHQUFHLEVBQUUsQ0FBQztnQkFDTCxxQkFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLEVBQUE7O2dCQUE5RixXQUFXLEdBQUcsU0FBZ0Y7Z0JBQ3BHLHNCQUFPLFdBQVcsRUFBQTs7O0tBQ25CLENBQUE7QUFtQkQ7SUFBQTtJQW9IQSxDQUFDO0lBbkhPLDZCQUFNLEdBQVosVUFBYSxNQUFrQjs7Ozs7Ozt3QkFD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