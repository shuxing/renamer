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
                    // private path: string = 'D:/dl/7天搞定Node.js微信公众号开发（更多视频 www.pcsky.wang)';
                    // private sourceRegex: string = '第(.*)章 (.*)(（.*)';
                    // private destinationReplacement: string = '$1 - $2';
                    this.path = '/Users/Sean/dev/angular';
                    this.sourceRegex = '(.*)(\.js)';
                    this.destinationReplacement = '$1.ts';
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
        <h2>Rename files with RegExp</h2>
        <div class='flex'>
        <input type='text' class='column' name='path' [(ngModel)]='path' />
        </div>
        <div class='flex'>
        <input type='text' class='column' name='sourceRegex' [(ngModel)]='sourceRegex' />
        <i class='fa fa-arrow-right separator'></i>
        <input type='text' class='column' name='destinationReplacement' [(ngModel)]='destinationReplacement' />
        </div>
        <viewer class='column' name='sourceViewer' [path]='path' [regex]='sourceRegex' [replacement]='destinationReplacement'></viewer>
        <router-outlet></router-outlet>
    </div>`,
                    styles: [`
        .flex { display: flex; }
        .flex .column { flex: 1; margin: 0 1rem; overflow: auto; }
        .flex .separator { flex: 0 0 20px; align-self: center; font-size: 20px }
    `]
                }),
                __metadata("design:paramtypes", [])
            ], AppComponent);
            exports_1("AppComponent", AppComponent);
        }
    };
});
