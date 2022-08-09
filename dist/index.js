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
var SaeComponent = /** @class */ (function () {
    function SaeComponent() {
    }
    SaeComponent.prototype.info = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, application, _a, isHelp, outputFile, credentials, data, app, res, cache;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, utils.handlerInfoInputs(args)];
                    case 1:
                        _a = _b.sent(), isHelp = _a.isHelp, outputFile = _a.outputFile;
                        if (isHelp) {
                            core.help(HELP.INFO);
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
                        if (!(data['Data']['Applications'].length === 0)) return [3 /*break*/, 5];
                        logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + application.appName + "\uFF0C\u8BF7\u5148\u4F7F\u7528 's deploy' \u547D\u4EE4\u8FDB\u884C\u90E8\u7F72");
                        return [3 /*break*/, 9];
                    case 5:
                        app = data['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 6:
                        res = _b.sent();
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
                        _b.sent();
                        _b.label = 8;
                    case 8: return [2 /*return*/, res];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    SaeComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var appId, args, application, credentials, _a, isHelp, useLocal, useRemote, remoteData, app, configInquire, ans, _b, app, vm, env, slb, applicationObject, changeOrderId, needBindSlb, obj, e_1, res, error_1, slbConfig, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _c.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(application.region, credentials)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, utils.parseCommand(args)];
                    case 3:
                        _a = _c.sent(), isHelp = _a.isHelp, useLocal = _a.useLocal, useRemote = _a.useRemote;
                        if (isHelp) {
                            core.help(HELP.DEPLOY);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(application.appName)];
                    case 4:
                        remoteData = _c.sent();
                        if (!useLocal) return [3 /*break*/, 5];
                        return [3 /*break*/, 13];
                    case 5:
                        if (!useRemote) return [3 /*break*/, 7];
                        if (remoteData['Data']['Applications'].length === 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + application.appName + "\uFF0C\u8BF7\u5148\u4F7F\u7528 's deploy' \u547D\u4EE4\u8FDB\u884C\u90E8\u7F72");
                            return [2 /*return*/];
                        }
                        app = remoteData['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 6: return [2 /*return*/, _c.sent()];
                    case 7:
                        if (!(remoteData['Data']['Applications'].length > 0)) return [3 /*break*/, 13];
                        configInquire = constant_1.getInquire(application.appName);
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
                        return [4 /*yield*/, utils.handleCode(application, credentials)];
                    case 15:
                        applicationObject = _c.sent();
                        return [4 /*yield*/, utils.setDefault(applicationObject)];
                    case 16:
                        _c.sent();
                        needBindSlb = true;
                        _c.label = 17;
                    case 17:
                        _c.trys.push([17, 19, , 27]);
                        vm.text = "\u521B\u5EFA\u5E94\u7528 ...";
                        return [4 /*yield*/, client_1.default.saeClient.createApplication(applicationObject)];
                    case 18:
                        obj = _c.sent();
                        appId = obj['Data']['AppId'];
                        changeOrderId = obj['Data']['ChangeOrderId'];
                        applicationObject.AppId = appId;
                        return [3 /*break*/, 27];
                    case 19:
                        e_1 = _c.sent();
                        if (!e_1.message.includes('AppName is exsited')) return [3 /*break*/, 25];
                        _c.label = 20;
                    case 20:
                        _c.trys.push([20, 23, , 24]);
                        return [4 /*yield*/, client_1.default.saeClient.updateApplication(applicationObject)];
                    case 21:
                        res = _c.sent();
                        appId = res['Data']['AppId'];
                        changeOrderId = res['Data']['ChangeOrderId'];
                        return [4 /*yield*/, utils.needBindSlb(slb, appId)];
                    case 22:
                        needBindSlb = _c.sent();
                        return [3 /*break*/, 24];
                    case 23:
                        error_1 = _c.sent();
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
                        vm.text = "\u5E94\u7528\u6B63\u5728\u90E8\u7F72... \u67E5\u770B\u8BE6\u60C5\uFF1A\n    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=" + changeOrderId + "&regionId=" + application.region;
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
                        vm.text = "\u6B63\u5728\u7ED1\u5B9Aslb... \u67E5\u770B\u8BE6\u60C5\uFF1A\n    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=" + changeOrderId + "&regionId=" + application.region;
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
        return __awaiter(this, void 0, void 0, function () {
            var args, application, _a, isHelp, assumeYes, credentials, data, file, removeStatus, ex_1, appId, vm, orderId, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, utils.handlerRmInputs(args)];
                    case 1:
                        _a = _b.sent(), isHelp = _a.isHelp, assumeYes = _a.assumeYes;
                        if (isHelp) {
                            core.help(HELP.REMOVE);
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
                        return [4 /*yield*/, utils.file2delete(application.region, application, credentials)];
                    case 5:
                        file = _b.sent();
                        if (!!assumeYes) return [3 /*break*/, 9];
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, utils.removePlan(data['Data']['Applications'][0], file)];
                    case 7:
                        removeStatus = _b.sent();
                        if (removeStatus !== 'assumeYes') {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        ex_1 = _b.sent();
                        if ((ex_1 === null || ex_1 === void 0 ? void 0 : ex_1.name) === 'CatchableError') {
                            throw ex_1;
                        }
                        // 异常：不作处理兜底
                        logger_1.default.debug("error: " + ex_1.message);
                        return [3 /*break*/, 9];
                    case 9:
                        appId = data['Data']['Applications'][0]['AppId'];
                        vm = core_1.spinner("\u5220\u9664\u5E94\u7528" + application.appName + "...");
                        _b.label = 10;
                    case 10:
                        _b.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, client_1.default.saeClient.deleteApplication(appId)];
                    case 11:
                        orderId = _b.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        error_2 = _b.sent();
                        vm.stop();
                        logger_1.default.error("" + error_2.result.Message);
                        return [2 /*return*/];
                    case 13: return [4 /*yield*/, utils.getStatusByOrderId(orderId)];
                    case 14:
                        _b.sent();
                        if (!file.filename) return [3 /*break*/, 16];
                        vm.text = "\u5220\u9664 oss \u6587\u4EF6 ... ";
                        return [4 /*yield*/, utils.deleteFile(credentials, application.region, file.bucketName, file.filename)];
                    case 15:
                        _b.sent();
                        _b.label = 16;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBRTlDLGFBQWE7QUFDYiw4Q0FBMEQ7QUFFMUQsMkRBQXFDO0FBQ3JDLG9EQUF3QztBQUN4QywrQ0FBbUM7QUFDbkMsMkRBQXFDO0FBQ3JDLGdEQUFpRDtBQUdqRDtJQUFBO0lBbUxBLENBQUM7SUFqTE8sMkJBQUksR0FBVixVQUFXLE1BQWtCOzs7Ozs7d0JBQ25CLElBQUksR0FBNkIsTUFBTSxLQUFuQyxFQUFXLFdBQVcsR0FBTyxNQUFNLGtCQUFiLENBQWM7d0JBQ2pCLHFCQUFNLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQTVELEtBQXlCLFNBQW1DLEVBQTFELE1BQU0sWUFBQSxFQUFFLFVBQVUsZ0JBQUE7d0JBQzFCLElBQUksTUFBTSxFQUFFOzRCQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNyQixzQkFBTzt5QkFDUjt3QkFDbUIscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBN0QsV0FBVyxHQUFHLFNBQStDO3dCQUNuRSxxQkFBTSxnQkFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFBOzt3QkFBMUQsU0FBMEQsQ0FBQzt3QkFDOUMscUJBQU0sZ0JBQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBbkUsSUFBSSxHQUFHLFNBQTREOzZCQUNyRSxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFN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