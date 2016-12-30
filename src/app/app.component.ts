import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    template: `
    <header></header>
    <div class='container'>
        <h2>Hello Electron with Live Reload!</h2>
        <input type='text' name='source' [(ngModel)]='source' />
        <input type='text' name='destination' [(ngModel)]='destination' />
        <viewer name='sourceViewer' [path]='source'></viewer>
        <viewer name='destinationViewer' [path]='destination'></viewer>
        <router-outlet></router-outlet>
    </div>`
})
export class AppComponent implements OnInit {

    private source: string;
    private destination: string;

    ngOnInit() {
    }
}
