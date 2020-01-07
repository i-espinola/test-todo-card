const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {
			'@primary-color': '#2948ff', // primary color for all components
			'@link-color': '#2948ff', // link color
			'@success-color': '#28a745', // success state color
			'@warning-color': '#ffc107', // warning state color
			'@error-color': '#dc3545', // error state color
			'@font-size-base': '14px', // major text font size
			'@heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color
			'@text-color': '#8d8d8d', // major text color
			'@text-color-secondary ': '#6c757d', // secondary text color
			'@disabled-color ': 'rgba(0, 0, 0, .25)', // disable state color
			'@border-color-base': '#000', // major border color
			'@box-shadow-base': '0px 5px 10px 0px transparentize(0, 0, 0, .7)', // major shadow for layers
		},
	}),
)
