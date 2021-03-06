import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    template: `
    <header></header>
    <div class='root'>
        <h2 class='header'>Rename files with RegExp</h2>
        <div class='flex'>
            <span class="label">Directory</span>
            <input type='text' class='column stretch' name='path' 
                placeholder='source directory. e.g.: C:\Data' 
                [(ngModel)]='path' />
        </div>
        <div class='flex'>
            <div class='flex column stretch'>
                <span class="label">Reg. Exp.</span>
                <input type='text' class='column stretch' name='sourceRegex' [(ngModel)]='sourceRegex' />
            </div>
            <i class='fa fa-arrow-right separator'></i>
            <div class='flex column stretch'>
                <span class="label">Replacement</span>
                <input type='text' class='column stretch' name='destinationReplacement' [(ngModel)]='destinationReplacement' />
            </div>
        </div>
        <div class='flex'>
            <label class='column'>
                <input type='checkbox' name='recursive' [(ngModel)]='recursive'>Recursive
            </label>
            <label class='column'>
                <input type='checkbox' name='caseSensitive' [(ngModel)]='caseSensitive'>Case Sensitive
            </label>
            <button type='button' class='btn btn-outline-primary' (click)='viewer.go()'>GO!</button>
            <button type='button' class='btn btn-outline-primary' (click)='viewer.refresh()'>Refresh</button>
        </div>
        <viewer #viewer name='sourceViewer' 
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
        input { padding: .5rem .75rem; }
        .flex { display: flex; margin: 1rem; align-items: center; align-content: center; justify-content: space-around; }
        .flex .label:first-child { padding: .5rem .75rem; background-color: #eceeef; border: 1px solid rgba(0,0,0,.15); border-radius: .25rem 0 0 .25rem; }
        .flex input[type=text]:last-child {  border: 1px solid rgba(0,0,0,.15); border-radius: 0 .25rem .25rem 0; height: 42px; }
        .flex .flex { margin: 0; }
        .flex .column { overflow: auto; }
        .flex .stretch { flex: 1; }
        .flex .separator { flex: 0 0 20px; margin: 1rem 1rem; font-size: 20px }
    `]
})
export class AppComponent implements OnInit {

    private path: string = 'backup';
    private sourceRegex: string = '第(.*)章 (.*)(（.*)';
    private destinationReplacement: string = '$1 - $2';

    private recursive: boolean;
    private caseSensitive: boolean = true;

    nodes;

    ngOnInit() {
    }
}
