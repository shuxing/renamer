import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    template: `
    <header></header>
    <div class='root'>
        <h2 class='header'>Rename files with RegExp</h2>
        <div class='flex'>
            <input type='text' class='column' name='path' placeholder='source directory. e.g.: C:\Data' [(ngModel)]='path' />
        </div>
        <div class='flex'>
            <input type='text' class='column' name='sourceRegex' [(ngModel)]='sourceRegex' />
            <i class='fa fa-arrow-right separator'></i>
            <input type='text' class='column' name='destinationReplacement' [(ngModel)]='destinationReplacement' />
        </div>
        <viewer class='column' name='sourceViewer' 
            [path]='path' 
            [regex]='sourceRegex' 
            [replacement]='destinationReplacement'
            (nodesChanged)='nodes=$event'></viewer>
        <router-outlet></router-outlet>
    </div>`,
    styles: [`
        .header { text-align: center; }
        .flex { display: flex; }
        .flex .column { flex: 1; margin: 0 1rem; overflow: auto; }
        .flex .separator { flex: 0 0 20px; align-self: center; font-size: 20px }
    `]
})
export class AppComponent implements OnInit {

    private path: string = 'D:/dl/7天搞定Node.js微信公众号开发（更多视频 www.pcsky.wang)';
    private sourceRegex: string = '第(.*)章 (.*)(（.*)';
    private destinationReplacement: string = '$1 - $2';
    // private path: string = '/Users/Sean/dev/angular';
    // private sourceRegex: string = '(.*)(\.js)';
    // private destinationReplacement: string = '$1.ts';

    nodes;

    ngOnInit() {
    }
}
