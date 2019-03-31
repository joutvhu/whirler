const checkContent = require('../validation/checkContent');
const preventOverride = require('../validation/preventOverride');

const notOverride = ['call'];

class Whirler {
    constructor() {
        preventOverride(Whirler, notOverride, this);
    }

    async call(content) {
        if(checkContent.call(this, content)) {
            if(this.middleware instanceof Function) {
                content = this.middleware(content);
                checkContent.call(this, content);
            }

            if(content.arguments instanceof Array) return this[content.function](
                ...content.arguments); else return this[content.function]();
        }
        return null;
    }
}

module.exports = Whirler;