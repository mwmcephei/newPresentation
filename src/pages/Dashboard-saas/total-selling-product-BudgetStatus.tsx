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
import { PieChart, Pie } from 'recharts';
import { getMax, getColors, structureNumberForDisplay } from '../../globalVars';
import StreetLight from './StreetLight';

const TotalSellingProductStatus = ({
  budgetSignal,
  budgetDetail,
}): ReactElement => {
  const labels = [
    'Approved Budget',
    'Contract Volume',
    'Spent Budget',
    'Invoiced Budget',
    'Forecast',
  ];

  return (
    <Col xs="12" xm="12" lg="12" xl="12">
      <Card style={{ height: '450px' }}>
        <CardBody>
          <CardTitle className="mb-5 d-flex justify-content-between align-items-center ">
            <div>Budget KPIs</div>
            <div>{StreetLight(budgetSignal, 13)}</div>
          </CardTitle>

          <div className="table-responsive pt-4">
            <Table className="table align-middle mb-0">
              <tbody>
                {budgetDetail.map((item, index) => {
                  return (
                    <tr>
                      <td>{labels[index]}</td>
                      <td className="d-flex justify-content-end ">
                        {structureNumberForDisplay(item, true)} kEUR
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TotalSellingProductStatus;
