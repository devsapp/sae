import { globalParams, regionDescribe, globalDescribe, applicationNameDescribe, assumeYesDescribe, namespaceIdDescribe } from './constant';
  
export const STOP = [
    {
        header: 'Stop',
        content: 'Stop online application resources',
    },
    {
        header: 'Document',
        content: 'https://github.com/devsapp/sae/blob/main/docs/command/stop.md',
    },
    {
        header: 'Usage',
        content: '$ s stop <options> ',
    },
    {
        header: 'Options',
        optionList: [
            regionDescribe,
            applicationNameDescribe,
            namespaceIdDescribe,
            assumeYesDescribe
        ],
    },
    { ...globalParams },
    { ...globalDescribe },
    {
        header: 'Examples with Yaml',
        content: ['$ s stop'],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli sae stop --application-name appName --namespace-id cn-hangzhou --region cn-hangzhou',
        ],
    },
];