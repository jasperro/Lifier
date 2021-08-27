/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

import { SkillDocument } from "./skill.schema";

/**
 * describes a skill category that references skills
 */
export interface CategorySchema {
    id?: string;
    display_name: string;
    skills?: string[];
    color?: string;
    index?: number;
    skills_?: Promise<SkillDocument[]>;
}
