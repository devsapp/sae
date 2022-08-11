import { globalParams, globalDescribe, applicationNameDescribe } from './constant';
export const rescaleDescribe = {
    name: 'replicas',
    description: '[Required] Specify the sae application replicas',
    type: Number,
  };
export const RESCALE = [
    {
        header: 'Rescale',
        content: 'Rescale online application resources',
    },
    {
        header: 'Document',
        content: 'https://github.com/devsapp/sae/blob/main/docs/command/rescale.md',
    },
    {
        header: 'Usage',
        content: '$ s rescale <options> ',
    },
    {
        header: 'Options',
        optionList: [
            applicationNameDescribe, rescaleDescribe
        ],
    },
    { ...globalParams },
    { ...globalDescribe },
    {
        header: 'Examples with Yaml',
        content: ['$ s rescale --replicas 5'],
    },
    {
        header: 'Examples with CLI',
        content: [
            '$ s cli sae rescale --application-name appName --replicas 5',
        ],
    },
];