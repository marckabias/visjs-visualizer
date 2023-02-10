import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { shareHolder, alphabet } from '../../assets/constants';
import * as shape from 'd3-shape';
import { Edge, Node, ClusterNode, Layout, DagreNodesOnlyLayout } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-shareholder-graph',
  templateUrl: './shareholder-graph.component.html',
  styleUrls: ['./shareholder-graph.component.css']
})
export class ShareholderGraphComponent implements OnInit {
  public nodes: Node[] = [];
  public links: Edge[] = [];
  public curve: any = shape.curveLinear;
  public draggingEnabled: boolean = true;
 
  constructor(
  ) {}

  @ViewChild("template", { static: true })
  template!: TemplateRef<HTMLDivElement>;

  ngOnInit(): void {
    this.prepareNodes();
  }

  prepareNodes():void {
    const rawNodes = shareHolder.shareholderDetails[0].nodes;
    const rawEdges = shareHolder.shareholderDetails[0].edges;

    this.nodes = rawNodes.map((item, index) => {
      const {
        details: {
          legalNameShareholdingEntity: {
            value,
          }
        }
      } = item;
      const newNode: Node = {
        id: item.id,
        label: item.details.legalNameShareholdingEntity.value,
        dimension: {
          width: 300,
          height: 150,
        },
        data: item
      };

      return newNode;
    });

    this.links = rawEdges.map((item, index) => {
      const {
        parentShareholder,
        childShareholder,
        ownershipTypeShareholdingEntity
      } = item;
      const newEdge: Edge = {
          id: alphabet[index].toLowerCase(),
          source: childShareholder,
          target: parentShareholder,
          label: 'is child of',
          data: {
            ownershipTypeShareholdingEntity
          }
      };

      return newEdge;
    });
  }

  getStyles(node: Node) {
    return {
      'background-color': 'white',
      'width': 'calc(100% - 24px)',
      'height': 'calc(100% - 24px)',
      'border': '2px solid grey',
      'border-radius': '5px',
      'padding': '10px',
    }
  }
}
