
import fs from 'fs';
import path from 'path';
import Table from 'tty-table';
import get from 'lodash.get';

export default class BaseComponent {

    protected client;
    private name: string;
    constructor(protected inputs: any) {
        const pkgPath = path.join(__dirname, '..', 'package.json');
        if (pkgPath) {
            const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
            this.name = pkg.name;
        }
    }

    __doc(projectName?:string) {
        const docPath = path.join(__dirname, '..', 'doc', 'doc.json');
        if (fs.existsSync(docPath)) {
            const fileContent: string = fs.readFileSync(docPath).toString();
            const result = JSON.parse(fileContent);
            const options = {
                borderStyle: "solid",
                borderColor: "blue",
                headerAlign: "center",
                align: "left",
                color: "cyan",
                width: "100%"
            }
            const header = [{
                value: "方法",
                headerColor: "cyan",
                color: "cyan",
                align: "left",
                width: "auto",
                formatter: function (value) {
                    return value;
                }
            }, {
                value: "方法说明",
                headerColor: "cyan",
                color: "cyan",
                align: "left",
                width: "auto",
                formatter: function (value) {
                    return value;
                }
            }, {
                value: "入参示例",
                headerColor: "cyan",
                color: "cyan",
                align: "left",
                width: 'auto',
                formatter: function (value) {
                    return value;
                }
            }, {
                value: "命令行调用示例",
                headerColor: "cyan",
                color: "cyan",
                align: "left",
                width: 'auto',
                formatter: function (value) {
                    return value;
                }
            }]
            const rows = [];
            const data = get(result, 'children[0].children', []).filter((item) => item.kindString === 'Method' && get(item, 'flags.isPublic'));

            data.forEach((item) => {
                const params = get(item, 'signatures[0].parameters[0]', {});
                const paramText = get(params, 'comment.text', '');
                rows.push(
                    [item.name, get(item, 'signatures[0].comment.shortText', ''), paramText, `s ${projectName || this.name} ${item.name}`]
                );
            })

            return Table(header, rows, options).render();
        } else {
            return 'not found doc content';
        }
    }

}