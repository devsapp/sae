"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventFormat = exports.applicationNameDescribe = exports.regionDescribe = exports.globalDescribe = exports.globalParams = exports.memoryLimit = exports.cpuLimit = void 0;
exports.cpuLimit = [500, 1000, 2000, 4000, 8000, 12000, 16000, 32000];
exports.memoryLimit = new Map([
    [500, [1024, 2048]],
    [1000, [1024, 2048, 4096]],
    [2000, [2048, 4096, 8192]],
    [4000, [4096, 8192, 16384]],
    [8000, [8192, 16384, 65536]],
    [12000, [12288, 24576]],
    [16000, [16384, 32768, 65536]],
    [32000, [65536, 131072]],
]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2hlbHAvY29uc3RhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFOUQsUUFBQSxXQUFXLEdBQUcsSUFBSSxHQUFHLENBQUM7SUFDakMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztDQUN6QixDQUFDLENBQUM7QUFFVSxRQUFBLFlBQVksR0FBRztJQUMxQixNQUFNLEVBQUUsZ0JBQWdCO0lBQ3hCLFVBQVUsRUFBRTtRQUNWO1lBQ0UsSUFBSSxFQUFFLE1BQU07WUFDWixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLEtBQUssRUFBRSxHQUFHO1lBQ1YsSUFBSSxFQUFFLE9BQU87U0FDZDtLQUNGO0NBQ0YsQ0FBQztBQUVXLFFBQUEsY0FBYyxHQUFHO0lBQzVCLE1BQU0sRUFBRSxjQUFjO0lBQ3RCLE9BQU8sRUFBRTtRQUNQLEVBQUUsSUFBSSxFQUFFLHlEQUF5RCxFQUFFO1FBQ25FLEVBQUUsSUFBSSxFQUFFLDZDQUE2QyxFQUFFO1FBQ3ZELEVBQUUsSUFBSSxFQUFFLDhDQUE4QyxFQUFFO1FBQ3hELEVBQUUsSUFBSSxFQUFFLG1DQUFtQyxFQUFFO1FBQzdDLEVBQUUsSUFBSSxFQUFFLG9FQUFvRSxFQUFFO0tBQy9FO0NBQ0YsQ0FBQztBQUVXLFFBQUEsY0FBYyxHQUFHO0lBQzVCLElBQUksRUFBRSxRQUFRO0lBQ2QsV0FBVyxFQUNULGlUQUFpVDtJQUNuVCxhQUFhLEVBQUUsS0FBSztJQUNwQixJQUFJLEVBQUUsT0FBTztDQUNkLENBQUM7QUFFVyxRQUFBLHVCQUF1QixHQUFHO0lBQ3JDLElBQUksRUFBRSxrQkFBa0I7SUFDeEIsV0FBVyxFQUFFLDZDQUE2QztJQUMxRCxJQUFJLEVBQUUsTUFBTTtDQUNiLENBQUM7QUFFVyxRQUFBLFdBQVcsR0FBRztJQUN6QixNQUFNLEVBQUUsY0FBYztJQUN0QixPQUFPLEVBQ0wsZ0dBQWdHO0NBQ25HLENBQUMifQ==