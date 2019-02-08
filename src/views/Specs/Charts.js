import React from 'react';
import { Tab } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';

// Charts - queries ran, duration, pass/fail scatter plot, retry scatter plot

function Charts() {
	const data = {
		labels : [`fff`, `jjjj`, `asdf`, `jowow`, `oiiw`, `iiww`, `lllll`],
		datasets : [
			{
				label : `SQL Queries`,
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: [65, 59, 80, 81, 56, 55, 40]
			}
		]
	};

	const panes = [
		{
			menuItem : `SQL Queries`,
			render   : () => (
				<Tab.Pane><Line data={data} /></Tab.Pane>
			)
		},
		{
			menuItem : `Duration`,
			render   : () => (
				<Tab.Pane>aaaa</Tab.Pane>
			)
		},
		{
			menuItem : `Pass/Fail`,
			render   : () => (
				<Tab.Pane>ffffffffsss</Tab.Pane>
			)
		},
	];

	return (
		<>
			<Tab menu={{ fluid : true, vertical : true, tabular : true }} panes={panes} />
		</>
	);
}

export default Charts;
