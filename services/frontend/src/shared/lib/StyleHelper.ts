
const StyleHelper = {
    
    /**
     * Hash from string
     * */
    hashCode(val: string) {
        return encodeURI(val).split(/%..|./).length - 1;
    },


    bootstrapStyle(val: string) {
        var states = [
            'success',
            'primary',
            'danger',
            'success',
            'warning',
            'dark',
            'primary',
            'info'];

        return states[StyleHelper.hashCode(val) % 8];
    },
}

export {StyleHelper};