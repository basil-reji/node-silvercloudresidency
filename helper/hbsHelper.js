module.exports = {
    compare: (val1, val2) => {
        return val1 == val2;
    },
    add: (val1, val2) => {
        return parseInt(val1) + parseInt(val2);
    },
    difference: (val1, val2) => {
        return parseInt(val1) - parseInt(val2);
    },
    multiply: (val1, val2) => {
        return parseInt(val1) * parseInt(val2);
    },
    divide: (val1, val2) => {
        return parseInt(val1) / parseInt(val2);
    },
    capsFirst: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    formatDate: (date) => {
        return date.getDate() + "/"
            + (date.getMonth() + 1) + "/"
            + date.getFullYear() + " @ "
            + date.getHours() + ":"
            + date.getMinutes() + ":"
            + date.getSeconds();
    }
};
