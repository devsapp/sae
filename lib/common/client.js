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
Object.defineProperty(exports, "__esModule", { value: true });
exports.vpcAvailable = void 0;
// @ts-ignore
var pop_core_1 = __importStar(require("@alicloud/pop-core"));
function vpcAvailable(vpcId, region, accessKeyID, accessKeySecret) {
    return __awaiter(this, void 0, void 0, function () {
        var client, params, requestOption, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new pop_core_1.default({
                        accessKeyId: accessKeyID,
                        accessKeySecret: accessKeySecret,
                        endpoint: 'https://vpc.aliyuncs.com',
                        apiVersion: '2016-04-28'
                    });
                    params = {
                        "RegionId": region,
                        "VpcId": vpcId
                    };
                    requestOption = {
                        method: 'POST',
                        formatParams: false,
                    };
                    return [4 /*yield*/, client.request('DescribeVpcs', params, requestOption)];
                case 1:
                    data = _a.sent();
                    if (data['TotalCount'] != 1) {
                        return [2 /*return*/, false];
                    }
                    if (data['Vpcs']['Vpc'][0]['Status'] != 'Available') {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.vpcAvailable = vpcAvailable;
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.setSaeClient = function (region, accessKeyID, accessKeySecret) {
        return __awaiter(this, void 0, void 0, function () {
            var saeClient, body, headers, requestOption, ListChangeOrdersUri, NamespaceUri, DescribeNamespaceListUri, UpdateNamespaceVpcUri, CreateApplicationUri, ListApplicationsUri, DeployApplicationUri, DeleteApplicationUri, BindSLBUri, GETSLBUri, DescribeChangeOrderUri;
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
                DescribeNamespaceListUri = '/pop/v1/sam/namespace/describeNamespaceList';
                UpdateNamespaceVpcUri = '/pop/v1/sam/namespace/updateNamespaceVpc';
                CreateApplicationUri = '/pop/v1/sam/app/createApplication';
                ListApplicationsUri = '/pop/v1/sam/app/listApplications';
                DeployApplicationUri = '/pop/v1/sam/app/deployApplication';
                DeleteApplicationUri = '/pop/v1/sam/app/deleteApplication';
                BindSLBUri = "/pop/v1/sam/app/slb";
                GETSLBUri = '/pop/v1/sam/app/slb';
                DescribeChangeOrderUri = '/pop/v1/sam/changeorder/DescribeChangeOrder';
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
                 * 查询变更单信息
                 * @param orderId id
                 * @returns
                 */
                saeClient.describeChangeOrder = function (orderId) {
                    return __awaiter(this, void 0, void 0, function () {
                        var queries, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    queries = {
                                        ChangeOrderId: orderId,
                                    };
                                    return [4 /*yield*/, saeClient.request("GET", DescribeChangeOrderUri, queries, body, headers, requestOption)];
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
                        var queries, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    queries = {
                                        NamespaceId: namespace.id,
                                        NamespaceName: namespace.name,
                                        NamespaceDescription: namespace.description,
                                    };
                                    return [4 /*yield*/, saeClient.request("POST", NamespaceUri, queries, body, headers, requestOption)];
                                case 1:
                                    data = _a.sent();
                                    return [2 /*return*/, data];
                            }
                        });
                    });
                };
                /**
                 * 更新命名空间
                 * @param namespace 命名空间
                 * @returns 命名空间信息
                 */
                saeClient.updateNamespace = function (namespace) {
                    return __awaiter(this, void 0, void 0, function () {
                        var queries, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    queries = {
                                        NamespaceId: namespace.id,
                                        NamespaceName: namespace.name,
                                        NamespaceDescription: namespace.description,
                                    };
                                    return [4 /*yield*/, saeClient.request("PUT", NamespaceUri, queries, body, headers, requestOption)];
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
                                    return [4 /*yield*/, saeClient.request("GET", DescribeNamespaceListUri, queries, body, headers, requestOption)];
                                case 1:
                                    obj = _a.sent();
                                    data = obj['Data'][0];
                                    return [2 /*return*/, data];
                            }
                        });
                    });
                };
                saeClient.updateNamespaceVpc = function (namespaceId, vpcId) {
                    return __awaiter(this, void 0, void 0, function () {
                        var queries, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    queries = { NamespaceId: namespaceId, VpcId: vpcId };
                                    return [4 /*yield*/, saeClient.request("POST", UpdateNamespaceVpcUri, queries, body, headers, requestOption)];
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
                 * 根据id删除应用
                 * @param appId id
                 */
                saeClient.deleteApplication = function (appId) {
                    return __awaiter(this, void 0, void 0, function () {
                        var queries, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    queries = {
                                        "AppId": appId
                                    };
                                    return [4 /*yield*/, saeClient.request("DELETE", DeleteApplicationUri, queries, body, headers, requestOption)];
                                case 1:
                                    data = _a.sent();
                                    return [2 /*return*/, data['Data'].ChangeOrderId];
                            }
                        });
                    });
                };
                /**
                 * 绑定SLB
                 * @param SLB SLB信息
                 * @returns 绑定结果
                 */
                saeClient.bindSLB = function (slb, appId) {
                    return __awaiter(this, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (slb.Internet && typeof slb.Internet == 'object') {
                                        slb.Internet = JSON.stringify(slb.Internet);
                                    }
                                    if (slb.Intranet && typeof slb.Intranet == 'object') {
                                        slb.Intranet = JSON.stringify(slb.Intranet);
                                    }
                                    if (appId) {
                                        slb.AppId = appId;
                                    }
                                    return [4 /*yield*/, saeClient.request("POST", BindSLBUri, slb, body, headers, requestOption)];
                                case 1:
                                    data = _a.sent();
                                    return [2 /*return*/, data['Data']['ChangeOrderId']];
                            }
                        });
                    });
                };
                /**
                 * 获取SLB信息
                 * @param appId
                 * @returns
                 */
                saeClient.getSLB = function (appId) {
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
                /**
                 * 更新已存在的应用
                 * @param applicationObject
                 */
                saeClient.updateApplication = function (applicationObject) {
                    return __awaiter(this, void 0, void 0, function () {
                        var queries, data, appId, res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    queries = {
                                        FieldType: 'appName', FieldValue: applicationObject.AppName
                                    };
                                    return [4 /*yield*/, saeClient.request("GET", ListApplicationsUri, queries, body, headers, requestOption)];
                                case 1:
                                    data = _a.sent();
                                    appId = data['Data']['Applications'][0]['AppId'];
                                    applicationObject.AppId = appId;
                                    return [4 /*yield*/, saeClient.request("POST", DeployApplicationUri, applicationObject, body, headers, requestOption)];
                                case 2:
                                    res = _a.sent();
                                    return [2 /*return*/, res];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGFBQWE7QUFDYiw2REFBcUQ7QUFFckQsU0FBc0IsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGVBQWU7Ozs7OztvQkFFdEUsTUFBTSxHQUFHLElBQUksa0JBQUksQ0FBQzt3QkFDbEIsV0FBVyxFQUFFLFdBQVc7d0JBQ3hCLGVBQWUsRUFBRSxlQUFlO3dCQUNoQyxRQUFRLEVBQUUsMEJBQTBCO3dCQUNwQyxVQUFVLEVBQUUsWUFBWTtxQkFDM0IsQ0FBQyxDQUFDO29CQUVDLE1BQU0sR0FBRzt3QkFDVCxVQUFVLEVBQUUsTUFBTTt3QkFDbEIsT0FBTyxFQUFFLEtBQUs7cUJBQ2pCLENBQUE7b0JBRUcsYUFBYSxHQUFHO3dCQUNoQixNQUFNLEVBQUUsTUFBTTt3QkFDZCxZQUFZLEVBQUUsS0FBSztxQkFFdEIsQ0FBQztvQkFDUyxxQkFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLEVBQUE7O29CQUFsRSxJQUFJLEdBQUcsU0FBMkQ7b0JBQ3RFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDekIsc0JBQU8sS0FBSyxFQUFDO3FCQUNoQjtvQkFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxXQUFXLEVBQUU7d0JBQ2pELHNCQUFPLEtBQUssRUFBQztxQkFDaEI7b0JBQ0Qsc0JBQU8sSUFBSSxFQUFDOzs7O0NBQ2Y7QUEzQkQsb0NBMkJDO0FBRUQ7SUFBQTtJQThMQSxDQUFDO0lBM0xnQixtQkFB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