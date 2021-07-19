import 'styled-components';

interface IColor {
	darkGray: string;
	gray: string;
	lightGray: string;
};

declare module 'styled-components' {
	export interface DefaultTheme {
		name: string;
		bgColor: string;
		textColor: string;
		pointColor: string;
		color: IColor;
	}
}