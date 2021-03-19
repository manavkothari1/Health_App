import * as bcrypt from 'bcrypt';

class Password {
    private static saltRounds = 10;

    /**
     * encrypt password
     * @param password password
     * @returns return encrypted password
     */
    static async encrypt(password:string):Promise<string> {
      return await bcrypt.hash(password, Password.saltRounds);
    }

    /**
     * compare hash password with user typed password
     * @param password user typed password
     * @param hash hash password
     * @returns 
     */
    static async compare(password:string,hash:string): Promise<boolean> {
      return await bcrypt.compare(password, hash);
    }
}

export { Password };
