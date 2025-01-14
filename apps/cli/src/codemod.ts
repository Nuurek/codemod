import { type Output, literal, union } from "valibot";
import { Arguments } from "./schemata/argumentsSchema.js";

export const javaScriptCodemodEngineSchema = union([
	literal("jscodeshift"),
	literal("repomod-engine"),
	literal("filemod"),
	literal("ts-morph"),
]);

export type JavaScriptCodemodEngine = Output<
	typeof javaScriptCodemodEngineSchema
>;

export type Codemod =
	| Readonly<{
			source: "registry";
			name: string;
			engine: "recipe";
			directoryPath: string;
			codemods: ReadonlyArray<Codemod>;
			arguments: Arguments;
	  }>
	| Readonly<{
			source: "registry";
			name: string;
			engine: "ast-grep";
			directoryPath: string;
			arguments: Arguments;
			yamlPath: string;
	  }>
	| Readonly<{
			source: "registry";
			name: string;
			engine: JavaScriptCodemodEngine;
			directoryPath: string;
			indexPath: string;
			arguments: Arguments;
	  }>
	| Readonly<{
			source: "registry";
			name: string;
			engine: "piranha";
			directoryPath: string;
			arguments: Arguments;
	  }>
	| Readonly<{
			source: "fileSystem";
			engine: JavaScriptCodemodEngine;
			indexPath: string;
	  }>;
