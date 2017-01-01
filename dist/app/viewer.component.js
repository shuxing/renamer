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
                        getChildren: this.getChildren.bind(this)
                    };
                }
                ngOnInit() {
                }
                ngOnChanges(changes) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (changes['path']) {
                            yield this.load();
                        }
                        // else if (changes['regex'] || changes['replacement']) {
                        this.match(this.nodes, this.regex, this.replacement);
                        // }
                    });
                }
                load() {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (this.path && this.path.length > 0) {
                            this.nodes = yield this.readDir({ data: { path: this.path } });
                        }
                    });
                }
                readDir(parent) {
                    return __awaiter(this, void 0, void 0, function* () {
                        let data = parent && parent.data;
                        let dir = data && data.path;
                        const files = yield fs.readdir(dir);
                        let list = [];
                        const parentId = data && data.id;
                        const prefix = parentId ? parentId + '.' : '';
                        for (let i = 0; i < files.length; ++i) {
                            const file = files[i];
                            const fullPath = path.join(dir, file);
                            const stat = yield fs.stat(fullPath);
                            let node = { id: prefix + i, name: file, path: fullPath };
                            node.hasChildren = node.isDirectory = stat.isDirectory();
                            list.push(node);
                        }
                        return list;
                    });
                }
                getChildren(node) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return yield this.readDir(node);
                    });
                }
                nodeIconClass(node) {
                    let prefix = 'icon fa fa-';
                    if (node.data.isDirectory) {
                        return prefix + 'folder' + (node.isExpanded ? '-open' : '') + '-o';
                    }
                    else {
                        return prefix + 'file-o';
                    }
                }
                match(nodes, r, replacement) {
                    if (nodes && nodes.length > 0 && r && r.length > 0 && replacement && replacement.length > 0) {
                        const regex = new RegExp(r);
                        for (const node of nodes) {
                            // const match = r.exec(node.name);
                            // match.forEach(console.log);
                            const current = node.name;
                            const replaced = current.replace(regex, replacement);
                            if (replaced !== current) {
                                node.newName = replaced;
                            }
                        }
                    }
                }
            };
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], ViewerComponent.prototype, "path", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], ViewerComponent.prototype, "regex", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], ViewerComponent.prototype, "replacement", void 0);
            ViewerComponent = __decorate([
                core_1.Component({
                    selector: 'viewer',
                    template: `
    <div class='container'>
        <!-- <h3 *ngFor='let child of children'>{{child}}</h3> -->
        <Tree [nodes]='nodes' [options]='options'>
            <template #treeNodeTemplate let-node='node' let-index='index'>
                <i [class]='nodeIconClass(node)'></i>
                <span>{{ node.data.name }}</span>
                <span *ngIf='node.data.newName'>-{{ node.data.newName }}</span>
            </template>
        </Tree>
    </div>`,
                    styles: [`
    .icon { margin: 0 0.5rem;}
    `]
                }),
                __metadata("design:paramtypes", [])
            ], ViewerComponent);
            exports_1("ViewerComponent", ViewerComponent);
        }
    };
});
