import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { VisModule } from 'ngx-vis' ;
import { AngularMaterialModules } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareholderGraphComponent } from './shareholder-graph/shareholder-graph.component';
import { ModalComponent } from './modal/modal.component';
import { NgxGraphOrgTreeComponent } from './ngx-graph-org-tree/ngx-graph-org-tree.component';
import { VisjsNodesComponent } from './visjs-nodes/visjs-nodes.component';
import { MainTreeComponent } from './main-tree/main-tree.component';
import { NodeEdgeVisualizerComponent } from './node-edge-visualizer/node-edge-visualizer.component';

@NgModule({
  declarations: [
    AppComponent,
    ShareholderGraphComponent,
    ModalComponent,
    NgxGraphOrgTreeComponent,
    VisjsNodesComponent,
    MainTreeComponent,
    NodeEdgeVisualizerComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModules,
    BrowserModule,
    AppRoutingModule,
    NgxGraphModule,
    VisModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
