export function capitalizeFirstLetter(str) {
    // Check if the input is a string and not empty
    if (typeof str === 'string' && str.length > 0) {
        // Convert the first letter to uppercase and concatenate it with the rest of the string
        return str.charAt(0).toUpperCase() + str.slice(1)
    } else {
        // Return the original input if it's not a non-empty string
        return str
    }
}
