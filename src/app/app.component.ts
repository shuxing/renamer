import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    template: `
    <header></header>
    <div class='container'>
        <h2>Hello Electron with Live Reload!</h2>
        <router-outlet></router-outlet>
    </div>`
})
export class AppComponent implements OnInit {
    ngOnInit() {
    }
}
