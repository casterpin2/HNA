export const ClassQueries = {
  GetOneClass: `SELECT * FROM class WHERE id = ?;`,
  InsertClass: `INSERT INTO class(id,name,startDate,endDate,createBy,description,teacherId)VALUES(?,?,?,?,?,?,?);`,
  GetUserByUsername: `SELECT id,username,password FROM user where username = ?`,
  UpdateClass: `UPDATE class SET name = ?,startDate = ?,endDate = ?,updateBy = ?,updateDate = ?,teacherId = ? WHERE id = ?;`,
  GetAllClass: `SELECT c.id,c.name,c.startDate,c.endDate,c.description,u.fullName FROM class c join user u on c.teacherId = u.id  
                where c.isDeleted = 0  and u.isDeleted = 1  order by c.name
                limit ?,? ;`,
  GetUserByClass :`SELECT u.id,u.username,u.avatar,u.fullName FROM edu.user_class us join user u on us.userId = u.id where us.classId =? and u.isDeleted = 1;
  ;`,
  InsertUserClass:`INSERT INTO user_class(userId,classId) VALUES ? `,
  GetDifferentUser:`select u.id,u.username,u.avatar,u.fullName,us.classId from user u left join user_class us on u.id = us.userId
  where us.classId is NULL and role = 2  and u.isDeleted = 1 limit ?,?`,
  RemoveUserClass:`DELETE FROM user_class
  WHERE (userId,classId) in (?);`,
  GetNameClass:`select name from class where LOWER(name) = ?`,
  GetNameUpdateClass:`select name from class where LOWER(name) = ? and id != ?`
}