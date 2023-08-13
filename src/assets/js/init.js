/* eslint-disable no-useless-escape */
import { responeCodes } from './_constant.js'
import { ConvertNumberP2E, getBankFromShaba, iso7064Mod97_10, iso13616Prepare } from './sheba.js'
import moment from 'jalali-moment'

let formatter = new Intl.NumberFormat('fa-IR', {
  currency: 'IRR'
})

let charNumber = [
  'صفرم',
  'یکم',
  'دوم',
  'سوم',
  'چهارم',
  'پنجم',
  'ششم',
  'هفتم',
  'هشتم',
  'نهم',
  'دهم',
  'یازدهم',
  'دوازدهم',
  'سیزدهم',
  'چهاردهم',
  'پانزدهم'
]

const curencyFormat = (curency) => {
  return curency ? formatter.format(curency) : 'خطا'
}

const checkSheba = (input) => {
  let result = {}
  let shaba = ConvertNumberP2E(input.replace(/\-/g, '')).toUpperCase()
  if (shaba.length >= 6) {
    let shabaCode = shaba.substr(2, 3)
    let shabbankd = getBankFromShaba(shabaCode)
    console.log(shabbankd)
    result.img = '/src/assets/img/bank-img/' + shabbankd[0] + '.png'
  } else {
    result.img = '/src/assets/img/bank-img/no-img.png'
  }
  if (shaba.length === 0) {
    result.valid = false
    result.message = 'لطفا کد شبا را وارد نمایید'
    result.img = '/src/assets/img/bank-img/no-img.png'
  } else if (shaba.length !== 24 || iso7064Mod97_10(iso13616Prepare('IR' + shaba)) !== 1) {
    result.valid = false
    result.message = 'کد شبا نادرست میباشد'
  } else {
    result.valid = true
    result.message = 'کد شبا تایید شد'
  }
  return result
}

const setDarkMode = (mode) => {
  if (mode) {
    document.getElementsByTagName('html')[0].classList.add('dark')
  } else {
    document.getElementsByTagName('html')[0].classList.remove('dark')
  }
}

const nmbtoChar = (number) => {
  return number ? charNumber[number] : 'خطا'
}

function dateRange(startDate, endDate) {
  var start = startDate.split('-')
  var end = endDate.split('-')
  var startYear = parseInt(start[0])
  var endYear = parseInt(end[0])
  var dates = []

  for (var i = startYear; i <= endYear; i++) {
    var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1
    var startMon = i === startYear ? parseInt(start[1]) - 1 : 0
    for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      var month = j + 1
      var displayMonth = month < 10 ? '0' + month : month
      dates.push([i, displayMonth, '01'].join('-'))
    }
  }
  return dates
}

const carbonPeriod = {
  1: 31,
  2: 31,
  3: 31,
  4: 31,
  5: 31,
  6: 31,
  7: 30,
  8: 30,
  9: 30,
  10: 30,
  11: 30,
  12: 29
}

const responeHandeler = (resCode) => {
  return Object.values(responeCodes).filter((item) => item.msgCode == resCode)[0]
}

const toSolar = (gregorianDate, time) => {
  let newDate = gregorianDate ? moment(gregorianDate, 'YYYY-MM-DD HH:mm:ss').locale('fa') : null
  if (newDate) return time ? newDate.format('YYYY/MM/DD HH:mm:ss') : newDate.format('YYYY/MM/DD')
  else return 'مقدار نامعتبر'
}

const difrentDate = (date_1, date_2) => {
  const date1 = new Date(date_1)
  const date2 = new Date(date_2)
  const diffTime = Math.abs(date2 - date1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export {
  difrentDate,
  responeHandeler,
  curencyFormat,
  nmbtoChar,
  checkSheba,
  setDarkMode,
  dateRange,
  carbonPeriod,
  toSolar
}
