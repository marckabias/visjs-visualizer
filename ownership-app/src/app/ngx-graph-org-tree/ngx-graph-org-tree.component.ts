import { Component, OnInit, Input } from '@angular/core';
import { Edge, Node, Layout } from '@swimlane/ngx-graph';
import { DagreNodesOnlyLayout } from './customDagreNodesOnly';
import * as shape from 'd3-shape';
import { shareHolder, alphabet } from '../../assets/constants';

export class Employee {
  id!: string;
  name!: string;
  office!: string;
  role!: string;
  backgroundColor!: string;
  upperManagerId?: string;
}

@Component({
  selector: 'ngx-graph-org-tree',
  templateUrl: './ngx-graph-org-tree.component.html',
  styleUrls: ['./ngx-graph-org-tree.component.css']
})
export class NgxGraphOrgTreeComponent implements OnInit {
  @Input() employees: Employee[] = [];

  public nodes: Node[] = [];
  public links: Edge[] = [];
  public layoutSettings = {
    orientation: 'TB'
  };
  public curve: any = shape.curveLinear;
  public layout: Layout = new DagreNodesOnlyLayout();

  constructor() {
    this.employees = [
      {
        id: '1',
        name: 'Employee 1',
        office: 'Office 1',
        role: 'Manager',
        backgroundColor: '#DC143C'
      },
      {
        id: '2',
        name: 'Employee 2',
        office: 'Office 2',
        role: 'Engineer',
        backgroundColor: '#00FFFF',
        upperManagerId: '1'
      },
      {
        id: '3',
        name: 'Employee 3',
        office: 'Office 3',
        role: 'Engineer',
        backgroundColor: '#00FFFF',
        upperManagerId: '1'
      },
      {
        id: '4',
        name: 'Employee 4',
        office: 'Office 4',
        role: 'Engineer',
        backgroundColor: '#00FFFF',
        upperManagerId: '1'
      },
      {
        id: '5',
        name: 'Employee 5',
        office: 'Office 5',
        role: 'Student',
        backgroundColor: '#8A2BE2',
        upperManagerId: '4'
      }
    ];
  }

  public ngOnInit(): void {
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
          width: 400,
          height: 200,
        },
        data: {
          ...item,
          backgroundColor: '#EAEAEA',
        }
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
          source: parentShareholder,
          target: childShareholder,
          label: '',
          data: {
            ownershipTypeShareholdingEntity,
            linkText: 'owns',
          }
      };

      return newEdge;
    });
    // for (const employee of this.employees) {
    //   const node: Node = {
    //     id: employee.id,
    //     label: employee.name,
    //     data: {
    //       office: employee.office,
    //       role: employee.role,
    //       backgroundColor: employee.backgroundColor
    //     }
    //   };

    //   this.nodes.push(node);
    // }

    // for (const employee of this.employees) {
    //   if (!employee.upperManagerId) {
    //     continue;
    //   }

    //   const edge: Edge = {
    //     source: employee.upperManagerId,
    //     target: employee.id,
    //     label: '',
    //     data: {
    //       linkText: 'Manager of'
    //     }
    //   };

    //   this.links.push(edge);
    // }
  }

  public getStyles(node: Node): any {
    return {
      'background-color': node.data.backgroundColor
    };
  }
}