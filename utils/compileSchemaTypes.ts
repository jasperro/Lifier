// Dit bestand is voor het genereren van types van de schemas
// Uitvoeren met `ts-node-transpile-only`

import * as fs from "fs";
import { compile } from "json-schema-to-typescript";
import EventSchema from "../model/event.schema";
import SettingSchema from "../model/setting.schema";
import SkillSchema from "../model/skill.schema";
import SkillCategorySchema from "../model/category.schema";
import TaskSchema from "../model/task.schema";

const cwd = process.cwd();

compile(SkillCategorySchema, "SkillCategorySchema").then((ts) =>
    fs.writeFileSync(`${cwd}/model/category.type.ts`, ts)
);
compile(SkillSchema, "SkillSchema").then((ts) =>
    fs.writeFileSync(`${cwd}/model/skill.type.ts`, ts)
);
compile(TaskSchema, "TaskSchema").then((ts) =>
    fs.writeFileSync(`${cwd}/model/task.type.ts`, ts)
);
compile(EventSchema, "EventSchema").then((ts) =>
    fs.writeFileSync(`${cwd}/model/event.type.ts`, ts)
);
compile(SettingSchema, "SettingSchema").then((ts) =>
    fs.writeFileSync(`${cwd}/model/setting.type.ts`, ts)
);
