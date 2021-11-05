import React, { ReactElement } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { getColors } from '../../globalVars';

const StreetLight = (color: number, size: number): ReactElement => {
  return (
    <div className="d-flex">
      <PieChart width={30} height={30}>
        <Pie
          data={[{ name: 'Geeksforgeeks', students: 400 }]}
          dataKey="students"
          outerRadius={size}
          fill={getColors(color === 0 ? color : -2)[1]}
          stroke="none"
          isAnimationActive={false}
        />
      </PieChart>
      <PieChart width={30} height={30}>
        <Pie
          data={[{ name: 'Geeksforgeeks', students: 400 }]}
          dataKey="students"
          outerRadius={size}
          fill={getColors(color === 1 ? color : -2)[1]}
          stroke="none"
          isAnimationActive={false}
        />
      </PieChart>
      <PieChart width={30} height={30}>
        <Pie
          data={[{ name: 'Geeksforgeeks', students: 400 }]}
          dataKey="students"
          outerRadius={size}
          fill={getColors(color === 2 ? color : -2)[1]}
          stroke="none"
          isAnimationActive={false}
        />
      </PieChart>
    </div>
  );
};

export default StreetLight;
