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
var constant_1 = require("./lib/help/constant");
var resource_1 = require("./common/resource");
var SaeComponent = /** @class */ (function () {
    function SaeComponent() {
    }
    SaeComponent.prototype.info = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, _a, region, application, _b, isHelp, outputFile, credentials, data, app, res, cache;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        args = inputs.args, _a = inputs.props, region = _a.region, application = _a.application;
                        return [4 /*yield*/, utils.handlerInfoInputs(args)];
                    case 1:
                        _b = _c.sent(), isHelp = _b.isHelp, outputFile = _b.outputFile;
                        if (isHelp) {
                            core.help(HELP.INFO);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _c.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(application.name)];
                    case 4:
                        data = _c.sent();
                        if (!(data['Data']['Applications'].length === 0)) return [3 /*break*/, 5];
                        logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + application.name + "\uFF0C\u8BF7\u5148\u4F7F\u7528 's deploy' \u547D\u4EE4\u8FDB\u884C\u90E8\u7F72");
                        return [3 /*break*/, 9];
                    case 5:
                        app = data['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 6:
                        res = _c.sent();
                        if (!outputFile) return [3 /*break*/, 8];
                        cache = {};
                        try {
                            cache = core.fse.readJsonSync(outputFile);
                        }
                        catch (_e) {
                            /**/
                        }
                        cache[application.name] = res;
                        return [4 /*yield*/, core.fse.outputFile(outputFile, JSON.stringify(cache, null, 2))];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8: return [2 /*return*/, res];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    SaeComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var appId, args, _a, region, application, slb, credentials, _b, isHelp, useLocal, useRemote, remoteData, app, configInquire, ans, _c, app, resource, createApp, vm, env, applicationObject, changeOrderId, needBindSlb, obj, e_1, res, error_1, slbConfig, result;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        args = inputs.args, _a = inputs.props, region = _a.region, application = _a.application, slb = _a.slb;
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _d.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, utils.parseCommand(args)];
                    case 3:
                        _b = _d.sent(), isHelp = _b.isHelp, useLocal = _b.useLocal, useRemote = _b.useRemote;
                        if (isHelp) {
                            core.help(HELP.DEPLOY);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(application.name)];
                    case 4:
                        remoteData = _d.sent();
                        if (!useLocal) return [3 /*break*/, 5];
                        return [3 /*break*/, 13];
                    case 5:
                        if (!useRemote) return [3 /*break*/, 7];
                        if (remoteData['Data']['Applications'].length === 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + application.name + "\uFF0C\u8BF7\u5148\u4F7F\u7528 's deploy' \u547D\u4EE4\u8FDB\u884C\u90E8\u7F72");
                            return [2 /*return*/];
                        }
                        app = remoteData['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 6: return [2 /*return*/, _d.sent()];
                    case 7:
                        if (!(remoteData['Data']['Applications'].length > 0)) return [3 /*break*/, 13];
                        configInquire = constant_1.getInquire(application.name);
                        return [4 /*yield*/, core_1.inquirer.prompt(configInquire)];
                    case 8:
                        ans = _d.sent();
                        _c = ans.option;
                        switch (_c) {
                            case 'use local': return [3 /*break*/, 9];
                            case 'use remote': return [3 /*break*/, 10];
                        }
                        return [3 /*break*/, 12];
                    case 9: return [3 /*break*/, 13];
                    case 10:
                        app = remoteData['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 11: return [2 /*return*/, _d.sent()];
                    case 12: return [3 /*break*/, 13];
                    case 13:
                        resource = {
                            type: 'sae',
                            region: region,
                            appName: application.name,
                        };
                        createApp = true;
                        vm = core_1.spinner('设置Namespace...');
                        return [4 /*yield*/, utils.handleEnv(inputs, application, credentials, resource)];
                    case 14:
                        env = _d.sent();
                        slb = env.slb;
                        vm.text = "\u4E0A\u4F20\u4EE3\u7801...";
                        return [4 /*yield*/, utils.handleCode(region, application, credentials, resource)];
                    case 15:
                        applicationObject = _d.sent();
                        return [4 /*yield*/, utils.setDefault(applicationObject)];
                    case 16:
                        _d.sent();
                        needBindSlb = true;
                        _d.label = 17;
                    case 17:
                        _d.trys.push([17, 19, , 27]);
                        vm.text = "\u521B\u5EFA\u5E94\u7528 ...";
                        return [4 /*yield*/, client_1.default.saeClient.createApplication(applicationObject)];
                    case 18:
                        obj = _d.sent();
                        appId = obj['Data']['AppId'];
                        changeOrderId = obj['Data']['ChangeOrderId'];
                        applicationObject.AppId = appId;
                        resource.appId = appId;
                        return [3 /*break*/, 27];
                    case 19:
                        e_1 = _d.sent();
                        if (!e_1.message.includes('AppName is exsited')) return [3 /*break*/, 25];
                        _d.label = 20;
                    case 20:
                        _d.trys.push([20, 23, , 24]);
                        createApp = false;
                        return [4 /*yield*/, client_1.default.saeClient.updateApplication(applicationObject)];
                    case 21:
                        res = _d.sent();
                        appId = res['Data']['AppId'];
                        changeOrderId = res['Data']['ChangeOrderId'];
                        return [4 /*yield*/, utils.needBindSlb(slb, appId)];
                    case 22:
                        needBindSlb = _d.sent();
                        return [3 /*break*/, 24];
                    case 23:
                        error_1 = _d.sent();
                        vm.stop();
                        logger_1.default.error("" + error_1.result.Message);
                        return [2 /*return*/];
                    case 24: return [3 /*break*/, 26];
                    case 25:
                        vm.stop();
                        logger_1.default.error("" + e_1.result.Message);
                        return [2 /*return*/];
                    case 26: return [3 /*break*/, 27];
                    case 27:
                        // 检查应用部署状态
                        vm.text = "\u5E94\u7528\u6B63\u5728\u90E8\u7F72... \u67E5\u770B\u8BE6\u60C5\uFF1A\n    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=" + changeOrderId + "&regionId=" + region;
                        return [4 /*yield*/, utils.getStatusByOrderId(changeOrderId)];
                    case 28:
                        _d.sent();
                        if (!needBindSlb) return [3 /*break*/, 31];
                        // 绑定SLB
                        vm.text = "\u90E8\u7F72 slb ... ";
                        return [4 /*yield*/, client_1.default.saeClient.bindSLB(slb, appId)];
                    case 29:
                        changeOrderId = _d.sent();
                        // 检查应用部署状态
                        vm.text = "\u6B63\u5728\u7ED1\u5B9Aslb... \u67E5\u770B\u8BE6\u60C5\uFF1A\n    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=" + changeOrderId + "&regionId=" + region;
                        return [4 /*yield*/, utils.checkStatus(appId, 'CoBindSlb')];
                    case 30:
                        _d.sent();
                        _d.label = 31;
                    case 31:
                        // 获取SLB信息
                        vm.text = "\u83B7\u53D6 slb \u4FE1\u606F ... ";
                        return [4 /*yield*/, client_1.default.saeClient.getSLB(appId)];
                    case 32:
                        slbConfig = _d.sent();
                        vm.stop();
                        return [4 /*yield*/, utils.output(applicationObject, slbConfig)];
                    case 33:
                        result = _d.sent();
                        resource.slb = result.slb;
                        if (!createApp) return [3 /*break*/, 35];
                        return [4 /*yield*/, resource_1.putResources(credentials.AccountID, resource)];
                    case 34:
                        _d.sent();
                        _d.label = 35;
                    case 35:
                        logger_1.default.success("\u90E8\u7F72\u6210\u529F\uFF0C\u8BF7\u901A\u8FC7\u4EE5\u4E0B\u5730\u5740\u8BBF\u95EE\u60A8\u7684\u5E94\u7528\uFF1Ahttp://" + result.accessLink);
                        logger_1.default.success('应用详细信息如下：');
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SaeComponent.prototype.remove = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, _a, region, application, _b, isHelp, assumeYes, credentials, data, file, removeStatus, ex_1, appId, vm, orderId, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        args = inputs.args, _a = inputs.props, region = _a.region, application = _a.application;
                        return [4 /*yield*/, utils.handlerRmInputs(args)];
                    case 1:
                        _b = _c.sent(), isHelp = _b.isHelp, assumeYes = _b.assumeYes;
                        if (isHelp) {
                            core.help(HELP.REMOVE);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _c.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(application.name)];
                    case 4:
                        data = _c.sent();
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + application.name);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, utils.file2delete(region, application, credentials)];
                    case 5:
                        file = _c.sent();
                        if (!!assumeYes) return [3 /*break*/, 9];
                        _c.label = 6;
                    case 6:
                        _c.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, utils.removePlan(data['Data']['Applications'][0], file)];
                    case 7:
                        removeStatus = _c.sent();
                        if (removeStatus !== 'assumeYes') {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        ex_1 = _c.sent();
                        if ((ex_1 === null || ex_1 === void 0 ? void 0 : ex_1.name) === 'CatchableError') {
                            throw ex_1;
                        }
                        // 异常：不作处理兜底
                        logger_1.default.debug("error: " + ex_1.message);
                        return [3 /*break*/, 9];
                    case 9:
                        appId = data['Data']['Applications'][0]['AppId'];
                        vm = core_1.spinner("\u5220\u9664\u5E94\u7528" + application.name + "...");
                        _c.label = 10;
                    case 10:
                        _c.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, client_1.default.saeClient.deleteApplication(appId)];
                    case 11:
                        orderId = _c.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        error_2 = _c.sent();
                        vm.stop();
                        logger_1.default.error("" + error_2.result.Message);
                        return [2 /*return*/];
                    case 13: return [4 /*yield*/, utils.getStatusByOrderId(orderId)];
                    case 14:
                        _c.sent();
                        return [4 /*yield*/, resource_1.removeResources(credentials.AccountID, region, application.name)];
                    case 15:
                        _c.sent();
                        if (!file.fileName) return [3 /*break*/, 17];
                        vm.text = "\u5220\u9664 oss \u6587\u4EF6 ... ";
                        return [4 /*yield*/, utils.deleteFile(credentials, file.bucket, file.fileName)];
                    case 16:
                        _c.sent();
                        _c.label = 17;
                    case 17:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBRTlDLGFBQWE7QUFDYiw4Q0FBMEQ7QUFFMUQsMkRBQXFDO0FBQ3JDLG9EQUF3QztBQUN4QywrQ0FBbUM7QUFDbkMsMkRBQXFDO0FBQ3JDLGdEQUFpRDtBQUNqRCw4Q0FBMEU7QUFFMUU7SUFBQTtJQThMQSxDQUFDO0lBNUxPLDJCQUFJLEdBQVYsVUFBVyxNQUFrQjs7Ozs7O3dCQUNuQixJQUFJLEdBQXFDLE1BQU0sS0FBM0MsRUFBRSxLQUFtQyxNQUFNLE1BQVgsRUFBckIsTUFBTSxZQUFBLEVBQUUsV0FBVyxpQkFBQSxDQUFjO3dCQUN6QixxQkFBTSxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUE1RCxLQUF5QixTQUFtQyxFQUExRCxNQUFNLFlBQUEsRUFBRSxVQUFVLGdCQUFBO3dCQUMxQixJQUFJLE1BQU0sRUFBRTs0QkFDVixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDckIsc0JBQU87eUJBQ1I7d0JBQ21CLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTdELFdBQVcsR0FBRyxTQUErQzt3QkFDbkUscUJBQU0sZ0JBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFBOzt3QkFBOUMsU0FBOEMsQ0FBQzt3QkFDbEMscUJBQU0sZ0JBQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBaEUsSUFBSSxHQUFHLFNBQXlEOzZCQUNsRSxDQUFBLElBQUksQ0FBQyxNQUFN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