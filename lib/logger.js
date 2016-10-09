export function throwWarn(error) {
    console.error('ERROR: ' + error.message + ', installation aborted.')
    process.exit(0)
}