import { Component, OnInit } from '@angular/core';
import { shareHolder, colors } from '../../assets/constants';

@Component({
  selector: 'app-visjs-nodes',
  templateUrl: './visjs-nodes.component.html',
  styleUrls: ['./visjs-nodes.component.css']
})
export class VisjsNodesComponent implements OnInit {
  public visNetwork: string = 'networkId1';
  public rawNodes!: any[];
  public rawEdges!: any[];
  public nodeConfig!: any;

  public constructor() {}

  public ngOnInit(): void {
    this.rawEdges = shareHolder.shareholderDetails[0].edges;
    this.rawNodes = shareHolder.shareholderDetails[0].nodes;

    this.nodeConfig = {
      smallInfo: [
        'legalNameShareholdingEntity',
        'legalFormShareholdingEntity',
        'regulatorNameShareholdingEntity',
        'stockExchangeNamePrimaryShareholdingEntity'
      ],
      title: 'legalNameShareholdingEntity',
      buttons: {
        generateCdd: true,
        otherButton: false,
      },
    };
  }
}
