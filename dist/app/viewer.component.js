System.register(["@angular/core", "fs"], function (exports_1, context_1) {
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
    var core_1, fs, ViewerComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (fs_1) {
                fs = fs_1;
            }
        ],
        execute: function () {
            ViewerComponent = class ViewerComponent {
                ngOnInit() {
                }
                ngOnChanges(changes) {
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
            };
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], ViewerComponent.prototype, "path", void 0);
            ViewerComponent = __decorate([
                core_1.Component({
                    selector: 'viewer',
                    template: `
    <div class='container'>
        <h2>{{path}}</h2>
        <h3 *ngFor='let child of children'>{{child}}</h3>
    </div>`
                }),
                __metadata("design:paramtypes", [])
            ], ViewerComponent);
            exports_1("ViewerComponent", ViewerComponent);
        }
    };
});
