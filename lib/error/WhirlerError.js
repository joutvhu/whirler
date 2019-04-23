'use strict';

class WhirlerError extends Error {
    constructor(error) {
        if (typeof error === 'string')
            super(error);
        else if (typeof error.message === 'string') {
            super(error.message);
            if (typeof error.code === 'number')
                this.code = error.code;
            if (error.explain)
                this.explain = error.explain;
        } else super();
        this.name = 'Whirler Error';
    }

    toJSON() {
        return {
            code: this.code,
            error: this.message
        };
    }
}

module.exports = WhirlerError;
