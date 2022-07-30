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
        var _a;
        // @ts-ignore
        var comParse = core.commandParse({ args: args, argsObj: argsObj }, this.MINIMIST_HELP_OPT);
        return (_a = comParse === null || comParse === void 0 ? void 0 : comParse.data) === null || _a === void 0 ? void 0 : _a.help;
    };
    SaeComponent.prototype.info = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, _a, region, application, credentials, AccessKeyID, AccessKeySecret, data, res;
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
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + application.name + "\uFF0C\u8BF7\u5148\u4F7F\u7528 's deploy' \u547D\u4EE4\u8FDB\u884C\u90E8\u7F72");
                        }
                        else {
                            res = data['Data']['Applications'][0];
                            return [2 /*return*/, res];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SaeComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var appId, _a, region, application, slb, credentials, AccessKeyID, AccessKeySecret, vm, env, applicationObject, obj, e_1, slbConfig, addr, result;
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
                        _b.trys.push([6, 8, , 12]);
                        vm.text = "\u521B\u5EFA\u5E94\u7528 ...";
                        return [4 /*yield*/, client_1.default.saeClient.createApplication(applicationObject)];
                    case 7:
                        obj = _b.sent();
                        appId = obj['Data']['AppId'];
                        applicationObject.AppId = appId;
                        return [3 /*break*/, 12];
                    case 8:
                        e_1 = _b.sent();
                        if (!e_1.message.includes('AppName is exsited')) return [3 /*break*/, 10];
                        vm.text = "\u5E94\u7528\u5DF2\u5B58\u5728\uFF0C\u8FDB\u884C\u66F4\u65B0 ...";
                        return [4 /*yield*/, client_1.default.saeClient.updateApplication(applicationObject)];
                    case 9:
                        appId = _b.sent();
                        return [3 /*break*/, 11];
                    case 10: throw e_1;
                    case 11: return [3 /*break*/, 12];
                    case 12:
                        // 检查应用部署状态
                        vm.text = "\u90E8\u7F72\u5E94\u7528 ...";
                        return [4 /*yield*/, utils.checkStatus(appId, 'CoDeploy')];
                    case 13:
                        _b.sent();
                        slbConfig = null;
                        addr = null;
                        if (!slb) return [3 /*break*/, 17];
                        vm.text = "\u90E8\u7F72 slb ... ";
                        return [4 /*yield*/, client_1.default.saeClient.bindSLB(slb, appId)];
                    case 14:
                        _b.sent();
                        // 检查应用部署状态
                        vm.text = "\u68C0\u67E5 slb \u7ED1\u5B9A\u72B6\u6001 ...";
                        return [4 /*yield*/, utils.checkStatus(appId, 'CoBindSlb')];
                    case 15:
                        _b.sent();
                        // 获取SLB信息
                        vm.text = "\u83B7\u53D6 slb \u4FE1\u606F ... ";
                        return [4 /*yield*/, client_1.default.saeClient.getSLB(appId)];
                    case 16:
                        slbConfig = _b.sent();
                        addr = slbConfig["Data"]['InternetIp'] ? slbConfig["Data"]['InternetIp'] : slbConfig["Data"]['IntranetSlbId'];
                        _b.label = 17;
                    case 17:
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
            var _a, region, application, credentials, AccessKeyID, AccessKeySecret, data, appId, vm, orderId;
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
                        return [4 /*yield*/, client_1.default.saeClient.deleteApplication(appId)];
                    case 4:
                        orderId = _b.sent();
                        return [4 /*yield*/, utils.getStatusByOrderId(orderId)];
                    case 5:
                        _b.sent();
                        if (!application.code.package) return [3 /*break*/, 7];
                        vm.text = "\u5220\u9664 oss \u6587\u4EF6 ... ";
                        return [4 /*yield*/, utils.deleteOssFile(region, application, credentials)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBRTlDLGFBQWE7QUFDYiw4Q0FBZ0Q7QUFFaEQsMkRBQXFDO0FBQ3JDLG9EQUF3QztBQUN4QywrQ0FBbUM7QUFDbkMsMkRBQXFDO0FBRXJDO0lBQUE7SUF1R0EsQ0FBQztJQXRHQyw2QkFBTSxHQUFOLFVBQU8sSUFBWSxFQUFFLE9BQWE7O1FBQ2hDLGFBQWE7UUFDYixJQUFNLFFBQVEsR0FBUSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxNQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNuRixhQUFPLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxJQUFJLDBDQUFFLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRUssMkJBQUksR0FBVixVQUFXLE1BQWtCOzs7Ozs7d0JBQ3JCLElBQUksR0FBcUMsTUFBTSxLQUEzQyxFQUFFLEtBQW1DLE1BQU0sTUFBWCxFQUFyQixNQUFNLFlBQUEsRUFBRSxXQUFXLGlCQUFBLENBQWM7d0JBQ3RELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3JCLHNCQUFPO3lCQUNSO3dCQUNpQixxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUE3RCxXQUFXLEdBQUcsU0FBK0M7d0JBQzNELFdBQVcsR0FBc0IsV0FBVyxZQUFqQyxFQUFFLGVBQWUsR0FBSyxXQUFXLGdCQUFoQixDQUFnQjt3QkFDbEQscUJB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