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
var output = {
    name: 'output',
    description: '[Optional] Output the query details',
    defaultOption: false,
    type: String,
};
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
            output,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaGVscC9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQW1GO0FBRW5GLElBQU0sTUFBTSxHQUFHO0lBQ1gsSUFBSSxFQUFFLFFBQVE7SUFDZCxXQUFXLEVBQUUscUNBQXFDO0lBQ2xELGFBQWEsRUFBRSxLQUFLO0lBQ3BCLElBQUksRUFBRSxNQUFNO0NBQ2YsQ0FBQztBQUVXLFFBQUEsSUFBSSxHQUFHO0lBQ2hCO1FBQ0ksTUFBTSxFQUFFLE1BQU07UUFDZCxPQUFPLEVBQUUsa0NBQWtDO0tBQzlDO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsVUFBVTtRQUNsQixPQUFPLEVBQUUsK0RBQStEO0tBQzNFO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSxxQkFBcUI7S0FDakM7SUFDRDtRQUNJLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFVBQVUsRUFBRTtZQUNSLGtDQUF1QjtZQUN2QixNQUFNO1NBQ1Q7S0FDSjtpQkFDSSx1QkFBWTtpQkFDWix5QkFBYztJQUNuQjtRQUNJLE1BQU0sRUFBRSxvQkFBb0I7UUFDNUIsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO0tBQ3hCO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsbUJBQW1CO1FBQzNCLE9BQU8sRUFBRTtZQUNMLDZDQUE2QztTQUNoRDtLQUNKO0NBQ0osQ0FBQyJ9