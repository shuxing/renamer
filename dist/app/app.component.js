System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, AppComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            AppComponent = class AppComponent {
                constructor() {
                    this.path = 'D:/dl/7天搞定Node.js微信公众号开发（更多视频 www.pcsky.wang)';
                    this.sourceRegex = '第(.*)章 (.*)(（.*)';
                    this.destinationReplacement = '$1 - $2';
                    this.caseSensitive = true;
                }
                ngOnInit() {
                }
            };
            AppComponent = __decorate([
                core_1.Component({
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
                }),
                __metadata("design:paramtypes", [])
            ], AppComponent);
            exports_1("AppComponent", AppComponent);
        }
    };
});
