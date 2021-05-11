"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var tty_table_1 = __importDefault(require("tty-table"));
var lodash_get_1 = __importDefault(require("lodash.get"));
var BaseComponent = /** @class */ (function () {
    function BaseComponent(inputs) {
        this.inputs = inputs;
        var pkgPath = path_1.default.join(__dirname, '..', 'package.json');
        if (pkgPath) {
            var pkg = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'package.json'), 'utf8'));
            this.name = pkg.name;
        }
    }
    BaseComponent.prototype.__doc = function (projectName) {
        var _this = this;
        var docPath = path_1.default.join(__dirname, '..', 'doc', 'doc.json');
        if (fs_1.default.existsSync(docPath)) {
            var fileContent = fs_1.default.readFileSync(docPath).toString();
            var result = JSON.parse(fileContent);
            var options = {
                borderStyle: "solid",
                borderColor: "blue",
                headerAlign: "center",
                align: "left",
                color: "cyan",
                width: "100%"
            };
            var header = [{
                    value: "方法",
                    headerColor: "cyan",
                    color: "cyan",
                    align: "left",
                    width: "auto",
                    formatter: function (value) {
                        return value;
                    }
                }, {
                    value: "方法说明",
                    headerColor: "cyan",
                    color: "cyan",
                    align: "left",
                    width: "auto",
                    formatter: function (value) {
                        return value;
                    }
                }, {
                    value: "入参示例",
                    headerColor: "cyan",
                    color: "cyan",
                    align: "left",
                    width: 'auto',
                    formatter: function (value) {
                        return value;
                    }
                }, {
                    value: "命令行调用示例",
                    headerColor: "cyan",
                    color: "cyan",
                    align: "left",
                    width: 'auto',
                    formatter: function (value) {
                        return value;
                    }
                }];
            var rows_1 = [];
            var data = lodash_get_1.default(result, 'children[0].children', []).filter(function (item) { return item.kindString === 'Method' && lodash_get_1.default(item, 'flags.isPublic'); });
            data.forEach(function (item) {
                var params = lodash_get_1.default(item, 'signatures[0].parameters[0]', {});
                var paramText = lodash_get_1.default(params, 'comment.text', '');
                rows_1.push([item.name, lodash_get_1.default(item, 'signatures[0].comment.shortText', ''), paramText, "s " + (projectName || _this.name) + " " + item.name]);
            });
            return tty_table_1.default(header, rows_1, options).render();
        }
        else {
            return 'not found doc content';
        }
    };
    return BaseComponent;
}());
exports.default = BaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLDBDQUFvQjtBQUNwQiw4Q0FBd0I7QUFDeEIsd0RBQThCO0FBQzlCLDBEQUE2QjtBQUU3QjtJQUlJLHVCQUFzQixNQUFXO1FBQVgsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUM3QixJQUFNLE9BQU8sR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDM0QsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUUsQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVELDZCQUFLLEdBQUwsVUFBTSxXQUFtQjtRQUF6QixpQkFpRUM7UUFoRUcsSUFBTSxPQUFPLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM5RCxJQUFJLFlBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDeEIsSUFBTSxXQUFXLEdBQVcsWUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoRSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZDLElBQU0sT0FBTyxHQUFHO2dCQUNaLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsV0FBVyxFQUFFLFFBQVE7Z0JBQ3JCLEtBQUssRUFBRSxNQUFNO2dCQUNiLEtBQUssRUFBRSxNQUFNO2dCQUNiLEtBQUssRUFBRSxNQUFNO2FBQ2hCLENBQUE7WUFDRCxJQUFNLE1BQU0sR0FBRyxDQUFDO29CQUNaLEtBQUssRUFBRSxJQUFJO29CQUNYLFdBQVcsRUFBRSxNQUFNO29CQUNuQixLQUFLLEVBQUUsTUFBTTtvQkFDYixLQUFLLEVBQUUsTUFBTTtvQkFDYixLQUFLLEVBQUUsTUFBTTtvQkFDYixTQUFTLEVBQUUsVUFBVSxLQUFLO3dCQUN0QixPQUFPLEtBQUssQ0FBQztvQkFDakIsQ0FBQztpQkFDSixFQUFFO29CQUNDLEtBQUssRUFBRSxNQUFNO29CQUNiLFdBQVcsRUFBRSxNQUFNO29CQUNuQixLQUFLLEVBQUUsTUFBTTtvQkFDYixLQUFLLEVBQUUsTUFBTTtvQkFDYixLQUFLLEVBQUUsTUFBTTtvQkFDYixTQUFTLEVBQUUsVUFBVSxLQUFLO3dCQUN0QixPQUFPLEtBQUssQ0FBQztvQkFDakIsQ0FBQztpQkFDSixFQUFFO29CQUNDLEtBQUssRUFBRSxNQUFNO29CQUNiLFdBQVcsRUFBRSxNQUFNO29CQUNuQixLQUFLLEVBQUUsTUFBTTtvQkFDYixLQUFLLEVBQUUsTUFBTTtvQkFDYixLQUFLLEVBQUUsTUFBTTtvQkFDYixTQUFTLEVBQUUsVUFBVSxLQUFLO3dCQUN0QixPQUFPLEtBQUssQ0FBQztvQkFDakIsQ0FBQztpQkFDSixFQUFFO29CQUNDLEtBQUssRUFBRSxTQUFTO29CQUNoQixXQUFXLEVBQUUsTUFBTTtvQkFDbkIsS0FBSyxFQUFFLE1BQU07b0JBQ2IsS0FBSyxFQUFFLE1BQU07b0JBQ2IsS0FBSyxFQUFFLE1BQU07b0JBQ2IsU0FBUyxFQUFFLFVBQVUsS0FBSzt3QkFDdEIsT0FBTyxLQUFLLENBQUM7b0JBQ2pCLENBQUM7aUJBQ0osQ0FBQyxDQUFBO1lBQ0YsSUFBTSxNQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLElBQU0sSUFBSSxHQUFHLG9CQUFHLENBQUMsTUFBTSxFQUFFLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUSxJQUFJLG9CQUFHLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLEVBQTNELENBQTJELENBQUMsQ0FBQztZQUVuSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtnQkFDZCxJQUFNLE1BQU0sR0FBRyxvQkFBRyxDQUFDLElBQUksRUFBRSw2QkFBNkIsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDNUQsSUFBTSxTQUFTLEdBQUcsb0JBQUcsQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRCxNQUFJLENBQUMsSUFBSSxDQUNMLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxvQkFBRyxDQUFDLElBQUksRUFBRSxpQ0FBaUMsRUFBRSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBSyxXQUFXLElBQUksS0FBSSxDQUFDLElBQUksVUFBSSxJQUFJLENBQUMsSUFBTSxDQUFDLENBQ3pILENBQUM7WUFDTixDQUFDLENBQUMsQ0FBQTtZQUVGLE9BQU8sbUJBQUssQ0FBQyxNQUFNLEVBQUUsTUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2hEO2FBQU07WUFDSCxPQUFPLHVCQUF1QixDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVMLG9CQUFDO0FBQUQsQ0FBQyxBQS9FRCxJQStFQyJ9