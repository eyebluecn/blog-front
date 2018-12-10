let UserGender = {
  GUEST: 'GUEST',
  USER: 'USER',
  ADMIN: 'ADMIN'
}
let UserGenderMap = {
  UNKNOWN: {
    name: '保密',
    value: 'UNKNOWN',
    style: 'success'
  },
  MALE: {
    name: '男',
    value: 'MALE',
    style: 'info'
  },
  FEMALE: {
    name: '女',
    value: 'FEMALE',
    style: 'primary'
  }
}


let UserGenderList = [];
for (let key in UserGenderMap) {
  if (UserGenderMap.hasOwnProperty(key)) {
    UserGenderList.push(UserGenderMap[key]);
  }
}

export {UserGender, UserGenderMap, UserGenderList}
