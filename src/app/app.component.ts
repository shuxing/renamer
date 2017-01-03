import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    template: `
    <header></header>
    <div class='root'>
        <h2 class='header'>Rename files with RegExp</h2>
        <div class='flex'>
            <input type='text' class='column stretch' name='path' placeholder='source directory. e.g.: C:\Data' [(ngModel)]='path' />
        </div>
        <div class='flex'>
            <input type='text' class='column stretch' name='sourceRegex' [(ngModel)]='sourceRegex' />
            <i class='fa fa-arrow-right separator'></i>
            <input type='text' class='column stretch' name='destinationReplacement' [(ngModel)]='destinationReplacement' />
        </div>
        <div class='flex'>
            <label class='column'>
                <input type='checkbox' name='recursive' [(ngModel)]='recursive'>
                Recursive
            </label>
            <label class='column'>
                <input type='checkbox' name='caseSensitive' [(ngModel)]='caseSensitive'>
                Case Sensitive
            </label>
        </div>
        <viewer class='column' name='sourceViewer' 
            [path]='path' 
            [regex]='sourceRegex' 
            [replacement]='destinationReplacement'
            [recursive]='recursive'
            [caseSensitive]='caseSensitive'
            (nodesChanged)='nodes=$event'></viewer>
        <router-outlet></router-outlet>
    </div>`,
    styles: [`
        .header { text-align: center; }
        .flex { display: flex; margin: 1rem 0; align-items: center; align-content: center; justify-content: space-around; }
        .flex .column { margin: 0 1rem; overflow: auto; }
        .flex .stretch { flex: 1; }
        .flex .separator { flex: 0 0 20px; font-size: 20px }
    `]
})
export class AppComponent implements OnInit {

    private path: string = 'D:/dl/7天搞定Node.js微信公众号开发（更多视频 www.pcsky.wang)';
    private sourceRegex: string = '第(.*)章 (.*)(（.*)';
    private destinationReplacement: string = '$1 - $2';
    // private path: string = '/Users/Sean/dev/angular';
    // private sourceRegex: string = '(.*)(\.js)';
    // private destinationReplacement: string = '$1.ts';

    private recursive: boolean;
    private caseSensitive: boolean = true;

    nodes;

    ngOnInit() {
    }
}
