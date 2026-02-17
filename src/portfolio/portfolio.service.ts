import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Portfolio, PortfolioDocument } from './schemas/portfolio.schema';

@Injectable()
export class PortfolioService {
    constructor(
        @InjectModel(Portfolio.name) private portfolioModel: Model<PortfolioDocument>,
    ) { }

    async getPortfolio(): Promise<Portfolio | {}> {
        const portfolio = await this.portfolioModel.findOne().exec();
        if (!portfolio) {
            return {};
        }
        return portfolio;
    }

    async updatePortfolio(updateData: any): Promise<Portfolio> {
        const portfolio = await this.portfolioModel.findOneAndUpdate(
            {},
            { $set: updateData },
            { upsert: true, new: true },
        ).exec();
        return portfolio;
    }

    async updateProjectImage(projectId: string, imageUrl: string): Promise<Portfolio> {
        const portfolio = await this.portfolioModel.findOneAndUpdate(
            { 'projects.id': projectId },
            { $set: { 'projects.$.image': imageUrl } },
            { new: true },
        ).exec();

        if (!portfolio) {
            throw new NotFoundException(`Project with ID ${projectId} not found`);
        }
        return portfolio;
    }

    async deletePortfolio(): Promise<any> {
        return this.portfolioModel.deleteOne({}).exec();
    }
}
