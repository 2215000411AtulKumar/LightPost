import conf from '../conf/conf';
import {Client, ID, Databases, Storage, Query} from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwrite)
            .setProject(conf.projectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug,content, featuredImage, status, userId}) {
        // eslint-disable-next-line no-useless-catch
        try{
            return await this.databases.createDocument(conf.databaseId, conf.collectionId, slug, {
                title,
                slug,
                content,
                featuredImage,
                status,
                userId
            })
        } catch (error) {
            console.log('Error creating post:', error);
            throw error;
        }
    }

    async updatePost(slug, {title,content, featuredImage, status}) {
        try{
            return await this.databases.updateDocument(conf.databaseId, conf.collectionId, slug, {
                title,
                content,
                featuredImage,
                status,
            })
        } catch (error) {
            console.log('Error updating post:', error);
            throw error;
        }
    }

    async deletePost(slug) {
         
        try{
            return await this.databases.deleteDocument(conf.databaseId, conf.collectionId, slug);
        } catch (error) {
            console.log('Error deleting post:', error);
            throw error;
        }
    }
        
    async getPost(slug) {

        try{
            return await this.databases.getDocument(conf.databaseId, conf.collectionId, slug);
        } catch (error) {
            console.log('Error getting post:', error);
            throw error;
        }
    }

    async getPosts(queries = [Query.equal('status', 'equal')]) {
        try{
            return await this.databases.listDocuments(conf.databaseId, conf.collectionId, queries);
        } catch (error) {
            console.log('Error getting posts:', error);
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            const fileId = ID.unique();
            const response = await this.bucket.createFile(conf.bucketId, fileId, file);
            return response;
        } catch (error) {
            console.log('Error uploading file:', error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            const response = await this.bucket.deleteFile(conf.bucketId, fileId);
            return response;
        } catch (error) {
            console.log('Error deleting file:', error);
            throw error;
        }
    }

    async getFilePreview(fileId) {
        try {
            const response = await this.bucket.getFilePreview(conf.bucketId, fileId);
            return response;
        } catch (error) {
            console.log('Error getting file preview:', error);
            throw error;
        }
    }
}

const service = new Service();
export default service;