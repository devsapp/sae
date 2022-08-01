import { globalParams, globalDescribe, applicationNameDescribe } from './constant';

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
            applicationNameDescribe,
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
            '$ s cli sae info --application-name appName',
        ],
    },
];
