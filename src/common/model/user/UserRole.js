let UserRole = {
  GUEST: 'GUEST',
  USER: 'USER',
  ADMIN: 'ADMIN'
}
let UserRoleMap = {
  GUEST: {
    name: '游客',
    value: 'GUEST',
    style: 'primary'
  },
  USER: {
    name: '普通用户',
    value: 'USER',
    style: 'success'
  },
  ADMIN: {
    name: '管理员',
    value: 'ADMIN',
    style: 'info'
  }
}


let UserRoleList = [];
let UserLegalRoleList = [];
for (let key in UserRoleMap) {
  if (UserRoleMap.hasOwnProperty(key)) {
    UserRoleList.push(UserRoleMap[key]);
    if (key !== UserRole.GUEST) {
      UserLegalRoleList.push(UserRoleMap[key])
    }
  }
}

export {UserRole, UserRoleMap, UserRoleList, UserLegalRoleList}
