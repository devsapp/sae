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
exports.removeResources = exports.putResources = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var path = require('path');
/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
function checkDirExist(folderpath) {
    return __awaiter(this, void 0, void 0, function () {
        var pathArr, _path, i;
        return __generator(this, function (_a) {
            pathArr = folderpath.split('/');
            _path = '';
            for (i = 0; i < pathArr.length; i++) {
                if (pathArr[i]) {
                    _path += "/" + pathArr[i];
                    if (!fs_extra_1.default.existsSync(_path)) {
                        fs_extra_1.default.mkdirSync(_path);
                    }
                }
            }
            return [2 /*return*/];
        });
    });
}
function putResources(accountID, resource) {
    return __awaiter(this, void 0, void 0, function () {
        var sPath, dirPath, fileName, filepath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sPath = process.cwd();
                    dirPath = path.join(sPath, '.s', 'fc-cache');
                    fileName = accountID + '_' + resource.region + '_' + resource.appName + '_create_resources.json';
                    filepath = path.join(dirPath, fileName);
                    checkDirExist(dirPath);
                    return [4 /*yield*/, fs_extra_1.default.outputFile(filepath, JSON.stringify(resource, null, 2))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.putResources = putResources;
function removeResources(accountID, region, appName) {
    return __awaiter(this, void 0, void 0, function () {
        var sPath, dirPath, fileName, filepath;
        return __generator(this, function (_a) {
            sPath = process.cwd();
            dirPath = path.join(sPath, '.s', 'fc-cache');
            fileName = accountID + '_' + region + '_' + appName + '_create_resources.json';
            filepath = path.join(dirPath, fileName);
            fs_extra_1.default.unlink(filepath, function (err) {
                if (err)
                    throw err;
            });
            return [2 /*return*/];
        });
    });
}
exports.removeResources = removeResources;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3Jlc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUEyQjtBQUMzQixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFXN0I7OztHQUdHO0FBQ0gsU0FBZSxhQUFhLENBQUMsVUFBVTs7OztZQUM3QixPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2YsS0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDWixLQUFLLElBQUksTUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFHLENBQUM7b0JBQzFCLElBQUksQ0FBQyxrQkFBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDeEIsa0JBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3hCO2lCQUNKO2FBQ0o7Ozs7Q0FDSjtBQUdELFNBQXNCLFlBQVksQ0FBQyxTQUFpQixFQUFFLFFBQWtCOzs7Ozs7b0JBQzlELEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ3RCLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQzdDLFFBQVEsR0FBRyxTQUFTLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7b0JBQ2pHLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDOUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN2QixxQkFBTSxrQkFBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUE7O29CQUFqRSxTQUFpRSxDQUFDOzs7OztDQUNyRTtBQVBELG9DQU9DO0FBRUQsU0FBc0IsZUFBZSxDQUFDLFNBQWlCLEVBQUUsTUFBYyxFQUFFLE9BQWU7Ozs7WUFDOUUsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN0QixPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzdDLFFBQVEsR0FBRyxTQUFTLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLHdCQUF3QixDQUFDO1lBQy9FLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM5QyxrQkFBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxHQUFHO2dCQUM5QixJQUFJLEdBQUc7b0JBQUUsTUFBTSxHQUFHLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7Ozs7Q0FDTjtBQVJELDBDQVFDIn0=