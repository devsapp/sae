import { globalParams, regionDescribe, globalDescribe, applicationNameDescribe, namespaceIdDescribe } from './constant';

export const SYNC = [
    {
        header: 'Sync',
        content: 'Sync online application resources',
    },
    {
        header: 'Document',
        content: 'https://github.com/devsapp/sae/blob/main/docs/command/sync.md',
    },
    {
        header: 'Usage',
        content: '$ s sync <options> ',
    },
    {
        header: 'Options',
        optionList: [
            regionDescribe,
            namespaceIdDescribe,
            applicationNameDescribe,
        ],
    },
    { ...globalParams },
    { ...globalDescribe },
    {
        header: 'Examples with Yaml',
        content: ['$ s sync --region cn-hangzhou --namespace-id cn-hangzhou --application-name appName'],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli sae sync --region cn-hangzhou --namespace-id cn-hangzhou --application-name appName',
        ],
    },
];