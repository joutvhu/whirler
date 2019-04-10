'use strict';

import {WhirlerCore} from './Whirler';
import {FormattedError} from '../error/OtherErrors';
import ExceptionMessages from '../constants/ExceptionMessages';
import {preCheck} from '../validation/checkContent';

export default class Caller {
    constructor(whirlerClass) {
        if (whirlerClass && whirlerClass.prototype instanceof WhirlerCore)
            this.whirler = new whirlerClass();
        else throw new FormattedError(ExceptionMessages.PROVIDED_WHIRLER);
    }

    async call(content) {
        const _content = preCheck(content);
        return this.whirler.call(_content);
    }
}
