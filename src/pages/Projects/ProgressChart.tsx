import React, { useEffect, useState } from 'react';
import {
  getMax,
  getColors,
  focusAreaColors,
  allianzBlue,
  apiUrl,
} from '../../globalVars';
import { PieChart, Pie, Cell } from 'recharts';
import { measureMemory } from 'vm';

type Artefact = {
  _id: string;
  id: number;
  description: string;
  progress: number;
  budget: string;
  achievement: string;
  work: string;
};

const ProgressChart = props => {
  const [artefacts, setArtefacts] = useState<Artefact[]>();

  useEffect(() => {
    fetch(apiUrl + '/measure/' + props.measure._id + '/artefacts')
      .then(response => response.json())
      .then(response => {
        setArtefacts(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const getData = () => {
    if (artefacts) {
      let sumOverArtefacts = 0;
      for (let i = 0; i < artefacts.length; i++) {
        let budgetAsNumber = 0;
        if (artefacts[i].budget.length > 0) {
          if (artefacts[i].budget.substring(0, 1) === '€') {
            budgetAsNumber =
              parseInt(
                artefacts[i].budget.substring(
                  1,
                  artefacts[i].budget.length - 2,
                ),
              ) * 1000;
          } else if (artefacts[i].budget.substring(0, 2) === '€ ') {
            budgetAsNumber =
              parseInt(
                artefacts[i].budget.substring(
                  2,
                  artefacts[i].budget.length - 2,
                ),
              ) * 1000;
          } else if (artefacts[i].budget.substring(0, 2) === ' €') {
            budgetAsNumber =
              parseInt(
                artefacts[i].budget.substring(
                  2,
                  artefacts[i].budget.length - 2,
                ),
              ) * 1000;
          } else if (artefacts[i].budget.substring(0, 3) === '  €') {
            budgetAsNumber =
              parseInt(
                artefacts[i].budget.substring(
                  4,
                  artefacts[i].budget.length - 2,
                ),
              ) * 1000;
          } else {
            budgetAsNumber =
              parseInt(
                artefacts[i].budget.substring(
                  0,
                  artefacts[i].budget.length - 2,
                ),
              ) * 1000;
          }
        }
        const progress = artefacts[i].progress ? artefacts[i].progress : 0;
        sumOverArtefacts = sumOverArtefacts + budgetAsNumber * progress;
      }
      const result =
        sumOverArtefacts / props.measure.budgetDetail.totalApprovedBudget;
      return [
        { name: 'Group B', value: 1 - result },
        { name: 'Group A', value: result },
      ];
    } else {
      return [
        { name: 'Group B', value: 0 },
        { name: 'Group A', value: 0 },
      ];
    }
  };

  return (
    <React.Fragment>
      <PieChart width={30} height={30} style={{ transform: 'rotate(270deg)' }}>
        <Pie
          data={getData()}
          dataKey="value"
          outerRadius={10}
          innerRadius={0}
          isAnimationActive={false}
        >
          {getData().map((entry, index) => (
            <Cell key={`cell-${index}`} fill={props.colors[index % 2]} />
          ))}
        </Pie>
      </PieChart>
    </React.Fragment>
  );
};

export default ProgressChart;
