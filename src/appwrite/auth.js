
import conf from '../conf/conf.js';
import { Client, Account,ID } from 'appwrite';

export class AuthServices{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwrite)
            .setProject(conf.projectId)
        this.account = new Account(this.client);
    }

    async createAccount(email, password, name) {
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return userAccount;
            }else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    
    async login({email, password}) {
        // eslint-disable-next-line no-useless-catch
        try {
            const session = await this.account.createEmailSession(email, password);
            if (session) {
                return session;
            }
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        // eslint-disable-next-line no-useless-catch
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        // eslint-disable-next-line no-useless-catch
        try {
          const session = await this.account.deleteSessions();
            return session;
        } catch (error) {
            throw error;
        }
    } 

}    

export const authServices = new AuthServices();
export default authServices();