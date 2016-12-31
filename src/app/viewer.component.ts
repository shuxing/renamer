import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { TreeNode } from 'angular2-tree-component';
import * as fs from 'fs-promise';
import * as path from 'path';

@Component({
    selector: 'viewer',
    template: `
    <div class='container'>
        <!-- <h3 *ngFor='let child of children'>{{child}}</h3> -->
        <Tree [nodes]='nodes' [options]='options'></Tree>
    </div>`
})
export class ViewerComponent implements OnInit, OnChanges {
    @Input() path: string;
    nodes;
    options = {
        getChildren: node => new Promise((resolve) => resolve(this.getChildren(node)))
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
            this.nodes = await this.readDir(this.path);
        }
    }

    async readDir(dir: string, parent: TreeNode = undefined) {
        const files = await fs.readdir(dir);
        let list = [];
        const depth = parent && parent.level || 1;
        for (let i = 0; i < files.length; ++i) {
            const file = files[i];
            const fullPath = path.join(dir, file);
            const stat = await fs.stat(fullPath);
            let node: any = { id: depth + '.' + i, name: file, path: fullPath};
            node.hasChildren = node.isDirectory = stat.isDirectory();
            list.push(node);
        }
        return list;
    }

    async getChildren(node: TreeNode) {
        return await this.readDir(node.data.path, node);
    }
}
