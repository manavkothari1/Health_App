import * as bcrypt from 'bcrypt';

class Password {
    private static saltRounds = 10;

    static async encrypt(password:string):Promise<string> {
      return await bcrypt.hash(password, Password.saltRounds);
    }

    static async compare(password:string,hash:string): Promise<boolean> {
      return await bcrypt.compare(password, hash);
    }
}

export { Password };
