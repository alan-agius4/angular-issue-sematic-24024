import * as ng from '@angular/compiler-cli';
import * as ts from 'typescript';
import * as path from 'path';

const ensureUnixPath = (fileName?: string): string | null => {
	if (!fileName) {
		return null;
	}

	const regex = new RegExp('\\' + path.win32.sep, 'g');
	return fileName.replace(regex, path.posix.sep);
}

const options = {
	baseUrl: '.',
	basePath: '.',
	emitDecoratorMetadata: true,
	experimentalDecorators: true,
	moduleResolution: ts.ModuleResolutionKind.NodeJs,
	module: ts.ModuleKind.ES2015,
	target: ts.ScriptTarget.ES2015,
	outDir: './dist',
	paths: {
		'shared': [
			'./src/shared/shared.ts'
		]
	},
	flatModuleId: 'test',
	flatModuleOutFile: 'test.js',
	skipTemplateCodegen: true,
	strictMetadataEmit: true
};

const host = {
	...ng.createCompilerHost({ options }),
	moduleNameToFileName: (moduleName: string, containingFile: string) => {
		const { resolvedModule } = ts.resolveModuleName(
			moduleName,
			ensureUnixPath(containingFile),
			options,
			host
		);

		if (containingFile.indexOf('node_modules') <= 0) {
			console.log({ moduleName, containingFile });
		}

		return resolvedModule && resolvedModule.resolvedFileName;
	}
};

const program = ng.createProgram({
	rootNames: [path.resolve('./src/public_api.ts')],
	options,
	host
});

program.getNgStructuralDiagnostics()