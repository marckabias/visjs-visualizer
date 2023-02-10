export const colorsValues = [
	'#c9ff73',
	'#f7d146',
	'#7cfbff',
	'#6ba4fa',
	'#68d59d',
	'#e7fe50',
	'#6d70cf',
	'#228aec',
	'#ffb773',
	'#ff8a73',
	'#ffa7bb',
	'#bb55f6',
	'#ff73ef',
];

export const fontValues: string = 'Roboto, "Helvetica Neue", sans-serif';

export const layoutOptions: any = {
	network: {
		edges: {
			arrows: {
				to: false,
				from: {
					enabled: true,
					imageHeight: 12,
					imageWidth: 12,
					scaleFactor: 1,
					src: "../../assets/images/up-arrow.png",
					type: "image"
				},
			},
		},
		physics: {
			stabilization: {
				enabled: true,
				iterations: 1000,
				updateInterval: 100,
				onlyDynamicEdges: false,
				fit: true
			},
			repulsion: {
				centralGravity: 0.2,
				springLength: 200,
				springConstant: 0.05,
				nodeDistance: 100,
				damping: 0.09
			},
		},
	},
	hierarchy: {
		edges: {
			arrows: {
				to: false,
				from: {
					enabled: true,
					imageHeight: 12,
					imageWidth: 12,
					scaleFactor: 1,
					src: "../../assets/images/up-arrow.png",
					type: "image"
				},
				middle: {
					enabled: false,
					imageHeight: 20,
					imageWidth: 20,
					scaleFactor: 1,
					src: "../../assets/images/up-arrow.png",
					type: "image"
				},
			},
			smooth: {
				enabled: false,
				type: 'vertical',
				forceDirection: true,
				roundness: 0,
			}
		},
		layout: {
			hierarchical: {
				enabled: true,
				levelSeparation: 150,
				nodeSpacing: 200,
				treeSpacing: 200,
				blockShifting: true,
				edgeMinimization: true,
				parentCentralization: true,
				direction: 'DU',        // UD, DU, LR, RL
				sortMethod: 'hubsize',  // hubsize, directed
				shakeTowards: 'leaves'  // roots, leaves
			}
		},
		physics: {
			hierarchicalRepulsion: {
				avoidOverlap: .9,
			},
		},
	},
};

export const nodeOptions: any = (index: number) => {
	return {
		borderWidth: 1,
		margin: { top: 10, right: 10, bottom: 10, left: 10 },
		widthConstraint: { 
			minimum: 200,
			maximum: 200,
		},
		font: {
			color: '#333333',
			size: 12, // px
			face: 'Roboto, "Helvetica Neue", sans-serif',
			background: 'none',
			strokeWidth: 0, // px
			strokeColor: '#ffffff',
			align: 'center',
		},
		color: {
			border: colorsValues[index],
			background: '#ffffff',
			highlight: {
				border: colorsValues[index],
				background: colorsValues[index]
			},
			hover: {
				border: '#2B7CE9',
				background: '#D2E5FF'
			}
		},
		physics: false,
	};
};

export const nodeSize: any = {
	network: 30,
	hierarchy: 40,
};

export interface RawNode {
  id: string | number,
	details: any,
};

export interface RawEdge {
  id: string | number,
	details: any,
}