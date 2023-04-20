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
var inputHandler = __importStar(require("./lib/input-handler"));
var outputHandler = __importStar(require("./lib/output-handler"));
var HELP = __importStar(require("./lib/help"));
var logger_1 = __importDefault(require("./common/logger"));
var install_saectl_1 = require("./common/install-saectl");
var oss_service_1 = __importDefault(require("./lib/oss.service"));
var cache_1 = require("./common/cache");
var write_file_1 = __importDefault(require("./lib/write-file"));
var saectl_1 = require("./cmd/saectl");
var lodash = core.lodash;
var getLink = function (changeOrderId) { return "\u67E5\u770B\u8BE6\u60C5\uFF1A\nhttps://sae.console.aliyun.com/#/AppList/ChangeOrderDetail?changeOrderId=" + changeOrderId; };
var SaeComponent = /** @class */ (function () {
    function SaeComponent() {
    }
    SaeComponent.prototype.sync = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, _a, isHelp, appName, namespaceId, region, credentials, data, vm, app, res, configs, configYmlPath;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args;
                        return [4 /*yield*/, inputHandler.handlerSyncInputs(args)];
                    case 1:
                        _a = _b.sent(), isHelp = _a.isHelp, appName = _a.appName, namespaceId = _a.namespaceId, region = _a.region;
                        if (isHelp) {
                            core.help(HELP.SYNC);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName, namespaceId)];
                    case 4:
                        data = _b.sent();
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName);
                            return [2 /*return*/];
                        }
                        vm = core_1.spinner("\u5BFC\u51FA\u914D\u7F6E");
                        app = data['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 5:
                        res = _b.sent();
                        write_file_1.default.access = inputs.project.access;
                        write_file_1.default.projectName = inputs.project.projectName;
                        return [4 /*yield*/, utils.getSyncConfig(inputs, res)];
                    case 6:
                        configs = _b.sent();
                        return [4 /*yield*/, write_file_1.default.writeSYml(process.cwd(), configs, region, app['namespaceId'], appName)];
                    case 7:
                        configYmlPath = _b.sent();
                        vm.stop();
                        logger_1.default.success("\u914D\u7F6E\u6587\u4EF6\u5DF2\u6210\u529F\u4E0B\u8F7D\uFF1A" + configYmlPath);
                        return [2 /*return*/, { configs: configs, configYmlPath: configYmlPath }];
                }
            });
        });
    };
    SaeComponent.prototype.rescale = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, application, _a, isHelp, replicas, appName, namespaceId, region, credentials, data, appId, vm, orderId, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, inputHandler.handlerReScaleInputs(args, application)];
                    case 1:
                        _a = _b.sent(), isHelp = _a.isHelp, replicas = _a.replicas, appName = _a.appName, namespaceId = _a.namespaceId, region = _a.region;
                        if (isHelp) {
                            core.help(HELP.RESCALE);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName, namespaceId)];
                    case 4:
                        data = _b.sent();
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName);
                            return [2 /*return*/];
                        }
                        appId = data['Data']['Applications'][0]['AppId'];
                        vm = core_1.spinner("\u5E94\u7528\u6269\u7F29\u5BB9");
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, client_1.default.saeClient.rescaleApplication(appId, replicas)];
                    case 6:
                        orderId = _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _b.sent();
                        vm.stop();
                        logger_1.default.error("" + error_1);
                        return [2 /*return*/];
                    case 8:
                        if (lodash.isEmpty(orderId)) {
                            vm.stop();
                            logger_1.default.success('replicas无变动');
                            return [2 /*return*/];
                        }
                        // 检查状态
                        vm.text = "\u5E94\u7528\u6269\u7F29\u5BB9" + appName + "..." + getLink(orderId);
                        return [4 /*yield*/, utils.getStatusByOrderId(orderId)];
                    case 9:
                        _b.sent();
                        vm.stop();
                        logger_1.default.success('完成应用扩缩容');
                        return [2 /*return*/];
                }
            });
        });
    };
    // empty commander
    SaeComponent.prototype.plan = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {}];
            });
        });
    };
    SaeComponent.prototype.start = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, application, _a, isHelp, assumeYes, appName, namespaceId, region, credentials, data, startStatus, ex_1, appId, vm, orderId, error_2, data2, app, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, inputHandler.handlerStartInputs(args, application)];
                    case 1:
                        _a = _b.sent(), isHelp = _a.isHelp, assumeYes = _a.assumeYes, appName = _a.appName, namespaceId = _a.namespaceId, region = _a.region;
                        if (isHelp) {
                            core.help(HELP.START);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName, namespaceId)];
                    case 4:
                        data = _b.sent();
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName);
                            return [2 /*return*/];
                        }
                        if (!!assumeYes) return [3 /*break*/, 8];
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, outputHandler.startPlan()];
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
                        vm = core_1.spinner("\u542F\u52A8\u5E94\u7528");
                        _b.label = 9;
                    case 9:
                        _b.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, client_1.default.saeClient.startApplication(appId)];
                    case 10:
                        orderId = _b.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_2 = _b.sent();
                        vm.stop();
                        logger_1.default.error("" + error_2);
                        return [2 /*return*/];
                    case 12:
                        // 检查状态
                        vm.text = "\u542F\u52A8\u5E94\u7528" + appName + "..." + getLink(orderId);
                        return [4 /*yield*/, utils.getStatusByOrderId(orderId)];
                    case 13:
                        _b.sent();
                        vm.stop();
                        logger_1.default.success('已启动应用');
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName, namespaceId)];
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
            var args, application, _a, isHelp, assumeYes, appName, namespaceId, region, credentials, data, stopStatus, ex_2, appId, vm, orderId, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, inputHandler.handlerStopInputs(args, application)];
                    case 1:
                        _a = _b.sent(), isHelp = _a.isHelp, assumeYes = _a.assumeYes, appName = _a.appName, namespaceId = _a.namespaceId, region = _a.region;
                        if (isHelp) {
                            core.help(HELP.STOP);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName, namespaceId)];
                    case 4:
                        data = _b.sent();
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName);
                            return [2 /*return*/];
                        }
                        if (!!assumeYes) return [3 /*break*/, 8];
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, outputHandler.stopPlan()];
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
                        vm = core_1.spinner("\u505C\u6B62\u5E94\u7528" + appName + "...");
                        _b.label = 9;
                    case 9:
                        _b.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, client_1.default.saeClient.stopApplication(appId)];
                    case 10:
                        orderId = _b.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_3 = _b.sent();
                        vm.stop();
                        logger_1.default.error("" + error_3);
                        return [2 /*return*/];
                    case 12:
                        // 检查状态
                        vm.text = "\u505C\u6B62\u5E94\u7528" + appName + "..." + getLink(orderId);
                        return [4 /*yield*/, utils.getStatusByOrderId(orderId)];
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
            var args, application, _a, isHelp, outputFile, appName, namespaceId, region, credentials, data, app, res, cache;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, inputHandler.handlerInfoInputs(args, application)];
                    case 1:
                        _a = _b.sent(), isHelp = _a.isHelp, outputFile = _a.outputFile, appName = _a.appName, namespaceId = _a.namespaceId, region = _a.region;
                        if (isHelp) {
                            core.help(HELP.INFO);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName, namespaceId)];
                    case 4:
                        data = _b.sent();
                        if (!(data['Data']['Applications'].length === 0)) return [3 /*break*/, 5];
                        logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName + "\uFF0C\u8BF7\u5148\u4F7F\u7528 's deploy' \u547D\u4EE4\u8FDB\u884C\u90E8\u7F72");
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
                        cache[appName] = res;
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
            var appId, configPath, args, props, application, slb, appName, region, credentials, _a, isHelp, useLocal, useRemote, updateRemote, remoteAppId, change, namespaceId, remoteData, app, app, lastProps, app, orderList, changeOrder, _i, changeOrder_1, order, vm, applicationObject, changeOrderId, res, error_4, obj, e_1, needBindSlb, result, file, oss;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, inputHandler.checkInputs(inputs)];
                    case 1:
                        _b.sent();
                        configPath = core.lodash.get(inputs, 'path.configPath');
                        args = inputs.args, props = inputs.props;
                        application = props.application, slb = props.slb;
                        appName = application.appName, region = application.region;
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 2:
                        credentials = _b.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, inputHandler.parseCommand(args)];
                    case 4:
                        _a = _b.sent(), isHelp = _a.isHelp, useLocal = _a.useLocal, useRemote = _a.useRemote;
                        updateRemote = false;
                        remoteAppId = null;
                        change = {};
                        if (isHelp) {
                            core.help(HELP.DEPLOY);
                            return [2 /*return*/];
                        }
                        // 设置Namespace
                        return [4 /*yield*/, utils.handleEnv(application, credentials)];
                    case 5:
                        // 设置Namespace
                        _b.sent();
                        return [4 /*yield*/, utils.formatSlb(slb, application.port)];
                    case 6:
                        // 设置slb
                        slb = _b.sent();
                        namespaceId = application.namespaceId;
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName, namespaceId)];
                    case 7:
                        remoteData = _b.sent();
                        if (!useLocal) return [3 /*break*/, 8];
                        return [3 /*break*/, 13];
                    case 8:
                        if (!useRemote) return [3 /*break*/, 10];
                        if (remoteData['Data']['Applications'].length === 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName + "\uFF0C\u8BF7\u5148\u4F7F\u7528 's deploy' \u547D\u4EE4\u8FDB\u884C\u90E8\u7F72");
                            return [2 /*return*/];
                        }
                        app = remoteData['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 9: return [2 /*return*/, _b.sent()];
                    case 10:
                        if (!(remoteData['Data']['Applications'].length > 0)) return [3 /*break*/, 13];
                        return [4 /*yield*/, utils.getDiff(application, slb, remoteData['Data']['Applications'][0], credentials, configPath)];
                    case 11:
                        change = _b.sent();
                        updateRemote = change['updateRemote'];
                        if (!!updateRemote) return [3 /*break*/, 13];
                        app = remoteData['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 12: return [2 /*return*/, _b.sent()];
                    case 13:
                        lastProps = lodash.cloneDeep(props);
                        if (!(remoteData['Data']['Applications'].length > 0)) return [3 /*break*/, 15];
                        app = remoteData['Data']['Applications'][0];
                        remoteAppId = app.AppId;
                        return [4 /*yield*/, client_1.default.saeClient.listChangeOrders(app.AppId, '')];
                    case 14:
                        orderList = _b.sent();
                        changeOrder = orderList['Data']['ChangeOrderList'];
                        for (_i = 0, changeOrder_1 = changeOrder; _i < changeOrder_1.length; _i++) {
                            order = changeOrder_1[_i];
                            if (lodash.isEqual(order['Status'], 1)) {
                                logger_1.default.info("\u5F53\u524D\u5E94\u7528\u6709\u6B63\u5728\u6267\u884C\u7684\u53D8\u66F4\u5355\u3002" + getLink(order['ChangeOrderId']));
                                return [2 /*return*/];
                            }
                        }
                        _b.label = 15;
                    case 15:
                        vm = core_1.spinner('上传代码...');
                        return [4 /*yield*/, utils.handleCode(application, credentials, configPath)];
                    case 16:
                        applicationObject = _b.sent();
                        return [4 /*yield*/, inputHandler.setDefault(applicationObject)];
                    case 17:
                        _b.sent();
                        if (!updateRemote) return [3 /*break*/, 33];
                        appId = remoteAppId;
                        _b.label = 18;
                    case 18:
                        _b.trys.push([18, 31, , 32]);
                        if (!change['needDeploy']) return [3 /*break*/, 21];
                        return [4 /*yield*/, client_1.default.saeClient.updateApplication(applicationObject)];
                    case 19:
                        res = _b.sent();
                        changeOrderId = res['Data']['ChangeOrderId'];
                        // 检查应用部署状态
                        vm.text = "\u5E94\u7528\u6B63\u5728\u90E8\u7F72..." + getLink(changeOrderId);
                        return [4 /*yield*/, utils.getStatusByOrderId(changeOrderId)];
                    case 20:
                        _b.sent();
                        _b.label = 21;
                    case 21:
                        if (!change['needRescale']) return [3 /*break*/, 24];
                        return [4 /*yield*/, client_1.default.saeClient.rescaleApplication(remoteAppId, applicationObject.Replicas)];
                    case 22:
                        changeOrderId = _b.sent();
                        // 检查应用部署状态
                        vm.text = "\u5E94\u7528\u6269\u7F29\u5BB9..." + getLink(changeOrderId);
                        return [4 /*yield*/, utils.getStatusByOrderId(changeOrderId)];
                    case 23:
                        _b.sent();
                        _b.label = 24;
                    case 24:
                        if (!change['needUpdateSecurityGroup']) return [3 /*break*/, 27];
                        return [4 /*yield*/, client_1.default.saeClient.updateSecurityGroup(remoteAppId, applicationObject.securityGroupId)];
                    case 25:
                        changeOrderId = _b.sent();
                        // 检查应用部署状态
                        vm.text = "\u66F4\u65B0\u5E94\u7528\u5B89\u5168\u7EC4..." + getLink(changeOrderId);
                        return [4 /*yield*/, utils.getStatusByOrderId(changeOrderId)];
                    case 26:
                        _b.sent();
                        _b.label = 27;
                    case 27:
                        if (!change['needRescaleVertically']) return [3 /*break*/, 30];
                        return [4 /*yield*/, client_1.default.saeClient.rescaleVertically(remoteAppId, applicationObject.Cpu, applicationObject.Memory)];
                    case 28:
                        changeOrderId = _b.sent();
                        // 检查应用部署状态
                        vm.text = "\u66F4\u6539\u5E94\u7528\u5B9E\u4F8B\u89C4\u683C..." + getLink(changeOrderId);
                        return [4 /*yield*/, utils.getStatusByOrderId(changeOrderId)];
                    case 29:
                        _b.sent();
                        _b.label = 30;
                    case 30: return [3 /*break*/, 32];
                    case 31:
                        error_4 = _b.sent();
                        vm.stop();
                        logger_1.default.error("" + error_4);
                        return [2 /*return*/];
                    case 32: return [3 /*break*/, 38];
                    case 33:
                        _b.trys.push([33, 37, , 38]);
                        vm.text = "\u521B\u5EFA\u5E94\u7528 ...";
                        return [4 /*yield*/, client_1.default.saeClient.createApplication(applicationObject)];
                    case 34:
                        obj = _b.sent();
                        appId = obj['Data']['AppId'];
                        changeOrderId = obj['Data']['ChangeOrderId'];
                        applicationObject.AppId = appId;
                        // 检查应用部署状态
                        vm.text = "\u5E94\u7528\u6B63\u5728\u90E8\u7F72..." + getLink(changeOrderId);
                        return [4 /*yield*/, utils.getStatusByOrderId(changeOrderId)];
                    case 35:
                        _b.sent();
                        return [4 /*yield*/, cache_1.writeCreatCache({
                                region: region,
                                appName: appName,
                                configPath: configPath,
                                accountID: credentials.AccountID,
                            }, { appId: appId })];
                    case 36:
                        _b.sent();
                        return [3 /*break*/, 38];
                    case 37:
                        e_1 = _b.sent();
                        vm.stop();
                        logger_1.default.error("" + e_1);
                        return [2 /*return*/];
                    case 38:
                        if (!!lodash.isEmpty(slb)) return [3 /*break*/, 42];
                        return [4 /*yield*/, utils.slbDiff(slb, appId)];
                    case 39:
                        needBindSlb = _b.sent();
                        if (!needBindSlb) return [3 /*break*/, 42];
                        // 绑定SLB
                        vm.text = "\u90E8\u7F72 slb ... ";
                        return [4 /*yield*/, client_1.default.saeClient.bindSLB(slb, appId)];
                    case 40:
                        changeOrderId = _b.sent();
                        // 检查应用部署状态
                        vm.text = "\u6B63\u5728\u7ED1\u5B9Aslb..." + getLink(changeOrderId);
                        return [4 /*yield*/, utils.checkStatus(appId, 'CoBindSlb')];
                    case 41:
                        _b.sent();
                        _b.label = 42;
                    case 42:
                        vm.stop();
                        return [4 /*yield*/, outputHandler.output(appName, namespaceId)];
                    case 43:
                        result = _b.sent();
                        if (!lodash.isEmpty(result.accessLink)) {
                            logger_1.default.success("\u90E8\u7F72\u6210\u529F\uFF0C\u8BF7\u901A\u8FC7\u4EE5\u4E0B\u5730\u5740\u8BBF\u95EE\u60A8\u7684\u5E94\u7528\uFF1Ahttp://" + result.accessLink);
                        }
                        /**
                         * 缓存记录上一次部署细节
                         */
                        return [4 /*yield*/, cache_1.writeDeployCache({
                                region: region,
                                appName: appName,
                                configPath: configPath,
                                accountID: credentials.AccountID,
                            }, lastProps)];
                    case 44:
                        /**
                         * 缓存记录上一次部署细节
                         */
                        _b.sent();
                        return [4 /*yield*/, utils.file2delete(region, application, credentials)];
                    case 45:
                        file = _b.sent();
                        if (!file.filename) return [3 /*break*/, 47];
                        vm.text = "\u5220\u9664 oss \u6587\u4EF6 ... ";
                        oss = new oss_service_1.default({ bucket: file.bucketName, region: region, credentials: credentials });
                        return [4 /*yield*/, oss.deleteFile(file.filename)];
                    case 46:
                        _b.sent();
                        _b.label = 47;
                    case 47:
                        logger_1.default.success('应用详细信息如下：');
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SaeComponent.prototype.remove = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var args, application, _b, isHelp, assumeYes, appName, namespaceId, region, credentials, data, app, res, removeStatus, ex_3, appId, vm, orderId, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        args = inputs.args, application = inputs.props.application;
                        return [4 /*yield*/, inputHandler.handlerRmInputs(args, application)];
                    case 1:
                        _b = _c.sent(), isHelp = _b.isHelp, assumeYes = _b.assumeYes, appName = _b.appName, namespaceId = _b.namespaceId, region = _b.region;
                        if (isHelp) {
                            core.help(HELP.REMOVE);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.getCredential((_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 2:
                        credentials = _c.sent();
                        return [4 /*yield*/, client_1.default.setSaeClient(region, credentials)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, client_1.default.saeClient.listApplications(appName, namespaceId)];
                    case 4:
                        data = _c.sent();
                        if (data['Data']['Applications'].length == 0) {
                            logger_1.default.error("\u672A\u627E\u5230\u5E94\u7528 " + appName);
                            return [2 /*return*/];
                        }
                        app = data['Data']['Applications'][0];
                        return [4 /*yield*/, utils.infoRes(app)];
                    case 5:
                        res = _c.sent();
                        if (!!assumeYes) return [3 /*break*/, 9];
                        _c.label = 6;
                    case 6:
                        _c.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, outputHandler.removePlan(res)];
                    case 7:
                        removeStatus = _c.sent();
                        if (removeStatus !== 'assumeYes') {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        ex_3 = _c.sent();
                        if ((ex_3 === null || ex_3 === void 0 ? void 0 : ex_3.name) === 'CatchableError') {
                            throw ex_3;
                        }
                        // 异常：不作处理兜底
                        logger_1.default.debug("error: " + ex_3.message);
                        return [3 /*break*/, 9];
                    case 9:
                        appId = app['AppId'];
                        vm = core_1.spinner("\u5220\u9664\u5E94\u7528" + appName + "...");
                        _c.label = 10;
                    case 10:
                        _c.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, client_1.default.saeClient.deleteApplication(appId)];
                    case 11:
                        orderId = _c.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        error_5 = _c.sent();
                        vm.stop();
                        logger_1.default.error("" + error_5);
                        return [2 /*return*/];
                    case 13: return [4 /*yield*/, utils.getStatusByOrderId(orderId)];
                    case 14:
                        _c.sent();
                        vm.stop();
                        logger_1.default.success('删除成功');
                        return [2 /*return*/];
                }
            });
        });
    };
    SaeComponent.prototype.saectl = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var credentials, target, saeCtlCmd;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, core.getCredential((_a = inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 1:
                        credentials = _b.sent();
                        return [4 /*yield*/, install_saectl_1.checkAndInstallSaeCtl()];
                    case 2:
                        target = _b.sent();
                        saeCtlCmd = new saectl_1.SaeCtlCmd(inputs, credentials, target);
                        saeCtlCmd.run();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SaeComponent;
}());
exports.default = SaeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBRTlDLGFBQWE7QUFDYiw4Q0FBZ0Q7QUFFaEQsd0RBQWtDO0FBQ2xDLGlEQUFxQztBQUNyQyxnRUFBb0Q7QUFDcEQsa0VBQXNEO0FBQ3RELCtDQUFtQztBQUNuQywyREFBcUM7QUFDckMsMERBQWdFO0FBQ2hFLGtFQUFvQztBQUNwQyx3Q0FBbUU7QUFDbkUsZ0VBQXlDO0FBQ3pDLHVDQUF5QztBQUVqQyxJQUFBLE1BQU0sR0FBSyxJQUFJLE9BQVQsQ0FBVTtBQUV4QixJQUFNLE9BQU8sR0FBRyxVQUFDLGFBQWEsSUFBSyxPQUFBLDhHQUN3QyxhQUFlLEVBRHZELENBQ3VELENBQUM7QUFHM0Y7SUFBQTtJQW9hQSxDQUFDO0lBbmFPLDJCQUFJLEdBQVYsVUFBVyxNQUFrQjs7Ozs7O3dCQUNuQixJQUFJLEdBQUssTUFBTSxLQUFYLENBQVk7d0JBQ3lCLHFCQUFNLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQXJGLEtBQTJDLFNBQTBDLEVBQW5GLE1BQU0sWUFBQSxFQUFFLE9BQU8sYUFBQSxFQUFFLFdBQVcsaUJBQUEsRUFBRSxNQUFNLFlBQUE7d0JBQzVDLElBQUksTUFBTSxFQUFFOzRCQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNyQixzQkFBTzt5QkFDUjt3QkFDbUIscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBN0QsV0FBVyxHQUFHLFNBQStDO3dCQUNuRSxxQkFBTSxnQkFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFD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