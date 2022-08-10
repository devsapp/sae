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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ali_oss_1 = __importDefault(require("ali-oss"));
var core_1 = require("@serverless-devs/core");
var logger_1 = __importDefault(require("../common/logger"));
var cache_1 = require("../common/cache");
var getAutoName = function (region, accountId) { return "sae-packages-" + region + "-" + accountId; };
var Oss = /** @class */ (function () {
    function Oss(ossConfig) {
        var bucket = ossConfig.bucket, region = ossConfig.region, credentials = ossConfig.credentials;
        this.ossClient = new ali_oss_1.default({
            bucket: bucket,
            region: "oss-" + region,
            accessKeyId: credentials === null || credentials === void 0 ? void 0 : credentials.AccessKeyID,
            accessKeySecret: credentials === null || credentials === void 0 ? void 0 : credentials.AccessKeySecret,
            stsToken: credentials === null || credentials === void 0 ? void 0 : credentials.SecurityToken,
        });
        this.bucket = bucket;
        this.region = region;
        this.credentials = credentials;
    }
    Oss.getBucketName = function (bucketName, region, accountId) {
        if (core_1.lodash.isEmpty(bucketName)) {
            throw new core_1.CatchableError('bucket 需要填写');
        }
        if (core_1.lodash.isEqual(bucketName, 'auto')) {
            return getAutoName(region, accountId);
        }
        return bucketName;
    };
    Oss.prototype.deleteFile = function (filename) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ossClient.delete(filename)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        logger_1.default.error(e_1.toString());
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Oss.prototype.upload = function (_a, cachePayload) {
        var file = _a.file, object = _a.object, type = _a.type;
        return __awaiter(this, void 0, void 0, function () {
            var _e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(type === 'upload')) return [3 /*break*/, 3];
                        // bucket, 不存在此bucket,则创建: 并且加上权限
                        return [4 /*yield*/, this.getOrCreateBucket(this.bucket, cachePayload)];
                    case 1:
                        // bucket, 不存在此bucket,则创建: 并且加上权限
                        _b.sent();
                        // 文件上传
                        return [4 /*yield*/, this.put(file, object)];
                    case 2:
                        // 文件上传
                        _b.sent();
                        return [2 /*return*/];
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        // 文件权限更新
                        return [4 /*yield*/, this.setPrivate(object)];
                    case 4:
                        // 文件权限更新
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _e_1 = _b.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Oss.prototype.setPrivate = function (object) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ossClient.putACL(object, 'private')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Oss.prototype.put = function (file, object) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ossClient.put("" + object, file)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.ossClient.putACL("" + object, 'public-read')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Oss.prototype.getOrCreateBucket = function (bucket, cachePayload) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var error_1, autoName, vm, location, ex_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ossClient.getBucketInfo(bucket)];
                    case 1:
                        _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _d.sent();
                        if (!core_1.lodash.isEqual(error_1 === null || error_1 === void 0 ? void 0 : error_1.code, 'NoSuchBucket')) {
                            throw new Error(error_1.message);
                        }
                        autoName = getAutoName(this.region, this.credentials.AccountID);
                        if (!core_1.lodash.isEqual(autoName, bucket)) {
                            throw new Error(error_1.message);
                        }
                        return [3 /*break*/, 3];
                    case 3:
                        vm = core_1.spinner("Create " + bucket + " bucket");
                        _d.label = 4;
                    case 4:
                        _d.trys.push([4, 9, , 10]);
                        return [4 /*yield*/, this.ossClient.putBucket(bucket)];
                    case 5:
                        _d.sent();
                        if (!(cachePayload === null || cachePayload === void 0 ? void 0 : cachePayload.appName)) return [3 /*break*/, 7];
                        return [4 /*yield*/, cache_1.writeCreatCache({
                                region: this.region,
                                appName: cachePayload === null || cachePayload === void 0 ? void 0 : cachePayload.appName,
                                accountID: this.credentials.AccountID,
                                configPath: cachePayload === null || cachePayload === void 0 ? void 0 : cachePayload.configPath,
                            }, { bucketName: bucket })];
                    case 6:
                        _d.sent();
                        _d.label = 7;
                    case 7: return [4 /*yield*/, this.ossClient.getBucketLocation(bucket)];
                    case 8:
                        location = _d.sent();
                        this.ossClient = new ali_oss_1.default({
                            bucket: bucket,
                            region: location.location,
                            accessKeyId: (_a = this.credentials) === null || _a === void 0 ? void 0 : _a.AccessKeyID,
                            accessKeySecret: (_b = this.credentials) === null || _b === void 0 ? void 0 : _b.AccessKeySecret,
                            stsToken: (_c = this.credentials) === null || _c === void 0 ? void 0 : _c.SecurityToken,
                        });
                        return [3 /*break*/, 10];
                    case 9:
                        ex_1 = _d.sent();
                        vm.fail();
                        throw new Error(ex_1);
                    case 10:
                        vm.succeed();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Oss;
}());
exports.default = Oss;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL29zcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWdDO0FBQ2hDLDhDQUF3RTtBQUd4RSw0REFBc0M7QUFDdEMseUNBQWtEO0FBRWxELElBQU0sV0FBVyxHQUFHLFVBQUMsTUFBTSxFQUFFLFNBQVMsSUFBSyxPQUFBLGtCQUFnQixNQUFNLFNBQUksU0FBVyxFQUFyQyxDQUFxQyxDQUFDO0FBRWpGO0lBZ0JDLGFBQVksU0FBcUI7UUFDeEIsSUFBQSxNQUFNLEdBQTBCLFNBQVMsT0FBbkMsRUFBRSxNQUFNLEdBQWtCLFNBQVMsT0FBM0IsRUFBRSxXQUFXLEdBQUssU0FBUyxZQUFkLENBQWU7UUFDbEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGlCQUFTLENBQUM7WUFDOUIsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUUsU0FBTyxNQUFRO1lBQ3ZCLFdBQVcsRUFBRSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsV0FBVztZQUNyQyxlQUFlLEVBQUUsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLGVBQWU7WUFDN0MsUUFBUSxFQUFFLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxhQUFhO1NBQ3BDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2hDLENBQUM7SUEzQk0saUJBQWEsR0FBcEIsVUFBcUIsVUFBZSxFQUFFLE1BQVcsRUFBRSxTQUFjO1FBQ2hFLElBQUksYUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMvQixNQUFNLElB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