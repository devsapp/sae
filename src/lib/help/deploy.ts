import { globalParams, globalDescribe } from './constant';

const useLocal = {
    name: 'use-local',
    description: '[Optional] Deploy resource using local config',
    defaultOption: false,
    type: Boolean,
};
const useRemote = {
    name: 'use-remote',
    description: '[Optional] Deploy resource using remote config',
    defaultOption: false,
    type: Boolean,
};

export const DEPLOY = [
    {
        header: 'Deploy',
        content: 'Deploy local application online',
    },
    {
        header: 'Document',
        content: 'https://github.com/devsapp/sae/blob/main/docs/command/deploy.md',
    },
    {
        header: 'Usage',
        content: ['$ s deploy <options>'],
    },
    {
        header: 'Options',
        optionList: [
            useLocal,
            useRemote,
        ],
    },
    { ...globalParams },
    { ...globalDescribe }
]