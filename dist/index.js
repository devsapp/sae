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
var client_1 = __importDefault(require("./lib/client"));
var utils = __importStar(require("./lib/utils"));
var HELP = __importStar(require("./lib/help"));
var logger_1 = __importDefault(require("./common/logger"));
var constant_1 = require("./lib/help/constant");
var oss_service_1 = __importDefault(require("./lib/oss.service"));
var cache_1 = require("./common/cache");
var SaeComponent = /** @class */ (function () {
    function SaeComponent() {
    }
    SaeComponent.prototype.start = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, application, _a, isHelp, assumeYes, credentials, data, startStatus, ex_1, appId, vm, orderId, error_1, data2, app, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, utils.handlerStartInputs(args)];
                    case 1:
                        _a = _b.sent(), isHelp = _a.isHelp, assumeYes = _a.assumeYes;
                        if (isHelp) {
                            core.help(HELP.START);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(application.region, credentials)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(application.appName)];
                    case 4:
                        data = _b.sent();
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + application.appName);
                            return [2 /*return*/];
                        }
                        if (!!assumeYes) return [3 /*break*/, 8];
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, utils.startPlan()];
                    case 6:
                        startStatus = _b.sent();
                        if (startStatus !== 'assumeYes') {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        ex_1 = _b.sent();
                        if ((ex_1 === null || ex_1 === void 0 ? void 0 : ex_1.name) === 'CatchableError') {
                            throw ex_1;
                        }
                        // 异常：不作处理兜底
                        logger_1.default.debug("error: " + ex_1.message);
                        return [3 /*break*/, 8];
                    case 8:
                        appId = data['Data']['Applications'][0]['AppId'];
                        vm = core_1.spinner("\u542F\u52A8\u5E94\u7528" + application.appName + "...");
                        _b.label = 9;
                    case 9:
                        _b.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, client_1.default.saeClient.startApplication(appId)];
                    case 10:
                        orderId = _b.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_1 = _b.sent();
                        vm.stop();
                        logger_1.default.error("" + error_1.result.Message);
                        return [2 /*return*/];
                    case 12: return [4 /*yield*/, utils.getStatusByOrderId(orderId)];
                    case 13:
                        _b.sent();
                        vm.stop();
                        logger_1.default.success('已启动应用');
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(application.appName)];
                    case 14:
                        data2 = _b.sent();
                        app = data2['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 15:
                        res = _b.sent();
                        res.componentType = "sae";
                        return [2 /*return*/, res];
                }
            });
        });
    };
    SaeComponent.prototype.stop = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, application, _a, isHelp, assumeYes, credentials, data, stopStatus, ex_2, appId, vm, orderId, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, utils.handlerStopInputs(args)];
                    case 1:
                        _a = _b.sent(), isHelp = _a.isHelp, assumeYes = _a.assumeYes;
                        if (isHelp) {
                            core.help(HELP.STOP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(application.region, credentials)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(application.appName)];
                    case 4:
                        data = _b.sent();
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + application.appName);
                            return [2 /*return*/];
                        }
                        if (!!assumeYes) return [3 /*break*/, 8];
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, utils.stopPlan()];
                    case 6:
                        stopStatus = _b.sent();
                        if (stopStatus !== 'assumeYes') {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        ex_2 = _b.sent();
                        if ((ex_2 === null || ex_2 === void 0 ? void 0 : ex_2.name) === 'CatchableError') {
                            throw ex_2;
                        }
                        // 异常：不作处理兜底
                        logger_1.default.debug("error: " + ex_2.message);
                        return [3 /*break*/, 8];
                    case 8:
                        appId = data['Data']['Applications'][0]['AppId'];
                        vm = core_1.spinner("\u505C\u6B62\u5E94\u7528" + application.appName + "...");
                        _b.label = 9;
                    case 9:
                        _b.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, client_1.default.saeClient.stopApplication(appId)];
                    case 10:
                        orderId = _b.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_2 = _b.sent();
                        vm.stop();
                        logger_1.default.error("" + error_2.result.Message);
                        return [2 /*return*/];
                    case 12: return [4 /*yield*/, utils.getStatusByOrderId(orderId)];
                    case 13:
                        _b.sent();
                        vm.stop();
                        logger_1.default.success('已停止应用');
                        return [2 /*return*/];
                }
            });
        });
    };
    SaeComponent.prototype.info = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, application, _a, isHelp, outputFile, credentials, _b, appName, region, data, app, res, cache;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, utils.handlerInfoInputs(args)];
                    case 1:
                        _a = _c.sent(), isHelp = _a.isHelp, outputFile = _a.outputFile;
                        if (isHelp) {
                            core.help(HELP.INFO);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _c.sent();
                        _b = application || {}, appName = _b.appName, region = _b.region;
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName)];
                    case 4:
                        data = _c.sent();
                        if (!(data['Data']['Applications'].length === 0)) return [3 /*break*/, 5];
                        logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName + "\uFF0C\u8BF7\u5148\u4F7F\u7528 's deploy' \u547D\u4EE4\u8FDB\u884C\u90E8\u7F72");
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
                        cache[appName] = res;
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
            var appId, configPath, args, application, appName, region, credentials, _a, isHelp, useLocal, useRemote, remoteData, app, configInquire, ans, _b, app, vm, env, slb, applicationObject, changeOrderId, needBindSlb, obj, e_1, res, error_3, slbConfig, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        configPath = core.lodash.get(inputs, 'path.configPath');
                        args = inputs.args, application = inputs.props.application;
                        appName = application.appName, region = application.region;
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _c.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, utils.parseCommand(args)];
                    case 3:
                        _a = _c.sent(), isHelp = _a.isHelp, useLocal = _a.useLocal, useRemote = _a.useRemote;
                        if (isHelp) {
                            core.help(HELP.DEPLOY);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName)];
                    case 4:
                        remoteData = _c.sent();
                        if (!useLocal) return [3 /*break*/, 5];
                        return [3 /*break*/, 13];
                    case 5:
                        if (!useRemote) return [3 /*break*/, 7];
                        if (remoteData['Data']['Applications'].length === 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName + "\uFF0C\u8BF7\u5148\u4F7F\u7528 's deploy' \u547D\u4EE4\u8FDB\u884C\u90E8\u7F72");
                            return [2 /*return*/];
                        }
                        app = remoteData['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 6: return [2 /*return*/, _c.sent()];
                    case 7:
                        if (!(remoteData['Data']['Applications'].length > 0)) return [3 /*break*/, 13];
                        configInquire = constant_1.getInquire(appName);
                        return [4 /*yield*/, core_1.inquirer.prompt(configInquire)];
                    case 8:
                        ans = _c.sent();
                        _b = ans.option;
                        switch (_b) {
                            case 'use local': return [3 /*break*/, 9];
                            case 'use remote': return [3 /*break*/, 10];
                        }
                        return [3 /*break*/, 12];
                    case 9: return [3 /*break*/, 13];
                    case 10:
                        app = remoteData['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 11: return [2 /*return*/, _c.sent()];
                    case 12: return [3 /*break*/, 13];
                    case 13:
                        vm = core_1.spinner('设置Namespace...');
                        return [4 /*yield*/, utils.handleEnv(application, credentials)];
                    case 14:
                        env = _c.sent();
                        slb = env.slb;
                        vm.text = "\u4E0A\u4F20\u4EE3\u7801...";
                        return [4 /*yield*/, utils.handleCode(application, credentials, configPath)];
                    case 15:
                        applicationObject = _c.sent();
                        return [4 /*yield*/, utils.setDefault(applicationObject)];
                    case 16:
                        _c.sent();
                        needBindSlb = true;
                        _c.label = 17;
                    case 17:
                        _c.trys.push([17, 20, , 27]);
                        vm.text = "\u521B\u5EFA\u5E94\u7528 ...";
                        return [4 /*yield*/, client_1.default.saeClient.createApplication(applicationObject)];
                    case 18:
                        obj = _c.sent();
                        appId = obj['Data']['AppId'];
                        changeOrderId = obj['Data']['ChangeOrderId'];
                        applicationObject.AppId = appId;
                        return [4 /*yield*/, cache_1.writeCreatCache({
                                region: region,
                                appName: appName,
                                configPath: configPath,
                                accountID: credentials.AccountID,
                            }, { appId: appId })];
                    case 19:
                        _c.sent();
                        return [3 /*break*/, 27];
                    case 20:
                        e_1 = _c.sent();
                        if (!e_1.message.includes('AppName is exsited')) return [3 /*break*/, 26];
                        _c.label = 21;
                    case 21:
                        _c.trys.push([21, 24, , 25]);
                        return [4 /*yield*/, client_1.default.saeClient.updateApplication(applicationObject)];
                    case 22:
                        res = _c.sent();
                        appId = res['Data']['AppId'];
                        changeOrderId = res['Data']['ChangeOrderId'];
                        return [4 /*yield*/, utils.needBindSlb(slb, appId)];
                    case 23:
                        needBindSlb = _c.sent();
                        return [3 /*break*/, 25];
                    case 24:
                        error_3 = _c.sent();
                        logger_1.default.error("" + error_3.result.Message);
                        return [3 /*break*/, 25];
                    case 25:
                        vm.stop();
                        return [2 /*return*/];
                    case 26:
                        vm.stop();
                        logger_1.default.error("" + e_1.result.Message);
                        return [2 /*return*/];
                    case 27:
                        // 检查应用部署状态
                        vm.text = "\u5E94\u7528\u6B63\u5728\u90E8\u7F72... \u67E5\u770B\u8BE6\u60C5\uFF1A\n    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=" + changeOrderId + "&regionId=" + region;
                        return [4 /*yield*/, utils.getStatusByOrderId(changeOrderId)];
                    case 28:
                        _c.sent();
                        if (!needBindSlb) return [3 /*break*/, 31];
                        // 绑定SLB
                        vm.text = "\u90E8\u7F72 slb ... ";
                        return [4 /*yield*/, client_1.default.saeClient.bindSLB(slb, appId)];
                    case 29:
                        changeOrderId = _c.sent();
                        // 检查应用部署状态
                        vm.text = "\u6B63\u5728\u7ED1\u5B9Aslb... \u67E5\u770B\u8BE6\u60C5\uFF1A\n    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=" + changeOrderId + "&regionId=" + region;
                        return [4 /*yield*/, utils.checkStatus(appId, 'CoBindSlb')];
                    case 30:
                        _c.sent();
                        _c.label = 31;
                    case 31:
                        // 获取SLB信息
                        vm.text = "\u83B7\u53D6 slb \u4FE1\u606F ... ";
                        return [4 /*yield*/, client_1.default.saeClient.getSLB(appId)];
                    case 32:
                        slbConfig = _c.sent();
                        vm.stop();
                        return [4 /*yield*/, utils.output(applicationObject, slbConfig)];
                    case 33:
                        result = _c.sent();
                        logger_1.default.success("\u90E8\u7F72\u6210\u529F\uFF0C\u8BF7\u901A\u8FC7\u4EE5\u4E0B\u5730\u5740\u8BBF\u95EE\u60A8\u7684\u5E94\u7528\uFF1Ahttp://" + result.accessLink);
                        logger_1.default.success('应用详细信息如下：');
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SaeComponent.prototype.remove = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var args, application, _b, isHelp, assumeYes, _c, appName, region, credentials, data, file, removeStatus, ex_3, appId, vm, orderId, error_4, oss;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, utils.handlerRmInputs(args)];
                    case 1:
                        _b = _d.sent(), isHelp = _b.isHelp, assumeYes = _b.assumeYes;
                        if (isHelp) {
                            core.help(HELP.REMOVE);
                            return [2 /*return*/];
                        }
                        _c = application || {}, appName = _c.appName, region = _c.region;
                        return [4 /*yield*/, core.getCredential((_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 2:
                        credentials = _d.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _d.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName)];
                    case 4:
                        data = _d.sent();
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, utils.file2delete(region, application, credentials)];
                    case 5:
                        file = _d.sent();
                        if (!!assumeYes) return [3 /*break*/, 9];
                        _d.label = 6;
                    case 6:
                        _d.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, utils.removePlan(data['Data']['Applications'][0], file)];
                    case 7:
                        removeStatus = _d.sent();
                        if (removeStatus !== 'assumeYes') {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        ex_3 = _d.sent();
                        if ((ex_3 === null || ex_3 === void 0 ? void 0 : ex_3.name) === 'CatchableError') {
                            throw ex_3;
                        }
                        // 异常：不作处理兜底
                        logger_1.default.debug("error: " + ex_3.message);
                        return [3 /*break*/, 9];
                    case 9:
                        appId = data['Data']['Applications'][0]['AppId'];
                        vm = core_1.spinner("\u5220\u9664\u5E94\u7528" + appName + "...");
                        _d.label = 10;
                    case 10:
                        _d.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, client_1.default.saeClient.deleteApplication(appId)];
                    case 11:
                        orderId = _d.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        error_4 = _d.sent();
                        vm.stop();
                        logger_1.default.error("" + error_4.result.Message);
                        return [2 /*return*/];
                    case 13: return [4 /*yield*/, utils.getStatusByOrderId(orderId)];
                    case 14:
                        _d.sent();
                        if (!file.filename) return [3 /*break*/, 16];
                        vm.text = "\u5220\u9664 oss \u6587\u4EF6 ... ";
                        oss = new oss_service_1.default({ bucket: file.bucketName, region: region, credentials: credentials });
                        return [4 /*yield*/, oss.deleteFile(file.filename)];
                    case 15:
                        _d.sent();
                        _d.label = 16;
                    case 16:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBRTlDLGFBQWE7QUFDYiw4Q0FBMEQ7QUFFMUQsd0RBQWtDO0FBQ2xDLGlEQUFxQztBQUNyQywrQ0FBbUM7QUFDbkMsMkRBQXFDO0FBQ3JDLGdEQUFpRDtBQUNqRCxrRUFBb0M7QUFDcEMsd0NBQWlEO0FBRWpEO0lBQUE7SUE2UkEsQ0FBQztJQTNSTyw0QkFBSyxHQUFYLFVBQVksTUFBa0I7Ozs7Ozt3QkFDcEIsSUFBSSxHQUE2QixNQUFNLEtBQW5DLEVBQVcsV0FBVyxHQUFPLE1BQU0sa0JBQWIsQ0FBYzt3QkFDbEIscUJBQU0sS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBNUQsS0FBd0IsU0FBb0MsRUFBMUQsTUFBTSxZQUFBLEVBQUUsU0FBUyxlQUFBO3dCQUN6QixJQUFJLE1BQU0sRUFBRTs0QkFDVixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDdEIsc0JBQU87eUJBQ1I7d0JBQ21CLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTdELFdBQVcsR0FBRyxTQUErQzt3QkFDbkUscUJBQU0sZ0JBQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsRUFBQTs7d0JBQTFELFNBQTBELENBQUM7d0JBQ2hELHFCQUFNLGdCQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBQTs7d0JBQW5FLElBQUksR0FBRyxTQUE0RDt3QkFDdkUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFD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