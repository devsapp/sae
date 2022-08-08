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
var fs_extra_1 = __importDefault(require("fs-extra"));
var path = require('path');
var ResourceFile = /** @class */ (function () {
    function ResourceFile() {
    }
    ResourceFile.setFilePath = function (accountID, region, appName) {
        return __awaiter(this, void 0, void 0, function () {
            var sPath, dirPath, fileName, filepath;
            return __generator(this, function (_a) {
                sPath = process.cwd();
                dirPath = path.join(sPath, '.s', 'fc-cache');
                fileName = accountID + '_' + region + '_' + appName + '_create_resources.json';
                filepath = path.join(dirPath, fileName);
                this.checkDirExist(dirPath);
                this.filePath = filepath;
                return [2 /*return*/];
            });
        });
    };
    /**
     * 路径是否存在，不存在则创建
     * @param {string} dir 路径
     */
    ResourceFile.checkDirExist = function (folderpath) {
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
    };
    ResourceFile.putResources = function (resource) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_extra_1.default.outputFile(this.filePath, JSON.stringify(resource, null, 2))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ResourceFile.removeResources = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fs_extra_1.default.unlink(this.filePath, function (err) {
                    if (err)
                        throw err;
                });
                return [2 /*return*/];
            });
        });
    };
    ResourceFile.appendResource = function (name, value) {
        return __awaiter(this, void 0, void 0, function () {
            var cache;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cache = {};
                        try {
                            cache = fs_extra_1.default.readJsonSync(this.filePath);
                        }
                        catch (_e) {
                            /**/
                        }
                        cache[name] = value;
                        return [4 /*yield*/, fs_extra_1.default.outputFile(this.filePath, JSON.stringify(cache, null, 2))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ResourceFile;
}());
exports.default = ResourceFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3Jlc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQTJCO0FBQzNCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQVk3QjtJQUFBO0lBaURBLENBQUM7SUEvQ2dCLHdCQUFXLEdBQXhCLFVBQXlCLFNBQWlCLEVBQUUsTUFBYyxFQUFFLE9BQWU7Ozs7Z0JBQ2pFLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3RCLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzdDLFFBQVEsR0FBRyxTQUFTLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLHdCQUF3QixDQUFDO2dCQUMvRSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOzs7O0tBQzVCO0lBQ0w7OztPQUdHO0lBQ1csMEJBQWEsR0FBMUIsVUFBMkIsVUFBVTs7OztnQkFDNUIsT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ2YsS0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNyQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTt3QkFDWixLQUFLLElBQUksTUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFHLENBQUM7d0JBQzFCLElBQUksQ0FBQyxrQkFBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFDeEIsa0JBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ3hCO3FCQUNKO2lCQUNKOzs7O0tBQ0o7SUFHWSx5QkFBWSxHQUF6QixVQUEwQixRQUFrQjs7Ozs0QkFDeEMscUJBQU0sa0JBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQTs7d0JBQXRFLFNBQXNFLENBQUM7Ozs7O0tBQzFFO0lBRVksNEJBQWUsR0FBNUI7OztnQkFDSSxrQkFBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsR0FBRztvQkFDbkMsSUFBSSxHQUFHO3dCQUFFLE1BQU0sR0FBRyxDQUFDO2dCQUN2QixDQUFDLENBQUMsQ0FBQzs7OztLQUNOO0lBRVksMkJBQWMsR0FBM0IsVUFBNEIsSUFBWSxFQUFFLEtBQVU7Ozs7Ozt3QkFDNUMsS0FBSyxHQUFRLEVBQUUsQ0FBQzt3QkFDcEIsSUFBSTs0QkFDRixLQUFLLEdBQUcsa0JBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUN6Qzt3QkFBQyxPQUFPLEVBQUUsRUFBRTs0QkFDWCxJQUFJO3lCQUNMO3dCQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7d0JBQ3BCLHFCQUFNLGtCQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUE7O3dCQUFuRSxTQUFtRSxDQUFDOzs7OztLQUN2RTtJQUVELG1CQUFDO0FBQUQsQ0FBQyxBQWpERCxJQWlEQyJ9