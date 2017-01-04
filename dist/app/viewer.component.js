System.register(["@angular/core", "angular2-tree-component", "fs-promise", "path"], function (exports_1, context_1) {
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
    var core_1, angular2_tree_component_1, fs, path, ViewerComponent, ViewerComponent_1;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_tree_component_1_1) {
                angular2_tree_component_1 = angular2_tree_component_1_1;
            },
            function (fs_1) {
                fs = fs_1;
            },
            function (path_1) {
                path = path_1;
            }
        ],
        execute: function () {
            ViewerComponent = ViewerComponent_1 = class ViewerComponent {
                constructor() {
                    this.nodesChanged = new core_1.EventEmitter();
                    this.options = {
                        getChildren: this.getChildren.bind(this)
                    };
                }
                ngOnInit() {
                }
                ngOnChanges(changes) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (changes['path'] || changes['recursive']) {
                            yield this.refresh();
                        }
                        else {
                            ViewerComponent_1.match(this.nodes, this.regex, this.replacement, this.recursive, this.caseSensitive);
                        }
                    });
                }
                load() {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (this.path && this.path.length > 0) {
                            this.nodes = yield ViewerComponent_1.readDir({ path: this.path }, this.recursive);
                            this.nodesChanged.emit(this.nodes);
                        }
                    });
                }
                static readDir(node, recursive) {
                    return __awaiter(this, void 0, void 0, function* () {
                        let dir = node && node.path;
                        const files = yield fs.readdir(dir);
                        let list = [];
                        const parentId = node && node.id;
                        const prefix = parentId ? parentId + '.' : '';
                        for (let i = 0; i < files.length; ++i) {
                            const file = files[i];
                            const fullPath = path.join(dir, file);
                            let child;
                            try {
                                const stat = yield fs.stat(fullPath);
                                child = { id: prefix + i, name: file, path: fullPath };
                                child.hasChildren = child.isDirectory = stat.isDirectory();
                                list.push(child);
                            }
                            catch (e) {
                                console.error(fullPath, e);
                            }
                            if (recursive && child && child.hasChildren) {
                                child.children = yield ViewerComponent_1.readDir(child, recursive);
                                child.hasChildren = child.children.length > 0;
                            }
                        }
                        return list;
                    });
                }
                go() {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield ViewerComponent_1.rename(this.nodes, this.recursive);
                        yield this.refresh();
                    });
                }
                refresh() {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield this.load();
                        if (!this.recursive) {
                            this.tree.treeModel.expandedNodeIds = {};
                        }
                        ViewerComponent_1.match(this.nodes, this.regex, this.replacement, this.recursive, this.caseSensitive);
                    });
                }
                static rename(nodes, recursive) {
                    return __awaiter(this, void 0, void 0, function* () {
                        for (let node of nodes) {
                            if (node.newName && node.newName.length > 0) {
                                const sourcePath = node.path;
                                const destinationPath = path.join(path.dirname(sourcePath), node.newName);
                                console.log(sourcePath, '\t\t--->\t', destinationPath);
                                yield fs.rename(sourcePath, destinationPath);
                            }
                            if (recursive && node.children) {
                                ViewerComponent_1.rename(node.children, recursive);
                            }
                        }
                    });
                }
                getChildren(node) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return yield ViewerComponent_1.readDir(node.data, this.recursive);
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
                static match(nodes, r, replacement, recursive, caseSensitive) {
                    if (nodes && nodes.length > 0 && r && r.length > 0 && replacement && replacement.length > 0) {
                        const flags = caseSensitive ? '' : 'i';
                        const regex = new RegExp(r, flags);
                        for (const node of nodes) {
                            // const match = r.exec(node.name);
                            // match.forEach(console.log);
                            const current = node.name;
                            const replaced = current.replace(regex, replacement);
                            if (replaced !== current) {
                                node.newName = replaced;
                            }
                            else {
                                delete node.newName;
                            }
                            if (recursive && node.children) {
                                ViewerComponent_1.match(node.children, r, replacement, recursive, caseSensitive);
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
            __decorate([
                core_1.Input(),
                __metadata("design:type", Boolean)
            ], ViewerComponent.prototype, "recursive", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Boolean)
            ], ViewerComponent.prototype, "caseSensitive", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], ViewerComponent.prototype, "nodesChanged", void 0);
            __decorate([
                core_1.ViewChild(angular2_tree_component_1.TreeComponent),
                __metadata("design:type", angular2_tree_component_1.TreeComponent)
            ], ViewerComponent.prototype, "tree", void 0);
            ViewerComponent = ViewerComponent_1 = __decorate([
                core_1.Component({
                    selector: 'viewer',
                    template: `
    <div class='root'>
        <Tree #tree [nodes]='nodes' [options]='options'>
            <template #treeNodeTemplate let-node='node' let-index='index'>
                <i [class]='nodeIconClass(node)'></i>
                <span [class.replaced]='node.data.newName?.length > 0'>{{ node.data.name }}</span>
                <span *ngIf='node.data.newName' class='new'>{{ node.data.newName }}</span>
            </template>
        </Tree>
    </div>`,
                    styles: [`
    .root { margin: 1rem; }
    .icon { margin: 0 0.5rem;}
    .replaced { text-decoration: line-through; }
    .new { color: green; }
    `]
                }),
                __metadata("design:paramtypes", [])
            ], ViewerComponent);
            exports_1("ViewerComponent", ViewerComponent);
        }
    };
});
