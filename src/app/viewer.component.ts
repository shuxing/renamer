import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { TreeComponent, TreeNode } from 'angular2-tree-component';
import * as fs from 'fs-promise';
import * as path from 'path';

@Component({
    selector: 'viewer',
    template: `
    <div class='root'>
        <Tree #tree [nodes]='nodes' [options]='options'>
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
    @Input() recursive: boolean;
    @Input() caseSensitive: boolean;
    @Output() nodesChanged: EventEmitter<any[]> = new EventEmitter<any[]>();

    @ViewChild(TreeComponent)
    private tree: TreeComponent;
    compiledRegex: RegExp;
    nodes;
    options = {
        getChildren: this.getChildren.bind(this)
    }

    ngOnInit() {
    }

    async ngOnChanges(changes: SimpleChanges) {
        if (changes['path'] || changes['recursive']) {
            await this.load();
            this.tree.treeModel.update();
        }

        this.match(this.nodes, this.regex, this.replacement, this.recursive, this.caseSensitive);
    }

    async load() {
        if (this.path && this.path.length > 0) {
            this.nodes = await this.readDir({ path: this.path }, this.recursive);
            this.nodesChanged.emit(this.nodes);
        }
    }

    async readDir(node: any, recursive: boolean) {
        let dir = node && node.path;
        const files = await fs.readdir(dir);
        let list = [];
        const parentId = node && node.id;
        const prefix = parentId ? parentId + '.' : '';
        for (let i = 0; i < files.length; ++i) {
            const file = files[i];
            const fullPath = path.join(dir, file);
            let child: any;
            try {
                const stat = await fs.stat(fullPath);
                child = { id: prefix + i, name: file, path: fullPath };
                child.hasChildren = child.isDirectory = stat.isDirectory();
                list.push(child);
            } catch (e) {
                console.error(fullPath, e);
            }

            if(recursive && child && child.hasChildren) {
                child.children = await this.readDir(child, recursive);
                child.hasChildren = child.children.length > 0;
            }
        }
        return list;
    }

    async getChildren(node: TreeNode) {
        return await this.readDir(node.data, this.recursive);
    }

    nodeIconClass(node: TreeNode) {
        let prefix = 'icon fa fa-';
        if (node.data.isDirectory) {
            return prefix + 'folder' + (node.isExpanded ? '-open' : '') + '-o';
        } else {
            return prefix + 'file-o';
        }
    }

    match(nodes: any[], r: string, replacement: string, recursive: boolean, caseSensitive: boolean) {
        if (nodes && nodes.length > 0 && r && r.length > 0 && replacement && replacement.length > 0) {
            const flags = caseSensitive ? '' : 'i';
            const regex = new RegExp(r, flags);
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

                if (this.recursive && node.children) {
                    this.match(node.children, r, replacement, recursive, caseSensitive);
                }
            }
        }
    }
}
