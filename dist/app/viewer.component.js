System.register(["@angular/core", "fs-promise", "path"], function (exports_1, context_1) {
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
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments)).next());
        });
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, fs, path, ViewerComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (fs_1) {
                fs = fs_1;
            },
            function (path_1) {
                path = path_1;
            }
        ],
        execute: function () {
            ViewerComponent = class ViewerComponent {
                constructor() {
                    this.options = {
                        getChildren: node => new Promise((resolve) => resolve(this.getChildren(node)))
                    };
                }
                ngOnInit() {
                }
                ngOnChanges(changes) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (changes['path']) {
                            yield this.load();
                        }
                    });
                }
                load() {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (this.path && this.path.length > 0) {
                            this.nodes = yield this.readDir(this.path);
                        }
                    });
                }
                readDir(dir, parent = undefined) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const files = yield fs.readdir(dir);
                        let list = [];
                        const depth = parent && parent.level || 1;
                        for (let i = 0; i < files.length; ++i) {
                            const file = files[i];
                            const fullPath = path.join(dir, file);
                            const stat = yield fs.stat(fullPath);
                            let node = { id: depth + '.' + i, name: file, path: fullPath };
                            node.hasChildren = node.isDirectory = stat.isDirectory();
                            list.push(node);
                        }
                        return list;
                    });
                }
                getChildren(node) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return yield this.readDir(node.data.path, node);
                    });
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
        <!-- <h3 *ngFor='let child of children'>{{child}}</h3> -->
        <Tree [nodes]='nodes' [options]='options'></Tree>
    </div>`
                }),
                __metadata("design:paramtypes", [])
            ], ViewerComponent);
            exports_1("ViewerComponent", ViewerComponent);
        }
    };
});
