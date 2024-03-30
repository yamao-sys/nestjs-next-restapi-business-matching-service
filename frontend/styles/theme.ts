export const theme = {
	size: {
		p5: '5px',
		p8: '8px',
		p10: '10px',
		p16: '16px',
		p20: '20px',
		p24: '24px',
		p30: '30px',
		p40: '40px',
		p80: '80px',
		p100: '100px',
		p140: '140px',
		full: '100%',
		threeQuarters: '75%',
		half: '50%',
	},
	border: {
		normalSolid: {
			size: '1px',
			type: 'solid',
			color: '#707070',
		},
		primarySolid: {
			size: '1px',
			type: 'solid',
			color: '#66ccff',
		},
	},
	color: {
		// TODO: デザインシステム構築の検証時に多階層で実装し、propsで扱いやすくする
		normalPrimary: '#32b7f0',
		subtlePrimary: '#8fe2fc',
		palePrimary: '#87ceeb',
		subtleSuccess: '#66cc33',
		paleSuccess: '#66cc66',
		lightDanger: '#ff9e9c',
		subtleDanger: '#ff6666',
		paleDanger: '#cc6666',
		white: '#fff',
		subtleGray: '#eee',
	},
	fontWeight: {
		bold: 700,
	},
	transition: {
		normal: '0.3s',
	},
} as const;
