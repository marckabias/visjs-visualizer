import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { VisNetworkService, Data, DataSet, Node, Options, Edge } from 'ngx-vis';
import { colorsValues } from '../../assets/constants';
import { layoutOptions, nodeOptions, nodeSize, fontValues } from './visualizer.config';

@Component({
  selector: 'app-node-edge-visualizer',
  templateUrl: './node-edge-visualizer.component.html',
  styleUrls: ['./node-edge-visualizer.component.css']
})
export class NodeEdgeVisualizerComponent implements OnInit {

  public visNetwork: string = 'networkId1';
  public visNetworkData!: Data;
  private nodes!: DataSet<Node>;
  private edges!: DataSet<Edge>;
  public visNetworkOptions!: Options;
  @Input() public rawNodes!: any;
  @Input() public rawEdges!: any;
  @Input() public nodeConfig!: any;
  private maxLevel: number = 1;
  public nodeInDisplay!: any;
  public edgeInDisplay!: any;
  @Input() public selectedView: string = 'hierarchy';

  Object = Object;
  
  @ViewChild("template", { static: true })
  template!: TemplateRef<HTMLDivElement>;

  public constructor(
    private elem: ElementRef,
    private visNetworkService: VisNetworkService,
  ) {}

  public addNode(): void {
    const lastId = this.nodes.length;
    const newId = this.nodes.length + 1;

    this.nodes.add({
      id: newId,
      label: 'New Node',
      level: this.maxLevel,
      ...this.getNodeOptions(1),
    });
    this.edges.add({ from: lastId, to: newId });
    this.visNetworkService.fit(this.visNetwork);
  }

  public networkInitialized(): void {
    // now we can use the service to register on events
    this.visNetworkService.on(this.visNetwork, 'click');

    // open your console/dev tools to see the click params
    this.visNetworkService.click.subscribe((eventData: any[]) => {
      if (eventData[0] === this.visNetwork) {
        const data = eventData[1];  
        const { nodes = [], edges = [] } = data;
        let details: any;
        let container: any;
        
        details = this.elem.nativeElement.querySelector('.node-details');
        container = this.elem.nativeElement.querySelector('.node-details__container');

        container.style.opacity = 0;
        details.style.top = '-9999999px';
        details.style.left = '-99999999px';
        container.style.width = '0px';
        container.style.minHeight = '0px';

        details = this.elem.nativeElement.querySelector('.edge-details');
        container = this.elem.nativeElement.querySelector('.edge-details__container');

        container.style.opacity = 0;
        details.style.top = '-9999999px';
        details.style.left = '-99999999px';
        container.style.width = '0px';
        container.style.minHeight = '0px';

        if (nodes.length) {
          const node = this.rawNodes.filter((item: any) => item.id === nodes[0]);
          details = this.elem.nativeElement.querySelector('.node-details');
          container = this.elem.nativeElement.querySelector('.node-details__container');

          if (node.length) { 
            setTimeout(() => {
              this.nodeInDisplay = { ...node[0], ...node[0].details};
              
              details.style.top = '80px';//`${data.pointer.DOM.y + 20}px`;
              details.style.left = '40px';//`${data.pointer.DOM.x + 300}px`;
              container.style.width = '400px';
              container.style.height = 'auto';
              container.style.opacity = 1;
            }, 100);
          }
        } else if (edges.length) {
          const edgeId = edges[0];
          let foundEdge: any;

          this.visNetworkData.edges?.forEach((item: any) => {
            if (item.id === edgeId) {
              foundEdge = item;
            }
          });

          const edge = this.rawEdges.filter((item: any) => {
            return item.parentShareholder === foundEdge.to
              && item.childShareholder === foundEdge.from;
          });
  
          if (edge.length) { 
            details = this.elem.nativeElement.querySelector('.edge-details');
            container = this.elem.nativeElement.querySelector('.edge-details__container');
            this.edgeInDisplay = edge[0];

            const parentItem:any = this.rawNodes.find((item: any) => {
              return item.id === this.edgeInDisplay.parentShareholder;
            });
            const childItem:any = this.rawNodes.find((item: any) => {
              return item.id === this.edgeInDisplay.childShareholder;
            });

            this.edgeInDisplay = {
              ...this.edgeInDisplay,
              parentName: parentItem.details[this.nodeConfig.title].value,
              childName: childItem.details[this.nodeConfig.title].value,
            };

            setTimeout(() => {
              details.style.top = '80px';
              details.style.left = '40px';
              container.style.width = '500px';
              container.style.minHeight = '200px';
              container.style.opacity = 1;
            }, 100);
          }
        }
      }
    });
  }

  public ngOnInit(): void {
    this.drawLayout();
  }

  public ngOnDestroy(): void {
    this.visNetworkService.off(this.visNetwork, 'click');
  }

  public drawLayout() {
    const options = layoutOptions[this.selectedView];

    this.visNetworkOptions = { ...options };
    this.visNetworkData = Object.assign({}, this.prepareNodes());
  }

  private prepareNodes():any {
    let tempEdge: any = this.rawEdges[0];
    let levelCounter: number = 1;

    if (this.selectedView === 'hierarchy') {
      this.prepareHierarchy(tempEdge, levelCounter);
    }

    this.nodes = this.composeNodeItems();
    this.edges = this.composeEdgeItems();

    return { nodes: this.nodes, edges: this.edges };
  }

  private composeNodeItems(): any {
    return new DataSet<Node>(
      this.rawNodes.map((item: any, index: number) => {
        const { level } = item;
        
        const newNode: Node = {
          id: item.id,
          label: '',
          labelHighlightBold: true,
          level: index === 0 ? 1 : level ? level : 1,
          shape: 'image',// box,image
          image: this.renderNodeImage(item, index),
          ...this.getNodeOptions(index),
        };

        return newNode;
      })
    );
  }

  private composeEdgeItems(): any {
    return new DataSet<Edge>(
      this.rawEdges.map((item: any, index: number) => {
        const {
          parentShareholder,
          childShareholder,
          directSharesPercentageShareholdingEntity,
          indirectSharesPercentageShareholdingEntity,
        } = item;

        const direct = this.processNumberValue(directSharesPercentageShareholdingEntity.value, '%');
        const indirect = this.processNumberValue(indirectSharesPercentageShareholdingEntity.value, '%');

        let newEdge: Edge = {
          id: index,
          from: childShareholder,
          to: parentShareholder,
          width: 1,
          color: '#a1a1a1',
          label: `Direct Ownership:  ${direct}\nIndirect Ownership:  ${indirect}\n\n\n`,
          font: {
            size: 10,
            face: fontValues,
            align: "horizontal"
          },
        };

        if (this.selectedView === 'hierarchy') {
          newEdge = {
            ...newEdge,
            length: 200,
          }
        }

        return newEdge;
      })
    );
  }

  public processNumberValue(value: any, suffix: string): string {
    if (value) {
      const number = value;

      return `${number}${suffix}`;
    }

    return '-';
  }

  public processDetailValue(key: string, value: string): string {
    if (key && key.toLowerCase().includes('percentage')) {
      console.log(value, ' -- ', parseInt(value));
      
      if (!isNaN(parseInt(value))) {
        return `${parseInt(value)}%`;
      }
      return `${value}%`;
    }

    return value;
  }

  private renderNodeImage(item: any, index: number) {
    let svg = '';

    if (this.selectedView === 'network') {
      svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="50">
          <style>
          .hierarchy-node {
            width: 100px;
            height: 50px;
            // box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            border: ${index === 0 ? 4 : 2}px solid ${colorsValues[index]};
            border-radius: 10px;
            background: #ffffff;
            font-family: 'Roboto, "Helvetica Neue", sans-serif'; 
          }
          .hierarchy-node .content {
            font-family: 'Arial'; 
            font-size: 16px;
            padding: 10px 20px;
            background: ${colorsValues[index]}60;
            height: 100%;
          }
          </style>
          <rect x="0" y="0" rx="10" ry="8" width="100%" height="100%" style="fill:${colorsValues[index]};"></rect>
          <foreignObject class="hierarchy-node" x="0" y="0" width="100%" height="100%">
            <div class="content" xmlns="http://www.w3.org/1999/xhtml" style="padding:8px;font-family:Arial;font-size:8px;color:#333333;">
              <div style="padding: 2px;text-align:center;"><b>${item.details[this.nodeConfig.smallInfo[0]].value}</b></div>
            </div>  
          </foreignObject>
        </svg>
      `;
    } else if (this.selectedView === 'hierarchy') {
      let subDetails = '';

      this.nodeConfig.smallInfo.forEach((key: any, index: number) => {
        if (item.details[key]) {
          if (index === 0) {
            subDetails += `
              <div style="padding: 8px 0px;"><b>${item.details[key].value}</b></div>
            `;
          } else {
            subDetails += `
              <div style="font-size:14px;">${item.details[key].name} : ${item.details[key].value}</div>
            `;
          }
        }
      });

      svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="290" height="150">
          <style>
          .hierarchy-node {
            width: 280px;
            height: 140px;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            border: 3px solid ${colorsValues[index]};
            border-radius: 10px;
            background: #ffffff;
            font-family: 'Roboto, "Helvetica Neue", sans-serif'; 
          }
          .hierarchy-node .content {
            font-family: 'Arial'; 
            font-size: 16px;
            padding: 10px 20px;
            background: ${colorsValues[index]}60;
            height: 100%;
          }
          </style>
          <foreignObject class="hierarchy-node" x="0" y="0" width="100%" height="100%">
            <div class="content" xmlns="http://www.w3.org/1999/xhtml">
              ${subDetails}
            </div>  
          </foreignObject>
        </svg>
      `;
    }

    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);

    return url;
  }

  private getNodeOptions(index: number): any {
    const size: number = nodeSize[this.selectedView];
    return {
      ...nodeOptions(index),
      size,
    };
  }

  private prepareHierarchy(parentItem: any, levelCounter: number): any {
    let formattedTree: any = [];

    let parents = this.rawEdges.filter((item: any) => {
      const {
        childShareholder
      } = item;

      return childShareholder === parentItem.parentShareholder;
    });
    

    levelCounter += 1;
    
    this.rawNodes.forEach((node: any) => {
      if (node.id === parentItem.parentShareholder) {

        if (node.level) {
          const tempLevel = Math.ceil(((node.level+levelCounter)/2));
          levelCounter = levelCounter < tempLevel ? levelCounter + 1 : levelCounter;
        }

        node.level = levelCounter;
      }
    });

    this.maxLevel = levelCounter;

    formattedTree.push({
      id: parentItem.parentShareholder,
      parents: this.getParents(parents, levelCounter),
    });
    
    return formattedTree;
  }

  private getParents(edges:any, levelCounter: number): any {
    let parents = [];

    if (edges && edges.length) {
      parents = edges.map((parentItem: any) => {
        return this.prepareHierarchy(parentItem, levelCounter)
      });
    }

    return parents;
  }

  public updateView(event: MatRadioChange): void {
    this.selectedView = event.value;
    this.drawLayout();
  }

  public destroyNetwork(): void {
    this.visNetworkService.destroy(this.visNetwork);
  }
}
