"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventFormat = exports.applicationNameDescribe = exports.regionDescribe = exports.globalDescribe = exports.globalParams = void 0;
exports.globalParams = {
    header: 'Global Options',
    optionList: [
        {
            name: 'help',
            description: '[Optional] Help for command',
            alias: 'h',
            type: Boolean,
        },
    ],
};
exports.globalDescribe = {
    header: 'Options Help',
    content: [
        { desc: 'Required: Required parameters in YAML mode and CLI mode' },
        { desc: 'C-Required: Required parameters in CLI mode' },
        { desc: 'Y-Required: Required parameters in Yaml mode' },
        { desc: 'Optional: Non mandatory parameter' },
        { desc: '✋ The difference between Yaml mode and CLI mode: http://ej6.net/yc' },
    ],
};
exports.regionDescribe = {
    name: 'region',
    description: '[C-Required] Specify the fc region, value: cn-hangzhou/cn-beijing/cn-beijing/cn-hangzhou/cn-shanghai/cn-qingdao/cn-zhangjiakou/cn-huhehaote/cn-shenzhen/cn-chengdu/cn-hongkong/ap-southeast-1/ap-southeast-2/ap-southeast-3/ap-southeast-5/ap-northeast-1/eu-central-1/eu-west-1/us-west-1/us-east-1/ap-south-1',
    defaultOption: false,
    type: Boolean,
};
exports.applicationNameDescribe = {
    name: 'application-name',
    description: '[Required] Specify the sae application name',
    type: String,
};
exports.eventFormat = {
    header: 'Event Format',
    content: 'Quickly obtain the data structures of different events through the command [s cli fc-event -h]',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2hlbHAvY29uc3RhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxZQUFZLEdBQUc7SUFDMUIsTUFBTSxFQUFFLGdCQUFnQjtJQUN4QixVQUFVLEVBQUU7UUFDVjtZQUNFLElBQUksRUFBRSxNQUFNO1lBQ1osV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxLQUFLLEVBQUUsR0FBRztZQUNWLElBQUksRUFBRSxPQUFPO1NBQ2Q7S0FDRjtDQUNGLENBQUM7QUFFVyxRQUFBLGNBQWMsR0FBRztJQUM1QixNQUFNLEVBQUUsY0FBYztJQUN0QixPQUFPLEVBQUU7UUFDUCxFQUFFLElBQUksRUFBRSx5REFBeUQsRUFBRTtRQUNuRSxFQUFFLElBQUksRUFBRSw2Q0FBNkMsRUFBRTtRQUN2RCxFQUFFLElBQUksRUFBRSw4Q0FBOEMsRUFBRTtRQUN4RCxFQUFFLElBQUksRUFBRSxtQ0FBbUMsRUFBRTtRQUM3QyxFQUFFLElBQUksRUFBRSxvRUFBb0UsRUFBRTtLQUMvRTtDQUNGLENBQUM7QUFFVyxRQUFBLGNBQWMsR0FBRztJQUM1QixJQUFJLEVBQUUsUUFBUTtJQUNkLFdBQVcsRUFDVCxpVEFBaVQ7SUFDblQsYUFBYSxFQUFFLEtBQUs7SUFDcEIsSUFBSSxFQUFFLE9BQU87Q0FDZCxDQUFDO0FBRVcsUUFBQSx1QkFBdUIsR0FBRztJQUNyQyxJQUFJLEVBQUUsa0JBQWtCO0lBQ3hCLFdBQVcsRUFBRSw2Q0FBNkM7SUFDMUQsSUFBSSxFQUFFLE1BQU07Q0FDYixDQUFDO0FBRVcsUUFBQSxXQUFXLEdBQUc7SUFDekIsTUFBTSxFQUFFLGNBQWM7SUFDdEIsT0FBTyxFQUNMLGdHQUFnRztDQUNuRyxDQUFDIn0=