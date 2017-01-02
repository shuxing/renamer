import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { TreeNode } from 'angular2-tree-component';
import * as fs from 'fs-promise';
import * as path from 'path';

@Component({
    selector: 'viewer',
    template: `
    <div class='root'>
        <Tree [nodes]='nodes' [options]='options'>
            <template #treeNodeTemplate let-node='node' let-index='index'>
                <i [class]='nodeIconClass(node)'></i>
                <span [class.replaced]='node.data.newName?.length > 0'>{{ node.data.name }}</span>
                <span *ngIf='node.data.newName' class='new'>{{ node.data.newName }}</span>
            </template>
        </Tree>
    </div>`,
    styles: [`
    .root { margin: 1rem; }
    .icon { margin: 0 0.5rem;}
    .replaced { text-decoration: line-through; }
    .new { color: green; }
    `]
})
export class ViewerComponent implements OnInit, OnChanges {
    @Input() path: string;
    @Input() regex: string;
    @Input() replacement: string;

    compiledRegex: RegExp;
    nodes;
    options = {
        getChildren: this.getChildren.bind(this)
    }

    ngOnInit() {
    }

    async ngOnChanges(changes: SimpleChanges) {
        if (changes['path']) {
            await this.load();
        }
        // else if (changes['regex'] || changes['replacement']) {
        this.match(this.nodes, this.regex, this.replacement);
        // }
    }

    async load() {
        if (this.path && this.path.length > 0) {
            this.nodes = await this.readDir(<TreeNode>{ data: { path: this.path } });
        }
    }

    async readDir(parent: TreeNode) {
        let data = parent && parent.data;
        let dir = data && data.path;
        const files = await fs.readdir(dir);
        let list = [];
        const parentId = data && data.id;
        const prefix = parentId ? parentId + '.' : '';
        for (let i = 0; i < files.length; ++i) {
            const file = files[i];
            const fullPath = path.join(dir, file);
            const stat = await fs.stat(fullPath);
            let node: any = { id: prefix + i, name: file, path: fullPath };
            node.hasChildren = node.isDirectory = stat.isDirectory();
            list.push(node);
        }
        return list;
    }

    async getChildren(node: TreeNode) {
        return await this.readDir(node);
    }

    nodeIconClass(node: TreeNode) {
        let prefix = 'icon fa fa-';
        if (node.data.isDirectory) {
            return prefix + 'folder' + (node.isExpanded ? '-open' : '') + '-o';
        } else {
            return prefix + 'file-o';
        }
    }

    match(nodes: any[], r: string, replacement: string) {
        if (nodes && nodes.length > 0 && r && r.length > 0 && replacement && replacement.length > 0) {
            const regex = new RegExp(r);
            for (const node of nodes) {
                // const match = r.exec(node.name);
                // match.forEach(console.log);
                const current = node.name;
                const replaced = current.replace(regex, replacement);
                if (replaced !== current) {
                    node.newName = replaced;
                } else {
                    delete node.newName;
                }
            }
        }
    }
}
