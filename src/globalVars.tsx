import { ReactElement } from 'react';
import { DividedName } from 'types';

//export const apiUrl = 'http://localhost:4000/api'; // Docker: 80, regular: 4000
//export const parseUrl = 'http://localhost:4000/xlsxParser';
//export const loginURL = 'http://localhost:4000/simpleAuth/login';

// export const apiUrl = "https://backend-testdata.herokuapp.com/api"   // backend hosted on heroku
// export const parseUrl = "https://backend-testdata.herokuapp.com/xlsxParser"
// export const loginURL = "https://backend-testdata.herokuapp.com/simpleAuth/login"

export const apiUrl = "https://newdatapmo.herokuapp.com/api"
export const parseUrl = "https://newdatapmo.herokuapp.com/xlsxParser"
// export const loginURL = "https://newdatapmo.herokuapp.com/simpleAuth/login"

export const getMax = (array: number[]): number => {
  let res = 0;
  array.map(a => {
    if (a > res) {
      res = a;
    }
  });
  return res;
};

export const allianzBlue = '#16549C';
export const standardGreen = '#34c38f';
export const standardRed = '#f46a6a';
export const standardYellow = '#ffdc5c';
export const standardGrey = '#d6d4d4';

export const getColors = (input: number): string[] => {
  // returns grey and green/yellow/red/blue for Big Dot / Doughnut Charts
  const colors = [standardGrey]; // light grey
  if (input === 0) {
    colors.push(standardGreen); // green
  } else if (input === 1) {
    colors.push(standardYellow); // yellow
  } else if (input === 2) {
    colors.push(standardRed); // red
  } else if (input === -1) {
    colors.push(allianzBlue); // Allianz blue
  } else {
    colors.push(standardGrey); // both light grey
  }
  return colors;
};

export const getCircle = (input: number, size: number): ReactElement => {
  let c;
  switch (input) {
    case 0:
      c = standardGreen;
      break;
    case 1:
      c = standardYellow;
      break;
    case 2:
      c = standardRed;
      break;
    default:
      c = standardGreen;
      break;
  }
  return (
    <div
      className="justify-content-center mx-auto text-center rounded-circle mt-3 text-truncate "
      style={{ height: size, width: size, background: c }}
    ></div>
  );
};

export const focusAreaColors = {
  SH: '#fc9003',
  ID: '#03e3fc',
  RD: '#d6a9a9',
  SC: '#c4a9c4',
  BS: '#f2e085',
};

export const structureNumberForDisplay = (num: number, k: boolean): string => {
  if (num === 0) {
    return '0';
  } else {
    if (num > 1000 && num < 1000000) {
      const thousends = Math.floor(num / 1000);
      const rest = Math.floor(num - thousends * 1000);
      const result = !k
        ? thousends.toFixed(0) + ',' + addLeadingZeros(rest)
        : thousends.toFixed(0);
      return result;
    } else if (num > 1000000) {
      const millions = Math.floor(num / 1000000);
      const thousends = Math.floor((num - millions * 1000000) / 1000);

      const rest = Math.floor(num - (millions * 1000000 + thousends * 1000));
      const result = !k
        ? millions.toFixed(0) +
        ',' +
        addLeadingZeros(thousends) +
        ',' +
        addLeadingZeros(rest)
        : millions.toFixed(0) + ',' + addLeadingZeros(thousends);
      return result;
    }
  }
};

const addLeadingZeros = (num: number): string => {
  const asString = num + '';
  if (asString.length === 1) {
    return '00' + asString;
  } else if (asString.length === 2) {
    return '0' + asString;
  } else {
    return asString;
  }
};

export const convertCategory = (input: string) => {
  switch (input) {
    case 'GSP':
      return 'Allianz IS Global Platform';
    case 'PxQ':
      return 'Allianz IS Shared Services';
    case 'AZSE Global Governance':
      return 'Allianz Global IS Governance';
    case 'Local Services':
      return 'Embedded infrastructure Security Services';
    case 'Other Infra':
      return 'Embedded infrastructure Security Services';
    default:
      return input;
  }
};

export const formatStatusDate = (rawDate: string) => {
  const rawDay = rawDate.split(',')[0].split(' ')[1];
  let index;
  for (let i = 0; i < rawDay.length; i++) {
    if (isLetter(rawDay[i])) {
      index = i;
      break;
    }
  }
  let day = '01';
  if (index) {
    day = rawDay.substring(0, index);
    if (day.length < 2) {
      day = '0' + day;
    }
  }
  const year = rawDate.split(', ')[1];
  let month;
  switch (rawDate.substring(0, 1)) {
    case 'F':
      month = '02';
      break;
    case 'S':
      month = '09';
      break;
    case 'O':
      month = '10';
      break;
    case 'N':
      month = '11';
      break;
    case 'D':
      month = '12';
      break;
    default:
      month = '01';
      break;
  }
  switch (rawDate.substring(0, 2)) {
    case 'Ja':
      month = '01';
      break;
    case 'Ap':
      month = '04';
      break;
    case 'Ma':
      if (rawDate.substring(0, 3) === 'Mai') {
        month = '05';
      } else {
        month = '03';
      }
      break;
    case 'Ju':
      if (rawDate.substring(0, 3) === 'Jun') {
        month = '06';
      } else {
        month = '07';
      }
      break;
    case 'Au':
      month = '08';
      break;
    default:
      month = '01';
      break;
  }
  return day + '.' + month + '.' + year;
};
function isLetter(c: string) {
  return c.toLowerCase() != c.toUpperCase();
}

export const formatKPIDate = (rawDate: string) => {
  if (rawDate) {
    const day: string = rawDate.split('.')[0];
    const month: string = rawDate.split('.')[1];
    const year: string =
      rawDate.split('.')[2].length < 4
        ? '20' + rawDate.split('.')[2]
        : rawDate.split('.')[2];
    return day + '.' + month + '.' + year;
  } else {
    return 'test';
  }
};

export const formatBudgetDate = rawDate => {
  return (
    rawDate.split('-')[2] +
    '.' +
    rawDate.split('-')[1] +
    '.' +
    rawDate.split('-')[0]
  );
};

export const divideName = (name: string): DividedName => {
  const divided = name.split(' ');
  const firstNameLength = divided[0].length;
  return {
    firstName: divided[0],
    lastName: name.substring(firstNameLength + 1, name.length),
  };
};

export const getShortenedName = (name: string, maxChars: number) => {
  if (name.length > maxChars) {
    return name.substring(0, maxChars) + '...';
  } else {
    return name;
  }
};
