const core = require('@actions/core');
const process = require("process")
const semver = require('semver');

const red = (/** @type {String} */value) => `\u001b[31m${value}\u001b[39m`;
const green = (/** @type {String} */value) => `\u001b[32m${value}\u001b[39m`;
const magenta = (/** @type {String} */value) => `\u001b[35m${value}\u001b[39m`;
const cyan = (/** @type {String} */value) => `\u001b[36m${value}\u001b[39m`;

const error = core.error

const prev_version = core.getInput('prev_version');
if (!semver.valid(prev_version)) {
    error(`Prev version (${red(prev_version)}) is not a valid.`);
    process.exit(1);
}

const next_version = core.getInput('next_version');
if (!semver.valid(next_version)) {
    error(`New version (${red(next_version)}) is not a valid.`);
    process.exit(1);
}

const single_inc = core.getInput("singleInc") === 'true'

const next_patch_version = semver.inc(prev_version, "patch") || "";
const next_minor_version = semver.inc(prev_version, "minor") || "";
const next_major_version = semver.inc(prev_version, "major") || "";


const branchVersionIsValid = semver.gt(next_version, prev_version)
if (!branchVersionIsValid) {
    error(`New version ${red(next_version)} is invalid as it is less than ${green(prev_version)}.`);
    process.exit(1);
}

const validVersions = [next_major_version, next_minor_version, next_patch_version];
if (single_inc && !validVersions.includes(next_version)) {
    error(`New version ${red(next_version)} is not one of:`);
    error(`• ${magenta("Patch")} version: ${magenta(next_patch_version)}`);
    error(`• ${cyan("Minor")} version: ${cyan(next_minor_version)}`);
    error(`• ${green("Major")} version: ${green(next_major_version)}`);
    process.exit(1);
}

core.info(`${green(next_version)} is valid.`);
process.exit(0);
