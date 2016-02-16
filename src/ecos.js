const _ = require('lodash');

function fromLegend(legend, array) {
    return _.map(array, (item) => {
        if (_.isArray(item))
            return fromLegend(legend, item); 

        return legend[item];
    });
}

module.exports = {
    fromLegend
};
