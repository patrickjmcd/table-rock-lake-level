// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {InfluxDB, FluxTableMetaData} from "@influxdata/influxdb-client";
import _ from "lodash";
import moment from "moment";

const url = process.env.INFLUXDB_URL;
const org = process.env.INFLUXDB_ORG;
const token = process.env.INFLUXDB_TOKEN;

if (!url || !org || !token) {
	throw new Error("Missing environment variables for InfluxDB");
}


const queryApi = new InfluxDB({url, token}).getQueryApi(org);
const fluxQueryLast30Level = "from(bucket: \"lakeinfo/autogen\")" +
	"  |> range(start: -30d)" +
	"  |> filter(fn: (r) => r[\"_measurement\"] == \"table_rock_level\")" +
	"  |> filter(fn: (r) => r[\"_field\"] == \"valueNum\")" +
	"  |> filter(fn: (r) => r[\"units\"] == \"ft\")" +
	"  |> aggregateWindow(every: 1h, fn: last, createEmpty: false)" +
	"  |> yield(name: \"last\")"


type Result = {
	// result: string
	// start: string
	// stop: string
	time: string
	timestamp: number
	value: number
	// field: string
	// measurement: string
	// units: string
}

export type LevelData = {
	data: Result[]
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<LevelData>
) {
	const rows: Result[] = []
	queryApi.queryRows(fluxQueryLast30Level, {
		next: (row: string[], tableMeta: FluxTableMetaData) => {
			// the following line creates an object for each row

			const o = tableMeta.toObject(row)
			rows.push({
				// result: o.result,
				// start: o._start,
				// stop: o._stop,
				time: o._time,
				timestamp: moment(o._time).valueOf(),
				value: o._value,
				// field: o._field,
				// measurement: o._measurement,
				// units: o.units
			})
			// console.log(JSON.stringify(o, null, 2))
			// console.log(
			//   `${o.time} ${o.measurement} in '${o.location}' (${o.example}): ${o.field}=${o.value}`
			// )

			// alternatively, you can get only a specific column value without
			// the need to create an object for every row
			// console.log(tableMeta.get(row, 'time'))
		},
		error: (error: Error) => {
			console.error(error)
			console.log('\nQueryRows ERROR')
		},
		complete: () => {
			console.log('\nQueryRows SUCCESS')
			res.json({data: _.orderBy(rows, "time", "asc")})
		},
	})
}
