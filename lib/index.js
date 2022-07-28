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
var utils_1 = require("./common/utils");
var logger_1 = __importDefault(require("./common/logger"));
var SaeComponent = /** @class */ (function () {
    function SaeComponent() {
    }
    SaeComponent.prototype.info = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    SaeComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var appId, _a, region, namespace, application, slb, credentials, AccessKeyID, AccessKeySecret, vm, env, applictionObject, obj, e_1, slbConfig, addr, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = inputs.props, region = _a.region, namespace = _a.namespace, application = _a.application, slb = _a.slb;
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 1:
                        credentials = _b.sent();
                        AccessKeyID = credentials.AccessKeyID, AccessKeySecret = credentials.AccessKeySecret;
                        return [4 /*yield*/, client_1.default.setSaeClient(region, AccessKeyID, AccessKeySecret)];
                    case 2:
                        _b.sent();
                        vm = core_1.spinner('创建Namespace...');
                        return [4 /*yield*/, utils_1.handleEnv(inputs, application, credentials)];
                    case 3:
                        env = _b.sent();
                        namespace = env.namespace;
                        slb = env.slb;
                        vm.text = "\u4E0A\u4F20\u4EE3\u7801...";
                        return [4 /*yield*/, utils_1.handleCode(region, application, credentials)];
                    case 4:
                        applictionObject = _b.sent();
                        return [4 /*yield*/, utils_1.setDefault(applictionObject)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 8, , 9]);
                        vm.text = "\u521B\u5EFA\u5E94\u7528 ...";
                        return [4 /*yield*/, client_1.default.saeClient.createApplication(applictionObject)];
                    case 7:
                        obj = _b.sent();
                        appId = obj['Data']['AppId'];
                        applictionObject.AppId = appId;
                        return [3 /*break*/, 9];
                    case 8:
                        e_1 = _b.sent();
                        throw e_1;
                    case 9:
                        // 检查应用部署状态
                        vm.text = "\u90E8\u7F72\u5E94\u7528 ...";
                        return [4 /*yield*/, utils_1.checkStatus(appId, 'CoDeploy')];
                    case 10:
                        _b.sent();
                        slbConfig = null;
                        addr = null;
                        if (!slb) return [3 /*break*/, 14];
                        vm.text = "\u90E8\u7F72 slb ... ";
                        return [4 /*yield*/, client_1.default.saeClient.bindSLB(slb, appId)];
                    case 11:
                        _b.sent();
                        // 检查应用部署状态
                        vm.text = "\u68C0\u67E5SLB\u7ED1\u5B9A\u72B6\u6001 ...";
                        return [4 /*yield*/, utils_1.checkStatus(appId, 'CoBindSlb')];
                    case 12:
                        _b.sent();
                        // 获取SLB信息
                        vm.text = "\u83B7\u53D6SLB\u4FE1\u606F ... ";
                        return [4 /*yield*/, client_1.default.saeClient.getSLB(appId)];
                    case 13:
                        slbConfig = _b.sent();
                        addr = slbConfig["Data"]['InternetIp'] ? slbConfig["Data"]['InternetIp'] : slbConfig["Data"]['IntranetSlbId'];
                        _b.label = 14;
                    case 14:
                        vm.stop();
                        logger_1.default.success("\u90E8\u7F72\u6210\u529F\uFF0C\u8BF7\u901A\u8FC7\u4EE5\u4E0B\u5730\u5740\u8BBF\u95EE\u60A8\u7684\u5E94\u7528\uFF1A" + addr);
                        result = utils_1.output(application, slbConfig);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return SaeComponent;
}());
exports.default = SaeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBRTlDLGFBQWE7QUFDYiw4Q0FBZ0Q7QUFFaEQsMkRBQXFDO0FBQ3JDLHdDQUF3RjtBQUV4RiwyREFBcUM7QUFFckM7SUFBQTtJQTBEQSxDQUFDO0lBekRPLDJCQUFJLEdBQVYsVUFBVyxNQUFrQjs7Ozs7O0tBRTVCO0lBRUssNkJBQU0sR0FBWixVQUFhLE1BQWtCOzs7Ozs7d0JBRXZCLEtBQW1ELE1BQU0sTUFBWCxFQUFyQyxNQUFNLFlBQUEsRUFBRSxTQUFTLGVBQUEsRUFBRSxXQUFXLGlCQUFBLEVBQUUsR0FBRyxTQUFBLENBQWM7d0JBQzlDLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTdELFdBQVcsR0FBRyxTQUErQzt3QkFDM0QsV0FBVyxHQUFzQixXQUFXLFlBQWpDLEVBQUUsZUFBZSxHQUFLLFdBQVcsZ0JBQWhCLENBQWdCO3dCQUdsRCxxQkFBTSxnQkFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQyxFQUFBOzt3QkFBL0QsU0FBK0QsQ0FBQzt3QkFHMUQsRUFBRSxHQUFHLGNBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3dCQUN6QixxQkFBTSxpQkFBUyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLEVBQUE7O3dCQUF2RCxHQUFHLEdBQUcsU0FBaUQ7d0JBQzdELFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO3dCQUMxQixHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQzt3QkFFZCxFQUFFLENBQUMsSUFBSSxHQUFHLDZCQUFTLENBQUM7d0JBQ0sscUJBQU0sa0JBQVUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxFQUFBOzt3QkFBckUsZ0JBQWdCLEdBQUcsU0FBa0Q7d0JBQzNFLHFCQUFNLGtCQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBQTs7d0JBQWxDLFNBQWtDLENBQUM7Ozs7d0JBR2pDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsOEJBQVUsQ0FBQTt3QkFDVixxQkFBTSxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFBOzt3QkFBaEUsR0FBRyxHQUFHLFNBQTBEO3dCQUNwRSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUM3QixnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOzs7O3dCQUUvQixNQUFNLEdBQUMsQ0FBQTs7d0JBR1QsV0FBVzt3QkFDWCxFQUFFLENBQUMsSUFBSSxHQUFHLDhCQUFVLENBQUE7d0JBQ3BCLHFCQUFNLG1CQUFXLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxFQUFBOzt3QkFBcEMsU0FBb0MsQ0FBQTt3QkFFaEMsU0FBUyxHQUFHLElBQUksQ0FBQzt3QkFDakIsSUFBSSxHQUFHLElBQUksQ0FBQzs2QkFFWixHQUFHLEVBQUgseUJBQUc7d0JBQ0wsRUFBRSxDQUFDLElBQUksR0FBRyx1QkFBYSxDQUFDO3dCQUN4QixxQkFBTSxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFBOzt3QkFBMUMsU0FBMEMsQ0FBQzt3QkFFM0MsV0FBVzt3QkFDWCxFQUFFLENBQUMsSUFBSSxHQUFHLDZDQUFlLENBQUM7d0JBQzFCLHFCQUFNLG1CQUFXLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxFQUFBOzt3QkFBckMsU0FBcUMsQ0FBQzt3QkFFdEMsVUFBVTt3QkFDVixFQUFFLENBQUMsSUFBSSxHQUFHLGtDQUFjLENBQUE7d0JBQ1oscUJBQU0sZ0JBQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFBOzt3QkFBaEQsU0FBUyxHQUFHLFNBQW9DLENBQUM7d0JBQ2pELElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUEsQ0FBQyxDQUFBLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQSxDQUFDLENBQUEsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDOzs7d0JBRTVHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDVixnQkFBTSxDQUFDLE9BQU8sQ0FBQyx1SEFBc0IsSUFBTSxDQUFDLENBQUM7d0JBQ3ZDLE1BQU0sR0FBRyxjQUFNLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO3dCQUM5QyxzQkFBTyxNQUFNLEVBQUM7Ozs7S0FDZjtJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQTFERCxJQTBEQyJ9