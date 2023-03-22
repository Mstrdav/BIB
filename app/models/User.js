// class User
// with method creator from database object
// and json method to return json object (short and long form)

class User {
  constructor(dbObject) {
    this.id = dbObject.user_id;
    this.name = dbObject.user_name;
    this.email = dbObject.user_mail;
    this.ppUrl = dbObject.user_pp_url;
    this.roles = dbObject.roles;
  }

  getID() {
    return this.id;
  }

  addRole(role) {
    if (this.roles.find((r) => r === role)) {
      return;
    }
    this.roles.push(role);
  }

  short() {
    return {
      id: this.id,
      name: this.name,
      ppUrl: this.ppUrl,
      roles: this.roles,
    };
  }

  long() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      ppUrl: this.ppUrl,
      roles: this.roles,
    };
  }
}

module.exports = User;