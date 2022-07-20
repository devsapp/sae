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
exports.handleCode = exports.uploadFile = void 0;
var core = __importStar(require("@serverless-devs/core"));
var oss_service_1 = __importDefault(require("./common/oss.service"));
var fs_1 = __importDefault(require("fs"));
var string_random_1 = __importDefault(require("string-random"));
function uploadFile(credentials, codePackage, object, type) {
    return __awaiter(this, void 0, void 0, function () {
        var bucket, region, file, ossConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bucket = codePackage.Bucket.Name;
                    region = codePackage.Bucket.Region;
                    file = codePackage.Path;
                    ossConfig = {
                        accessKeyId: credentials.AccessKeyID,
                        accessKeySecret: credentials.AccessKeySecret,
                        bucket: bucket,
                        region: region,
                        file: file,
                        object: object,
                        type: type,
                    };
                    return [4 /*yield*/, oss_service_1.default(ossConfig)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.uploadFile = uploadFile;
function handleCode(Region, Application, credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var AccountID, tempObject, applictionObject, code, image, codePackage, codeBucket;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    AccountID = credentials.AccountID;
                    tempObject = string_random_1.default(16);
                    applictionObject = JSON.parse(JSON.stringify(Application));
                    delete applictionObject.Code;
                    // 对code进行处理
                    if (!Application.code) {
                        throw new core.CatchableError("未指定部署的代码");
                    }
                    code = Application.Code;
                    image = code.Image;
                    codePackage = code.Package;
                    if (!image) return [3 /*break*/, 1];
                    applictionObject.PackageType = 'Image';
                    applictionObject.ImageUrl = image;
                    return [3 /*break*/, 9];
                case 1:
                    if (!codePackage) return [3 /*break*/, 8];
                    if (typeof codePackage == 'string') {
                        codePackage = {
                            Path: codePackage,
                            Bucket: {
                                Region: Region,
                                Name: "sae-packages-" + Region + "-" + AccountID
                            }
                        };
                    }
                    else {
                        if (!codePackage.Path) {
                            throw new core.CatchableError("未能找到iamge/package，请确定参数传递正确");
                        }
                        codeBucket = codePackage.Bucket || {};
                        codeBucket.Region = codeBucket.Region || Region;
                        codeBucket.Name = codeBucket.Name || "sae-packages-" + Region + "-" + AccountID;
                        codePackage.Bucket = codeBucket;
                    }
                    if (!(codePackage.Path.endsWith('.war') || codePackage.Path.endsWith('.jar'))) return [3 /*break*/, 6];
                    if (codePackage.Path.endsWith('.war')) {
                        tempObject = tempObject + '.war';
                        applictionObject.PackageType = 'War';
                        applictionObject.WebContainer = 'apache-tomcat-8.5.42';
                    }
                    else if (codePackage.Path.endsWith('.jar')) {
                        tempObject = tempObject + '.jar';
                        applictionObject.PackageType = 'FatJar';
                    }
                    applictionObject.Jdk = 'Open JDK 8';
                    return [4 /*yield*/, fs_1.default.existsSync(codePackage.Path)];
                case 2:
                    if (!_a.sent()) return [3 /*break*/, 4];
                    return [4 /*yield*/, uploadFile(credentials, codePackage, tempObject, 'upload')];
                case 3:
                    _a.sent();
                    applictionObject.PackageUrl = "https://" + codePackage.Bucket.Name + ".oss-" + codePackage.Bucket.Region + ".aliyuncs.com/" + tempObject;
                    return [3 /*break*/, 5];
                case 4:
                    if (codePackage.Path.startsWith("http://") || codePackage.Path.startsWith("https://")) {
                        applictionObject.PackageUrl = codePackage.Path;
                    }
                    else {
                        throw new core.CatchableError("未能成功找到文件，请确定package的路径正确");
                    }
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6: throw new core.CatchableError("未能找到war/jar文件，请确定参数传递正确");
                case 7: return [3 /*break*/, 9];
                case 8: throw new core.CatchableError("未能找到iamge/package，请确定参数传递正确");
                case 9: return [2 /*return*/, { applictionObject: applictionObject, codePackage: codePackage, tempObject: tempObject }];
            }
        });
    });
}
exports.handleCode = handleCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUE4QztBQUM5QyxxRUFBdUQ7QUFDdkQsMENBQXFCO0FBQ3JCLGdFQUF5QztBQUV6QyxTQUFzQixVQUFVLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSTs7Ozs7O29CQUMvRCxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2pDLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDbkMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7b0JBQ3RCLFNBQVMsR0FBZTt3QkFDMUIsV0FBVyxFQUFFLFdBQVcsQ0FBQyxXQUFXO3dCQUNwQyxlQUFlLEVBQUUsV0FBVyxDQUFDLGVBQWU7d0JBQzVDLE1BQU0sRUFBRSxNQUFNO3dCQUNkLE1BQU0sRUFBRSxNQUFNO3dCQUNkLElBQUksRUFBRSxJQUFJO3dCQUNWLE1BQU0sRUFBRSxNQUFNO3dCQUNkLElBQUksRUFBRSxJQUFJO3FCQUNiLENBQUM7b0JBQ0YscUJBQU0scUJBQUcsQ0FBQyxTQUFTLENBQUMsRUFBQTs7b0JBQXBCLFNBQW9CLENBQUM7Ozs7O0NBQ3hCO0FBZEQsZ0NBY0M7QUFHRCxTQUFzQixVQUFVLENBQUMsTUFBVyxFQUFFLFdBQWdCLEVBQUUsV0FBZTs7Ozs7O29CQUNyRSxTQUFTLEdBQUssV0FBVyxVQUFoQixDQUFpQjtvQkFFNUIsVUFBVSxHQUFHLHVCQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzVCLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNqRSxPQUFP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