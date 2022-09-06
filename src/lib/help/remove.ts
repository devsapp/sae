import { globalParams, regionDescribe, globalDescribe, applicationNameDescribe, assumeYesDescribe, namespaceIdDescribe } from './constant';
  
export const REMOVE = [
    {
        header: 'Remove',
        content: 'Remove online application resources',
    },
    {
        header: 'Document',
        content: 'https://github.com/devsapp/sae/blob/master/docs/remove.md',
    },
    {
        header: 'Usage',
        content: '$ s remove <options> ',
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
        content: ['$ s remove'],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli sae remove --region cn-hangzhou --namespace-id cn-hangzhou --application-name appName',
        ],
    },
];
