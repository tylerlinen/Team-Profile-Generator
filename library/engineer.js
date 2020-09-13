// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

class Engineer extends Employee {
    constructor(name, id, email, githubUsername){
    super(name, id, email) 

        this.githubUsername = this.githubUsername;
    }

    getGithubUsername() {
        return this.githubUsername;
    }

    getRole(){
        return "Engineer";
    }
}

module.exports= Engineer;