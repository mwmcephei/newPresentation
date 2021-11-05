import React, { ReactElement, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  CardTitle,
} from 'reactstrap';
import { PieChart, Pie, Cell } from 'recharts';
import { getMax, getColors } from '../../globalVars';
import { StatusProps } from '../../types';
import StreetLight from './StreetLight';

interface TotalSellingProductProps {
  artefacts: 0 | 1 | 2;
  budget: 0 | 1 | 2;
  risks: 0 | 1 | 2;
  date1: string;
}

const TotalSellingProduct = ({
  artefacts,
  budget,
  risks,
  date1,
}: TotalSellingProductProps): ReactElement => {
  return (
    <Card style={{ height: '300px' }}>
      <CardBody>
        <CardTitle className="mb-5 d-flex justify-content-between align-items-center ">
          <div>Status {date1}</div>
          <div>{StreetLight(getMax([artefacts, budget, risks]), 13)}</div>
        </CardTitle>

        <div className="table-responsive mt-4">
          <Table className="table align-middle mb-0">
            <tbody>
              <tr>
                <td>Artefacts</td>
                <td className="d-flex justify-content-end p-2">
                  {StreetLight(artefacts, 10)}
                </td>
              </tr>
              <tr>
                <td>Budget</td>
                <td className="d-flex justify-content-end p-2">
                  {StreetLight(budget, 10)}
                </td>
              </tr>
              <tr>
                <td>Risks & Issues</td>
                <td className="d-flex justify-content-end p-2">
                  {StreetLight(risks, 10)}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default TotalSellingProduct;
