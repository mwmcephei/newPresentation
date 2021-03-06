import React, { ReactElement, useEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Label,
  Form,
  Input,
  Button,
  Container,
  Spinner,
} from 'reactstrap';
import CSS from 'csstype';
import {
  getCircle,
  allianzBlue,
  structureNumberForDisplay,
  // loginURL,
  apiUrl,
  parseUrl,
} from '../../globalVars';
import { Link, withRouter, useHistory } from 'react-router-dom';

type File = {
  name: string;
  date: string;
  ok: boolean;
};
type ExistingFiles = {
  filesInBuffer: File[];
  filesAlreadyParsed: string[];
};

function FileUpload(props): ReactElement {
  const [file, setFile] = useState<FormData>();
  const [category, setCategory] = useState('');
  const [submitErrorMessage, setSubmitErrorMessage] = useState(
    'Select both file and category',
  );
  const [submitError, setSubmitError] = useState(false);
  const [existingFiles, setExistingFiles] = useState<ExistingFiles>();
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [parsingDone, setParsingDone] = useState(true);

  useEffect(() => {
    fetch(apiUrl + '/existingFiles')
      .then(response => response.json())
      .then(response => {
        setExistingFiles(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (parsingDone) {
      fetch(apiUrl + '/existingFiles')
        .then(response => response.json())
        .then(response => {
          setExistingFiles(response);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [parsingDone]);

  useEffect(() => {
    setUploading(false);
  }, [existingFiles]);
  useEffect(() => {
    setTimeout(function () {
      fetch(apiUrl + '/existingFiles')
        .then(response => response.json())
        .then(response => {
          setExistingFiles(response);
        })
        .catch(error => {
          console.error(error);
        });
    }, 5000);
  }, [submitted]);

  const onChangeHandler_1 = event => {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    setFile(data);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (file && category !== '') {
      setUploading(true);
      file.append('name', category);
      setSubmitError(false);
      fetch(apiUrl + '/upload', {
        method: 'POST',
        //        headers: { 'Content-Type': 'application/json' },
        body: file, // JSON.stringify(data),
      })
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.error(e);
        });

      setCategory('');
      setFile(null);
      setSubmitted(true);
    } else {
      setSubmitError(true);
    }
  };

  const parse = () => {
    setParsingDone(false);
    fetch(parseUrl + '/startParsingForAllUploadedXlsxFiles', { mode: 'cors' })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setParsingDone(true);
        setSubmitted(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const mapFileNames = fileName => {
    switch (parseInt(fileName)) {
      case 1:
        return 'budget_report.xlsx';
      case 2:
        return 'KPI-report_1.xlsx';
      case 3:
        return 'status_report.xlsx';
      case 4:
        return 'test_data.xlsx';
      case 5:
        return 'budget_past.xlsx';
      default:
        return '';
    }
  };
  const mapFileNamesReverse = fileName => {
    switch (fileName) {
      case 'budget_report.xlsx':
        return 'Budget Report';
      case 'KPI-report_1.xlsx':
        return 'KPI Report';
      case 'status_report.xlsx':
        return 'Status Report';
      case 'test_data.xlsx':
        return 'Measure Overview';
      case 'budget_past.xlsx':
        return 'All Budgets';
      default:
        return '';
    }
  };

  return (
    <div className="page-content">
      <Container>
        <Card>
          <CardBody>
            <Form>
              <input
                type="file"
                name="file"
                onChange={() => onChangeHandler_1(event)}
              />

              <div className="input-group input-group mt-3">
                <select
                  className="form-select form-select-sm"
                  value={0}
                  onChange={e => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value={0}>Select</option>
                  <option value={1}>Budget Report</option>
                  <option value={2}>KPI Report</option>
                  <option value={3}>Status Report</option>
                  <option value={4}>Measure Overview</option>
                  <option value={5}>All Budgets</option>
                </select>
                <label className="input-group-text">Catrgory</label>
              </div>
            </Form>
            <div>Category hcosen: {mapFileNames(category)}</div>
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="btn btn-secondary mt-3"
            >
              Upload
            </button>

            <div>
              {submitError && (
                <h6 className="text-danger">{submitErrorMessage}</h6>
              )}
            </div>

            {parsingDone ? (
              <button
                type="button"
                onClick={() => parse()}
                className="btn btn-warning mt-3 mb-3 "
              >
                Parse
              </button>
            ) : (
              <Spinner className="ms-6 my-2" color="primary" />
            )}
            <div>
              <div>
                <div>Files in Buffer:</div>
                {!uploading ? (
                  <div className="mt-2">
                    {existingFiles ? (
                      existingFiles.filesInBuffer.map(info => {
                        return (
                          <div className="d-flex flex-row justify-content-between">
                            <div>{info.name}</div>
                            <div>{info.date}</div>
                          </div>
                        );
                      })
                    ) : (
                      <div>None</div>
                    )}
                  </div>
                ) : (
                  <Spinner className="ms-6 my-2" color="primary" />
                )}
              </div>
              <div>
                <div className="mt-4">Files currently parsed:</div>
                <div className="mt-2">
                  {existingFiles ? (
                    existingFiles.filesAlreadyParsed.map(info => {
                      return (
                        <div className="d-flex flex-row justify-content-between">
                          <div>{mapFileNamesReverse(info)}</div>
                        </div>
                      );
                    })
                  ) : (
                    <div>None</div>
                  )}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default withRouter(FileUpload);
