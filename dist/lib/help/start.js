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
exports.START = void 0;
var constant_1 = require("./constant");
exports.START = [
    {
        header: 'Start',
        content: 'Start online application resources',
    },
    {
        header: 'Document',
        content: 'https://github.com/devsapp/sae/blob/main/docs/command/start.md',
    },
    {
        header: 'Usage',
        content: '$ s start <options> ',
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
        content: ['$ s start'],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli sae start --application-name appName',
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2hlbHAvc3RhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBc0c7QUFFekYsUUFBQSxLQUFLLEdBQUc7SUFDakI7UUFDSSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSxvQ0FBb0M7S0FDaEQ7SUFDRDtRQUNJLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE9BQU8sRUFBRSxnRUFBZ0U7S0FDNUU7SUFDRDtRQUNJLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLHNCQUFzQjtLQUNsQztJQUNEO1FBQ0ksTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFO1lBQ1Isa0NBQXVCLEVBQUUsNEJBQWlCO1NBQzdDO0tBQ0o7aUJBQ0ksdUJBQVk7aUJBQ1oseUJBQWM7SUFDbkI7UUFDSSxNQUFNLEVBQUUsb0JBQW9CO1FBQzVCLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztLQUN6QjtJQUNEO1FBQ0ksTUFBTSxFQUFFLG1CQUFtQjtRQUMzQixPQUFPLEVBQUU7WUFDTCw4Q0FBOEM7U0FDakQ7S0FDSjtDQUNKLENBQUMifQ==