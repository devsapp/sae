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
exports.STOP = void 0;
var constant_1 = require("./constant");
exports.STOP = [
    {
        header: 'Stop',
        content: 'Stop online application resources',
    },
    {
        header: 'Document',
        content: 'https://github.com/devsapp/sae/blob/main/docs/command/stop.md',
    },
    {
        header: 'Usage',
        content: '$ s stop <options> ',
    },
    {
        header: 'Options',
        optionList: [
            constant_1.applicationNameDescribe, constant_1.assumeYesDescribe
        ],
    },
    __assign({}, constant_1.globalParams),
    __assign({}, constant_1.globalDescribe),
    {
        header: 'Examples with Yaml',
        content: ['$ s stop'],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli sae stop --application-name appName',
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaGVscC9zdG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXNHO0FBRXpGLFFBQUEsSUFBSSxHQUFHO0lBQ2hCO1FBQ0ksTUFBTSxFQUFFLE1BQU07UUFDZCxPQUFPLEVBQUUsbUNBQW1DO0tBQy9DO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsVUFBVTtRQUNsQixPQUFPLEVBQUUsK0RBQStEO0tBQzNFO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSxxQkFBcUI7S0FDakM7SUFDRDtRQUNJLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFVBQVUsRUFBRTtZQUNSLGtDQUF1QixFQUFDLDRCQUFpQjtTQUM1QztLQUNKO2lCQUNJLHVCQUFZO2lCQUNaLHlCQUFjO0lBQ25CO1FBQ0ksTUFBTSxFQUFFLG9CQUFvQjtRQUM1QixPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUM7S0FDeEI7SUFDRDtRQUNJLE1BQU0sRUFBRSxtQkFBbUI7UUFDM0IsT0FBTyxFQUFFO1lBQ0wsNkNBQTZDO1NBQ2hEO0tBQ0o7Q0FDSixDQUFDIn0=