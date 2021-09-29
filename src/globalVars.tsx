import { ReactElement } from "react"

// export const apiUrl = "http://localhost:4000/api"
export const apiUrl = "https://backend-testdata.herokuapp.com/api"   // backend hosted on heroku


export const getMax = (array: number[]): number => {
  let res = 0
  array.map(a => {
    if (a > res) { res = a }
  })
  return res
}


export const allianzBlue = "#16549C"
export const standardGreen = "#34c38f"
export const standardRed = "#f46a6a"
export const standardYellow = "#ffdc5c"
export const standardGrey = "#d6d4d4"


export const getColors = (input: number): string[] => {       // returns grey and green/yellow/red/blue for Big Dot / Doughnut Charts
  const colors = [standardGrey];   // light grey
  if (input === 0) {
    colors.push(standardGreen) // green
  } else if (input === 1) {
    colors.push(standardYellow) // yellow
  } else if (input === 2) {
    colors.push(standardRed) // red
  } else if (input === -1) {
    colors.push(allianzBlue) // Allianz blue
  } else {
    colors.push(standardGrey) // both light grey
  }
  return colors
}

export const getCircle = (input: number, size: number): ReactElement => {
  let c
  switch (input) {
    case 0:
      c = standardGreen
      break
    case 1:
      c = standardYellow
      break
    case 2:
      c = standardRed
      break
    default:
      c = standardGreen
      break

  }
  return <div className="justify-content-center mx-auto text-center rounded-circle mt-3 text-truncate "
    style={{ height: size, width: size, background: c }} ></div>
}


export const focusAreaColors = {
  SH: "#fc9003",
  ID: "#03e3fc",
  RD: "#d6a9a9",
  SC: "#c4a9c4",
  BS: "#f2e085",
}



export const structureNumberForDisplay = (num: number, k: boolean): string => {
  if (num === 0) {
    return "0"
  } else {
    if (num > 1000 && num < 1000000) {
      const thousends = Math.floor(num / 1000)
      const rest = Math.floor(num - (thousends * 1000))
      const result = !k ? thousends.toFixed(0) + "," + leadingZeros(rest) : thousends.toFixed(0)
      return result

    } else if (num > 1000000) {
      const millions = Math.floor(num / 1000000)
      const thousends = Math.floor((num - (millions * 1000000)) / 1000)

      const rest = Math.floor(num - (millions * 1000000 + thousends * 1000))
      const result = !k ? millions.toFixed(0) + "," + leadingZeros(thousends) + "," + leadingZeros(rest) : millions.toFixed(0) + "," + leadingZeros(thousends)
      return result
    }
  }

}


const leadingZeros = (num) => {
  const asString = num + ""
  if (asString.length === 1) {
    return "00" + asString
  } else if (asString.length === 2) {
    return "0" + asString
  } else {
    return asString
  }
}