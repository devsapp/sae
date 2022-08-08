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
exports.REMOVE = exports.assumeYesDescribe = void 0;
var constant_1 = require("./constant");
exports.assumeYesDescribe = {
    name: 'assume-yes',
    description: '[Optional] Assume that the answer to any question which would be asked is yes',
    alias: 'y',
    defaultOption: false,
    type: Boolean,
};
exports.REMOVE = [
    {
        header: 'Remove',
        content: 'Remove online application resources',
    },
    {
        header: 'Document',
        content: 'https://github.com/devsapp/sae/blob/main/docs/command/remove.md',
    },
    {
        header: 'Usage',
        content: '$ s remove <options> ',
    },
    {
        header: 'Options',
        optionList: [
            constant_1.applicationNameDescribe, exports.assumeYesDescribe
        ],
    },
    __assign({}, constant_1.globalParams),
    __assign({}, constant_1.globalDescribe),
    {
        header: 'Examples with Yaml',
        content: ['$ s remove'],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli sae remove --application-name appName',
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9oZWxwL3JlbW92ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFtRjtBQUN0RSxRQUFBLGlCQUFpQixHQUFHO0lBQzdCLElBQUksRUFBRSxZQUFZO0lBQ2xCLFdBQVcsRUFBRSwrRUFBK0U7SUFDNUYsS0FBSyxFQUFFLEdBQUc7SUFDVixhQUFhLEVBQUUsS0FBSztJQUNwQixJQUFJLEVBQUUsT0FBTztDQUNkLENBQUM7QUFFUyxRQUFBLE1BQU0sR0FBRztJQUNsQjtRQUNJLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE9BQU8sRUFBRSxxQ0FBcUM7S0FDakQ7SUFDRDtRQUNJLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE9BQU8sRUFBRSxpRUFBaUU7S0FDN0U7SUFDRDtRQUNJLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLHVCQUF1QjtLQUNuQztJQUNEO1FBQ0ksTUFBTSxFQUFFLFNBQVM7UUFDakIsVUFBVSxFQUFFO1lBQ1Isa0NBQXVCLEVBQUMseUJBQWlCO1NBQzVDO0tBQ0o7aUJBQ0ksdUJBQVk7aUJBQ1oseUJBQWM7SUFDbkI7UUFDSSxNQUFNLEVBQUUsb0JBQW9CO1FBQzVCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztLQUMxQjtJQUNEO1FBQ0ksTUFBTSxFQUFFLG1CQUFtQjtRQUMzQixPQUFPLEVBQUU7WUFDTCwrQ0FBK0M7U0FDbEQ7S0FDSjtDQUNKLENBQUMifQ==