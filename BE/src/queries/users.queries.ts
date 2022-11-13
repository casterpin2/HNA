export const USERQUERIES = {
  GetUsers: `SELECT u.id,u.username,u.phoneNumber,u.avatar,u.fullName,ur.name as 'roleName' FROM user u 
    join user_role ur on u.role = ur.id where u.isDeleted = 1 limit ?,?;`,
  InsertUsers: `INSERT INTO user(id,username,role,phoneNumber,avatar,fullName,email,password) VALUES (?,?,?,?,?,?,?,?);`,
  GetUserByUsername: `SELECT id,username,password FROM user where username = ?`,
  GetUserByUserId: `SELECT * FROM user where id = ?`,
  UpdateUser: `UPDATE user SET role = ?,phoneNumber = ?, avatar =?, fullName =?, updatedAt = ?, email =? WHERE id = ?;`,
  GetUserByRole: `SELECT id,username as 'name'FROM user where role = ?`,
  DeleteUser: `UPDATE user
    SET
    isDeleted = ?
    WHERE id = ?;`
}