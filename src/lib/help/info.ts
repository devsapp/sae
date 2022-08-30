import { globalParams, regionDescribe, globalDescribe, applicationNameDescribe, namespaceIdDescribe } from './constant';

const output = {
    name: 'output',
    description: '[Optional] Output the query details',
    defaultOption: false,
    type: String,
};

export const INFO = [
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
            regionDescribe,
            namespaceIdDescribe,
            applicationNameDescribe,
            output,
        ],
    },
    { ...globalParams },
    { ...globalDescribe },
    {
        header: 'Examples with Yaml',
        content: ['$ s info'],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli sae info --region cn-hangzhou --namespace-id cn-hanghzou --application-name appName',
        ],
    },
];
