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
var resource_1 = __importDefault(require("./common/resource"));
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
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(application.appName)];
                    case 4:
                        data = _c.sent();
                        if (!(data['Data']['Applications'].length === 0)) return [3 /*break*/, 5];
                        logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + application.appName + "\uFF0C\u8BF7\u5148\u4F7F\u7528 's deploy' \u547D\u4EE4\u8FDB\u884C\u90E8\u7F72");
                        return [3 /*break*/, 9];
                    case 5:
                        app = data['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 6:
                        res = _c.sent();
                        res.componentType = "sae";
                        if (!outputFile) return [3 /*break*/, 8];
                        cache = {};
                        try {
                            cache = core.fse.readJsonSync(outputFile);
                        }
                        catch (_e) {
                            /**/
                        }
                        cache[application.appName] = res;
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
            var appId, args, _a, region, application, credentials, _b, isHelp, useLocal, useRemote, remoteData, app, configInquire, ans, _c, app, vm, env, slb, applicationObject, changeOrderId, needBindSlb, obj, e_1, res, error_1, slbConfig, result;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        args = inputs.args, _a = inputs.props, region = _a.region, application = _a.application;
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _d.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, resource_1.default.setFilePath(credentials.AccountID, region, application.appName)];
                    case 3:
                        _d.sent();
                        return [4 /*yield*/, utils.parseCommand(args)];
                    case 4:
                        _b = _d.sent(), isHelp = _b.isHelp, useLocal = _b.useLocal, useRemote = _b.useRemote;
                        if (isHelp) {
                            core.help(HELP.DEPLOY);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(application.appName)];
                    case 5:
                        remoteData = _d.sent();
                        if (!useLocal) return [3 /*break*/, 6];
                        return [3 /*break*/, 14];
                    case 6:
                        if (!useRemote) return [3 /*break*/, 8];
                        if (remoteData['Data']['Applications'].length === 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + application.appName + "\uFF0C\u8BF7\u5148\u4F7F\u7528 's deploy' \u547D\u4EE4\u8FDB\u884C\u90E8\u7F72");
                            return [2 /*return*/];
                        }
                        app = remoteData['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 7: return [2 /*return*/, _d.sent()];
                    case 8:
                        if (!(remoteData['Data']['Applications'].length > 0)) return [3 /*break*/, 14];
                        configInquire = constant_1.getInquire(application.appName);
                        return [4 /*yield*/, core_1.inquirer.prompt(configInquire)];
                    case 9:
                        ans = _d.sent();
                        _c = ans.option;
                        switch (_c) {
                            case 'use local': return [3 /*break*/, 10];
                            case 'use remote': return [3 /*break*/, 11];
                        }
                        return [3 /*break*/, 13];
                    case 10: return [3 /*break*/, 14];
                    case 11:
                        app = remoteData['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 12: return [2 /*return*/, _d.sent()];
                    case 13: return [3 /*break*/, 14];
                    case 14:
                        vm = core_1.spinner('设置Namespace...');
                        return [4 /*yield*/, utils.handleEnv(application, credentials)];
                    case 15:
                        env = _d.sent();
                        slb = env.slb;
                        vm.text = "\u4E0A\u4F20\u4EE3\u7801...";
                        return [4 /*yield*/, utils.handleCode(application, credentials)];
                    case 16:
                        applicationObject = _d.sent();
                        return [4 /*yield*/, utils.setDefault(applicationObject)];
                    case 17:
                        _d.sent();
                        needBindSlb = true;
                        _d.label = 18;
                    case 18:
                        _d.trys.push([18, 21, , 29]);
                        vm.text = "\u521B\u5EFA\u5E94\u7528 ...";
                        return [4 /*yield*/, client_1.default.saeClient.createApplication(applicationObject)];
                    case 19:
                        obj = _d.sent();
                        appId = obj['Data']['AppId'];
                        changeOrderId = obj['Data']['ChangeOrderId'];
                        applicationObject.AppId = appId;
                        return [4 /*yield*/, resource_1.default.appendResource('appId', appId)];
                    case 20:
                        _d.sent();
                        return [3 /*break*/, 29];
                    case 21:
                        e_1 = _d.sent();
                        if (!e_1.message.includes('AppName is exsited')) return [3 /*break*/, 27];
                        _d.label = 22;
                    case 22:
                        _d.trys.push([22, 25, , 26]);
                        return [4 /*yield*/, client_1.default.saeClient.updateApplication(applicationObject)];
                    case 23:
                        res = _d.sent();
                        appId = res['Data']['AppId'];
                        changeOrderId = res['Data']['ChangeOrderId'];
                        return [4 /*yield*/, utils.needBindSlb(slb, appId)];
                    case 24:
                        needBindSlb = _d.sent();
                        return [3 /*break*/, 26];
                    case 25:
                        error_1 = _d.sent();
                        vm.stop();
                        logger_1.default.error("" + error_1.result.Message);
                        return [2 /*return*/];
                    case 26: return [3 /*break*/, 28];
                    case 27:
                        vm.stop();
                        logger_1.default.error("" + e_1.result.Message);
                        return [2 /*return*/];
                    case 28: return [3 /*break*/, 29];
                    case 29:
                        // 检查应用部署状态
                        vm.text = "\u5E94\u7528\u6B63\u5728\u90E8\u7F72... \u67E5\u770B\u8BE6\u60C5\uFF1A\n    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=" + changeOrderId + "&regionId=" + region;
                        return [4 /*yield*/, utils.getStatusByOrderId(changeOrderId)];
                    case 30:
                        _d.sent();
                        if (!needBindSlb) return [3 /*break*/, 33];
                        // 绑定SLB
                        vm.text = "\u90E8\u7F72 slb ... ";
                        return [4 /*yield*/, client_1.default.saeClient.bindSLB(slb, appId)];
                    case 31:
                        changeOrderId = _d.sent();
                        // 检查应用部署状态
                        vm.text = "\u6B63\u5728\u7ED1\u5B9Aslb... \u67E5\u770B\u8BE6\u60C5\uFF1A\n    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=" + changeOrderId + "&regionId=" + region;
                        return [4 /*yield*/, utils.checkStatus(appId, 'CoBindSlb')];
                    case 32:
                        _d.sent();
                        _d.label = 33;
                    case 33:
                        // 获取SLB信息
                        vm.text = "\u83B7\u53D6 slb \u4FE1\u606F ... ";
                        return [4 /*yield*/, client_1.default.saeClient.getSLB(appId)];
                    case 34:
                        slbConfig = _d.sent();
                        vm.stop();
                        return [4 /*yield*/, utils.output(applicationObject, slbConfig)];
                    case 35:
                        result = _d.sent();
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
                        return [4 /*yield*/, resource_1.default.setFilePath(credentials.AccountID, region, application.appName)];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(application.appName)];
                    case 5:
                        data = _c.sent();
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + application.appName);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, utils.file2delete(region, application, credentials)];
                    case 6:
                        file = _c.sent();
                        if (!!assumeYes) return [3 /*break*/, 10];
                        _c.label = 7;
                    case 7:
                        _c.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, utils.removePlan(data['Data']['Applications'][0], file)];
                    case 8:
                        removeStatus = _c.sent();
                        if (removeStatus !== 'assumeYes') {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 10];
                    case 9:
                        ex_1 = _c.sent();
                        if ((ex_1 === null || ex_1 === void 0 ? void 0 : ex_1.name) === 'CatchableError') {
                            throw ex_1;
                        }
                        // 异常：不作处理兜底
                        logger_1.default.debug("error: " + ex_1.message);
                        return [3 /*break*/, 10];
                    case 10:
                        appId = data['Data']['Applications'][0]['AppId'];
                        vm = core_1.spinner("\u5220\u9664\u5E94\u7528" + application.appName + "...");
                        _c.label = 11;
                    case 11:
                        _c.trys.push([11, 13, , 14]);
                        return [4 /*yield*/, client_1.default.saeClient.deleteApplication(appId)];
                    case 12:
                        orderId = _c.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        error_2 = _c.sent();
                        vm.stop();
                        logger_1.default.error("" + error_2.result.Message);
                        return [2 /*return*/];
                    case 14: return [4 /*yield*/, utils.getStatusByOrderId(orderId)];
                    case 15:
                        _c.sent();
                        if (!file.filename) return [3 /*break*/, 17];
                        vm.text = "\u5220\u9664 oss \u6587\u4EF6 ... ";
                        return [4 /*yield*/, utils.deleteFile(credentials, region, file.bucketName, file.filename)];
                    case 16:
                        _c.sent();
                        _c.label = 17;
                    case 17:
                        vm.stop();
                        return [4 /*yield*/, resource_1.default.removeResources()];
                    case 18:
                        _c.sent();
                        logger_1.default.success('删除成功');
                        return [2 /*return*/];
                }
            });
        });
    };
    return SaeComponent;
}());
exports.default = SaeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBRTlDLGFBQWE7QUFDYiw4Q0FBMEQ7QUFFMUQsMkRBQXFDO0FBQ3JDLG9EQUF3QztBQUN4QywrQ0FBbUM7QUFDbkMsMkRBQXFDO0FBQ3JDLGdEQUFpRDtBQUNqRCwrREFBNkM7QUFFN0M7SUFBQTtJQXVMQSxDQUFDO0lBckxPLDJCQUFJLEdBQVYsVUFBVyxNQUFrQjs7Ozs7O3dCQUNuQixJQUFJLEdBQXFDLE1BQU0sS0FBM0MsRUFBRSxLQUFtQyxNQUFNLE1BQVgsRUFBckIsTUFBTSxZQUFBLEVBQUUsV0FBVyxpQkFBQSxDQUFjO3dCQUN6QixxQkFBTSxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUE1RCxLQUF5QixTQUFtQyxFQUExRCxNQUFNLFlBQUEsRUFBRSxVQUFVLGdCQUFBO3dCQUMxQixJQUFJLE1BQU0sRUFBRTs0QkFDVixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDckIsc0JBQU87eUJBQ1I7d0JBQ21CLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTdELFdBQVcsR0FBRyxTQUErQzt3QkFDbkUscUJBQU0sZ0JBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFBOzt3QkFBOUMsU0FBOEMsQ0FBQzt3QkFDbEMscUJBQU0sZ0JBQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBbkUsSUFBSSxHQUFHLFNBQTREOzZCQUNyRSxDQUFBLElBQUksQ0FBQyxNQUFN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