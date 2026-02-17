import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
class Project {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    longDescription: string;

    @Prop({ required: true })
    image: string;

    @Prop([String])
    techStack: string[];

    @Prop()
    liveUrl?: string;

    @Prop()
    githubUrl?: string;

    @Prop([String])
    features: string[];

    @Prop({ required: true })
    challenges: string;

    @Prop({ required: true })
    role: string;
}

@Schema({ _id: false })
class Skill {
    @Prop({ required: true })
    category: string;

    @Prop([String])
    items: string[];

    @Prop({ required: true })
    icon: string;
}

@Schema({ _id: false })
class Experience {
    @Prop({ required: true })
    year: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    company: string;

    @Prop({ required: true })
    description: string;
}

@Schema({ _id: false })
class Testimonial {
    @Prop({ required: true })
    quote: string;

    @Prop({ required: true })
    author: string;

    @Prop({ required: true })
    role: string;
}

@Schema({ _id: false })
class PersonalInfo {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    subtitle: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    location: string;

    @Prop({ required: true })
    github: string;

    @Prop({ required: true })
    linkedin: string;

    @Prop()
    twitter: string;

    @Prop()
    upwork: string;

    @Prop({ required: true })
    bio: string;

    @Prop([String])
    philosophy: string[];
}

export type PortfolioDocument = Portfolio & Document;

@Schema({ timestamps: true })
export class Portfolio {
    @Prop({ type: [SchemaFactory.createForClass(Project)] })
    projects: Project[];

    @Prop({ type: [SchemaFactory.createForClass(Skill)] })
    skills: Skill[];

    @Prop({ type: [SchemaFactory.createForClass(Experience)] })
    experiences: Experience[];

    @Prop({ type: [SchemaFactory.createForClass(Testimonial)] })
    testimonials: Testimonial[];

    @Prop({ type: SchemaFactory.createForClass(PersonalInfo) })
    personalInfo: PersonalInfo;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
