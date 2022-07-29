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
            var saeClient, body, headers, requestOption, ListChangeOrdersUri, NamespaceUri, DescribeNamespaceListUri, UpdateNamespaceVpcUri, CreateApplicationUri, ListApplicationsUri, DeployApplicationUri, BindSLBUri, GETSLBUri;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGFBQWE7QUFDYiw2REFBcUQ7QUFFckQsU0FBc0IsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGVBQWU7Ozs7OztvQkFFdEUsTUFBTSxHQUFHLElBQUksa0JBQUksQ0FBQzt3QkFDbEIsV0FBVyxFQUFFLFdBQVc7d0JBQ3hCLGVBQWUsRUFBRSxlQUFlO3dCQUNoQyxRQUFRLEVBQUUsMEJBQTBCO3dCQUNwQyxVQUFVLEVBQUUsWUFBWTtxQkFDekIsQ0FBQyxDQUFDO29CQUVDLE1BQU0sR0FBRzt3QkFDWCxVQUFVLEVBQUUsTUFBTTt3QkFDbEIsT0FBTyxFQUFFLEtBQUs7cUJBQ2YsQ0FBQTtvQkFFRyxhQUFhLEdBQUc7d0JBQ2xCLE1BQU0sRUFBRSxNQUFNO3dCQUNkLFlBQVksRUFBRSxLQUFLO3FCQUVwQixDQUFDO29CQUNTLHFCQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsRUFBQTs7b0JBQWxFLElBQUksR0FBRyxTQUEyRDtvQkFDdEUsSUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUUsQ0FBQyxFQUFDO3dCQUN2QixzQkFBTyxLQUFLLEVBQUM7cUJBQ2Q7b0JBQ0QsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUUsV0FBVyxFQUFDO3dCQUMvQyxzQkFBTyxLQUFLLEVBQUM7cUJBQ2Q7b0JBQ0Qsc0JBQU8sSUFBSSxFQUFDOzs7O0NBQ2pCO0FBM0JELG9DQTJCQztBQUVEO0lBQUE7SUFvSkEsQ0FBQztJQWpKZ0IsbUJBQVks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