import { globalParams, globalDescribe, applicationNameDescribe, assumeYesDescribe, namespaceIdDescribe } from './constant';

export const START = [
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
            applicationNameDescribe,
            namespaceIdDescribe,
            assumeYesDescribe
        ],
    },
    { ...globalParams },
    { ...globalDescribe },
    {
        header: 'Examples with Yaml',
        content: ['$ s start'],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli sae start --application-name appName --namespace-id cn-hangzhou',
        ],
    },
];