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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBcUM7QUFFckMsaUNBQTZCO0FBQzdCLGFBQWE7QUFDYiwrQ0FBK0M7QUFDL0MsYUFBYTtBQUNiLDhDQUFnRDtBQUNoRCxJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdkIsSUFBTSxPQUFPLEdBQUcsVUFBTyxNQUFNOzs7OztnQkFDbkIsV0FBVyxHQUE2RCxNQUFNLFlBQW5FLEVBQUUsZUFBZSxHQUE0QyxNQUFNLGdCQUFsRCxFQUFFLEtBQTBDLE1BQU0sV0FBN0IsRUFBbkIsVUFBVSxtQkFBRyxNQUFNLEtBQUEsRUFBRSxPQUFPLEdBQWMsTUFBTSxRQUFwQixFQUFFLE9BQU8sR0FBSyxNQUFNLFFBQVgsQ0FBWTtnQkFDakYsTUFBTSxHQUFHLElBQUksb0JBQVMsQ0FBQztvQkFDM0IsV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLGVBQWUsRUFBRSxlQUFlO29CQUNoQyxRQUFRLEVBQUUscUNBQXFDO29CQUMvQyxVQUFVLEVBQUUsWUFBWTtpQkFDekIsQ0FBQyxDQUFDO2dCQUNHLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ1osT0FBTyxHQUFHO29CQUNkLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ25DLENBQUM7Z0JBQ0ksYUFBYSxHQUFHLEVBQUUsQ0FBQztnQkFDTCxxQkFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLEVBQUE7O2dCQUE5RixXQUFXLEdBQUcsU0FBZ0Y7Z0JBQ3BHLHNCQUFPLFdBQVcsRUFBQTs7O0tBQ25CLENBQUE7QUFDRDtJQUFBO0lBb0dBLENBQUM7SUFuR08sNkJBQU0sR0FBWixVQUFhLE1BQWtCOzs7Ozs7O3dCQUNy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