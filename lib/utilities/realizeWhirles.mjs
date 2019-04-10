'use strict';

/**
 * Create a list of Whirler objects from list of Whirler classes.
 *
 * @param whirles is list of Whirler classes
 */
export default function realizeWhirles(whirles) {
    const result = {};
    let i;

    for (i in whirles) {
        if (Object.hasOwnProperty.call(whirles, i))
            result[i] = new whirles[i]();
    }
    return result;
}
