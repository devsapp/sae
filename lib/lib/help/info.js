"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.INFO = void 0;
var constant_1 = require("./constant");
exports.INFO = [
    {
        header: 'Info',
        content: 'Query online application details',
    },
    {
        header: 'Document',
        content: 'https://github.com/devsapp/sae/blob/main/docs/command/info.md',
    },
    {
        header: 'Usage',
        content: '$ s info <options> ',
    },
    {
        header: 'Options',
        optionList: [
            constant_1.applicationNameDescribe,
        ],
    },
    __assign({}, constant_1.globalParams),
    __assign({}, constant_1.globalDescribe),
    {
        header: 'Examples with Yaml',
        content: ['$ s info'],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli sae info --application-name appName',
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaGVscC9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQW1GO0FBRXRFLFFBQUEsSUFBSSxHQUFHO0lBQ2hCO1FBQ0ksTUFBTSxFQUFFLE1BQU07UUFDZCxPQUFPLEVBQUUsa0NBQWtDO0tBQzlDO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsVUFBVTtRQUNsQixPQUFPLEVBQUUsK0RBQStEO0tBQzNFO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSxxQkFBcUI7S0FDakM7SUFDRDtRQUNJLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFVBQVUsRUFBRTtZQUNSLGtDQUF1QjtTQUMxQjtLQUNKO2lCQUNJLHVCQUFZO2lCQUNaLHlCQUFjO0lBQ25CO1FBQ0ksTUFBTSxFQUFFLG9CQUFvQjtRQUM1QixPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUM7S0FDeEI7SUFDRDtRQUNJLE1BQU0sRUFBRSxtQkFBbUI7UUFDM0IsT0FBTyxFQUFFO1lBQ0wsNkNBQTZDO1NBQ2hEO0tBQ0o7Q0FDSixDQUFDIn0=