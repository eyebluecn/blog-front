let JumpType = {
  //不响应
  NONE: "NONE",
  //转跳到一个普通URL中去
  URL: "URL"
}

let JumpTypeMap = {
  NONE: {
    name: '不响应',
    value: 'NONE',
    style: 'default'
  },
  URL: {
    name: '网页链接',
    value: 'URL',
    style: 'success'
  }
}

let JumpTypeList = [];
for (let key in JumpTypeMap) {
  if (JumpTypeMap.hasOwnProperty(key)) {
    JumpTypeList.push(JumpTypeMap[key]);
  }
}

export {JumpType, JumpTypeMap, JumpTypeList}
