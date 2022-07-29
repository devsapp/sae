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
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var pop_core_1 = require("@alicloud/pop-core");
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.setSaeClient = function (region, accessKeyID, accessKeySecret) {
        return __awaiter(this, void 0, void 0, function () {
            var saeClient, body, headers, requestOption, ListChangeOrdersUri, NamespaceUri, DescribeNamespacesUri, UpdateNamespaceVpc, CreateApplicationUri, ListApplicationsUri, DeployApplicationUri, BindSLBUri, GETSLBUri;
            return __generator(this, function (_a) {
                saeClient = new pop_core_1.ROAClient({
                    accessKeyId: accessKeyID,
                    accessKeySecret: accessKeySecret,
                    endpoint: "https://sae." + region + ".aliyuncs.com",
                    apiVersion: "2019-05-06",
                });
                body = "{}";
                headers = {
                    "Content-Type": "application/json",
                };
                requestOption = {
                    timeout: 60000,
                };
                ListChangeOrdersUri = '/pop/v1/sam/changeorder/ListChangeOrders';
                NamespaceUri = '/pop/v1/paas/namespace';
                DescribeNamespacesUri = '/pop/v1/sam/namespace/describeNamespaceList';
                UpdateNamespaceVpc = '/pop/v1/sam/namespace/updateNamespaceVpc';
                CreateApplicationUri = '/pop/v1/sam/app/createApplication';
                ListApplicationsUri = '/pop/v1/sam/app/listApplications';
                DeployApplicationUri = '/pop/v1/sam/app/deployApplication';
                BindSLBUri = "/pop/v1/sam/app/slb";
                GETSLBUri = '/pop/v1/sam/app/slb';
                /**
                 * 获取变更单列表
                 * @param appId 应用ID
                 * @param coType 变更单类型
                 * @returns 变更单列表信息
                 */
                saeClient.listChangeOrders = function (appId, coType) {
                    return __awaiter(this, void 0, void 0, function () {
                        var queries, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    queries = {
                                        AppId: appId, CoType: coType, CurrentPage: 1, PageSize: 10,
                                    };
                                    return [4 /*yield*/, saeClient.request("GET", ListChangeOrdersUri, queries, body, headers, requestOption)];
                                case 1:
                                    data = _a.sent();
                                    return [2 /*return*/, data];
                            }
                        });
                    });
                };
                /**
                 * 创建命名空间
                 * @param Namespace 命名空间
                 * @returns 命名空间信息
                 */
                saeClient.createNamespace = function (namespace) {
                    return __awaiter(this, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, saeClient.request("POST", NamespaceUri, namespace, body, headers, requestOption)];
                                case 1:
                                    data = _a.sent();
                                    return [2 /*return*/, data];
                            }
                        });
                    });
                };
                /**
                 * 更新命名空间
                 * @param Namespace 命名空间
                 * @returns 命名空间信息
                 */
                saeClient.updateNamespace = function (namespace) {
                    return __awaiter(this, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, saeClient.request("PUT", NamespaceUri, namespace, body, headers, requestOption)];
                                case 1:
                                    data = _a.sent();
                                    return [2 /*return*/, data];
                            }
                        });
                    });
                };
                saeClient.getNamespace = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var queries, obj, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    queries = {};
                                    return [4 /*yield*/, saeClient.request("GET", DescribeNamespacesUri, queries, body, headers, requestOption)];
                                case 1:
                                    obj = _a.sent();
                                    data = obj['Data'][0];
                                    return [2 /*return*/, data];
                            }
                        });
                    });
                };
                saeClient.UpdateNamespaceVpc = function (NamespaceId, VpcId) {
                    return __awaiter(this, void 0, void 0, function () {
                        var queries, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    queries = { NamespaceId: NamespaceId, VpcId: VpcId };
                                    return [4 /*yield*/, saeClient.request("POST", UpdateNamespaceVpc, queries, body, headers, requestOption)];
                                case 1:
                                    data = _a.sent();
                                    return [2 /*return*/, data];
                            }
                        });
                    });
                };
                /*
                 * 创建一个应用
                 * @param applicationObject 应用信息
                 * @returns 创建结果
                 */
                saeClient.createApplication = function (applicationObject) {
                    return __awaiter(this, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, saeClient.request("POST", CreateApplicationUri, applicationObject, body, headers, requestOption)];
                                case 1:
                                    data = _a.sent();
                                    return [2 /*return*/, data];
                            }
                        });
                    });
                };
                /**
                 * 获取应用列表
                 * @param appName 应用名称
                 * @returns 应用列表
                 */
                saeClient.listApplications = function (appName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var queries, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    queries = {
                                        FieldType: 'appName', FieldValue: appName
                                    };
                                    return [4 /*yield*/, saeClient.request("GET", ListApplicationsUri, queries, body, headers, requestOption)];
                                case 1:
                                    data = _a.sent();
                                    return [2 /*return*/, data];
                            }
                        });
                    });
                };
                /**
                 * 部署应用
                 * @param applicationObject 应用信息
                 * @returns 部署结果
                 */
                saeClient.deployApplication = function (applicationObject) {
                    return __awaiter(this, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, saeClient.request("POST", DeployApplicationUri, applicationObject, body, headers, requestOption)];
                                case 1:
                                    data = _a.sent();
                                    return [2 /*return*/, data];
                            }
                        });
                    });
                };
                /**
                 * 绑定SLB
                 * @param SLB SLB信息
                 * @returns 绑定结果
                 */
                saeClient.bindSLB = function (SLB) {
                    return __awaiter(this, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, saeClient.request("POST", BindSLBUri, SLB, body, headers, requestOption)];
                                case 1:
                                    data = _a.sent();
                                    return [2 /*return*/, data];
                            }
                        });
                    });
                };
                /**
                 * 获取SLB信息
                 * @param appId
                 * @returns
                 */
                saeClient.getSLB = function name(appId) {
                    return __awaiter(this, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, saeClient.request("GET", GETSLBUri, { AppId: appId }, body, headers, requestOption)];
                                case 1:
                                    data = _a.sent();
                                    return [2 /*return*/, data];
                            }
                        });
                    });
                };
                this.saeClient = saeClient;
                return [2 /*return*/, saeClient];
            });
        });
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGFBQWE7QUFDYiwrQ0FBK0M7QUFHL0M7SUFBQTtJQWlJQSxDQUFDO0lBOUhnQixtQkFBWSxHQUF6QixVQUEwQixNQUFNLEVBQUUsV0FBVyxFQUFFLGVBQWU7Ozs7Z0JBQ3BELFNBQVMsR0FBRyxJQUFJLG9CQUFTLENBQUM7b0JBQzVCLFdBQVcsRUFBRSxXQUFXO29CQUN4QixlQUFlLEVBQUUsZUFBZTtvQkFDaEMsUUFBUSxFQUFFLGlCQUFlLE1BQU0sa0JBQWU7b0JBQzlDLFVBQVUsRUFBRSxZQUFZO2lCQUMzQixDQUFDLENBQUM7Z0JBRUcsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDWixPQUFPLEdBQUc7b0JBQ1osY0FBYyxFQUFFLGtCQUFrQjtpQkFDckMsQ0FBQztnQkFDSSxhQUFhLEdBQUc7b0JBQ2xCLE9BQU8sRUFBRSxLQUFLO2lCQUNqQixDQUFDO2dCQUNJLG1CQUFtQixHQUFHLDBDQUEwQyxDQUFDO2dCQUNqRSxZQUFZLEdBQUcsd0JBQXdCLENBQUM7Z0JBQ3hDLHFCQUFxQixHQUFHLDZDQUE2QyxDQUFDO2dCQUN0RSxrQkFBa0IsR0FBRywwQ0FBMEMsQ0FBQztnQkFDaEUsb0JBQW9CLEdBQUcsbUNBQW1DLENBQUM7Z0JBQzNELG1CQUFtQixHQUFHLGtDQUFrQyxDQUFDO2dCQUN6RCxvQkFBb0IsR0FBRyxtQ0FBbUMsQ0FBQztnQkFDM0QsVUFBVSxHQUFHLHFCQUFxQixDQUFDO2dCQUNuQyxTQUFTLEdBQUcscUJBQXFCLENBQUM7Z0JBRXhDOzs7OzttQkFLRztnQkFDSCxTQUFTLENBQUMsZ0JBQWdCLEdBQUcsVUFBZ0IsS0FBVSxFQUFFLE1BQVc7Ozs7OztvQ0FDNUQsT0FBTyxHQUFHO3dDQUNWLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFO3FDQUM3RCxDQUFDO29DQUNTLHFCQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxFQUFBOztvQ0FBakcsSUFBSSxHQUFHLFNBQTBGO29DQUNyRyxzQkFBTyxJQUFJLEVBQUM7Ozs7aUJBQ2YsQ0FBQTtnQkFFRDs7OzttQkFJRztnQkFDSCxTQUFTLENBQUMsZUFBZSxHQUFHLFVBQWdCLFNBQWM7Ozs7O3dDQUMzQyxxQkFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLEVBQUE7O29DQUE3RixJQUFJLEdBQUcsU0FBc0Y7b0NBQ2pHLHNCQUFPLElBQUksRUFBQzs7OztpQkFDZixDQUFBO2dCQUVEOzs7O21CQUlHO2dCQUNILFNBQVMsQ0FBQyxlQUFlLEdBQUcsVUFBZ0IsU0FBYzs7Ozs7d0NBQzNDLHFCQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsRUFBQTs7b0NBQTVGLElBQUksR0FBRyxTQUFxRjtvQ0FDaEcsc0JBQU8sSUFBSSxFQUFDOzs7O2lCQUNmLENBQUE7Z0JBRUQsU0FBUyxDQUFDLFlBQVksR0FBRzs7Ozs7O29DQUNqQixPQUFPLEdBQUcsRUFBRSxDQUFDO29DQUNQLHFCQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxFQUFBOztvQ0FBbEcsR0FBRyxHQUFHLFNBQTRGO29DQUNsRyxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUMxQixzQkFBTyxJQUFJLEVBQUM7Ozs7aUJBQ2YsQ0FBQTtnQkFFRCxTQUFTLENBQUMsa0JBQWtCLEdBQUcsVUFBZ0IsV0FBbUIsRUFBRSxLQUFhOzs7Ozs7b0NBQ3pFLE9BQU8sR0FBRyxFQUFDLFdBQVcsYUFBQSxFQUFDLEtBQUssT0FBQSxFQUFDLENBQUM7b0NBQ3ZCLHFCQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxFQUFBOztvQ0FBakcsSUFBSSxHQUFHLFNBQTBGO29DQUNyRyxzQkFBTyxJQUFJLEVBQUE7Ozs7aUJBQ2QsQ0FBQTtnQkFDRDs7OzttQkFJRztnQkFDSCxTQUFTLENBQUMsaUJBQWlCLEdBQUcsVUFBZ0IsZ0JBQXFCOzs7Ozt3Q0FDcEQscUJBQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsRUFBQTs7b0NBQTVHLElBQUksR0FBRyxTQUFxRztvQ0FDaEgsc0JBQU8sSUFBSSxFQUFDOzs7O2lCQUNmLENBQUE7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0gsU0FBUyxDQUFDLGdCQUFnQixHQUFHLFVBQWdCLE9BQVk7Ozs7OztvQ0FDakQsT0FBTyxHQUFHO3dDQUNWLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU87cUNBQzVDLENBQUM7b0NBQ1MscUJBQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLEVBQUE7O29DQUFqRyxJQUFJLEdBQUcsU0FBMEY7b0NBQ3JHLHNCQUFPLElBQUksRUFBQzs7OztpQkFDZixDQUFBO2dCQUVEOzs7O21CQUlHO2dCQUNILFNBQVMsQ0FBQyxpQkFBaUIsR0FBRyxVQUFnQixnQkFBcUI7Ozs7O3dDQUNwRCxxQkFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxFQUFBOztvQ0FBNUcsSUFBSSxHQUFHLFNBQXFHO29DQUNoSCxzQkFBTyxJQUFJLEVBQUM7Ozs7aUJBQ2YsQ0FBQTtnQkFFRDs7OzttQkFJRztnQkFDSCxTQUFTLENBQUMsT0FBTyxHQUFHLFVBQWdCLEdBQVE7Ozs7O3dDQUM3QixxQkFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLEVBQUE7O29DQUFyRixJQUFJLEdBQUcsU0FBOEU7b0NBQ3pGLHNCQUFPLElBQUksRUFBQzs7OztpQkFDZixDQUFBO2dCQUVEOzs7O21CQUlHO2dCQUNILFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBZSxJQUFJLENBQUMsS0FBVTs7Ozs7d0NBQ2xDLHFCQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxFQUFBOztvQ0FBaEcsSUFBSSxHQUFHLFNBQXlGO29DQUNwRyxzQkFBTyxJQUFJLEVBQUM7Ozs7aUJBQ2YsQ0FBQTtnQkFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDM0Isc0JBQU8sU0FBUyxFQUFDOzs7S0FDcEI7SUFDTCxhQUFDO0FBQUQsQ0FBQyxBQWpJRCxJQWlJQyJ9