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
    SaeComponent.prototype.create = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, region, appName, imageUrl, _b, AccessKeyID, AccessKeySecret, createAppUriPath, createAppAueries, times, createTimes, getSlbStatus, bindSLb, getChangeOrderStatus, vm, _c, Message, AppId;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = inputs.props, region = _a.region, appName = _a.appName, imageUrl = _a.imageUrl, _b = inputs.credentials, AccessKeyID = _b.AccessKeyID, AccessKeySecret = _b.AccessKeySecret;
                        createAppUriPath = "/pop/v1/sam/app/createApplication";
                        createAppAueries = {
                            RegionId: region,
                            AppName: appName,
                            PackageType: 'Image',
                            ImageUrl: imageUrl,
                            Replicas: 1,
                            NamespaceId: region,
                            AutoConfig: true,
                            Cpu: 500,
                            Memory: 1024,
                            Deploy: true,
                        };
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
                                            "Internet": "[{\"port\":80,\"targetPort\":8080,\"protocol\":\"HTTP\"}]"
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
                        _c = _d.sent(), Message = _c.Message, AppId = _c.Data.AppId;
                        if (!AppId) return [3 /*break*/, 3];
                        logger_1.default.info(AppId);
                        vm.text = '部署应用中';
                        return [4 /*yield*/, getChangeOrderStatus(AppId)];
                    case 2:
                        _d.sent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBcUM7QUFFckMsaUNBQTZCO0FBQzdCLGFBQWE7QUFDYiwrQ0FBK0M7QUFDL0MsYUFBYTtBQUNiLDhDQUFnRDtBQUNoRCxJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdkIsSUFBTSxPQUFPLEdBQUcsVUFBTyxNQUFNOzs7OztnQkFDbkIsV0FBVyxHQUE2RCxNQUFNLFlBQW5FLEVBQUUsZUFBZSxHQUE0QyxNQUFNLGdCQUFsRCxFQUFFLEtBQTBDLE1BQU0sV0FBN0IsRUFBbkIsVUFBVSxtQkFBRyxNQUFNLEtBQUEsRUFBRSxPQUFPLEdBQWMsTUFBTSxRQUFwQixFQUFFLE9BQU8sR0FBSyxNQUFNLFFBQVgsQ0FBWTtnQkFDakYsTUFBTSxHQUFHLElBQUksb0JBQVMsQ0FBQztvQkFDM0IsV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLGVBQWUsRUFBRSxlQUFlO29CQUNoQyxRQUFRLEVBQUUscUNBQXFDO29CQUMvQyxVQUFVLEVBQUUsWUFBWTtpQkFDekIsQ0FBQyxDQUFDO2dCQUNHLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ1osT0FBTyxHQUFHO29CQUNkLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ25DLENBQUM7Z0JBQ0ksYUFBYSxHQUFHLEVBQUUsQ0FBQztnQkFDTCxxQkFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLEVBQUE7O2dCQUE5RixXQUFXLEdBQUcsU0FBZ0Y7Z0JBQ3BHLHNCQUFPLFdBQVcsRUFBQTs7O0tBQ25CLENBQUE7QUFDRDtJQUFBO0lBb0dBLENBQUM7SUFuR2MsNkJBQU0sR0FBbkIsVUFBb0IsTUFBa0I7Ozs7Ozs7d0JB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