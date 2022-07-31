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
var core_1 = require("@serverless-devs/core");
var client_1 = __importDefault(require("./common/client"));
var utils = __importStar(require("./common/utils"));
var HELP = __importStar(require("./lib/help"));
var logger_1 = __importDefault(require("./common/logger"));
var SaeComponent = /** @class */ (function () {
    function SaeComponent() {
    }
    SaeComponent.prototype.isHelp = function (args, argsObj) {
        // @ts-ignore
        var comParse = core.commandParse({ args: args, argsObj: argsObj }, this.MINIMIST_HELP_OPT);
        var data = comParse === null || comParse === void 0 ? void 0 : comParse.data;
        return (data === null || data === void 0 ? void 0 : data.h) || (data === null || data === void 0 ? void 0 : data.help);
    };
    SaeComponent.prototype.info = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, _a, region, application, credentials, AccessKeyID, AccessKeySecret, data, app, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args, _a = inputs.props, region = _a.region, application = _a.application;
                        if (this.isHelp(args)) {
                            core.help(HELP.INFO);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _b.sent();
                        AccessKeyID = credentials.AccessKeyID, AccessKeySecret = credentials.AccessKeySecret;
                        return [4 /*yield*/, client_1.default.setSaeClient(region, AccessKeyID, AccessKeySecret)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(application.name)];
                    case 3:
                        data = _b.sent();
                        if (!(data['Data']['Applications'].length == 0)) return [3 /*break*/, 4];
                        logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + application.name + "\uFF0C\u8BF7\u5148\u4F7F\u7528 's deploy' \u547D\u4EE4\u8FDB\u884C\u90E8\u7F72");
                        return [3 /*break*/, 6];
                    case 4:
                        app = data['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 5:
                        res = _b.sent();
                        return [2 /*return*/, res];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SaeComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var appId, _a, region, application, slb, credentials, AccessKeyID, AccessKeySecret, vm, env, applicationObject, changeOrderId, obj, e_1, res, error_1, slbConfig, addr, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = inputs.props, region = _a.region, application = _a.application, slb = _a.slb;
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _b.sent();
                        AccessKeyID = credentials.AccessKeyID, AccessKeySecret = credentials.AccessKeySecret;
                        return [4 /*yield*/, client_1.default.setSaeClient(region, AccessKeyID, AccessKeySecret)];
                    case 2:
                        _b.sent();
                        vm = core_1.spinner('创建Namespace...');
                        return [4 /*yield*/, utils.handleEnv(inputs, application, credentials)];
                    case 3:
                        env = _b.sent();
                        slb = env.slb;
                        vm.text = "\u4E0A\u4F20\u4EE3\u7801...";
                        return [4 /*yield*/, utils.handleCode(region, application, credentials)];
                    case 4:
                        applicationObject = _b.sent();
                        return [4 /*yield*/, utils.setDefault(applicationObject)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 8, , 15]);
                        vm.text = "\u521B\u5EFA\u5E94\u7528 ...";
                        return [4 /*yield*/, client_1.default.saeClient.createApplication(applicationObject)];
                    case 7:
                        obj = _b.sent();
                        appId = obj['Data']['AppId'];
                        changeOrderId = obj['Data']['ChangeOrderId'];
                        applicationObject.AppId = appId;
                        return [3 /*break*/, 15];
                    case 8:
                        e_1 = _b.sent();
                        if (!e_1.message.includes('AppName is exsited')) return [3 /*break*/, 13];
                        vm.text = "\u5E94\u7528\u5DF2\u5B58\u5728\uFF0C\u8FDB\u884C\u66F4\u65B0 ...";
                        _b.label = 9;
                    case 9:
                        _b.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, client_1.default.saeClient.updateApplication(applicationObject)];
                    case 10:
                        res = _b.sent();
                        appId = res['Data']['AppId'];
                        changeOrderId = res['Data']['ChangeOrderId'];
                        return [3 /*break*/, 12];
                    case 11:
                        error_1 = _b.sent();
                        vm.stop();
                        logger_1.default.error("" + error_1.result.Message);
                        return [2 /*return*/];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        vm.stop();
                        logger_1.default.error("" + e_1.result.Message);
                        return [2 /*return*/];
                    case 14: return [3 /*break*/, 15];
                    case 15:
                        // 检查应用部署状态
                        vm.text = "\u5E94\u7528\u6709\u53D8\u66F4\u6D41\u7A0B\u6B63\u5728\u6267\u884C, \u5904\u4E8E\u6267\u884C\u4E2D\u72B6\u6001\u3002\u67E5\u770B\u8BE6\u60C5\uFF1A\n    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=" + changeOrderId + "&regionId=" + region;
                        return [4 /*yield*/, utils.getStatusByOrderId(changeOrderId)];
                    case 16:
                        _b.sent();
                        slbConfig = null;
                        addr = null;
                        if (!slb) return [3 /*break*/, 20];
                        vm.text = "\u90E8\u7F72 slb ... ";
                        return [4 /*yield*/, client_1.default.saeClient.bindSLB(slb, appId)];
                    case 17:
                        changeOrderId = _b.sent();
                        // 检查应用部署状态
                        vm.text = "\u5E94\u7528\u6709\u53D8\u66F4\u6D41\u7A0B\u6B63\u5728\u6267\u884C, \u5904\u4E8E\u6267\u884C\u4E2D\u72B6\u6001\u3002\u67E5\u770B\u8BE6\u60C5\uFF1A\n    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=" + changeOrderId + "&regionId=" + region;
                        return [4 /*yield*/, utils.checkStatus(appId, 'CoBindSlb')];
                    case 18:
                        _b.sent();
                        // 获取SLB信息
                        vm.text = "\u83B7\u53D6 slb \u4FE1\u606F ... ";
                        return [4 /*yield*/, client_1.default.saeClient.getSLB(appId)];
                    case 19:
                        slbConfig = _b.sent();
                        addr = slbConfig["Data"]['InternetIp'] ? slbConfig["Data"]['InternetIp'] : slbConfig["Data"]['IntranetSlbId'];
                        _b.label = 20;
                    case 20:
                        vm.stop();
                        logger_1.default.success("\u90E8\u7F72\u6210\u529F\uFF0C\u8BF7\u901A\u8FC7\u4EE5\u4E0B\u5730\u5740\u8BBF\u95EE\u60A8\u7684\u5E94\u7528\uFF1A" + addr);
                        logger_1.default.success('应用详细信息如下：');
                        result = utils.output(applicationObject, slbConfig);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SaeComponent.prototype.remove = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, region, application, credentials, AccessKeyID, AccessKeySecret, data, appId, vm, orderId, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = inputs.props, region = _a.region, application = _a.application;
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _b.sent();
                        AccessKeyID = credentials.AccessKeyID, AccessKeySecret = credentials.AccessKeySecret;
                        return [4 /*yield*/, client_1.default.setSaeClient(region, AccessKeyID, AccessKeySecret)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(application.name)];
                    case 3:
                        data = _b.sent();
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + application.name + "\uFF0C\u8BF7\u5148\u4F7F\u7528 's deploy' \u547D\u4EE4\u8FDB\u884C\u90E8\u7F72");
                            return [2 /*return*/];
                        }
                        appId = data['Data']['Applications'][0]['AppId'];
                        vm = core_1.spinner("\u5220\u9664\u5E94\u7528" + application.name + "...");
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, client_1.default.saeClient.deleteApplication(appId)];
                    case 5:
                        orderId = _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _b.sent();
                        vm.stop();
                        logger_1.default.error("" + error_2.result.Message);
                        return [2 /*return*/];
                    case 7: return [4 /*yield*/, utils.getStatusByOrderId(orderId)];
                    case 8:
                        _b.sent();
                        if (!application.code.package) return [3 /*break*/, 10];
                        vm.text = "\u5220\u9664 oss \u6587\u4EF6 ... ";
                        return [4 /*yield*/, utils.deleteOssFile(region, application, credentials)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10:
                        vm.stop();
                        logger_1.default.success('删除成功');
                        return [2 /*return*/];
                }
            });
        });
    };
    return SaeComponent;
}());
exports.default = SaeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBRTlDLGFBQWE7QUFDYiw4Q0FBZ0Q7QUFFaEQsMkRBQXFDO0FBQ3JDLG9EQUF3QztBQUN4QywrQ0FBbUM7QUFDbkMsMkRBQXFDO0FBRXJDO0lBQUE7SUE2SEEsQ0FBQztJQTVIQyw2QkFBTSxHQUFOLFVBQU8sSUFBWSxFQUFFLE9BQWE7UUFDaEMsYUFBYTtRQUNiLElBQU0sUUFBUSxHQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ25GLElBQU0sSUFBSSxHQUFHLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxJQUFJLENBQUE7UUFDM0IsT0FBTyxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxDQUFDLE1BQUksSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLElBQUksQ0FBQSxDQUFDO0lBQy9CLENBQUM7SUFFSywyQkFBSSxHQUFWLFVBQVcsTUFBa0I7Ozs7Ozt3QkFDbkIsSUFBSSxHQUFxQyxNQUFNLEtBQTNDLEVBQUUsS0FBbUMsTUFBTSxNQUFYLEVBQXJCLE1BQU0sWUFBQSxFQUFFLFdBQVcsaUJBQUEsQ0FBYzt3QkFDeEQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDckIsc0JBQU87eUJBQ1I7d0JBQ21CLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMs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