import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import * as fs from 'fs';

@Component({
    selector: 'viewer',
    template: `
    <div class='container'>
        <h2>{{path}}</h2>
        <h3 *ngFor='let child of children'>{{child}}</h3>
    </div>`
})
export class ViewerComponent implements OnInit, OnChanges {
    @Input() path: string;
    children;

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['path']) {
            this.load();
        }
    }

    load() {
        if (this.path && this.path.length > 0) {
            fs.readdir(this.path, (err, files) => {
                this.children = files;
            });
        }
    }
}
