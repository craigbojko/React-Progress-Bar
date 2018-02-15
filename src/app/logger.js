/**
 * Project: react_navigation_progress
 * FilePath: /src/app/logger.js
 * File: logger.js
 * Created Date: Thursday, January 11th 2018, 10:20:40 pm
 * Author: Craig Bojko
 * -----
 * Last Modified: Thu Feb 15 2018
 * Modified By: Craig Bojko
 * -----
 * Copyright (c) 2018 Pixel Ventures Ltd.
 * ------------------------------------
 */

export default function Logger (...args) {
  if (process.env.NODE_ENV !== 'test') {
    return console.log(...args)
  }
}
