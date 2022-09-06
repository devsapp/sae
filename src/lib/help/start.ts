import { globalParams, regionDescribe, globalDescribe, applicationNameDescribe, assumeYesDescribe, namespaceIdDescribe } from './constant';

export const START = [
    {
        header: 'Start',
        content: 'Start online application resources',
    },
    {
        header: 'Document',
        content: 'https://github.com/devsapp/sae/blob/master/docs/start.md',
    },
    {
        header: 'Usage',
        content: '$ s start <options> ',
    },
    {
        header: 'Options',
        optionList: [
            regionDescribe,
            namespaceIdDescribe,
            applicationNameDescribe,
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
            '$ s cli sae start --region cn-hangzhou --namespace-id cn-hangzhou --application-name appName',
        ],
    },
];