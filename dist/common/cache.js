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
exports.writeCreatCache = void 0;
var core_1 = require("@serverless-devs/core");
var path_1 = __importDefault(require("path"));
var logger_1 = __importDefault(require("./logger"));
/**
 * 写创建资源的缓存
 */
function writeCreatCache(_a, _b) {
    var accountID = _a.accountID, region = _a.region, appName = _a.appName, configPath = _a.configPath;
    var bucketName = _b.bucketName, appId = _b.appId;
    return __awaiter(this, void 0, void 0, function () {
        var fcCore, stateId, cachePath, cacheData, ex_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, core_1.loadComponent('devsapp/fc-core')];
                case 1:
                    fcCore = _c.sent();
                    return [4 /*yield*/, fcCore.DeployCache.getCreateResourceStateID(accountID, region, appName)];
                case 2:
                    stateId = _c.sent();
                    cachePath = path_1.default.join(configPath ? path_1.default.dirname(configPath) : process.cwd(), '.s');
                    return [4 /*yield*/, core_1.getState(stateId, cachePath)];
                case 3:
                    cacheData = (_c.sent()) || {};
                    if (bucketName) {
                        cacheData.sae_namespaceId = bucketName;
                    }
                    if (appId) {
                        cacheData.sae_appId = appId;
                    }
                    return [4 /*yield*/, core_1.setState(stateId, cacheData, cachePath)];
                case 4:
                    _c.sent();
                    return [3 /*break*/, 6];
                case 5:
                    ex_1 = _c.sent();
                    /* 不影响主进程 */
                    logger_1.default.debug(ex_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.writeCreatCache = writeCreatCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL2NhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUEwRTtBQUMxRSw4Q0FBd0I7QUFDeEIsb0RBQThCO0FBYzlCOztHQUVHO0FBQ0gsU0FBc0IsZUFBZSxDQUNuQyxFQUF5RCxFQUN6RCxFQUErQjtRQUQ3QixTQUFTLGVBQUEsRUFBRSxNQUFNLFlBQUEsRUFBRSxPQUFPLGFBQUEsRUFBRSxVQUFVLGdCQUFBO1FBQ3RDLFVBQVUsZ0JBQUEsRUFBRSxLQUFLLFdBQUE7Ozs7Ozs7b0JBR0YscUJBQU0sb0JBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFBOztvQkFBL0MsTUFBTSxHQUFHLFNBQXNDO29CQUNyQyxxQkFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLHdCQUF3QixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUE7O29CQUF2RixPQUFPLEdBQUcsU0FBNkU7b0JBQ3ZGLFNBQVMsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUV0RSxxQkFBTSxlQUFRLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxFQUFBOztvQkFBL0MsU0FBUyxHQUFHLENBQUMsU0FBa0MsQ0FBQyxJQUFJLEVBQUU7b0JBQzVELElBQUksVUFBVSxFQUFFO3dCQUNkLFNBQVMsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDO3FCQUN4QztvQkFDRCxJQUFJLEtBQUssRUFBRTt3QkFDVCxTQUFTLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztxQkFDN0I7b0JBQ0QscUJBQU0sZUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUE7O29CQUE3QyxTQUE2QyxDQUFDOzs7O29CQUU5QyxZQUFZO29CQUNaLGdCQUFNLENBQUMsS0FBSyxDQUFDLElBQUUsQ0FBQyxDQUFDOzs7Ozs7Q0FFcEI7QUFyQkQsMENBcUJDIn0=