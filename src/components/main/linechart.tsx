import React, { useEffect } from 'react';
import { AxisOptions, Chart } from "react-charts";
import ResizableBox from './ResizableBox';

function LineChart(chartData: any) {
    const { data } = chartData;

    const primaryAxis = React.useMemo<AxisOptions<typeof data[number]["data"][number]>>(() => ({
        getValue: (datum) => datum.primary as unknown as Date,
    }), []);

    const secondaryAxes = React.useMemo<AxisOptions<typeof data[number]["data"][number]>[]>(() => [
        {
            getValue: (datum) => datum.secondary,
        },
    ], []);
    return (
        <>
            <ResizableBox>
                <Chart
                    options={{
                        data,
                        primaryAxis,
                        secondaryAxes,
                    }}
                />
            </ResizableBox>
        </>
    );
}

export default LineChart