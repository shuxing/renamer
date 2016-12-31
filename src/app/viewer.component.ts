import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import * as fs from 'fs-promise';

@Component({
    selector: 'viewer',
    template: `
    <div class='container'>
        <!-- <h3 *ngFor='let child of children'>{{child}}</h3> -->
        <Tree [nodes]='nodes'></Tree>
    </div>`
})
export class ViewerComponent implements OnInit, OnChanges {
    @Input() path: string;
    nodes;

    ngOnInit() {
    }

    async ngOnChanges(changes: SimpleChanges) {
        if (changes['path']) {
            await this.load();
        }
    }

    async load() {
        if (this.path && this.path.length > 0) {
            this.children = await fs.readdir(this.path);
        }
    }
}
