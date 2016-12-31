import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    template: `
    <header></header>
    <div class='root'>
        <h2>Hello Electron with Live Reload!</h2>
        <div class='flex'>
        <input type='text' class='column' name='source' [(ngModel)]='source' />
        <input type='text' class='column' name='destination' [(ngModel)]='destination' />
        </div>
        <div class='flex'>
        <viewer class='column' name='sourceViewer' [path]='source'></viewer>
        <viewer class='column' name='destinationViewer' [path]='destination'></viewer>
        </div>
        <router-outlet></router-outlet>
    </div>`,
    styles: [`
        .flex { display: flex; }
        .flex .column { flex: 1; margin: 0 1rem; overflow: auto; }
    `]
})
export class AppComponent implements OnInit {

    private source: string = 'D:/dl/7天搞定Node.js微信公众号开发（更多视频 www.pcsky.wang)';
    private destination: string = 'D:/tutorial/wechat/public';

    ngOnInit() {
    }
}
