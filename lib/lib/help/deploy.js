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
exports.DEPLOY = void 0;
var constant_1 = require("./constant");
var useLocal = {
    name: 'use-local',
    description: '[Optional] Deploy resource using local config',
    defaultOption: false,
    type: Boolean,
};
var useRemote = {
    name: 'use-remote',
    description: '[Optional] Deploy resource using remote config',
    defaultOption: false,
    type: Boolean,
};
exports.DEPLOY = [
    {
        header: 'Deploy',
        content: 'Deploy local application online',
    },
    {
        header: 'Document',
        content: 'https://github.com/devsapp/sae/blob/main/docs/command/deploy.md',
    },
    {
        header: 'Usage',
        content: ['$ s deploy <options>'],
    },
    {
        header: 'Options',
        optionList: [
            useLocal,
            useRemote,
        ],
    },
    __assign({}, constant_1.globalParams),
    __assign({}, constant_1.globalDescribe)
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9oZWxwL2RlcGxveS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUEwRDtBQUUxRCxJQUFNLFFBQVEsR0FBRztJQUNiLElBQUksRUFBRSxXQUFXO0lBQ2pCLFdBQVcsRUFBRSwrQ0FBK0M7SUFDNUQsYUFBYSxFQUFFLEtBQUs7SUFDcEIsSUFBSSxFQUFFLE9BQU87Q0FDaEIsQ0FBQztBQUNGLElBQU0sU0FBUyxHQUFHO0lBQ2QsSUFBSSxFQUFFLFlBQVk7SUFDbEIsV0FBVyxFQUFFLGdEQUFnRDtJQUM3RCxhQUFhLEVBQUUsS0FBSztJQUNwQixJQUFJLEVBQUUsT0FBTztDQUNoQixDQUFDO0FBRVcsUUFBQSxNQUFNLEdBQUc7SUFDbEI7UUFDSSxNQUFNLEVBQUUsUUFBUTtRQUNoQixPQUFPLEVBQUUsaUNBQWlDO0tBQzdDO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsVUFBVTtRQUNsQixPQUFPLEVBQUUsaUVBQWlFO0tBQzdFO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsT0FBTztRQUNmLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO0tBQ3BDO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUU7WUFDUixRQUFRO1lBQ1IsU0FBUztTQUNaO0tBQ0o7aUJBQ0ksdUJBQVk7aUJBQ1oseUJBQWM7Q0FDdEIsQ0FBQSJ9