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
            var args, _a, region, application, isHelp, credentials, AccessKeyID, AccessKeySecret, data, app, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args, _a = inputs.props, region = _a.region, application = _a.application;
                        return [4 /*yield*/, utils.parseCommand(args)];
                    case 1:
                        isHelp = (_b.sent()).isHelp;
                        if (isHelp) {
                            core.help(HELP.INFO);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        AccessKeyID = credentials.AccessKeyID, AccessKeySecret = credentials.AccessKeySecret;
                        return [4 /*yield*/, client_1.default.setSaeClient(region, AccessKeyID, AccessKeySecret)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(application.name)];
                    case 4:
                        data = _b.sent();
                        if (!(data['Data']['Applications'].length === 0)) return [3 /*break*/, 5];
                        logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + application.name + "\uFF0C\u8BF7\u5148\u4F7F\u7528 's deploy' \u547D\u4EE4\u8FDB\u884C\u90E8\u7F72");
                        return [3 /*break*/, 7];
                    case 5:
                        app = data['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 6:
                        res = _b.sent();
                        return [2 /*return*/, res];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SaeComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var appId, args, _a, region, application, slb, credentials, AccessKeyID, AccessKeySecret, _b, isHelp, useLocal, useRemote, remoteData, app, ans, _c, app, vm, env, applicationObject, changeOrderId, obj, e_1, res, error_1, slbConfig, addr, result;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        args = inputs.args, _a = inputs.props, region = _a.region, application = _a.application, slb = _a.slb;
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _d.sent();
                        AccessKeyID = credentials.AccessKeyID, AccessKeySecret = credentials.AccessKeySecret;
                        return [4 /*yield*/, client_1.default.setSaeClient(region, AccessKeyID, AccessKeySecret)];
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
                        return [4 /*yield*/, core_1.inquirer.prompt(constant_1.configInquire)];
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
                        vm = core_1.spinner('创建Namespace...');
                        return [4 /*yield*/, utils.handleEnv(inputs, application, credentials)];
                    case 14:
                        env = _d.sent();
                        slb = env.slb;
                        vm.text = "\u4E0A\u4F20\u4EE3\u7801...";
                        return [4 /*yield*/, utils.handleCode(region, application, credentials)];
                    case 15:
                        applicationObject = _d.sent();
                        return [4 /*yield*/, utils.setDefault(applicationObject)];
                    case 16:
                        _d.sent();
                        _d.label = 17;
                    case 17:
                        _d.trys.push([17, 19, , 26]);
                        vm.text = "\u521B\u5EFA\u5E94\u7528 ...";
                        return [4 /*yield*/, client_1.default.saeClient.createApplication(applicationObject)];
                    case 18:
                        obj = _d.sent();
                        appId = obj['Data']['AppId'];
                        changeOrderId = obj['Data']['ChangeOrderId'];
                        applicationObject.AppId = appId;
                        return [3 /*break*/, 26];
                    case 19:
                        e_1 = _d.sent();
                        if (!e_1.message.includes('AppName is exsited')) return [3 /*break*/, 24];
                        _d.label = 20;
                    case 20:
                        _d.trys.push([20, 22, , 23]);
                        return [4 /*yield*/, client_1.default.saeClient.updateApplication(applicationObject)];
                    case 21:
                        res = _d.sent();
                        appId = res['Data']['AppId'];
                        changeOrderId = res['Data']['ChangeOrderId'];
                        return [3 /*break*/, 23];
                    case 22:
                        error_1 = _d.sent();
                        vm.stop();
                        logger_1.default.error("" + error_1.result.Message);
                        return [2 /*return*/];
                    case 23: return [3 /*break*/, 25];
                    case 24:
                        vm.stop();
                        logger_1.default.error("" + e_1.result.Message);
                        return [2 /*return*/];
                    case 25: return [3 /*break*/, 26];
                    case 26:
                        // 检查应用部署状态
                        vm.text = "\u5E94\u7528\u6B63\u5728\u90E8\u7F72... \u67E5\u770B\u8BE6\u60C5\uFF1A\n    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=" + changeOrderId + "&regionId=" + region;
                        return [4 /*yield*/, utils.getStatusByOrderId(changeOrderId)];
                    case 27:
                        _d.sent();
                        slbConfig = null;
                        addr = null;
                        if (!slb) return [3 /*break*/, 31];
                        vm.text = "\u90E8\u7F72 slb ... ";
                        return [4 /*yield*/, client_1.default.saeClient.bindSLB(slb, appId)];
                    case 28:
                        changeOrderId = _d.sent();
                        // 检查应用部署状态
                        vm.text = "\u6B63\u5728\u7ED1\u5B9Aslb... \u67E5\u770B\u8BE6\u60C5\uFF1A\n    https://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=" + changeOrderId + "&regionId=" + region;
                        return [4 /*yield*/, utils.checkStatus(appId, 'CoBindSlb')];
                    case 29:
                        _d.sent();
                        // 获取SLB信息
                        vm.text = "\u83B7\u53D6 slb \u4FE1\u606F ... ";
                        return [4 /*yield*/, client_1.default.saeClient.getSLB(appId)];
                    case 30:
                        slbConfig = _d.sent();
                        addr = slbConfig["Data"]['InternetIp'] ? slbConfig["Data"]['InternetIp'] : slbConfig["Data"]['IntranetSlbId'];
                        _d.label = 31;
                    case 31:
                        vm.stop();
                        logger_1.default.success("\u90E8\u7F72\u6210\u529F\uFF0C\u8BF7\u901A\u8FC7\u4EE5\u4E0B\u5730\u5740\u8BBF\u95EE\u60A8\u7684\u5E94\u7528\uFF1Ahttp://" + addr);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBRTlDLGFBQWE7QUFDYiw4Q0FBMEQ7QUFFMUQsMkRBQXFDO0FBQ3JDLG9EQUF3QztBQUN4QywrQ0FBbUM7QUFDbkMsMkRBQXFDO0FBQ3JDLGdEQUFvRDtBQUdwRDtJQUFBO0lBcUpBLENBQUM7SUFuSk8sMkJBQUksR0FBVixVQUFXLE1BQWtCOzs7Ozs7d0JBQ25CLElBQUksR0FBcUMsTUFBTSxLQUEzQyxFQUFFLEtBQW1DLE1BQU0sTUFBWCxFQUFyQixNQUFNLFlBQUEsRUFBRSxXQUFXLGlCQUFBLENBQWM7d0JBQ3ZDLHFCQUFNLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUF4QyxNQUFNLEdBQUksQ0FBQSxTQUE4QixDQUFBLE9BQWxDO3dCQUNiLElBQUksTUFBTSxFQUFFOzRCQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNyQixzQkFBTzt5QkFDUjt3QkFDbUIscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBN0QsV0FBVyxHQUFHLFNBQStDO3dCQUMzRCxXQUFXLEdBQXNCLFdBQVcsWUFBakMsRUFBRSxlQUFlLEdBQUssV0FBVyxnQkFBaEIsQ0FBaUI7d0JBQ3JELHFCQUFNLGdCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDLEVBQUE7O3dCQUEvRCxTQUErRCxDQUFDO3dCQUNuRCxxQkFBTSxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUFoRSxJQUFJLEdBQUcsU0FBeUQ7NkJBQ2xFLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUEsRUFBekMsd0JBQXlDO3dCQUMzQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxvQ0FBUyxXQUFXLENBQUMsSUFBSSxtRkFBeUIsQ0FBQyxDQUFDOzs7d0JBRTNELEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hDLHFCQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUE7O3dCQUE5QixHQUFHLEdBQUcsU0FBd0I7d0JBQ3BDLHNCQUFPLEdBQUcsRUFBQzs7Ozs7S0FFZDtJQUVLLDZCQUFNLEdBQVosVUFBYSxNQUFrQjs7Ozs7O3dCQUV2QixJQUFJLEdBQTBDLE1BQU0sS0FBaEQsRUFBRSxLQUF3QyxNQUFNLE1BQVgsRUFBMUIsTUFBTSxZQUFBLEVBQUUsV0FBVyxpQkFBQSxFQUFFLEdBQUcsU0FBQSxDQUFjO3dCQUN2QyxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUE3RCxXQUFXLEdBQUcsU0FBK0M7d0JBQzNELFdBQVcsR0FBc0IsV0FBVyxZQUFqQyxFQUFFLGVBQWUsR0FBSyxXQUFXLGdCQUFoQixDQUFpQjt3QkFDckQscUJBQU0sZ0JBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUMsRUFBQTs7d0JBQS9ELFNBQStELENBQUM7d0JBRTFCLHFCQUFNLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUE5RCxLQUFnQyxTQUE4QixFQUE3RCxNQUFNLFlBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxTQUFTLGVBQUE7d0JBQ2xDLElBQUksTUFBTSxFQUFFOzRCQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUN2QixzQkFBTzt5QkFDUjt3QkFDa0IscUJBQU0sZ0JBQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBdEUsVUFBVSxHQUFHLFNBQXlEOzZCQUN6RSxRQUFRLEVBQVIsd0JBQVE7Ozs2QkFFRCxTQUFTLEVBQVQsd0JBQVM7d0JBQ2pCLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7NEJBQ25ELGdCQUFNLENBQUMsS0FBSyxDQUFDLG9DQUFTLFdBQVcsQ0FBQyxJQUFJLG1GQUF5QixDQUFDLENBQUM7NEJBQ2pFLHNCQUFPO3lCQUNSO3dCQUNLLEdBQUcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNDLHFCQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUE7NEJBQS9CLHNCQUFPLFNBQXdCLEVBQUM7OzZCQUU1QixDQUFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEVBQTdDLHlCQUE2Qzt3QkFDaEIscUJBQU0sZUFBUSxDQUFDLE1BQU0sQ0FBQyx3QkFBYSxDQUFDLEVBQUE7O3dCQUE3RCxHQUFHLEdBQXNCLFNBQW9DO3dCQUMzRCxLQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUE7O2lDQUNYLFdBQVcsQ0FBQyxDQUFaLHdCQUFXO2lDQUVYLFlBQVksQ0FBQyxDQUFiLHlCQUFZOzs7NEJBRGYseUJBQU07O3dCQUVBLEdBQUcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNDLHFCQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUE7NkJBQS9CLHNCQUFPLFNBQXdCLEVBQUM7NkJBRWhDLHlCQUFNOzt3QkFNUixFQUFFLEdBQUcsY0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7d0JBQ3pCLHFCQUFNLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsRUFBQTs7d0JBQTdELEdBQUcsR0FBRyxTQUF1RDt3QkFDbkUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7d0JBRWQsRUFBRSxDQUFDLElBQUksR0FBRyw2QkFBUyxDQUFDO3dCQUNNLHFCQUFNLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsRUFBQTs7d0JBQTVFLGlCQUFpQixHQUFHLFNBQXdEO3dCQUNsRixxQkFBTSxLQUFLLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEVBQUE7O3dCQUF6QyxTQUF5QyxDQUFDOzs7O3dCQUd4QyxFQUFFLENBQUMsSUFBSSxHQUFHLDhCQUFVLENBQUE7d0JBQ1YscUJBQU0sZ0JBQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsRUFBQTs7d0JBQWpFLEdBQUcsR0FBRyxTQUEyRDt3QkFDckUsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDN0IsYUFBYSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDN0MsaUJBQWlCLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7Ozs2QkFFNUIsR0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBeEMseUJBQXdDOzs7O3dCQUU5QixxQkFBTSxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFBOzt3QkFBakUsR0FBRyxHQUFHLFNBQTJEO3dCQUNyRSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUM3QixhQUFhLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDOzs7O3dCQUU3QyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ1YsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBRyxPQUFLLENBQUMsTUFBTSxDQUFDLE9BQVMsQ0FBQyxDQUFDO3dCQUN4QyxzQkFBTzs7O3dCQUdULEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDVixnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFHLEdBQUMsQ0FBQyxNQUFNLENBQUMsT0FBUyxDQUFDLENBQUM7d0JBQ3BDLHNCQUFPOzs7d0JBSVgsV0FBVzt3QkFDWCxFQUFFLENBQUMsSUFBSSxHQUFHLDBKQUNpRSxhQUFhLGtCQUFhLE1BQVEsQ0FBQzt3QkFDOUcscUJBQU0sS0FBSyxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxFQUFBOzt3QkFBN0MsU0FBNkMsQ0FBQzt3QkFFMUMsU0FBUyxHQUFHLElBQUksQ0FBQzt3QkFDakIsSUFBSSxHQUFHLElBQUksQ0FBQzs2QkFFWixHQUFHLEVBQUgseUJBQUc7d0JBQ0wsRUFBRSxDQUFDLElBQUksR0FBRyx1QkFBYSxDQUFDO3dCQUNSLHFCQUFNLGdCQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUE7O3dCQUExRCxhQUFhLEdBQUcsU0FBMEMsQ0FBQzt3QkFFM0QsV0FBVzt3QkFDWCxFQUFFLENBQUMsSUFBSSxHQUFHLGlKQUMrRCxhQUFhLGtCQUFhLE1BQVEsQ0FBQzt3QkFDNUcscUJBQU0sS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEVBQUE7O3dCQUEzQyxTQUEyQyxDQUFDO3dCQUU1QyxVQUFVO3dCQUNWLEVBQUUsQ0FBQyxJQUFJLEdBQUcsb0NBQWdCLENBQUM7d0JBQ2YscUJBQU0sZ0JBQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFBOzt3QkFBaEQsU0FBUyxHQUFHLFNBQW9DLENBQUM7d0JBQ2pELElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDOzs7d0JBRWhILEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDVixnQkFBTSxDQUFDLE9BQU8sQ0FBQyw4SEFBNkIsSUFBTSxDQUFDLENBQUM7d0JBQ3BELGdCQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUN0QixNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDMUQsc0JBQU8sTUFBTSxFQUFDOzs7O0tBQ2Y7SUFFSyw2QkFBTSxHQUFaLFVBQWEsTUFBa0I7Ozs7Ozt3QkFDckIsS0FBbUMsTUFBTSxNQUFYLEVBQXJCLE1BQU0sWUFBQSxFQUFFLFdBQVcsaUJBQUEsQ0FBYzt3QkFDOUIscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBN0QsV0FBVyxHQUFHLFNBQStDO3dCQUMzRCxXQUFXLEdBQXNCLFdBQVcsWUFBakMsRUFBRSxlQUFlLEdBQUssV0FBVyxnQkFBaEIsQ0FBaUI7d0JBQ3JELHFCQUFNLGdCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDLEVBQUE7O3dCQUEvRCxTQUErRCxDQUFDO3dCQUNyRCxxQkFBTSxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUFoRSxJQUFJLEdBQUcsU0FBeUQ7d0JBQ3BFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7NEJBQzVDLGdCQUFNLENBQUMsS0FBSyxDQUFDLG9DQUFTLFdBQVcsQ0FBQyxJQUFJLG1GQUF5QixDQUFDLENBQUM7NEJBQ2pFLHNCQUFPO3lCQUNSO3dCQUNLLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ2pELEVBQUUsR0FBRyxjQUFPLENBQUMsNkJBQU8sV0FBVyxDQUFDLElBQUksUUFBSyxDQUFDLENBQUM7Ozs7d0JBR3JDLHFCQUFNLGdCQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxFQUFBOzt3QkFBekQsT0FBTyxHQUFHLFNBQStDLENBQUM7Ozs7d0JBRTFELEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDVixnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFHLE9BQUssQ0FBQyxNQUFNLENBQUMsT0FBUyxDQUFDLENBQUM7d0JBQ3hDLHNCQUFPOzRCQUVULHFCQUFNLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBQTs7d0JBQXZDLFNBQXVDLENBQUM7NkJBQ3BDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUF4Qix5QkFBd0I7d0JBQzFCLEVBQUUsQ0FBQyxJQUFJLEdBQUcsb0NBQWdCLENBQUM7d0JBQzNCLHFCQUFNLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsRUFBQTs7d0JBQTNELFNBQTJELENBQUM7Ozt3QkFFOUQsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNWLGdCQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7OztLQUN4QjtJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQXJKRCxJQXFKQyJ9