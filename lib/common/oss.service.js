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
exports.default = (function (ossConfig) { return __awaiter(void 0, void 0, void 0, function () {
    var bucket, file, object, type, ossClient, location_1, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bucket = ossConfig.bucket, file = ossConfig.file, object = ossConfig.object, type = ossConfig.type;
                ossClient = new ali_oss_1.default({
                    bucket: ossConfig === null || ossConfig === void 0 ? void 0 : ossConfig.bucket,
                    region: "oss-" + (ossConfig === null || ossConfig === void 0 ? void 0 : ossConfig.region),
                    accessKeyId: ossConfig === null || ossConfig === void 0 ? void 0 : ossConfig.accessKeyId,
                    accessKeySecret: ossConfig === null || ossConfig === void 0 ? void 0 : ossConfig.accessKeySecret,
                    securityToken: ossConfig === null || ossConfig === void 0 ? void 0 : ossConfig.securityToken,
                });
                if (!(type == 'upload')) return [3 /*break*/, 4];
                // bucket, 不存在此bucket,则创建: 并且加上权限
                return [4 /*yield*/, getOrCreateBucket(ossClient, bucket)];
            case 1:
                // bucket, 不存在此bucket,则创建: 并且加上权限
                _a.sent();
                return [4 /*yield*/, ossClient.getBucketLocation(bucket)];
            case 2:
                location_1 = _a.sent();
                ossClient = new ali_oss_1.default({
                    bucket: bucket,
                    region: location_1.location,
                    accessKeyId: ossConfig === null || ossConfig === void 0 ? void 0 : ossConfig.accessKeyId,
                    accessKeySecret: ossConfig === null || ossConfig === void 0 ? void 0 : ossConfig.accessKeySecret,
                    securityToken: ossConfig === null || ossConfig === void 0 ? void 0 : ossConfig.securityToken,
                });
                // 文件上传
                return [4 /*yield*/, put(ossClient, file, object)];
            case 3:
                // 文件上传
                _a.sent();
                return [3 /*break*/, 7];
            case 4:
                _a.trys.push([4, 6, , 7]);
                // 文件权限更新
                return [4 /*yield*/, setPrivate(ossClient, file, object)];
            case 5:
                // 文件权限更新
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                e_1 = _a.sent();
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
function put(ossClient, file, object) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ossClient.put("" + object, file)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, ossClient.putACL("" + object, 'public-read')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function setPrivate(ossClient, file, object) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ossClient.putACL("" + object, 'private')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getOrCreateBucket(ossClient, bucket) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1, vm;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 6]);
                    return [4 /*yield*/, ossClient.getBucketInfo(bucket)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 2:
                    error_1 = _a.sent();
                    if (!(error_1.code == 'NoSuchBucket')) return [3 /*break*/, 4];
                    vm = core_1.spinner("Create " + bucket + " bucket");
                    return [4 /*yield*/, ossClient.putBucket(bucket)];
                case 3:
                    _a.sent();
                    vm.succeed();
                    return [3 /*break*/, 5];
                case 4: throw new Error(error_1.message);
                case 5: return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL29zcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWdDO0FBQ2hDLDhDQUFnRDtBQWFoRCxtQkFBZSxVQUFPLFNBQXFCOzs7OztnQkFDL0IsTUFBTSxHQUF5QixTQUFTLE9BQWxDLEVBQUUsSUFBSSxHQUFtQixTQUFTLEtBQTVCLEVBQUUsTUFBTSxHQUFXLFNBQVMsT0FBcEIsRUFBRyxJQUFJLEdBQUksU0FBUyxLQUFiLENBQWM7Z0JBRTdDLFNBQVMsR0FBRyxJQUFJLGlCQUFTLENBQUM7b0JBQzFCLE1BQU0sRUFBRSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsTUFBTTtvQkFDekIsTUFBTSxFQUFFLFVBQU8sU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLE1BQU0sQ0FBRTtvQkFDbEMsV0FBVyxFQUFFLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxXQUFXO29CQUNuQyxlQUFlLEVBQUUsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLGVBQWU7b0JBQzNDLGFBQWEsRUFBRSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsYUFBYTtpQkFDMUMsQ0FBQyxDQUFDO3FCQUVBLENBQUEsSUFBSSxJQUFJLFFBQVEsQ0FBQSxFQUFoQix3QkFBZ0I7Z0JBQ2YsaUNBQWlDO2dCQUNqQyxxQkFBTSxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUE7O2dCQUQxQyxpQ0FBaUM7Z0JBQ2pDLFNBQTBDLENBQUM7Z0JBRTFCLHFCQUFNLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBQTs7Z0JBQXBELGFBQVcsU0FBeUM7Z0JBQzFELFNBQVMsR0FBRyxJQUFJLGlCQUFTLENBQUM7b0JBQ3RCLE1BQU0sUUFBQTtvQkFDTixNQUFNLEVBQUUsVUFBUSxDQUFDLFFBQVE7b0JBQ3pCLFdBQVcsRUFBRSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsV0FBVztvQkFDbkMsZUFBZSxFQUFFLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxlQUFlO29CQUMzQyxhQUFhLEVBQUUsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLGFBQWE7aUJBQzFDLENBQUMsQ0FBQztnQkFDSCxPQUFPO2dCQUNQLHFCQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFBOztnQkFEbEMsT0FBTztnQkFDUCxTQUFrQyxDQUFDOzs7O2dCQUcvQixTQUFTO2dCQUNULHFCQUFNLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFBOztnQkFEekMsU0FBUztnQkFDVCxTQUF5QyxDQUFDOzs7Ozs7OztLQUdyRCxFQUFDO0FBR0YsU0FBZSxHQUFHLENBQUMsU0FBb0IsRUFBRSxJQUFZLEVBQUUsTUFBYzs7Ozt3QkFDakUscUJBQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFHLE1BQVEsRUFBRSxJQUFJLENBQUMsRUFBQTs7b0JBQXRDLFNBQXNDLENBQUM7b0JBQ3ZDLHFCQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBRyxNQUFRLEVBQUUsYUFBYSxDQUFDLEVBQUE7O29CQUFsRCxTQUFrRCxDQUFBOzs7OztDQUNyRDtBQUVELFNBQWUsVUFBVSxDQUFDLFNBQW9CLEVBQUUsSUFBWSxFQUFFLE1BQWM7Ozs7d0JBQ3hFLHFCQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBRyxNQUFRLEVBQUUsU0FBUyxDQUFDLEVBQUE7O29CQUE5QyxTQUE4QyxDQUFBOzs7OztDQUNqRDtBQUVELFNBQWUsaUJBQWlCLENBQUMsU0FBb0IsRUFBRSxNQUFjOzs7Ozs7O29CQUU3RCxxQkFBTSxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFBOztvQkFBckMsU0FBcUMsQ0FBQzs7Ozt5QkFFbEMsQ0FBQSxPQUFLLENBQUMsSUFBSSxJQUFJLGNBQWMsQ0FBQSxFQUE1Qix3QkFBNEI7b0JBQ3RCLEVBQUUsR0FBRyxjQUFPLENBQUMsWUFBVSxNQUFNLFlBQVMsQ0FBQyxDQUFDO29CQUM5QyxxQkFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFBOztvQkFBakMsU0FBaUMsQ0FBQztvQkFDbEMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDOzt3QkFFYixNQUFNLElBQUksS0FBSyxDQUFDLE9BQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7O0NBRzFDIn0=