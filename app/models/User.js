// class User
// with method creator from database object
// and json method to return json object (short and long form)

class User {
  constructor(dbObject) {
    this.id = dbObject.user_id;
    this.name = dbObject.user_name;
    this.email = dbObject.user_mail;
    this.ppUrl = dbObject.user_pp_url;
    this.role = ["admin", "user", "officiel"][dbObject.role_id - 1];
  }

  short() {
    return {
      id: this.id,
      name: this.name,
      ppUrl: this.ppUrl,
      role: this.role,
    };
  }

  long() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      ppUrl: this.ppUrl,
      role: this.role,
    };
  }
}

module.exports = User;