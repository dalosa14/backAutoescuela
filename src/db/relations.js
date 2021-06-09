import TestPackage from './models/testPackage'
import User from './models/user'
import Test from './models/test'
import Question from './models/question'
import Answer from './models/answer'

User.hasMany(TestPackage,{as:'testPackages',foreignKey:"ownerId"})
TestPackage.belongsTo(User,{as:'owner'})

//relacion usuario paquetes de tests N:N
User.belongsToMany(TestPackage,{through: "User_testPackage",as:'testPackageToUser'})
TestPackage.belongsToMany(User,{through: "User_testPackage", as:'userr'})


Test.belongsTo(TestPackage, {as:'testPackage'})
// TestPackage.hasMany(Test,{as:'tests' ,through: "testPackages"} )
Test.hasMany(Question,{as:"questions"})
Question.belongsTo(Test,{as:'test'})
Question.hasMany(Answer)

Answer.belongsTo(Question,{as:"question"})
