/*
	Workspace health check for the static dashboard project.
	Run with: node script.js
*/

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const appDir = path.join(root, 'index.html');

const requiredFiles = [
	'index.html',
	'styles.css',
	'security.js',
	'data.js',
	'pages.js',
	'app.js',
	'app.js.bak',
	'README.md',
];

let hasFailure = false;

function ok(msg) {
	console.log(`[OK] ${msg}`);
}

function fail(msg) {
	hasFailure = true;
	console.error(`[FAIL] ${msg}`);
}

function assertFileExists(relPath) {
	const filePath = path.join(appDir, relPath);
	if (fs.existsSync(filePath)) {
		ok(`exists: index.html/${relPath}`);
	} else {
		fail(`missing: index.html/${relPath}`);
	}
}

function checkHtmlScriptOrder() {
	const htmlPath = path.join(appDir, 'index.html');
	const html = fs.readFileSync(htmlPath, 'utf8');
	const expected = ['security.js', 'data.js', 'pages.js', 'app.js'];
	let lastIdx = -1;

	for (const file of expected) {
		const idx = html.indexOf(`src="${file}"`);
		if (idx === -1) {
			fail(`index.html missing script tag for ${file}`);
			continue;
		}
		if (idx < lastIdx) {
			fail(`script load order incorrect around ${file}`);
		} else {
			ok(`script present in order: ${file}`);
			lastIdx = idx;
		}
	}
}

function compileJs(filePath) {
	const src = fs.readFileSync(filePath, 'utf8');
	vm.createScript(src, { filename: filePath });
}

function checkJavaScriptSyntax() {
	const files = fs.readdirSync(appDir)
		.filter((name) => name.endsWith('.js') || name.endsWith('.js.bak'));

	for (const file of files) {
		const filePath = path.join(appDir, file);
		try {
			compileJs(filePath);
			ok(`syntax: index.html/${file}`);
		} catch (error) {
			fail(`syntax error in index.html/${file}: ${error.message}`);
		}
	}
}

function checkBackupDrift() {
	const appPath = path.join(appDir, 'app.js');
	const backupPath = path.join(appDir, 'app.js.bak');
	const appSrc = fs.readFileSync(appPath, 'utf8');
	const backupSrc = fs.readFileSync(backupPath, 'utf8');

	if (appSrc === backupSrc) {
		ok('backup sync: app.js.bak matches app.js');
	} else {
		fail('backup drift: app.js.bak differs from app.js');
	}
}

function run() {
	console.log('Running workspace checks...');
	for (const file of requiredFiles) {
		assertFileExists(file);
	}
	checkHtmlScriptOrder();
	checkJavaScriptSyntax();
	checkBackupDrift();

	if (hasFailure) {
		console.error('Checks completed with failures.');
		process.exitCode = 1;
	} else {
		console.log('All checks passed.');
	}
}

run();
