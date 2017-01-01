import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { TreeNode } from 'angular2-tree-component';
import * as fs from 'fs-promise';
import * as path from 'path';

@Component({
    selector: 'viewer',
    template: `
    <div class='container'>
        <!-- <h3 *ngFor='let child of children'>{{child}}</h3> -->
        <Tree [nodes]='nodes' [options]='options'>
            <template #treeNodeTemplate let-node='node' let-index='index'>
                <i [class]='nodeIconClass(node)'></i>
                <span>{{ node.data.name }}</span>
            </template>
        </Tree>
    </div>`,
    styles: [`
    .icon { margin: 0 0.5rem;}
    `]
})
export class ViewerComponent implements OnInit, OnChanges {
    @Input() path: string;
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
    }

    async load() {
        if (this.path && this.path.length > 0) {
            this.nodes = await this.readDir(<TreeNode>{data:{path:this.path}});
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
}
