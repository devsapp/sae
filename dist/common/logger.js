"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var core_1 = require("@serverless-devs/core");
var ComponentLogger = /** @class */ (function () {
    function ComponentLogger() {
    }
    ComponentLogger.setContent = function (content) {
        ComponentLogger.CONTENT = content;
    };
    ComponentLogger.log = function (m) {
        core_1.Logger.log(m);
    };
    ComponentLogger.info = function (m) {
        core_1.Logger.info(ComponentLogger.CONTENT, m);
    };
    ComponentLogger.debug = function (m) {
        core_1.Logger.debug(ComponentLogger.CONTENT, m);
    };
    ComponentLogger.error = function (m) {
        core_1.Logger.error(ComponentLogger.CONTENT, m);
    };
    ComponentLogger.warning = function (m) {
        core_1.Logger.warn(ComponentLogger.CONTENT, m);
    };
    ComponentLogger.success = function (m) {
        core_1.Logger.log(m, 'green');
    };
    ComponentLogger.CONTENT = '';
    return ComponentLogger;
}());
exports.default = ComponentLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxhQUFhO0FBQ2IsOENBQStDO0FBRS9DO0lBQUE7SUE2QkEsQ0FBQztJQTNCVSwwQkFBVSxHQUFqQixVQUFrQixPQUFPO1FBQ3JCLGVBQWUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3RDLENBQUM7SUFDTSxtQkFBRyxHQUFWLFVBQVcsQ0FBQztRQUNSLGFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUNNLG9CQUFJLEdBQVgsVUFBWSxDQUFDO1FBQ1QsYUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSxxQkFBSyxHQUFaLFVBQWEsQ0FBQztRQUNWLGFBQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0scUJBQUssR0FBWixVQUFhLENBQUM7UUFDVixhQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLHVCQUFPLEdBQWQsVUFBZSxDQUFDO1FBQ1osYUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFHTSx1QkFBTyxHQUFkLFVBQWUsQ0FBQztRQUNaLGFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUExQk0sdUJBQU8sR0FBRyxFQUFFLENBQUM7SUE0QnhCLHNCQUFDO0NBQUEsQUE3QkQsSUE2QkM7a0JBN0JvQixlQUFlIn0=