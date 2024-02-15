import { Argv } from 'yargs';
import {
	DEFAULT_DRY_RUN,
	DEFAULT_EXCLUDE_PATTERNS,
	DEFAULT_INCLUDE_PATTERNS,
	DEFAULT_THREAD_COUNT,
	DEFAULT_USE_CACHE,
	DEFAULT_USE_JSON,
	DEFAULT_USE_PRETTIER,
} from './constants';

export type CommandArgsUncacheable = {
	json: boolean;
};

export type CommandArgs = CommandArgsUncacheable & {
	'no-cache': boolean;
};

export type CommandArgsWithOptions = CommandArgs & {
	include: string;
	exclude: string;
	target?: string;
	source?: string;
	engine?: string;
	limit: number;
	prettier: boolean;
	threads: number;
	dry: boolean;
	output?: string;
	telemetryDisable: boolean;
};

export type PreCommitCommandArgs = CommandArgs;

export type ListCommandArgs = CommandArgs;

export type SyncCommandArgs = CommandArgsUncacheable;

export type LearnCommandArgs = CommandArgsUncacheable & { target: string };

export type LoginCommandArgs = CommandArgsUncacheable & { token: string };

export type LogoutCommandArgs = CommandArgsUncacheable;

export type PublishCommandArgs = CommandArgsUncacheable & {
	sourcePath?: string;
	source?: string;
};

export const buildUseJsonOption = <T extends Record<string, unknown>>(
	y: Argv<T>,
) =>
	y.option('useJson', {
		type: 'boolean',
		description: 'Respond with JSON',
		default: DEFAULT_USE_JSON,
	});

export const buildUseCacheOption = <T extends Record<string, unknown>>(
	y: Argv<T>,
) =>
	y.option('useCache', {
		type: 'boolean',
		description: 'Use cache for HTTP(S) requests',
		default: DEFAULT_USE_CACHE,
	});

export const buildOptions = <T extends Record<string, unknown>>(y: Argv<T>) =>
	y.options({
		include: {
			type: 'string',
			array: true,
			description: 'Glob pattern(s) for files to include',
			default: DEFAULT_INCLUDE_PATTERNS,
		},
		exclude: {
			type: 'string',
			array: true,
			description: 'Glob pattern(s) for files to exclude',
			default: DEFAULT_EXCLUDE_PATTERNS,
		},
		target: {
			type: 'string',
			description: 'Input directory path',
		},
		source: {
			type: 'string',
			description: 'Source path of the local codemod to run',
		},
		engine: {
			type: 'string',
			description:
				'The engine to use with the local codemod: "jscodeshift", "ts-morph", "filemod"',
		},
		limit: {
			type: 'number',
			description: 'File limit for processing',
			default: 1000,
		},
		prettier: {
			type: 'boolean',
			description: 'Format output with Prettier',
			default: DEFAULT_USE_PRETTIER,
		},
		threads: {
			type: 'number',
			description: 'Number of worker threads',
			default: DEFAULT_THREAD_COUNT,
		},
		dry: {
			type: 'boolean',
			description: 'Perform a dry run',
			default: DEFAULT_DRY_RUN,
		},
		output: {
			type: 'string',
			description:
				'(DEPRECATED, do not use) Output directory path for dry-run only',
		},
		telemetryDisable: {
			type: 'boolean',
			description: 'Disable telemetry',
		},
	});
