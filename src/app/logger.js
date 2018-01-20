/*
* @Author: Craig Bojko
* @Date:   2018-01-12 09:43:12
* @Last Modified by:   Craig Bojko
* @Last Modified time: 2018-01-14 16:16:55
*/

export default function Logger (...args) {
  if (process.env.NODE_ENV !== 'test') {
    return console.log(...args)
  }
}
