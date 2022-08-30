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
            applicationNameDescribe, 
            namespaceIdDescribe
        ],
    },
    { ...globalParams },
    { ...globalDescribe },
    {
        header: 'Examples with Yaml',
        content: ['$ s sync'],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli sae sync --application-name appName --namespace-id cn-hangzhou',
        ],
    },
];